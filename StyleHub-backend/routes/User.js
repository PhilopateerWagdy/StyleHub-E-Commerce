const express = require("express");
const router = express.Router();

const validate = require("../midllewares/validate");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/UserSchema");
const userController = require("../controllers/UserController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in User Contoller.");
  nxt();
});

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", validate(createUserSchema), userController.createUser);
router.put("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
