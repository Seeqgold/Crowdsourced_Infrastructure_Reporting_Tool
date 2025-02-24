const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const User = require('./models/user.model.js');
const userRoute = require('./routes/user.routes.js');
const reportRouter = require('./routes/report.js');


 const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user', userRoute);
app.use('/api', reportRouter);


 app.get('/', (req,res)=>{
    res.send("getting started");
 });

 app.listen(3000, ()=>{
    console.log('port is running on port 3000');
 });

 mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('DB connected');
}).catch((err)=>{
  console.log('unable to connect to the database');
});

