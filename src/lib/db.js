/*import mysql from 'mysql2/promise';
import { neon } from "@neondatabase/serverless";

/*const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connexion réussie à la base de données.');
  }
});

const db = async() => {
  const sql = neon(process.env.DATABASE_URL);
  return sql
}

export default db;*/

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
 
});

export default pool;

