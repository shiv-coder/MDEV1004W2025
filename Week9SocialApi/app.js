require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const { addRepository,getRepositories, createGitHubRepository} = require("./controllers/repositoryContoller");

const app= express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//connecting to mongodb

mongoose.connect(process.env.MONGO_URI)
.then(() =>console.log("MongoDB connected"))
.catch((err)=>console.error("Mongodb connection error",err));

//Define routes
app.get("/fetch-repositories",getRepositories);
app.post("/add-repository", addRepository);
app.post("/create-repository", createGitHubRepository);

//start the server

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})