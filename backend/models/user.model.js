const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true

    },
    email: {
        type: String,
        required: true,
        unique:true

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required:true,
        enum:['user', 'authority', 'admin'],
        default: 'user',
    }
},{timestamps: true});
user = mongoose.model('user', userSchema);
module.exports = user;