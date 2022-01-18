const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

//mongodb connection

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("Mongodb connection successfull");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);



app.listen(port,() => {
    console.log(`server is running on port : ${port}`);
});
