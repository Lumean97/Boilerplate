const express = require('express');
const router  = express.Router();

router.get('/', function(req, res, next) {
	res.render('tasks', { path: 'tasks' });
});

module.exports = router;
