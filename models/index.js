const fs = require('fs');

const files = fs.readdirSync(__dirname);
files.forEach((file) => {
	if (file !== 'index.js') {
		require(__dirname + '/' + file);
	}
});