const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

router.route("/register").post(authController.registerUser);

router.route("/login").post(authController.loginUser);

router.route("/logout").get(authController.logoutUser);

router.route("/password/forgot").post(authController.forgotPassword);

router.route("/password/reset/:token").patch(authController.resetPassword);

router
  .route("/me")
  .get(authMiddleware.isAuthenticatedUser, authController.getUserProfile);
router
  .route("/password/update")
  .patch(authMiddleware.isAuthenticatedUser, authController.updatePassword);

router
  .route("/me/update")
  .patch(authMiddleware.isAuthenticatedUser, authController.updateProfile);

//admin
router
  .route("/admin/users")
  .get(
    authMiddleware.isAuthenticatedUser,
    authMiddleware.authorizeRoles("admin"),
    authController.getAllUsers
  );

router
  .route("/admin/user/:id")
  .get(
    authMiddleware.isAuthenticatedUser,
    authMiddleware.authorizeRoles("admin"),
    authController.getUserDetails
  )
  .patch(
    authMiddleware.isAuthenticatedUser,
    authMiddleware.authorizeRoles("admin"),
    authController.updateUser
  )
  .delete(
    authMiddleware.isAuthenticatedUser,
    authMiddleware.authorizeRoles("admin"),
    authController.deleteUser
  );
module.exports = router;
