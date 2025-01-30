const express = require('express');
const mongoose = require('mongoose');

//Intialize the app
const app = express();


app.get('/',(req,res)=>{
    res.send("Welcome to the 4th week of express");
})

//listen the server

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}` );
})