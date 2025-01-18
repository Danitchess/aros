"use server";
import nodemailer from "nodemailer";
import verificationCodes from "../../../../lib/verificationCodes";

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log(email)

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: "Adresse email invalide." }),
        { status: 400 }
      );
    }    

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.add(email, code);

    console.log(`Code généré pour ${email}: ${code}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: '"Aros Watch Company" <aros.wtch@gmail.com>',
      to: email,
      subject: "Code de vérification",
      text: `${email},\\n\\nVoici votre code de vérification : ${code}\\n\\nMerci.\\nL'équipe Aros Watch Company`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Code envoyé par email." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans la route send-confirmation-code:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
