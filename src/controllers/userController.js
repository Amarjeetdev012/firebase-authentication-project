const userModel = require("../models/userModel")
const urlModel = require("../models/urlModel")
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

const shortUrl = async (req, res) => {
    try {
        let bearerToken = req.headers["authorization"]
        if (bearerToken !== undefined) {
            const bearer = bearerToken.split(' ')
            const token = bearer[1]
            let decoded = jwt.verify(token, "javascriptisfun")
            let findUser = await userModel.findOne({ _id: decoded._id })
            if (!findUser) {
                return res.status(400).send({ status: false, message: "user are not registered please register first" })
            }
        }
        let data = req.body
        // 
        function validateURL(textval) {
            var urlregex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/
            return urlregex.test(textval);
        }
        // 
     
     if(!validateURL(data.longUrl)){
        return res.status(400).send({status:false,message:"this url is not valid please provide a valid url"})
     }

        let port = "https://localhost"
        let shortCode = Math.random().toString(36).slice(-5)
        let shortUrl = port + "/" + shortCode
        data.shortCode = shortCode
        data.shortUrl = shortUrl
        data.longUrl = req.body.longUrl
        console.log(data)
        let saveData = await urlModel.create(data)
        return res.status(201).send({ status: true, message: "short url generated succesfully", data: saveData })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: `${error.message}` })
    }
}

const getUrl = async (req, res) => {
    try {
        let longUrl = req.body.longUrl
        let findUrl = await urlModel.findOne({ longUrl: longUrl })
        console.log(findUrl)
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.message}` })
    }
}



module.exports = { registerUser, loginUser, shortUrl, getUrl }