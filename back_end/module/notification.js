const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
    {
      tokens: [String], // Array to store FCM tokens
    },
    { timestamps: true }
  );

module.exports = mongoose.model('Notification', NotificationSchema);