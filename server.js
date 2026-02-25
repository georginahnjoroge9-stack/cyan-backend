const express =require('express');
const mongoose = require('mongoose');
const cors =require('cors');
const bodyParser =require ('body-parser');
const dotenv =require('dotenv');

dotenv.config();

const app = express();

const hostname = process.env.HOSTNAME || localhost;
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('This is the homepage of the cyan backend');
})

app.listen(port, () => {
    console.log(`Cyan Server is running at http://${hostname}:${port}/`);
    console.log("Cyan Api armed and ready to serve requests");
})