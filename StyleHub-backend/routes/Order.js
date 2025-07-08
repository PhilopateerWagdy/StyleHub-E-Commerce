const express = require("express");
const router = express.Router();

const validate = require("../midllewares/validate");
const { createOrderSchema } = require("../validators/OrderSchema");
const OrderController = require("../controllers/OrderController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Order Contoller.");
  nxt();
});

router.get("/:id", OrderController.getOrder);
router.post(
  "/:userId",
  validate(createOrderSchema),
  OrderController.createOrder
);
router.put("/:id", OrderController.cancelOrder);

module.exports = router;
