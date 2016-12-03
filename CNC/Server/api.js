const express = require('express');

module.exports = function(app) {
	const router = express.Router();

	router.get('/Status/', (req, res) => {

	});

	router.post('/Status/', (req, res) => {

	});

	router.get('/Tasks/', (req, res) => {

	});

	router.get('/Tasks/:id', (req, res) => {

	});

	router.post('/Tasks/:id', (req, res) => {
		console.log('Received data', req.body);
		res.json({ message: 'Updating Task ' + req.params.id });
	});

	app.use('/api', router);
};