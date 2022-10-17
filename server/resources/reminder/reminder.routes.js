const express = require('express');
const serverConstants = require('./../../server.constants');
const reminderResources = require('./reminder.resources');

const router = express.Router();

router.get('', reminderResources.v1.getReminders);

router.post('', reminderResources.v1.postReminder);

router.delete('/:id', reminderResources.v1.deleteReminder);

router.put('/:id', reminderResources.v1.updateReminder);

router.get('/:id', reminderResources.v1.getReminder);

module.exports = router;
