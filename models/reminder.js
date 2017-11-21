var mongoose = require('mongoose');

mongoose.model('reminder', {
	id: String,
	date: String,
	book: String,
});