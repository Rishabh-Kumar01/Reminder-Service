const { cron } = require("../utils/imports.util");
const { NotificationService } = require("../services/index.services");
const { sender } = require("../config/index.config").email;

const setupJobs = () => {
  cron.schedule("*/1 * * * *", async () => {
    const response = await NotificationService.fetchPendingNotifications({
      status: "PENDING",
    });

    // Send Email to the user where status is PENDING
    response.forEach((notification) => {
      sender.sendMail(
        {
          to: notification.recipientEmail,
          subject: notification.subject,
          text: notification.content,
        },
        async (error, data) => {
          if (error) {
            console.error(error);
          } else {
            console.log(`'📩 Email sent: ${data.response} 📩`);
            await NotificationService.updateNotificationStatus(
              notification.id,
              {
                status: "SUCCESS",
              }
            );
          }
        }
      );
    });
  });
};

module.exports = setupJobs;
