const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Route List reminders
router.get('/list', function(req, res, next) {
  mongoose.models.reminder.find({}, (error, reminders) => {	
	  const result = reminders.map( (user) => {
      const raw = user.toJSON();
		  return raw;
	  });
    res.json({
		  data: result
	  });
  });
});

//Route Create reminder
router.post('/create', function(req, res, next) {
  const date = req.body.date;
  const book = req.body.book;

  const reminderData = {
    date: date,
    book: book,
    complete: false
  };

  //create reminder 
  mongoose.models.reminder.create(reminderData, (error, createdreminder) => {
    const raw = createdreminder.toJSON();      
    res.json({
      data: raw
    });
  });      
});

module.exports = router;
