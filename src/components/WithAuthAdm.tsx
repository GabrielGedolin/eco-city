// lib/db.js
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function isUserAdmin(userId) {
  try {
    const result = await sql`SELECT adm FROM users WHERE id = ${userId} AND adm = TRUE`;
    return result.length > 0;
  } catch (error) {
    console.error('Erro ao verificar admin:', error);
    return false;
  }
}