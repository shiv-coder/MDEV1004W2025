const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//create an instance of express app
const app = express();
//Middleware
app.use(bodyParser.json());
//MongoDB Atlas Coonection

const mongoURI ='mongodb://localhost:27017/Database2';

//SEt up the connection with mongoDB
mongoose.connect(mongoURI)
.then(()=>console.log("Connected to MongoDB Atlas"))
.catch((err)=>console.error("Error connecting to MongoDB Atlas: ",err));

//Define a mongoose schema and model

const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email:{type:String,required: true,unique:true},
    age:{type:Number,default :20},
});

const User = mongoose.model('User',userSchema);

//Routes
//Create a new user
app.post('/users',async(req,res)=>{
    try{
        const newUser = new User(req.body);
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
});

//get all users
app.get('/users',async(req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

//Define a route for root url
app.get('/',(req,res)=>{
    res.send("Welcome to the first Express app");//Response to the browser
})

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})