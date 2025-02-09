const user = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const createUser = async (req,res)=>{
    try {
        const {username, password, email} = req.body;
    if (!username || !email || !password) {
      return  res.status(401).json({message: 'All fields are required'});
    };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


        const User = await user.create({
          username,
          email,
          password: hashedPassword,
        });
        res.status(200).json(User);
      
   

    } catch (error) {
        res.status(500).json({message: "internal error"})
    };
 };


 const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username' });
    }
   
            // Compare entered password with the hashed password
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            
    // Ensure JWT secret is available
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server error: Missing JWT secret' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '50d' }
    );

    res.status(200).json({ token });

  } catch (error) {
  res.status(500).json({ message: 'Internal Server Error', error: error.message });
}

};



    const getUser =   async(req,res)=>{
       try {
           const {id} = req.params
           const User = await user.findById(id);
           res.status(200).json(User);
       } catch (error) {
         res.status(500).json({ message: 'Internal Server Error' });
           
       }
     };
     
 const getUsers = async(req,res)=>{
     try {
         const User = await user.find({});
         res.status(200).json(User);
     } catch (error) {
       res.status(500).json({ message: 'Internal Server Error' });
         
     }
   };
 
   const updateUser = async(req,res)=>{
       try {
           const {id} = req.params
           const User = await user.findByIdAndUpdate(id, req.body);
           if (!User) {
              return res.status(404).json({message:'user not found'});
           };
           const updatedUser = await user.findById(id);
           res.status(200).json(updatedUser);
       } catch (error) {
         res.status(500).json({ message: 'Internal Server Error' });
           
       }
     };

     const deleteUser = async(req,res)=>{
         try {
             const {id} = req.params
             const User = await user.findByIdAndDelete(id);
             if (!User) {
                return res.status(404).json({message:'user not found'});
             };
             res.status(200).json({message: 'user deleted sucessfully'});
         } catch (error) {
           res.status(500).json({ message: 'Internal Server Error' });
             
         }
       };

       module.exports = {
        getUsers, createUser, getUser, loginUser, updateUser,deleteUser
       };