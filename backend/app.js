process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const express = require("express");
const path = require("path");

// const dotenv = require("dotenv");
// dotenv.config({ path: "backend/config/config.env" });

require("dotenv").config({ path: "backend/config/config.env" });

const app = express();

const errorMiddleware = require("./middlewares/errors");

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());
app.use(fileUpload());

//Import all routes
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");

app.use("/api/v1", productRouter);

app.use("/api/v1", authRouter);

app.use("/api/v1", orderRouter);

app.use("/api/v1", paymentRouter);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
