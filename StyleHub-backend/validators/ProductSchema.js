const { z } = require("zod");

const baseProductSchema = z.object({
  name: z.string().min(2, "Name is required and must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  gender: z.enum(["MEN", "WOMEN", "BOY", "GIRL"]),
  price: z.number().positive("Price must be greater than 0"),
  imgUrl: z.array(
    z
      .string()
      .url("Each image must be a valid URL")
      .refine((val) => val.startsWith("https://"), {
        message: "Each image URL must start with https://",
      })
  ),
  categoryId: z
    .number()
    .int()
    .positive("Category ID must be a positive integer"),
  fit: z.enum(["SLIM", "REGULAR", "OVERSIZE", "RELAXED"]),
  variants: z
    .array(
      z.object({
        color: z.string().min(1),
        size: z.string().min(1),
        quantity: z.number().int().min(1),
      })
    )
    .nonempty("At least one variant is required"),
  isOnSale: z.boolean().optional(),
  discountPercent: z.number().int().min(1).max(100).optional(),
});

// Create schema (no partial)
const createProductSchema = baseProductSchema.refine(
  (data) => {
    if (data.isOnSale === true) {
      return typeof data.discountPercent === "number";
    }
    return true;
  },
  {
    message: "discountPercent is required when isOnSale is true",
    path: ["discountPercent"],
  }
);

// Update schema (partial before refine)
const updateProductSchema = baseProductSchema.partial().refine(
  (data) => {
    if (data.isOnSale === true) {
      return typeof data.discountPercent === "number";
    }
    return true;
  },
  {
    message: "discountPercent is required when isOnSale is true",
    path: ["discountPercent"],
  }
);

module.exports = { createProductSchema, updateProductSchema };
