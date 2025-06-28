const prisma = require("../models/DB");

// =============================
// UPDATE PRODUCT VARIANT
// =============================
exports.updateVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { color, size, quantity } = req.body;

    const updated = await prisma.productVariant.update({
      where: { id: parseInt(id) },
      data: { color, size, quantity },
    });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// =============================
// DELETE PRODUCT VARIANT
// =============================
exports.deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await prisma.productVariant.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Variant deleted successfully", deleted });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
