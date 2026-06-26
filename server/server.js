import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

const distPath = join(__dirname, '..', 'dist');
const imagePath = join(__dirname, 'public', 'images');

app.use('/api/images', express.static(imagePath));
app.use('/api', apiRoutes);
app.use(express.static(distPath));
app.get('/{*path}', (_req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  GET /api/bundle-data');
  console.log('  GET /api/bundle-data/products');
  console.log('  GET /api/bundle-data/steps');
  console.log('  GET /api/bundle-data/content');
});
