"use server";

import Stripe from "stripe";
import pool from "../../../../lib/db"; 
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET;
if (!stripeSecretKey) {
  throw new Error("Stripe Secret Key is missing");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(req) {
  const { allProducts, totalAmount, userEmail } = await req.json();
  console.log("Données reçues par l'API :", { allProducts, totalAmount, userEmail });

  

  if (!allProducts || !totalAmount || allProducts.length === 0) {
    return NextResponse.json(
      { success: false, message: "Données invalides." },
      { status: 400 }
    );
  }
  

  try {
    const lineItems = allProducts.map((product) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.unit_amount.value * 100), 
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "bancontact"],
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
              amount: 600, 
              currency: "eur",
            },
            display_name: "Livraison bpost",
            delivery_estimate: {
              minimum: { unit: "week", value: 4 },
              maximum: { unit: "week", value: 5 },
            },
          },
        },
      ],
      success_url: "https://aroswatch.be/order-send",
      cancel_url: "https://aroswatch.be/cart",
      phone_number_collection: {
        enabled: true,
      },
    });

    const client = await pool.connect(); 

    try {
      await client.query('BEGIN'); // Démarrer la transaction

      // Insertion de la commande
      const insertOrderResult = await client.query(
        "INSERT INTO orders (userEmail, date, status) VALUES ($1, NOW(), $2) RETURNING id",
        [userEmail, "payée"]
      );
      const orderId = insertOrderResult.rows[0].id;

      // Insertion des détails de la commande
      const orderDetailsValues = allProducts.flatMap((product) => [
        orderId,
        product.id,
        product.quantity,
      ]);

      const orderDetailsQuery = `
        INSERT INTO order_details (orderId, productId, quantity)
        VALUES ${allProducts
          .map(
            (_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`
          )
          .join(", ")}
      `;

      await client.query(orderDetailsQuery, orderDetailsValues);

      await client.query('COMMIT');

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
    } catch (poolError) {
      // Rollback si une erreur se produit
      await client.query('ROLLBACK');
      console.error("Erreur lors de l'enregistrement de la commande :", poolError);
      throw new Error("Erreur interne lors de l'enregistrement de la commande.");
    } finally {
      client.release(); // Libérer le client
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
