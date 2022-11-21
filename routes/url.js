const express = require('express');
const router = express.Router();
const Url = require("../models/urlModel")
var validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

router.get("/", async (req,res) => {
    const shortUrls = await Url.find() 
    res.render("index", {shortUrls:shortUrls})
})


router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = "https://37cf-2405-201-200d-2a24-c9f7-2ef6-c3bd-4c49.in.ngrok.io"


  if (!validUrl.isWebUri(baseUrl)) {
    return res.status(401).json('invalid base url');
  }

  if(!validUrl.isWebUri(longUrl)){
    return res.status(400).json({status:false,message:"please provide valid longurl"})
  }

  // create url code
  const urlCode = shortid.generate();

  // check long url
  if (validUrl.isWebUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

      let url = ({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        let saveData = await Url.create(url)
        console.log(saveData)
res.redirect("/")
        // res.status(201).send({ status:true,message:"shorturl generated succesfully",data:saveData})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;