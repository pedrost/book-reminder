var mongoose = require('mongoose');

mongoose.model('book', {
	id: {type: String, required: true},
	name: { type: String, required: true },
	pages: { type: Number, required: true},
	image: { type: String, required: false}
});