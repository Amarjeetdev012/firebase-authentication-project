const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  longUrl: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
  urlCode: {
    type: String,
  },
});

module.exports = mongoose.model("url", urlSchema);
