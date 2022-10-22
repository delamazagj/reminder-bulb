const express = require('express');
const multer = require('multer');
const reminderResources = require('./reminder.resources');
const serverConstants = require('../../server.constants');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, ds) => {
    const fileError = serverConstants.MIME_TYPE_MAP[file.mimetype]
      ? null
      : serverConstants.INVALID_MEDIA_TYPE;

    ds(fileError, 'server/assets');
  },
  filename: (req, file, up) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    const fileExt = serverConstants.MIME_TYPE_MAP[file.mimetype];
    const uploadedFileName = fileName + '-' + Date.now() + '.' + fileExt;
    up(null, uploadedFileName);
  }
});

router.get('', reminderResources.v1.getReminders);

router.post(
  '',
  multer(storage).single('image'),
  reminderResources.v1.postReminder
);

router.delete('/:id', reminderResources.v1.deleteReminder);

router.put('/:id', reminderResources.v1.updateReminder);

router.get('/:id', reminderResources.v1.getReminder);

module.exports = router;
