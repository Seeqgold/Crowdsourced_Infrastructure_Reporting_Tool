const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const user = require('./models/user.model.js');
const userRoute = require('./routes/user.routes.js');



 const app = express();
app.use(express.json());
app.use('/api/user', userRoute);


 app.get('/', (req,res)=>{
    res.send("getting started");
 });

 app.listen(3000, ()=>{
    console.log('port is running on port 3000');
 });
// create user
//login user


  
//   app.get('/api/user',  async(req,res)=>{
//     try {
//         const User = await user.find({});
//         res.status(200).json(User);
//     } catch (error) {
//       res.status(500).json({ message: 'Internal Server Error' });
        
//     }
//   });

//   app.get('/api/user/:id',  async(req,res)=>{
//     try {
//         const {id} = req.params
//         const User = await user.findById(id);
//         res.status(200).json(User);
//     } catch (error) {
//       res.status(500).json({ message: 'Internal Server Error' });
        
//     }
//   });

//   app.put('/api/user/:id',  async(req,res)=>{
//     try {
//         const {id} = req.params
//         const User = await user.findByIdAndUpdate(id, req.body);
//         if (!User) {
//            return res.status(404).json({message:'user not found'});
//         };
//         const updatedUser = await user.findById(id);
//         res.status(200).json(updatedUser);
//     } catch (error) {
//       res.status(500).json({ message: 'Internal Server Error' });
        
//     }
//   });

//   app.delete('/api/user/:id',  async(req,res)=>{
//     try {
//         const {id} = req.params
//         const User = await user.findByIdAndDelete(id);
//         if (!User) {
//            return res.status(404).json({message:'user not found'});
//         };
//         res.status(200).json({message: 'user deleted sucessfully'});
//     } catch (error) {
//       res.status(500).json({ message: 'Internal Server Error' });
        
//     }
//   });

 mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('DB connected');
}).catch((err)=>{
  console.log('unable to connect to the database');
});

