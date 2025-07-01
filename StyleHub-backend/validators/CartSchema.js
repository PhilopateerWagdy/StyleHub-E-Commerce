const { z } = require("zod");
const { product } = require("../models/DB");

// Validation for creating a cart
const baseCartItemSchema = z.object({
  productId: z.number().int().positive("Product ID must be a positive integer"),
  quantity: z.number().int().positive().min(0, "Quantity must be 0 or more."),
  size: z.string().min(1),
  color: z.string().min(1),
});

const addCartItemSchema = baseCartItemSchema;
const updateCartItemSchema = baseCartItemSchema.partial();

module.exports = { addCartItemSchema, updateCartItemSchema };
