const http = require('http');
const routes = require('./routes/routes');
const server = http.createServer(routes);
const express = require('express');
const app = express();
const verifyToken = require('./middleware/auth');
require('dotenv').config();


//Protected route-Lab 5

const { API_PORT} = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

