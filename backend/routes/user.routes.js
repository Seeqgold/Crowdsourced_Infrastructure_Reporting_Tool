const express = require('express');
const router = express.Router();
const user = require('../models/user.model.js');
const {createUser, getUser, getUsers,updateUser, deleteUser, loginUser} = require('../controllers/user.controller.js');
// const authenticate = require('../middleware/authenticate.js');

// router.use(authenticate);
// router.get('/protected', authenticate, (req, res) => {
//     res.json({ message: 'Access granted!', user: req.user });
//   });

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
module.exports = router;