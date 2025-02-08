const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required:true,
        enum:['citizen', 'authority'],
        default: 'citizen',
    }
},{timestamps: true});
user = mongoose.model('user', userSchema);
module.exports = user;