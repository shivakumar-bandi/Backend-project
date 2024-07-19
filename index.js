const express = require('express')
const connectDB=require( './config/db');
const dotenv = require('dotenv');
const userRoutes =require('./routes/userRoutes')
const mongoose =require('mongoose')
const bodyParser =require('body-parser')
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
const eventRoutes = require('./routes/eventRoutes');
const festivalRoutes = require('./routes/festivalRoutes');
delete require.cache[require.resolve('./models/Festival')];


const app=express();

dotenv.config()

 connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`server started and running at ${PORT}`);
})
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes)
app.use('/uploads', express.static('uploads'));
app.use('/api', articleRoutes);
app.use('/api', eventRoutes);
app.use('/api/festivals', festivalRoutes);


app.use('/home', (req, res)=>{
    res.send('<h1>Hello Radha-Krishna')
})