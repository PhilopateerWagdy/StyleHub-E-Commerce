const { z } = require("zod");

const baseVariantSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

const createVariantSchema = baseVariantSchema;
const updateVariantSchema = baseVariantSchema.partial();

module.exports = { createVariantSchema, updateVariantSchema };
