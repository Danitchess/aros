"use server";

import nodemailer from "nodemailer";
import db from "../../../lib/db"; 

export async function POST(req) {
  const { firstname, lastname, phone, email, subject, text } = await req.json();

  if (!firstname || !lastname || !email || !text) {
    return new Response(
      JSON.stringify({ success: false, message: 'Certains champs sont requis' }),
      { status: 400 }
    );
  }

  try {
    const registerQuery = 'INSERT INTO messages (firstname, lastname, phone, email, subject, text) VALUES (?, ?, ?, ?, ?, ?)';
    await db.query(registerQuery, [firstname, lastname, phone, email, subject, text]);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
        secure: true, 
      },
    });

    const mailOptions = {
      from: email,
      to: '"Aros Watch Company" <aros.wtch@gmail.com>',
      subject: subject,
      text: `Message de ${email} 
             Numéro de téléphone : ${phone}:
             
             \n\n${text}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: 'Message envoyé avec succès' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoie du message :', error);


    return new Response(
      JSON.stringify({ success: false, message: 'Erreur interne du serveur' }),
      { status: 500 }
    );
  }
}
