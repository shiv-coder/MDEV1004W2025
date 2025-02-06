const express = require('express');
const {importMovies,getAllMovies,getMovieById,updateMovie,deleteMovie,createMovie} = require('../controllers/MovieController');

const router = express.Router();

//Import movies from json

router.post('/import',importMovies);

//Route to get all movies
router.get('/',getAllMovies);

//Route to get a single movie byID
router.get('/:id',getMovieById);

//Route to update a movie
router.put('/update/:id',updateMovie);


//Route to delete a movie
router.delete('/delete/:id',deleteMovie);


//Route to create a movie
router.post('/create',createMovie);

module.exports = router;