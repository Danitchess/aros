"use server";

import Stripe from "stripe";
import db from "../../../../lib/db"; 
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET;
if (!stripeSecretKey) {
  throw new Error('Stripe Secret Key is missing');
}

const stripe = new Stripe(stripeSecretKey);
console.log(stripeSecretKey)

export async function POST(req) {
  const { allProducts, totalAmount, userEmail } = await req.json();

  if (!allProducts || !totalAmount || allProducts.length === 0) {
    return NextResponse.json(
      { success: false, message: "Données invalides." },
      { status: 400 }
    );
  }

  try {
    // Préparation des line_items pour Stripe
    const lineItems = allProducts.map((product) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.unit_amount.value * 100), // Convertir en centimes
      },
      quantity: product.quantity,
    }));

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "bancontact", "paypal"],
      line_items: lineItems,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "DE", "GB"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 500, // 5.00 EUR
              currency: "eur",
            },
            display_name: "Livraison bpost",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      success_url: encodeURI("http://localhost:3000/order-send"),
      cancel_url: encodeURI("http://localhost:3000/cart"),
      phone_number_collection: {
        enabled: true,
      },
    });

    // Enregistrement de la commande dans la base de données
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insertion de la commande
      const [orderResult] = await connection.execute(
        "INSERT INTO orders (userEmail, date, status) VALUES (?, NOW(), ?)",
        [userEmail, "payée"]
      );
      const orderId = orderResult.insertId;

      // Insertion des détails de la commande
      const orderDetails = allProducts.map((product) => [
        orderId,
        product.id,
        product.quantity,
      ]);
      await connection.query(
        "INSERT INTO order_details (orderId, productId, quantity) VALUES ?",
        [orderDetails]
      );

      // Commit de la transaction
      await connection.commit();

      // Retour du succès avec sessionId pour Stripe
      return NextResponse.json(
        {
          success: true,
          message: "Paiement capturé et commande enregistrée.",
          orderId: orderId,
          sessionId: session.id,
        },
        { status: 201 }
      );
    } catch (dbError) {
      // Rollback si une erreur se produit
      await connection.rollback();
      console.error("Erreur lors de l'enregistrement de la commande :", dbError);
      throw new Error("Erreur interne lors de l'enregistrement de la commande.");
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Erreur Stripe ou Base de données :", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la création de la session Stripe.",
      },
      { status: 500 }
    );
  }
}
