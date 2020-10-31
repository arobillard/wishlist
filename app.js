const express = require('express');
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');
const listRoutes = require('./routes/list');
const groupRoutes = require('./routes/group');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/groups', groupRoutes);

module.exports = app;