const serverConstants = require('./server.constants');
const Reminder = require('./models/reminder');

const serverResources = {
  v1: {
    getReminders: getReminders,
    postReminder: postReminder,
    deleteReminder: deleteReminder,
    updateReminder: updateReminder,
    getReminder: getReminder
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

async function getReminder(req, res, next) {
  console.log('Fetching the Reminder');

  const reminder = await Reminder.findById(req.params.id).catch(err => {
    console.log(err.message);
  });

  if (reminder) {
    res.status(200).json({
      message: 'Reminder successfully fetched!',
      reminder: {
        id: reminder._id,
        title: reminder.title,
        content: reminder.content
      }
    });
  } else {
    res.status(404).json({
      message: 'Reminder Not Found!',
      reminder: { id: '', title: '', content: '' }
    });
  }
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

async function updateReminder(req, res, next) {
  const reminder = new Reminder({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  await Reminder.updateOne({ _id: req.params.id }, reminder);
  console.log(req.params.id);
  res.status(200).json({
    message: 'Reminder Updated!',
    id: req.params.id
  });
}

module.exports = serverResources;
