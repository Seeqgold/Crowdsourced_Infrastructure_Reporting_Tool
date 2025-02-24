const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const User = require('./models/user.model.js');
const userRoute = require('./routes/user.routes.js');
const reportRouter = require('./routes/report.js');


 const app = express();
app.use(express.json());
app.use(cors({
   origin: "*", 
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"]
 }));
app.use('/api/user', userRoute);
app.use('/api', reportRouter);


 app.get('/', (req,res)=>{
    res.send("CORS is working");
 });

 app.listen(process.env.PORT, ()=>{
    console.log(`port is running on port ${process.env.PORT}`);
 });

 mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('DB connected');
}).catch((err)=>{
  console.log('unable to connect to the database');
});

