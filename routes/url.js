const express = require('express');
const router = express.Router();
const Url = require("../models/urlModel")
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');


//@route POST /api/url/shorten
// @desc Create Short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseURL');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('invalid base url');
  }

  // create url code
  const urlCode = shortid.generate();

  // check long url
  if (validUrl.isUri(longUrl)) {
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
        res.status(201).send({ status:true,message:"shorturl generated succesfully",data:saveData})
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
