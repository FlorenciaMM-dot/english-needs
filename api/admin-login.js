export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CRITICAL: ADMIN_PASSWORD must be set in environment variables
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin access not configured. Set ADMIN_PASSWORD in Vercel environment variables.' });
  }

  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ success: false, error: 'Invalid password' });
}
