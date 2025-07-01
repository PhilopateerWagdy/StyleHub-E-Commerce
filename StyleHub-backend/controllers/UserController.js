const prisma = require("../models/DB");

// =============================
// GET ALL USERS
// =============================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        orders: true,
        reviews: true,
        cart: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// =============================
// GET USER BY ID
// =============================
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        orders: true,
        reviews: true,
        cart: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// =============================
// CREATE USER
// =============================
exports.createUser = async (req, res) => {
  try {
    const { name, email, passwordHash } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        cart: {
          create: {}, // Automatically create empty cart linked to this user
        },
      },
      include: {
        cart: true,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// =============================
// UPDATE USER
// =============================
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existing = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existing) return res.status(404).json({ error: "User not found" });

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// =============================
// DELETE USER (hard delete)
// =============================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    const existing = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existing) return res.status(404).json({ error: "User not found" });

    await prisma.cart.deleteMany({
      where: { userId },
    });
    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: "User and their cart deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
