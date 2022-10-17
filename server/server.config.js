const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const reminderResources = require('./resources/reminder/reminder.routes');
const serverConstants = require('./server.constants');

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

app.use(
  serverConstants.v1 + serverConstants.REMINDERS_LIST_URL,
  reminderResources
);

module.exports = app;
