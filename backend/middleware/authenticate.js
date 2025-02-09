// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const authenticate = async (req, res, next) => {
//   try {
    
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Access denied. Invalid token.' });
//   }
// };

// module.exports = authenticate;