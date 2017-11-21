const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const utils = require('../libs/utils');

router.get('/', function (req, res, next) {
  res.render('book');
});

//Route List books
router.get('/list', function(req, res, next) {
  mongoose.models.book.find({}, (error, users) => {
    if (error) {
      return utils.badImplementation(res, 'error on getting books list');
    }
	  const result = users.map( (user) => {
      const raw = user.toJSON();
      return raw;
    });
    res.json({
      data: result
    });
  });
});

//Route Create book
router.post('/create', function(req, res, next) {
  const name = req.body.name;
  const pages = req.body.pages;
  const image = req.body.image;
  
  if (!name || !name.length) {
    return utils.badResquest(res, 'invalid name');
  }
  if (!pages || !pages.length) {
    return utils.badResquest(res, 'invalid amount of pages');
  }

  const bookData = {
    name: name,
    pages: pages,
    image: image
  };

  //create book 
  mongoose.models.book.create(bookData, (error, createdbook) => {
    if (error) {
      return utils.badResquest(res, 'error on creating book');
    }
    const raw = createdbook.toJSON();      
    res.json({
      data: raw
    });
  });      
});

module.exports = router;
