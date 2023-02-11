const express = require('express');
const bodyParser = require('body-parser');

const apodRoutes = require('./routes/apod.routes');

const app = express();

app.use(apodRoutes);

app.listen(5000);