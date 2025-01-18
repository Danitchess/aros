"use server";
import verificationCodes from "../../../../lib/verificationCodes";

export async function POST(req) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return new Response(
        JSON.stringify({ success: false, message: "Email ou code manquant." }),
        { status: 400 }
      );
    }

    const entry = verificationCodes.get(email);

    if (!entry) {
      return new Response(
        JSON.stringify({ success: false, message: "Aucun code trouvé pour cet email." }),
        { status: 404 }
      );
    }

    const { code: storedCode, timestamp } = entry;
    const isExpired = Date.now() - timestamp > 1 * 60 * 1000;

    if (isExpired) {
      verificationCodes.delete(email);
      return new Response(
        JSON.stringify({ success: false, message: "Le code de vérification a expiré." }),
        { status: 400 }
      );
    }

    if (storedCode === code) {
      verificationCodes.delete(email);
      return new Response(
        JSON.stringify({ success: true, message: "Code vérifié avec succès." }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Code de vérification incorrect." }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Erreur dans la route verify-code:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
