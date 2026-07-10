import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,

    },

    email:{
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        lowercase: true,
        minLength: 5,
        maxLength: 255,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address']
    },

    password:{
        type: String,
        required: [true, 'User password is required'],
        minLength: 6,
    }

}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;