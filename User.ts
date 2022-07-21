import mongoose from 'mongoose';
import Role from './Role';

const User = new mongoose.Schema({
    login: {type: String, unique:true, required:true},
    email: {type: String, unique:true, required:true},
    password: {type: String, required:true},
    role: [{type: String, ref: Role}]
});

export default mongoose.model('User', User);