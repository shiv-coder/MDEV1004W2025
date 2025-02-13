const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a Movie SChema
const MoviesSchema = new Schema({
    movieID:{type:Number},
    title :{type:String},
    studio :{type:String},
    genres:[{type:String}],
    directors:[
        {type:String}
    ],
    writers:[{type:String}],
    actors:[{type:String}],
    year:{type:Number},
    length:{type:Number},
    shortDescription:{type:String},
    mpaRating:{type:String},
    criticsRating:{type:Number}
});

const Movie = mongoose.model('Movies',MoviesSchema);
module.exports = Movie;