const express = require('express');
const request = require('request');

const router = express.Router();
const fetch = require('node-fetch');
const { parseArgs } = require('util');
const { get } = require('http');


const API_KEY = 'LTkYgXA8iL8afEIAR2ERcYtOzWmPwaCBDunBe6ek';

const fetchEnhancedAll = (req, res, next) => {
  const url = `https://api.nasa.gov/EPIC/api/enhanced/all?api_key=${API_KEY}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
      res.json({ data });
  })
  .catch(err => {
      res.send(err);
  });
}

const fetchEnhancedByDate = (req,res,next) => {
  const date = req.params.date
  const url = `https://epic.gsfc.nasa.gov/api/enhanced/date/${date}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    res.json({data});
  })
  .catch(err => {
      res.send(err);
  });
};

router.get('/enhanced', (req, res, next) => {
  console.log('GET Request in ENHANCED ALL');
  fetchEnhancedAll(req,res,next);
  // res.json({message: 'it works'});
});

router.get('/enhanced/:date', (req,res,next) => {
  console.log('GET Request in ENHANCED BYDATE');
  const date = req.params.date
  const url = `https://epic.gsfc.nasa.gov/api/enhanced/date/${date}`;

  // FUTURE USE CASE WHEN I NEED TO MAKE A REQUEST ON SERVER
  // request.get takes 2 parseArgs
  // 1. take url to http get
  // 2. callback to run when http response is back. 3 args:
  //   1. error
  //   2. http response
  //   3. json/data the server sent back
  // request.get(url, (error, response, data)=>{
  //   console.log('======= the error ========');
  //   console.log(error);
  //   console.log('======= the response ========');
  //   console.log(response);
  // });
  
  fetchEnhancedByDate(req,res,next);
});

router.get('/enhanced/:date/image/:imageName', (req,res,next) =>{
  const date = req.params.date;
  const dateSplit = date.split('-');
  const dateYear = dateSplit[0];
  const dateMonth = dateSplit[1];
  const dateDay = dateSplit[2];
  const imageName = req.params.imageName;

  const urlPath = `https://epic.gsfc.nasa.gov/archive/enhanced/${dateYear}/${dateMonth}/${dateDay}/png/${imageName}.png`;

  console.log('====== url path =====');
  console.log(urlPath);

  res.json({path: `${urlPath}`});
});

// https://epic.gsfc.nasa.gov/archive/enhanced/2022/05/26/png/epic_RGB_20220526011358.png
router.get('')

module.exports = router;