// index.js

const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const eventRoutes = require('./routes/eventRoutes');
const festivalRoutes = require('./routes/festivalRoutes');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadDir));

// Define the root path route
app.get('/', (req, res) => {
  res.send('<h1>Hello Radha-Krishna</h1>');
});

// Define other routes
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
