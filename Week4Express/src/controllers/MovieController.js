const fs = require('fs');
const path = require('path');
const Movie = require('../models/Movies');

//import movies from movies.json into MONGODB

exports.importMovies = async(req,res)=>{
    try{
        const filePath = path.join(__dirname,'../../movies.json');
        const moviesData = JSON.parse(fs.readFileSync(filePath,"utf-8"));
        await Movie.insertMany(moviesData);
        res.status(201).json({message:'Movies imported succesfully'});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

//Function to get all the movies

exports.getAllMovies = async(req,res)=>{
    try{
        const movies = await Movie.find();
        res.status(200).json(movies);

    }
    catch(error){
        res.status(500).json('Error retrieving Movies');
    }
}