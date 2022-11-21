const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    try {
        let data = req.body
        let user = await userModel.findOne({ email: data.email })
        if (user) {
            return res.status(400).send({ status: false, message: `user already registered with ${data.email} use new emailid` })
        }
        let saveData = await userModel.create(data)
        res.status(201).send({ status: true, message: "user register succesfully", data: saveData })
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.message}` })
    }
}

const loginUser = async (req, res) => {
    try {
        let data = req.body
        let { email, password } = data
        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).send({ status: false, message: `user are not registered with ${email} please register user` })
        }
        const token = jwt.sign({ _id: user }, "javascriptisfun", { expiresIn: '1h' });
        data.token = token
        return res.status(200).send({ status: true, message: "user login succesfully", data: data })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: `${error.message}` })
    }
}


module.exports = { registerUser, loginUser }