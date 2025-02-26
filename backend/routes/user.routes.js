const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const {createUser, getUser, getUsers,updateUser, deleteUser, loginUser,forgotPassword, getUsersByFilter} = require('../controllers/user.controller.js');
const authenticate = require('../middleware/authenticate.js');
const validateUser = require('../middleware/validation.js');
const authorizeRole = require('../middleware/authorization.js');
const sendResetEmail = require('../middleware/nodemailer.js')


router.post('/login/dashboard', authenticate, (req, res) => {
    res.status(200).json({  message:`Welcome to your dashboard, ${req.user.username}` });})

router.post('/', validateUser, createUser);
router.post('/login', loginUser);
router.post('/forgotPassword', forgotPassword );
router.get('/',authenticate, authorizeRole('admin'), getUsers);
router.get('/:id',authenticate, authorizeRole('admin'), getUser);
router.get('/:id',authenticate, authorizeRole('admin'), getUsersByFilter);
router.put('/:id',authenticate, authorizeRole('admin'), updateUser);
router.delete('/:id',authenticate, authorizeRole('admin'), deleteUser);

module.exports = router;