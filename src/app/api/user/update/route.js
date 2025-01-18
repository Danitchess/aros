"use server"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '@/lib/db'; 
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

    const [user] = await db.execute('SELECT password FROM users WHERE id = ?', [decoded.id]);
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

    const updateQuery = `
      UPDATE users 
      SET firstname = ?, lastname = ?, email = ?, password = ? 
      WHERE id = ?
    `;
    const [result] = await db.execute(updateQuery, [firstname, lastname, email, hashedPassword, decoded.id]);

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Mise à jour échouée.' }),
        { status: 500 }
      );
    }

    const [updatedUser] = await db.execute('SELECT id, firstname, lastname, email FROM users WHERE id = ?', [decoded.id]);

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
