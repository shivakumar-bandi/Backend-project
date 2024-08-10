const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
const eventRoutes = require('./routes/eventRoutes');
const festivalRoutes = require('./routes/festivalRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust the first proxy (like Render.com's proxy)
app.set('trust proxy', 1);  // <-- Add this line

// Security middleware
app.use(xss());
app.use(hpp());

// Rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors());

// Body parser
app.use(express.json());

// Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/user', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/festivals', festivalRoutes);

// Test route
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Cannot GET ' + req.originalUrl);
});

app.listen(PORT, () => {
  console.log(`Server started and running at http://localhost:${PORT}`);
});
