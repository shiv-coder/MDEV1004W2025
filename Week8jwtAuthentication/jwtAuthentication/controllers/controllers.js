const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/models');
const config = process.env;

exports.register = async(req,res)=>{

    try{

            const{firstName,lastName,email,password}= req.body;
            if(!(email && password && firstName && lastName)){
                return res.status(400).send('All fields are required');
            }
            const oldUser = await User.findOne({email});
            if(oldUser){
                return res.status(409).send('User already exists');
            }

            const encryptedPassword = await bcrypt.hash(password,10);
            const user = await User.create({firstName,lastName,email,password:encryptedPassword});
            const token = jwt.sign({user_id:user._id,email},config.TOKEN_KEY,{expiresIn:'2h'});
            user.token = token;
            return res.status(200).json(user);
        }
       
    catch(err){
        console.error(err);

    };

};


exports.login = async(req,res)=>{
    try{
            const { email,password} = req.body;
            if(!(email && password)){
                return res.status(400).send('Email and password are required');
            }
            const user = await User.findOne({email});
            if(user && (await bcrypt.compare(password,user.password))){
                const token = jwt.sign({user_id:user._id,email},config.TOKEN_KEY,{expiresIn:'2h'});
                user.token = token;
                return res.status(200).json(user);
            }
            return res.status(400).send('Invalid credentials');
    }
    catch(err){
        console.error(err);

    }
}

//exports.welcome
