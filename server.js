const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app =  express();

const port = process.env.PORT || 5000;


const reportRouter = require('./routes/report.js');



mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected')).catch(err => console.log(err));






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', reportRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${port}`);
 });