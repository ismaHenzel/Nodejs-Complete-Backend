import mongoose from 'mongoose';

const User = new mongoose.Schema({
    email: 
    {
        type: String,
        required: true
    },
    name: {
        type: String,
        required:false
    },
    password: 
    {
        type: String,
        required: true
    },
    authenticated:{
        default: false,
        type: Boolean
    }
})

export default mongoose.model('User', User);