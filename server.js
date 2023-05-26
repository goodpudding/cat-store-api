const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const CatSupply = require('./models/CatSupply'); 
const app = express();
const port = process.env.PORT || 3002;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose is connected");
});
mongoose.connect(process.env.DB_URL);
app.use(cors());
app.use(express.json());

// This endpoint responds with the full list of cat supplies
app.get('/cat-supplies', async (req, res) => {
  const catSupplies = await CatSupply.find({});
  res.json(catSupplies);
});

// This endpoint responds with a specific cat supply item by id
app.get('/cat-supplies/:id', async (req, res) => {
  const id = req.params.id;
  const catSupplyItem = await CatSupply.findById(id);

  if (!catSupplyItem) {
    res.status(404).send('Item not found');
  } else {
    res.json(catSupplyItem);
  }
});

app.listen(port, () => {
  console.log(`Cat Store API is listening at http://localhost:${port}`);
});
