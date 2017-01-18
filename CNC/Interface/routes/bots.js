const express = require('express');
const router  = express.Router();

router.get('/', function(req, res, next) {
	res.render('bots', { path: 'bots' });
});

module.exports = router;
