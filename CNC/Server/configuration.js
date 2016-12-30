const parser  = require('body-parser');
const cors    = require('cors');

module.exports = function(app) {
	// Configure body-parser
	app.use(parser.urlencoded({ extended: true }));
	app.use(parser.json());

	// Configure CORS
	app.use(cors());
};