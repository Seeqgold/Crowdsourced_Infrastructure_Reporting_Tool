const express = require('express');
const router = express.Router();
const user = require('../models/user.model.js');
const {createUser, getUser, getUsers,updateUser, deleteUser, loginUser} = require('../controllers/user.controller.js');
const authenticate = require('../middleware/authenticate.js');
const validateUser = require('../middleware/validation.js');

router.get('/protected-route', authenticate, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route', user: req.user });
});
router.post('/login/dashboard', authenticate, (req, res) => {
    res.status(200).json({  message:`Welcome to your dashboard, ${req.user.username}` });})

router.get('/', getUsers);
router.post('/', validateUser, createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

module.exports = router;