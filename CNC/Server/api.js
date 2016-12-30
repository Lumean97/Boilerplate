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
					fs.writeFileSync('./database/status.json', JSON.stringify(statuses));
					res.json({ message: 'OK' });
					return;
				}
			}
			res.json({ message: 'NOT OK' });
		});
	});

	router.get('/status/:id', (req, res) => {
		fs.readFile('./database/status.json', 'utf-8', (error, data) => {
			if (error) throw error;
			let statuses = JSON.parse(data);
			for (let status of statuses) {
				if (status.id == req.params.id) {
					res.send(status);
					return;
				}
			}
			res.status(404).send('Not found');
		});
	});

	router.get('/tasks/', (req, res) => {
		fs.readFile('./database/tasks.json', 'utf-8', (error, data) => {
			if (error) throw error;
			res.send(data);
		});
	});

	router.post('/tasks/', (req, res) => {
		if (! req.body.data || ! req.body.data.input) {
			res.status(400).send('Malformed data');
		}

		if (['hash-md5', 'hash-sha256', 'crack-md5'].indexOf(req.body.type) == -1) {
			res.status(400).send('Invalid hash type');
		}

		fs.readFile('./database/tasks.json', 'utf-8', (error, data) => {
			if (error) throw error;
			let tasks = JSON.parse(data);

			let newTask = {
				id: tasks.length,
				type: req.body.type,
				data: {
					input: req.body.data.input,
					output: (req.body.data.output ? req.body.data.output : null)
				}
			};
			tasks.push(newTask);

			fs.writeFile('./database/tasks.json', JSON.stringify(tasks), (err) => {
				if (err) throw err;
				res.json({ message: 'OK' });
			});
		});
	});

	router.get('/tasks/:id', (req, res) => {
		fs.readFile('./database/tasks.json', 'utf-8', (error, data) => {
			if (error) throw error;
			let tasks = JSON.parse(data);
			for (let task of tasks) {
				if (task.id == req.params.id) {
					res.send(task);
					return;
				}
			}
			res.status(404).send('Not found');
		});
	});

	router.post('/tasks/:id', (req, res) => {
		console.log('Received data', req.body);
		//TODO
		res.json({ message: 'Updating Task ' + req.params.id });
		// Liefert message OK oder NOT OK
	});

	app.use('/api', router);
};
