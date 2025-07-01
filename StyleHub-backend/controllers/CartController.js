const prisma = require("../models/DB");

// -------------------------------
// Get User Cart
// -------------------------------
exports.getUserCart = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imgUrl: true,
                variants: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user." });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// -------------------------------
// Add Item to Cart
// -------------------------------
exports.addToCart = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { productId, quantity, size, color } = req.body;

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    // if product with (size, color) pair exist in cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        color,
        size,
      },
    });

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        variants: true,
      },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });

    // If user sends color or size or both:
    const variant = product.variants.find(
      (v) => v.color === (color ?? color) && v.size === (size ?? size)
    );
    if (!variant) {
      return res
        .status(400)
        .json({ error: "Variant with specified color and size not found" });
    }

    if (
      variant.quantity <
      quantity + (existingCartItem ? existingCartItem.quantity : 0)
    ) {
      return res.status(400).json({
        error: `Only ${variant.quantity} available in store.`,
      });
    }

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: {
            increment: quantity ?? 1,
          },
        },
      });
      return res.json(updatedCartItem);
    }
    // NEW ITEM
    else {
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: quantity ?? 1,
          size,
          color,
        },
      });
      return res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// -------------------------------
// Update Cart Item Quantity
// -------------------------------
exports.updateCartItem = async (req, res) => {
  try {
    const cartItemId = parseInt(req.params.cartItemId);
    const { color, size, quantity } = req.body;

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        product: {
          include: {
            variants: true,
          },
        },
      },
    });
    if (!cartItem) return res.status(404).json({ error: "CartItem not found" });

    // If only quantity is sent, update directly without checks
    if (!color && !size) {
      const updated = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
      return res.json(updated);
    }

    // If user sends color or size or both:
    const variant = cartItem.product.variants.find(
      (v) =>
        v.color === (color ?? cartItem.color) &&
        v.size === (size ?? cartItem.size)
    );
    if (!variant) {
      return res
        .status(400)
        .json({ error: "Variant with specified color and size not found" });
    }

    if (variant.quantity < quantity) {
      return res.status(400).json({
        error: `Only ${variant.quantity} available in store.`,
      });
    }

    // Check if another cart item with the same productId, color, size already exists
    const existingSameVariant = await prisma.cartItem.findFirst({
      where: {
        cartId: cartItem.cartId,
        productId: cartItem.productId,
        color: color ?? cartItem.color,
        size: size ?? cartItem.size,
        NOT: { id: cartItemId },
      },
    });

    if (existingSameVariant) {
      // Add the quantities
      const updatedExisting = await prisma.cartItem.update({
        where: { id: existingSameVariant.id },
        data: { quantity: existingSameVariant.quantity + cartItem.quantity },
      });

      // Delete the old cart item
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });

      return res.json({
        message: "Quantity merged with existing cart item.",
        updatedCartItem: updatedExisting,
      });
    }
    // No duplicate found; update current item with new color, size, quantity
    else {
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: {
          color: color ?? cartItem.color,
          size: size ?? cartItem.size,
          quantity,
        },
      });

      return res.json(updatedCartItem);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// -------------------------------
// Remove Item from Cart
// -------------------------------
exports.removeCartItem = async (req, res) => {
  try {
    const cartItemId = parseInt(req.params.cartItemId);

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    res.json({ message: "Cart item removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
