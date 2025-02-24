const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        trim:true
        

    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/


    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required:true,
        enum:['user', 'authority', 'admin']
    },
    isActive:{
        type: Boolean,
        default: true,
        select:false
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
    
},{timestamps: true});
User = mongoose.model('User', userSchema);
module.exports = User;