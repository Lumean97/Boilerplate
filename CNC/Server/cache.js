const fs = require('fs');

module.exports = function(app) {
	fs.readFile('./database/status.json', 'utf-8', (error, data) => {
		if (error) throw error;

		app.cache.statuses = JSON.parse(data);
	});

	fs.readFile('./database/tasks.json', 'utf-8', (error, data) => {
		if (error) throw error;

		app.cache.tasks = JSON.parse(data);
	});

	app.cache.dump = function() {
		console.log('Dumping cache...');
		fs.writeFile('./database/status.json', JSON.stringify(app.cache.statuses), 'utf8', (err) => {
			if (err) throw err;
		});
		fs.writeFile('./database/tasks.json', JSON.stringify(app.cache.tasks), 'utf8', (err) => {
			if (err) throw err;
		});
	};

	setInterval(() => {
		app.cache.dump();
	}, 10000);
};
