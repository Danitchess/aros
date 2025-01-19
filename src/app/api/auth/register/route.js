"use server"; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../../../../lib/db"; 

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY; 

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, password } = body;

    if (!firstname || !lastname || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Tous les champs sont requis' }),
        { status: 400 }
      );
    }

    const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({ success: false, message: "L'adresse e-mail est déjà associée à un compte" }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.execute(
      'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
      [firstname, lastname, email, hashedPassword]
    );

    const token = jwt.sign({ id: result.insertId, email }, secretKey, { expiresIn: '1h' });

    await db.end();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Utilisateur enregistré avec succès',
        user: { id: result.insertId, firstname, lastname, email },
        token,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement :', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Erreur interne du serveur' }),
      { status: 500 }
    );
  }
}
