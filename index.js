// index.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
const eventRoutes = require('./routes/eventRoutes');
const festivalRoutes = require('./routes/festivalRoutes');
const path = require('path'); 

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use('/api/articles', articleRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/festivals', festivalRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/test', (req, res) => {
  res.send('Server is working!');
});

app.use((req, res, next) => {
  res.status(404).send('Cannot GET ' + req.originalUrl);
});

app.listen(PORT, () => {
  console.log(`Server started and running at ${PORT}`);
});
