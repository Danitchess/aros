"use server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../../../../lib/db"; 

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, password } = body;

    if (!firstname || !lastname || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "Tous les champs sont requis" }),
        { status: 400 }
      );
    }

    const { rows: existingUsers } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUsers.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "L'adresse e-mail est déjà associée à un compte",
        }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { rows } = await pool.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, firstname, lastname, email",
      [firstname, lastname, email, hashedPassword]
    );

    const user = rows[0]; 

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Utilisateur enregistré avec succès",
        user,
        token,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Erreur interne du serveur",
      }),
      { status: 500 }
    );
  }
}
