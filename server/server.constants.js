const serverConstants = {
  v1: '/api/v1',
  REMINDERS_LIST_URL: '/reminders',
  MIME_TYPE_MAP: {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
  },
  INVALID_MEDIA_TYPE: Error('Invalid image media type')
};

module.exports = serverConstants;
