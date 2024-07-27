const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Route Imports
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const eventRoutes = require('./routes/eventRoutes');
const festivalRoutes = require('./routes/festivalRoutes');

// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to database
connectDB();

// Set port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(bodyParser.json()); // Parse JSON request bodies

// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter); // Apply rate limiting to API routes

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Hello Radha-Krishna</h1>');
});

app.use('/user', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/articles', articleRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/festivals', festivalRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});
