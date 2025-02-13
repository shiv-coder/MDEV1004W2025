const User = require('../models/user');

exports.registerUser = async(req,res)=>{
    const{username,email,password} = req.body;

    try{
        //validate
        if(!username || !email || !password){
            return res.status(400).json({message:'All fields are required'});
        }

        //check if email is valid
        if(typeof email !=='string' || email.trim() === ''){
            return res.status(400).json({message:'Invalid email address'});
        }
        //check for existing user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Email is already in use'});
        }

        const newUser = new User({
            username, email,password
        });

        await newUser.save();
        return res.status(201).json({message:'User registerd succesfully'});

    }
    catch(error){
        console.error('Error details: ', error);
        return res.status(500).json({message:'Error registering user'});
    }
}