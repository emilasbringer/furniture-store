import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Log all registered routes for debugging
app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next();
});

// Serve static files from the dist directory
try {
  app.use(express.static(path.join(__dirname, 'dist')));
} catch (err) {
  console.error('Error setting up static file serving:', err);
}

// Handle all routes by sending index.html
app.get('*', (req, res, next) => {
  try {
    console.log('Serving index.html for route:', req.path);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (err) {
    console.error('Error serving index.html:', err);
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});