var mongoose = require('mongoose');

mongoose.model('rider', {
	id: {type: String, required: true},
	date: { type: String, required: true},
	book: { type: String, required: true}
});