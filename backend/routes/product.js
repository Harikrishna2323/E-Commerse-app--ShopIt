const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const authMiddleware = require("../middlewares/auth");

router.route("/products").get(productController.getProduct);

router.route("/product/:id").get(productController.getSingleproduct);

router
  .route("/admin/product/new")
  .post(
    authMiddleware.isAuthenticatedUser,
    authMiddleware.authorizeRoles("admin"),
    productController.newProduct
  );

router.route("/admin/products").get(productController.getAdminProducts);

router
  .route("/admin/product/:id")
  .patch(
    authMiddleware.isAuthenticatedUser,
    authMiddleware.authorizeRoles("admin"),
    productController.updateProduct
  )
  .delete(
    authMiddleware.isAuthenticatedUser,
    authMiddleware.authorizeRoles("admin"),
    productController.deleteProduct
  );

router
  .route("/review")
  .patch(
    authMiddleware.isAuthenticatedUser,
    productController.createProductReview
  );

router
  .route("/reviews")
  .get(authMiddleware.isAuthenticatedUser, productController.getProductReviews)
  .delete(authMiddleware.isAuthenticatedUser, productController.deleteReview);

module.exports = router;
