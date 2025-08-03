import User from '../models/user.schema.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res)=>{
    const{username, mobileNo, email, password} =req.body;
    try {
        const usernameExists = await User.findOne({username});
         if(usernameExists) return res.status(400).json({msg: 'Username already registered'});

        const emailExits = await User.findOne({email});
        if(emailExits) return res.status(400).json({msg: 'Email already registered'});
        
        if(usernameExists && emailExits) return res.status(400).json({msg: 'Username and email already registered'});
 
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username,mobileNo, email, password:hashPassword});

        await newUser.save();
        res.status(201).json({msg:'Signup successful'});
        console.log('Signup data: ', req.body);
    } catch (error) {
        res.status(500).json({msg:'server error'})
    }
};

export const login = async (req,res)=>{
    // console.log('Login request body: ', req.body);
    const{username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if(!user) return res.status(400).json({msg:'User does not exits'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg:'Invalid password'});

        res.status(200).json({msg:'Login Successful' , user: user.username})
    } catch (error) {
        res.status(500).json({msg:'server error'});
    }
};