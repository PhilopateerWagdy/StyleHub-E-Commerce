const express = require("express");
const router = express.Router();

const validate = require("../midllewares/validate");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/ProductSchema");
const { createVariantSchema } = require("../validators/VariantSchema");
const productController = require("../controllers/ProductController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Product Contoller.");
  nxt();
});

router.get("/", productController.getAllProducts);
router.post(
  "/",
  validate(createProductSchema),
  productController.createProduct
);
router.put(
  "/:id",
  validate(updateProductSchema),
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);

router.post(
  "/:id/variants",
  validate(createVariantSchema),
  productController.addVariant
);

module.exports = router;
