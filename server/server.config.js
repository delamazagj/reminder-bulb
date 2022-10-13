const express = require('express');
const bodyParser = require('body-parser');
const serverConstants = require('./server.constants');
const serverResources = require('./server.resources');

const app = express();

const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Error connecting to the DB', err.message));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get(
  serverConstants.v1 + serverConstants.REMINDERS_LIST_URL,
  serverResources.v1.getReminders
);

app.post(
  serverConstants.v1 + serverConstants.REMINDERS_LIST_URL,
  serverResources.v1.postReminder
);

app.delete(
  serverConstants.v1 + serverConstants.REMINDERS_LIST_URL + '/:id',
  serverResources.v1.deleteReminder
);

app.put(
  serverConstants.v1 + serverConstants.REMINDERS_LIST_URL + '/:id',
  serverResources.v1.updateReminder
);

module.exports = app;
