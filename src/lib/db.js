import { Pool } from 'pg';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Configuration de la base de données Neon
const db = new Pool({
  host: process.env.PGHOST, // Ex: 'ep-royal-term-a2gypbnp-pooler.eu-central-1.aws.neon.tech'
  user: process.env.PGUSER, // Ex: 'neondb_owner'
  password: process.env.PGPASSWORD, // Ex: 'votre_mot_de_passe'
  database: process.env.PGDATABASE, // Ex: 'neondb'
  ssl: {
    rejectUnauthorized: false, // Nécessaire pour Neon (SSL activé par défaut)
  },
});

// Vérification de la connexion à la base de données
(async () => {
  try {
    const client = await db.connect();
    console.log('Connexion réussie à la base de données Neon.');
    client.release(); // Relâcher la connexion au pool
  } catch (err) {
    console.error('Erreur de connexion à la base de données Neon:', err.message);
  }
})();

export default db;
