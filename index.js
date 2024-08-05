// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
const eventRoutes = require('./routes/eventRoutes');
const festivalRoutes = require('./routes/festivalRoutes');

const app = express();

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Define routes
app.use('/user', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/festivals', festivalRoutes);

// Catch-all route for unknown paths
app.use((req, res, next) => {
    res.status(404).send('Cannot GET ' + req.originalUrl);
});

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});
