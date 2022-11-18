const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({
    longUrl:{
        type:String
    },
    shortCode:{
        type:String
    },
    shortUrl:{
        type:String
    },
})

module.exports = mongoose.model("url", urlSchema)