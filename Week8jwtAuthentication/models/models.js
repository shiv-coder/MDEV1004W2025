const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    firstName :{type:String,default:null},
    lastName :{type:String,default:null},
    email:{type:String,unique:true},
    password:{type:String},
    token:{type:String}
});

module.exports = mongoose.model("user",Schema);