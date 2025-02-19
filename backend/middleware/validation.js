const joi = require ('joi');

const validateUser = (req, res, next) =>{
    const Schema = joi.object ({
        username : joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(100).required(),
        role: joi.string().valid('user', 'admin', 'authority').default('user')

    });
    const {error} = Schema.validate(req.body);
    if (error) {
      return  res.status(400).json({message: error.details[0].message});
    }
    else{
        next()
    }
};
module.exports = validateUser;