const express = require('express');
const fs			= require('fs');

module.exports = function(app) {
	const router = express.Router();

	router.get('/status/', (req, res) => {
		fs.readFile('./database/status.json', 'utf-8', (error, data) => {
			if (error) throw error;
			res.send(data);
		});
	});

	router.post('/status/', (req, res) => {
		fs.readFile('./database/status.json', 'utf-8', (error, data) => {
			if (error) throw error;
			let statuses = JSON.parse(data);
			for (let status of statuses) {
				if (status.id == req.body.id) {
					status.workload = (req.body.status ? 1 : 0);
					fs.writeFile('./database/status.json', JSON.stringify(statuses), (err) => {
						if (err) throw err;
						res.json({ message: 'OK' });
					});
				}
			}
			res.json({ message: 'NOT OK' });
		});
	});

	router.get('/tasks/', (req, res) => {
		fs.readFile('./database/tasks.json', 'utf-8', (error, data) => {
			if (error) throw error;
			res.send(data);
		});
	});

	router.get('/tasks/:id', (req, res) => {
		fs.readFile('./database/tasks.json', 'utf-8', (error, data) => {
			if (error) throw error;
			let tasks = JSON.parse(data);
			for (let task of tasks) {
				if (task.id == req.params.id) {
					res.send(task);
				}
			}
			res.json({ message: 'NOT OK' });
		});
	});

	router.post('/tasks/:id', (req, res) => {
		console.log('Received data', req.body);
		res.json({ message: 'Updating Task ' + req.params.id });
	});

	app.use('/api', router);
};
