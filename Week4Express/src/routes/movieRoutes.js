const express = require('express');
const {importMovies} = require('../controllers/MovieController');

const router = express.Router();

//Import movies from json

router.post('/import',importMovies);

module.exports = router;