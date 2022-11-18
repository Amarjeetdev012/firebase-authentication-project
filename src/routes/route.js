const express = require("express")
const loginSchema = require("../models/ajvLoginModel")
const registerSchema = require("../models/ajvRegisterModel")
const validateSchema = require("../middleware/ajvValidation")
const {registerUser, loginUser, shortUrl, getUrl } = require("../controllers/userController")

const router = express.Router()

router.post("/register", validateSchema(registerSchema), registerUser)
router.post("/login", validateSchema(loginSchema), loginUser)
router.post("/generateUrl", shortUrl)
router.get("/getUrl", getUrl)

module.exports = router