const routes = require('./routes/routes');
const express = require('express');
const app = express();
const verifyToken = require('./middleware/auth');
require('dotenv').config();

app.use(express.json());


app.use('/api',routes);

const { API_PORT} = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

