const express = require('express');

const token   = 'Idgz1PE3zO9iNc0E3oeH3CHDPX9MzZe3';

module.exports = function(app) {
	const router = express.Router();

	router.get('/status/', (req, res) => {
		res.send(JSON.stringify(app.cache.statuses));
	});

	router.post('/status/', (req, res) => {
		if (req.get('Token') !== token) {
			res.status(401).send('Bad Token');
		} else {
			let status = app.cache.statuses.find((item) => item.id === parseInt(req.body.id));

			if (status === undefined) {
				res.status(404).send('Not found');
			} else {
				status.workload = (req.body.status ? 1 : 0);
				res.send('Ok');
			}
		}
	});

	router.get('/status/:id', (req, res) => {
		let status = app.cache.statuses.find((item) => item.id === parseInt(req.params.id));

		if (status === undefined) {
			res.status(404).send('Not found');
		} else {
			res.send(JSON.stringify(status));
		}
	});

	router.get('/tasks/', (req, res) => {
		res.send(JSON.stringify(app.cache.tasks));
	});

	router.post('/tasks/', (req, res) => {
		if (req.get('Token') !== token) {
			res.status(401).send('Bad Token');
		} else if (!req.body.data || !req.body.data.input || !req.body.type) {
			res.status(400).send('Malformed data');
		} else if ([ 'hash-md5', 'hash-sha256', 'crack-md5' ].indexOf(req.body.type) === -1) {
			res.status(400).send('Invalid hash type');
		} else {
			let newTask = {
				id: app.cache.tasks.length,
				type: req.body.type,
				data: {
					input: req.body.data.input,
					output: (req.body.data.output ? req.body.data.output : null)
				}
			};
			app.cache.tasks.push(newTask);
			res.send('Ok');
		}
	});

	router.get('/tasks/:id', (req, res) => {
		let task = app.cache.tasks.find((item) => item.id === parseInt(req.params.id));

		if (task === undefined) {
			res.status(404).send('Not found');
		} else {
			res.send(JSON.stringify(task));
		}
	});

	router.post('/reports', (req, res) => {
		if (req.get('Token') !== token) {
			res.status(401).send('Bad Token');
		} else if (req.body.data === undefined || req.body.data.output === undefined || req.body.id === undefined) {
			res.status(400).send('Malformed data');
		} else {
			let task = app.cache.tasks.find((item) => item.id === parseInt(req.body.id));
			if (task.data.output === null) {
				task.data.output = req.body.data.output;
				res.send({ message: 'OK' });
			} else {
				res.send({ message: 'NOT OK' });
			}
		}
	});

	app.use('/api', router);
};
