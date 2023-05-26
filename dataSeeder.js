const mongoose = require('mongoose');
require('dotenv').config();
const CatSupply = require('./models/CatSupply');
const initialData = require('./initialData');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("Mongoose is connected");

  try {
    for (let product of initialData.allProducts) {
      let price = parseFloat(product.price.replace('$', '')); 
    
      const newCatSupply = new CatSupply({
        category: product.category,
        name: product.name,
        description: product.description,
        price: price, 
        inventory: product.inventory,
        image: product.image,
      });
    
      await newCatSupply.save();
    }
    
    console.log('All products have been saved');
  } catch(err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); 
  }
});
