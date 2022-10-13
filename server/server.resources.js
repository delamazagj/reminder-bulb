const serverConstants = require('./server.constants');
const Reminder = require('./models/reminder');

const serverResources = {
  v1: {
    getReminders: getReminders,
    postReminder: postReminder,
    deleteReminder: deleteReminder
  }
};

async function getReminders(req, res, next) {
  console.log('Fetching the Reminders');
  let reminders = [];
  await Reminder.find().then(docs => {
    reminders = docs;
  });
  res.status(200).json({
    message: 'Reminders successfully fetched!',
    reminders: reminders
  });
}

async function postReminder(req, res, next) {
  const reminder = new Reminder({
    title: req.body.title,
    content: req.body.content
  });
  const newReminder = await reminder.save();
  console.log(newReminder);
  res.status(201).json({
    message: 'Reminder Saved!',
    id: newReminder._id
  });
}

async function deleteReminder(req, res, next) {
  await Reminder.deleteOne({ _id: req.params.id });
  console.log(req.params.id);
  res.status(200).json({
    message: 'Reminder Deleted!'
  });
}

module.exports = serverResources;
