import { neon } from '@neondatabase/serverless';
import { NextApiRequest, NextApiResponse } from 'next';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      const { userId, isAdmin } = req.body;
      await sql`UPDATE users SET is_admin = ${isAdmin} WHERE id = ${userId}`;
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Update failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}