const fs = require('fs');
const path = require('path');
const Movie = require('../models/Movies');

//import movies from movies.json into MONGODB

exports.importMovies = async(req,res)=>{
    try{
        const filePath = path.join(__dirname,'../../movies.json');
        const moviesData = JSON.parse(fs.readFileSync(filePath,"utf-8"));
        const count = await Movie.countDocuments();
        if(count === 0){
            await Movie.insertMany(moviesData);
            res.status(201).json({message:'Movies imported succesfully'});
        } else{
            res.status(200).send('Data already exists,skipping import');
        }
        
    }
    catch(e){
        console.error('Error importing the data',e);
        res.status(500).send('Error in importing the movies');
    }
}

//Function to get all the movies

exports.getAllMovies = async(req,res)=>{
    try{
        const movies = await Movie.find();
        res.status(200).json(movies);

    }
    catch(e){
        console.error(e);
        res.status(500).send('Error retrieving Movies');
    }
}

exports.getMovieById = async(req,res)=>{
    try{
        const movies = await Movie.findById(req.params.id);
        if(!movies){
            return res.status(400).send('Movie is not found');
        }
        res.status(200).json(movies);

    }
    catch(e){
        console.error(e);
        res.status(500).send('Error retrieving Movies');
    }
}

exports.createMovie = async(req,res)=>{
    try{
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error creating Movies');
    }
}

exports.updateMovie = async(req,res)=>{
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedMovie){
            return res.status(400).send('Movie is not updated');
        }
        res.status(201).json(updatedMovie);
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error updating the Movies');
    }
}

exports.deleteMovie = async(req,res)=>{
    try{
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if(!deletedMovie){
            return res.status(400).send('Movie is not found');
        }
        res.status(201).json(deletedMovie);
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error deleting the Movies');
    }
}
