const express = require('express');

const app     = express();

require('./configuration')(app);
require('./cache')(app);
require('./api')(app);

app.listen(8000, () => {
  console.log('CNC Server is running on port 8000');
});
