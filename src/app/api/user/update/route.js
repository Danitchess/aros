"use server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from "../../../../lib/db";  
const secretKey = process.env.SECRET_KEY;

export async function PUT(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];  
  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: 'Token manquant' }),
      { status: 401 }
    );
  }

  const { firstname, lastname, email, newPassword, confirmPassword } = await req.json(); 

  if (!firstname || !lastname || !email) {
    return new Response(
      JSON.stringify({ success: false, message: 'Tous les champs sont requis.' }),
      { status: 400 }
    );
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // Vérifier si l'utilisateur existe
    const { rows: user } = await pool.query(
      'SELECT password FROM users WHERE id = $1',
      [decoded.id]
    );

    if (user.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Utilisateur non trouvé' }),
        { status: 404 }
      );
    }

    let hashedPassword = user[0].password;

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        return new Response(
          JSON.stringify({ success: false, message: 'Les mots de passe ne correspondent pas.' }),
          { status: 400 }
        );
      }

      const isSamePassword = bcrypt.compareSync(newPassword, user[0].password);
      if (isSamePassword) {
        return new Response(
          JSON.stringify({ success: false, message: 'Le nouveau mot de passe doit être différent de l\'ancien.' }),
          { status: 400 }
        );
      }

      hashedPassword = bcrypt.hashSync(newPassword, 10);
    }

    // Mettre à jour l'utilisateur
    const updateQuery = `
      UPDATE users 
      SET firstname = $1, lastname = $2, email = $3, password = $4 
      WHERE id = $5
    `;
    const { rowCount } = await pool.query(updateQuery, [
      firstname, lastname, email, hashedPassword, decoded.id
    ]);

    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Mise à jour échouée.' }),
        { status: 500 }
      );
    }

    // Récupérer l'utilisateur mis à jour
    const { rows: updatedUser } = await pool.query(
      'SELECT id, firstname, lastname, email FROM users WHERE id = $1',
      [decoded.id]
    );

    return new Response(
      JSON.stringify({ success: true, user: updatedUser[0] }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Erreur interne du serveur.' }),
      { status: 500 }
    );
  }
}
