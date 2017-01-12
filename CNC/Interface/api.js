const express = require('express');
const crypto  = require('crypto');

module.exports = function(app) {
	const router = express.Router();

	router.get('/md5/', (req, res) => {
		let md5 = crypto.createHash('md5');
		md5.update(req.params.input);
		res.send(md5.digest('hex'));
	});

	router.get('/sha-256/', (req, res) => {
		let sha = crypto.createHash('sha256');
		sha.update(req.params.input);
		res.send(sha.digest('hex'));
	});

	app.use('/api', router);
};
