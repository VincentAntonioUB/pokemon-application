//holds mongodb
require('dotenv').config(); //used to connect frontend with backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); //used to connect application to mongodb client via http request and via api links

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000,  () => {console.log('API running on http://localhost:3000')});

const Pokemon = mongoose.model('pokemon', new mongoose.Schema({
    name: String,
    type: String,
    level: Number,
    nature: String
}));
//saving pokemon to database
app.post('api/pokemon', async(req, res,) =>{
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.send(pokemon);
})


