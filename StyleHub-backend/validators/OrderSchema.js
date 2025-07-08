const { z } = require("zod");

const createOrderSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().max(11).min(11, "Phone is required."),
  addressLine: z.string().min(5, "Address is required."),
  country: z.string().min(2, "Country is required."),
  city: z.string().min(2, "City is required."),
  paymentMethod: z.enum(["CARD", "CASH_ON_DELIVERY", "INSTAPAY", "VODCASH"], {
    required_error: "Payment method is required.",
  }),
  notes: z.string().optional(),
  postalCode: z.string().optional(),
});

module.exports = { createOrderSchema };
