const mongoose = require('mongoose');
const repositorySchema = mongoose.Schema({
   
    name:{type:String,required:true},
    full_name:{type:String,required:true},
    description:{type:String},
    language:{type:String},
    url:{type:String},
    created_at:{type:Date},
    updated_at:{type:Date}
});

const Repository = mongoose.model("Repository",repositorySchema);
module.exports = Repository;
