const app = require("./app");
// const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception!");
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//connecting to database

connectDatabase();

//Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () =>
  console.log(
    `Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  )
);

//Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down th server!!!");
  server.close(() => {
    process.exit(1);
  });
});
