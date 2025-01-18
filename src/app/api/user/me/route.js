"use server"
import jwt from 'jsonwebtoken';
import db from '@/lib/db';  
const secretKey = process.env.SECRET_KEY;

export async function GET(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];  
  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: 'Token manquant' }),
      { status: 401 }
    );
  }

  try {

    const decoded = jwt.verify(token, secretKey);

    const [results] = await db.execute('SELECT id, firstname, lastname, email FROM users WHERE id = ?', [decoded.id]);

    if (results.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Utilisateur non trouvé' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, user: results[0] }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: 'Token invalide' }),
      { status: 401 }
    );
  }
}
