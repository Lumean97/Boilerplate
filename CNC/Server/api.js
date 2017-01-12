const express = require('express');
const fs			= require('fs');

const token   = 'Idgz1PE3zO9iNc0E3oeH3CHDPX9MzZe3';

module.exports = function(app) {
	const router = express.Router();

	router.get('/status/', (req, res) => {
		fs.readFile('./database/status.json', 'utf-8', (error, data) => {
			if (error) throw error;
			res.send(data);
		});
	});

	router.post('/status/', (req, res) => {
		if (req.get('Token') !== token) {
			res.status(401).send('Bad Token');
		} else {
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
		}
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
		if (req.get('Token') !== token) {
			res.status(401).send('Bad Token');
		} else {
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
		}
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

	router.post('/reports', (req, res) => {
		if (req.get('Token') !== token) {
			res.status(401).send('Bad Token');
		} else {

			// logic here
			res.send({
				message: 'OK'
			});
		}
	});

	app.use('/api', router);
};
