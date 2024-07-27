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

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Define the root path route
app.get('/', (req, res) => {
    res.send('<h1>Hello Radha-Krishna</h1>');
});

// Define the /api/current_user route
const currentUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com'
  };
  
  app.get('/api/current_user', (req, res) => {
    res.status(200).json(currentUser);
  });
  

// Define other routes
app.use('/user', userRoutes);
app.use('/uploads', express.static('uploads'));
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
