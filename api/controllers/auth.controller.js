import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const { username, email, password} = req.body;
    const hashedPasseword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password:hashedPasseword });
    try{
        await newUser.save();
        res.status(201).json({message: "User registration successful.."})
    } catch (err) {
        res.status(500).json(err.message)
    }
    
    
    
}