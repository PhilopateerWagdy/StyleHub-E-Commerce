const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const productRoutes = require("./routes/Product");
const variantRoutes = require("./routes/Variant");
const userRoutes = require("./routes/User");
const cartRoutes = require("./routes/Cart");

// ------------------------------------------------------------

const PORT = 3001;

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// ------------------------------------------------------------

app.get("/", (req, res) => {
  try {
    res.status(200).json("Hello from StyleHub Server");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/products", productRoutes);
app.use("/api/variants", variantRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

// ------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
