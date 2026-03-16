import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, 
    },
    role: {
        type: String,   
        enum: ['admin', 'student','faculty'],
        default: 'student',
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date, 

    }
})

const User = mongoose.model('User', userSchema);

export default User;