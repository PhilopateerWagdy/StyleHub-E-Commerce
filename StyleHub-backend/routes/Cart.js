const express = require("express");
const router = express.Router();

const validate = require("../midllewares/validate");
const {
  addCartItemSchema,
  updateCartItemSchema,
} = require("../validators/CartSchema");
const CartController = require("../controllers/CartController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Cart Contoller.");
  nxt();
});

// Cart
router.get("/:userId", CartController.getUserCart);
// Cart Item
router.post(
  "/item/:userId",
  validate(addCartItemSchema),
  CartController.addToCart
);
router.put(
  "/item/:cartItemId",
  validate(updateCartItemSchema),
  CartController.updateCartItem
);
router.delete("/item/:cartItemId", CartController.removeCartItem);

module.exports = router;
