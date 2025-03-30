const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_p7gdDjk5slIQ@ep-billowing-tooth-a5luw95y-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
});

async function test() {
  try {
    const client = await pool.connect();
    console.log('✅ Conexão bem-sucedida!');
    const res = await client.query('SELECT NOW()');
    console.log('Hora do banco:', res.rows[0]);
    client.release();
  } catch (err) {
    console.error('❌ Erro de conexão:', err);
  } finally {
    await pool.end();
  }
}

test();