const express = require('express');
const bodyParser = require('body-parser');

const apodRoutes = require('./routes/apod.route');
const enhancedRoutes = require('./routes/enhanced.route');

const app = express();

app.use(apodRoutes);
app.use(enhancedRoutes);

app.listen(5000);