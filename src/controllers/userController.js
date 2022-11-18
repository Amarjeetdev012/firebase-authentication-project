const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const registerUser =  async (req,res) => {
    try {
        let data = req.body
        let user = await userModel.findOne({email:data.email})
        console.log(user)
        let saveData = await userModel.create(data)
        res.status(201).send({status:true, message:"user register succesfully", data:saveData})
    } catch (error) {
      return res.status(500).send({status:false,message:`${error.message}`})  
    }
}

module.exports = { registerUser }