const { z } = require("zod");

const baseUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format"),

  passwordHash: z
    .string({
      required_error: "Password hash is required",
      invalid_type_error: "Password hash must be a string",
    })
    .min(8, "Password hash must be at least 8 characters"),
});

const createUserSchema = baseUserSchema;
const updateUserSchema = baseUserSchema.partial();

module.exports = { createUserSchema, updateUserSchema };
