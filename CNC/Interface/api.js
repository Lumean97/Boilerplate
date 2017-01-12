const express = require('express');
const crypto  = require('crypto');

const token   = 'Idgz1PE3zO9iNc0E3oeH3CHDPX9MzZe3';

module.exports = function(app) {
	const router = express.Router();

	router.post('/md5/', (req, res) => {
		if (req.get('Token') !== token) {
			res.status(401).send('Bad Token');
		} else {
			let md5 = crypto.createHash('md5');
			md5.update(req.body.input);
			res.send(md5.digest('hex'));
		}
	});

	router.post('/sha-256/', (req, res) => {
		if (req.get('Token') !== token) {
			res.status(401).send('Bad Token');
		} else {
			let sha = crypto.createHash('sha256');
			sha.update(req.body.input);
			res.send(sha.digest('hex'));
		}
	});

	app.use('/api', router);
};
