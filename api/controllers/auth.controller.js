import { error } from "console";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

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
    
}