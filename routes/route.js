const express = require("express");
const express = require("express");
const path = require("path");
const loginSchema = require("../models/ajvLoginModel");
const registerSchema = require("../models/ajvRegisterModel");
const validateSchema = require("../middleware/ajvValidation");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});
router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);

module.exports = router;
