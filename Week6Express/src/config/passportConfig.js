const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

passport.use(
    new LocalStrategy(
        {usernameField:'username',passwordField:'password'},
        async(username,password,done)=>{
            try{
                //check if the user exists
                const user = await User.findOne({username});
                if(!user){
                    return done(null,false,{message:'Incorrect username'})
                }

                //check if the password matches
                const isMatch= await bcrypt.compare(password,user.password);
                if(!isMatch){
                    return done(null,false,{message:'Incorrect password'})
                }
                return done(null,user);

            }
            catch(error){
                return done(error);
            }
        }
    )
);

//Serialize and deserialize the code
passport.serializeUser((user,done)=>done(null,user.id));
passport.deserializeUser((id,done)=>{User.findById(id)
    .then(user=>done(null,user))
    .catch(err=>done(err,null));
});