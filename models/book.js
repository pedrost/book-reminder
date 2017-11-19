var mongoose = require('mongoose');

mongoose.model('book', {
	id: String,
	name: String,
	pages: Number,
	image: String,
});