const prisma = require("../models/DB");

// =====================================
// GET ORDER
// =====================================
exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// =====================================
// CREATE ORDER
// =====================================
exports.createOrder = async (req, res) => {
  const { userId } = req.params;

  const {
    fullName,
    phone,
    addressLine,
    country,
    city,
    notes,
    postalCode,
    paymentMethod,
  } = req.body;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        items: {
          include: {
            product: { include: { variants: true } },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }

    let totalPrice = 0;
    for (const item of cart.items) {
      totalPrice +=
        (item.product.isOnSale
          ? Number(item.product.discountPrice)
          : Number(item.product.price)) * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId), // ✅ FIXED HERE
        status: "PENDING",
        totalPrice,
        fullName,
        phone,
        addressLine,
        country,
        city,
        notes,
        postalCode,
        orderItems: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.product.isOnSale
              ? item.product.discountPrice
              : item.product.price,
          })),
        },
        payment: {
          create: {
            method: paymentMethod,
            amount: totalPrice,
          },
        },
      },
      include: {
        orderItems: true,
        payment: true,
      },
    });

    // Update product variant stock
    for (const item of cart.items) {
      const variant = await prisma.productVariant.findFirst({
        where: {
          productId: item.productId,
          color: item.color,
          size: item.size,
        },
      });

      if (!variant) continue;

      if (variant.quantity < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${variant.color} ${variant.size}. Only ${variant.quantity} left.`,
        });
      }

      await prisma.productVariant.update({
        where: { id: variant.id },
        data: { quantity: { decrement: item.quantity } },
      });
    }

    // Clear user cart items
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// =====================================
// CANCEL ORDER
// =====================================
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        orderItems: true,
      },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status === "SHIPPED") {
      return res.status(400).json({ error: "Cannot cancel a shipped order." });
    }

    for (const item of order.orderItems) {
      const variant = await prisma.productVariant.findFirst({
        where: {
          productId: item.productId,
          color: item.color,
          size: item.size,
        },
      });

      if (variant) {
        await prisma.productVariant.update({
          where: { id: variant.id },
          data: { quantity: { increment: item.quantity } },
        });
      }
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status: "CANCELLED" },
    });

    res.json({ message: "Order cancelled.", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
