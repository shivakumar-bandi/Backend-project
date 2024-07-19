const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
const eventRoutes = require('./routes/eventRoutes');
const festivalRoutes = require('./routes/festivalRoutes');

delete require.cache[require.resolve('./models/Festival')];

const app = express();

dotenv.config();

connectDB();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Define the root path route
app.get('/', (req, res) => {
    res.send('<h1>Hello Radha-Krishna</h1>');
});

// Define other routes
app.use('/user', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api', articleRoutes);
app.use('/api', eventRoutes);
app.use('/api/festivals', festivalRoutes);

// Catch-all route for unknown paths
app.use((req, res, next) => {
    res.status(404).send('Cannot GET ' + req.originalUrl);
});

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});
