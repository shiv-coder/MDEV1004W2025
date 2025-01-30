const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRoutes = require('./src/routes/movieRoutes');

//Intialize the app
const app = express();

//Middleware
app.use(bodyParser.json());
app.use('/movies',movieRoutes);


// app.get('/',(req,res)=>{
//     res.send("Welcome to the 4th week of express");
// })
//MongoB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.error("MongoDb connection error",err));

//listen the server

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}` );
})