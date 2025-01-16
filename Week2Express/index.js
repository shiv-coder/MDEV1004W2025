const express = require('express');
//create an instance of express app
const app = express();

//Define a route for root url
app.get('/',(req,res)=>{
    res.send("Welcome to the first Express app");//Response to the browser
})

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})