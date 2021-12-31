const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/products");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log(products);
    console.log("All Products are added successfully!");
    process.exit();
  } catch (err) {
    console.log("error:", err.message);
    process.exit();
  }
};

seedProducts();
