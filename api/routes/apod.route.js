const express = require('express');

const router = express.Router();
const fetch = require('node-fetch');


const API_KEY = 'LTkYgXA8iL8afEIAR2ERcYtOzWmPwaCBDunBe6ek';

router.get('/apod', (req, res, next) => {
  console.log('GET Request in APOD');
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=1`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
      res.json({ data });
  })
  .catch(err => {
      res.send(err);
  });
  // res.json({message: 'it works'});
});

module.exports = router;