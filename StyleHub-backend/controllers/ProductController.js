const prisma = require("../models/DB");

// =============================
// GET ALL PRODUCTS
// =============================
exports.getAllProducts = async (req, res) => {
  try {
    const { categoryId, gender, fit, minPrice, maxPrice, isOnSale, q } =
      req.query;

    const filters = {
      isDeleted: false,
    };

    if (categoryId) filters.categoryId = parseInt(categoryId);
    if (gender) filters.gender = gender;
    if (fit) filters.fit = fit;
    if (isOnSale === "true") filters.isOnSale = true;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.gte = parseFloat(minPrice);
      if (maxPrice) filters.price.lte = parseFloat(maxPrice);
    }

    let whereClause = filters;
    if (q) {
      whereClause = {
        AND: [
          filters,
          {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          },
        ],
      };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        variants: true,
      },
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// =============================
// CREATE PRODUCT
// =============================
exports.createProduct = async (req, res) => {
  try {
    const { variants, ...data } = req.body;
    if (data.isOnSale && data.discountPercent) {
      data.discountPrice =
        Number(data.price) - Number(data.price) * (data.discountPercent / 100);
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        variants: {
          create: variants,
        },
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// =============================
// UPDATE PRODUCT
// =============================
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const existing = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existing) return res.status(404).json({ error: "Product not found" });

    // Ignore any variants input
    delete updateData.variants;

    if (updateData.isOnSale && updateData.discountPercent) {
      updateData.discountPrice =
        Number(existing.price) -
        Number(existing.price) * (updateData.discountPercent / 100);
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        variants: true, // optional: include updated variants to the response
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// =============================
// DELETE PRODUCT (soft delete)
// =============================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existing) return res.status(404).json({ error: "Product not found" });

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    });

    res
      .status(200)
      .json({ message: "Product soft-deleted successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// =============================
// ADD PRODUCT VARIANTS
// =============================
exports.addVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { color, size, quantity } = req.body;

    const variant = await prisma.productVariant.create({
      data: {
        productId: parseInt(id),
        color,
        size,
        quantity,
      },
    });

    res.status(201).json(variant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
