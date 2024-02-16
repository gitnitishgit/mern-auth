import { error } from "console";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (request, response, next) => {
    const { username, email, password } = request.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        response.status(200).json({message: "User created successfully."});
    }
    catch(err){
        next(error);
    }
    
};

export const signin = async (request, response, next) => {
    const { email, password } = request.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, "Wrong credentials"));
        const {password: hashedPassword, ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        response.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
    }
    catch(err){
        next(error);
    }
    
};