const mongoose = require('mongoose');

//const { MONGO_URI } = process.env;
MONGO_URI='mongodb+srv://user2:user2@cluster0.lsiqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

exports.connect = async() =>{
    try{
        const connection = mongoose.createConnection(MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        connection.once('open',()=>{
            console.log('Succesfully connected to DB');
        });
        
}
    catch(error){
        console.log("connection failed");
        console.error(error);
       
    }
};