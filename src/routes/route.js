const express = require("express")
const loginSchema = require("../models/ajvLoginModel")
const registerSchema = require("../models/ajvRegisterModel")
const validateSchema = require("../middleware/ajvValidation")
const {registerUser } = require("../controllers/userController")

const router = express.Router()

router.post("/register", validateSchema(registerSchema), registerUser)

module.exports = router