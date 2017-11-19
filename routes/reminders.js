const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res, next) {
  res.render('reminder');
});

//Route List reminders
router.get('/list', function (req, res, next) {
  mongoose.models.reminder.find({}, (error, reminders) => {
    const result = reminders.map((user) => {
      const raw = user.toJSON();
      return raw;
    });
    res.json({
      data: result
    });
  });
});

router.post('/create', function (req, res, next) {
  const book = req.body.book;
  const date = req.body.date;
  const reminderData = {
    book: book,
    date: date
  };
  console.log(reminderData);

  mongoose.models.reminder.create(reminderData, (error, createdreminder) => {
    const raw = createdreminder.toJSON();
    res.json({
      data: raw
    });
  });
});


//Route Create reminder
/*router.post('/create', function(req, res, next) {
  const date = req.body.date;
  const book = req.body.book;
  const whereBook = {
    _id: book
  }

  mongoose.models.findOne(whereBook, (error) => {

  })
  .then((bookFound) => {

    const reminderData = {
      date: date,
      book: bookFound.name,
    };
    
    mongoose.models.reminder.create(reminderData, (error, createdreminder) => {
      const raw = createdreminder.toJSON();
      res.json({
        data: raw
      });
    }); 
  })    
});
*/

module.exports = router;
