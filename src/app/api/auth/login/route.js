"use server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../../../../lib/db"; 

const secretKey = process.env.SECRET_KEY;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Tous les champs sont requis' }),
        { status: 400 }
      );
    }

    const [result] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Utilisateur non trouvé' }),
        { status: 401 }
      );
    }

    const user = result[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ success: false, message: 'Mot de passe incorrect' }),
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id, email }, secretKey, { expiresIn: '2h' });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Connexion réussie',
        user: { id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email },
        token,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Erreur interne du serveur' }),
      { status: 500 }
    );
  }
}
