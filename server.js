import express from "express";
import cors from "cors";
import { Log, requestLogger } from "./loggingMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(requestLogger);

const store = new Map();

function generateCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let out = '';
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'url is required' });

  const code = generateCode();
  store.set(code, url);

  await Log('backend', 'info', 'service', `Created short code ${code} for ${url}`);

  res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${code}`, code });
});

app.get('/:code', (req, res) => {
  const { code } = req.params;
  const longUrl = store.get(code);
  if (!longUrl) return res.status(404).send('Not found');
  res.redirect(longUrl);
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
