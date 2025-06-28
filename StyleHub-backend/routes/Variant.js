const express = require("express");
const router = express.Router();

const validate = require("../midllewares/validate");
const { updateVariantSchema } = require("../validators/VariantSchema");
const productController = require("../controllers/VariantController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Variant Contoller.");
  nxt();
});

router.put(
  "/:id",
  validate(updateVariantSchema),
  productController.updateVariant
);
router.delete("/:id", productController.deleteVariant);

module.exports = router;
