import { neon } from '@neondatabase/serverless';

// Verifique se DATABASE_URL está definido
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sql = neon(databaseUrl);

export async function isUserAdmin(userId: string) {
  try {
    const result = await sql`
      SELECT is_admin FROM users WHERE id = ${userId}
    `;
    return result[0]?.is_admin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}