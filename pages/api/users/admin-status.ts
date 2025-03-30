// pages/api/users/admin-status.ts
import { neon } from '@neondatabase/serverless';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { userId, isAdmin } = req.body;
    
    if (!userId || typeof isAdmin !== 'boolean') {
      return res.status(400).json({ error: 'Missing userId or isAdmin' });
    }

    const sql = neon(process.env.DATABASE_URL!);
    
    // Atualiza o status no banco de dados
    const result = await sql`
      UPDATE users
      SET is_admin = ${isAdmin}
      WHERE id = ${userId}
      RETURNING id, is_admin
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ 
      success: true,
      user: result[0] 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to update user status' });
  }
}