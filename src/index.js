//EXPRESS
const express = require('express');
const app = express();

//PARSING
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//ENVIRONMENT VARIABLES
const dotenv = require('dotenv');
dotenv.config({path : '../config.env'});

//MONGOOSE CONNECTION  
const connectToMongo = require('../db/connection');
connectToMongo();

//CORS
const cors = require('cors');
app.use(cors());
 
//ROUTES
app.use('/api/v1/auth',require('../routes/userRoutes'));
app.use('/api/v1/products',require('../routes/productRoutes'));
app.use('/api/v1/reviews',require('../routes/reviewRoutes'));
const PORT = process.env.PORT;
app.listen(PORT,()=>
{
    console.log(`I am Listening at http://localhost:${PORT}`);
})
