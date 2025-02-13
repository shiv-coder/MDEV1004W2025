const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session= require('express-session');
const movieRoutes = require('./src/routes/movieRoutes');
const authRoutes = require('./src/routes/authRoutes');
const crypto = require('crypto');
require('dotenv').config();
require('./src/config/passportConfig');

//Intialize the app
const app = express();

//Middleware
app.use(bodyParser.json());


//SEt the session and passport
const secretKey = crypto.randomBytes(64).toString('hex');
console.log(`Generated secret key:${secretKey}`); 
app.use(session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoutes);
app.use('/movies',movieRoutes);

// app.get('/',(req,res)=>{
//     res.send("Welcome to the 4th week of express");
// })
//MongoB connection
const MONGO_URI = "mongodb+srv://user3:user3@cluster0.lsiqq.mongodb.net/";
mongoose.connect(MONGO_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.error("MongoDb connection error",err));

//listen the server

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}` );
})