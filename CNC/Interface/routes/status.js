const express = require('express');
const router  = express.Router();

router.get('/', function(req, res, next) {
  res.render('status', { path: 'status' });
});

module.exports = router;
