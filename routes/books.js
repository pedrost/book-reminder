const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res, next) {
  res.render('book');
});

//Route List books
router.get('/list', function(req, res, next) {
  mongoose.models.book.find({}, (error, users) => {
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

  const bookData = {
    name: name,
    pages: pages,
    image: image
  };

  //create book 
  mongoose.models.book.create(bookData, (error, createdbook) => {
    const raw = createdbook.toJSON();      
    res.json({
      data: raw
    });
  });      
});

module.exports = router;
