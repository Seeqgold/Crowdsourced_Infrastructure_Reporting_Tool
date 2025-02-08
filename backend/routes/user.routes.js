const express = require('express');
const router = express.Router();
const user = require('../models/user.model.js');
const {createUser, getUser, getUsers,updateUser, deleteUser, loginUser} = require('../controllers/user.controller.js');
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
module.exports = router;