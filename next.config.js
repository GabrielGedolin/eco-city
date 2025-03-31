// next.config.js
module.exports = {
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
    // Configuração correta para Next.js 15+
    serverExternalPackages: ['@neondatabase/serverless'], // ← Substitui a configuração experimental
  };