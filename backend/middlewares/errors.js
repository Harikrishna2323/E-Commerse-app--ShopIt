const Errorhandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    //Wrong Mongoose object_id error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Errorhandler(message, 400);
    }

    //Handling Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new Errorhandler(message, 400);
    }

    //handling the mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new Errorhandler(message, 400);
    }

    //handling wrong jwt error
    if (err.name === "JsonWebTokenError") {
      const message = "Json Web Token is invalid. Try again!!";
      error = new Errorhandler(message, 400);
    }

    //handling expired jwt error
    if (err.name === "TokenExpiredError") {
      const message = "Json Web Token is expired!!";
      error = new Errorhandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error!",
    });
  }
};
