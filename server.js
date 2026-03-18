const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const pokemonSchema = new mongoose.Schema({
  name: String,
  type: String,
  level: Number,
  nature: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

app.post('/pokemon', async (req, res) => {
  const pokemon = new Pokemon(req.body);
  await pokemon.save();
  res.status(201).send(pokemon);
});

app.get('/pokemon', async (req, res) => {
  const pokemons = await Pokemon.find();
  res.send(pokemons);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
