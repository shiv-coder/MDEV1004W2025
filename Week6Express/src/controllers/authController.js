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

exports.loginUser = async(req,res)=>{
    const{email,password}=req.body;

    try{
            //Validate
            if(!email || !password){
                return res.status(401).json({message:'All fields are required'});
            }

           
            //Check for existing user

            const user = await User.findOne({email});
            if(!user){
                return res.status(401).json({message:'Imvalid email or password'});
            }
            //Compare password with hashed password
            const isPasswordValid = await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                return res.status(401).json({message:'Password does not match'});
            }
            //Succseful login
            res.status(200).json({message:'Login succesful',userId:user._id});       
          
    }

    catch(error){
        console.error('Error details: ',error);
        res.status(500).json({message:'Error loggin in user'});
    }
}

/*studentname:
student id:
*/

//logout function