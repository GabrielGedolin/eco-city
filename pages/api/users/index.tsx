// pages/api/users/index.ts
import { neon } from '@neondatabase/serverless';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  try {
    // Verificação do token em produção
    if (process.env.NODE_ENV === 'production') {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }
      // Aqui você pode adicionar validação do token JWT
    }

    const sql = neon(process.env.DATABASE_URL!);
    const users = await sql`
      SELECT id, name, email, is_admin 
      FROM users
      ORDER BY name ASC
    `;
    
    return res.status(200).json(users);
    
  } catch (error) {
    console.error('Error:', {
      message: error.message,
      stack: error.stack,
      environment: process.env.NODE_ENV,
      dbUrl: process.env.DATABASE_URL ? 'configured' : 'missing'
    });
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}

// Habilitar CORS para OPTIONS
export const config = {
  api: {
    bodyParser: false,
  },
};