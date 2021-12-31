const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("./catchAsync");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");

//checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new ErrorHandler("Login first to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await Users.findById(decoded.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
