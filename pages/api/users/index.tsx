// pages/api/users/index.ts
import { neon } from '@neondatabase/serverless';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    
    // Query de teste simples
    const test = await sql`SELECT NOW()`;
    console.log('Teste de conexão:', test);
    
    // Query principal
    const users = await sql`
      SELECT id, name, email, is_admin 
      FROM users
      ORDER BY name ASC
    `;
    
    console.log('Usuários encontrados:', users.length);
    res.status(200).json(users);
    
  } catch (error) {
    console.error('Erro completo:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: 'Database error' });
  }
}