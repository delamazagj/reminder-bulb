const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const reminderResources = require('./resources/reminder/reminder.routes');
const serverConstants = require('./server.constants');

const mongoose = require('mongoose');
// require('dotenv').config();

const DB_URL =
  'mongodb+srv://reminderbulb:' +
  process.env.DB_PWD +
  '@reminder-bulb.ous45d3.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(DB_URL)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Error connecting to the DB', err.message));

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'app')));

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

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

module.exports = app;
