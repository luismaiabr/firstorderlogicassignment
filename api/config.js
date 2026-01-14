// Vercel Serverless Function - Expõe variáveis de ambiente para o frontend
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  res.status(200).json({
    baseURL: process.env.VITE_BASE_URL || process.env.BASE_URL || ''
  });
}
