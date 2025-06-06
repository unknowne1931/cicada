const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
    {
      users: [
        {
          user: String,  // Store user ID or email
          fcm: String,   // Store FCM token
        },
      ],
    },
    { timestamps: true }
  );

module.exports = mongoose.model('Balance', BalanceSchema);