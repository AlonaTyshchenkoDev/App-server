import { Request, Response } from 'express';
import User from './User';
import Role from './Role';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('./config');

const generateAccessToken = (id: any, role: any) => {
    const payload = {id, role}
    return jwt.sign(payload, secret, {expiresIn: "2h"});
}

class RegisterController{
    async register(req: Request,res: Response){
        try{
            const {login, email, password} = req.body;
            const emailCandidate = await User.findOne({email});
            const loginCandidate = await User.findOne({login});
            if(emailCandidate){
                return res.status(400).json({message:`Email ${email} is also registered`});
            } else if(loginCandidate){
                return res.status(400).json({message:`Login ${login} is also registered`});
            }
            const hashedPass = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "User"});
            const user =  new User({login, email, password: hashedPass, role: [userRole?.value]});
            await user.save();
            return res.json({message:'Success registration', user});
        } catch (e) {
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req: Request,res: Response){
        try{
            const {login, email, password} = req.body;
            const user = await User.findOne({login, email});
            if(!user){
                res.status(400).json({message: `Invalid email or login`});
            }
            const validPassword = bcrypt.compareSync(password, user?.password);
            if(!validPassword){
                res.status(400).json({message: `Invalid password`});
            }
            const token = generateAccessToken(user?._id, user?.role);
            return res.json({token, user})
        } catch (e) {
            res.status(400).json({message: 'Login error'});
        }
    }

    async delete(req: Request,res: Response){
        try{
            const {id} = req.params;
            if(!id){
                res.status(400).json({message:'No such id'});
            }
            const user = await User.findById(id);
            return res.json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req: Request,res: Response){
        try{
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new RegisterController();