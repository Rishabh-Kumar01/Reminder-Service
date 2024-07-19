const { NotificationRepository } = require("../repository/index.repository");

const notificationTicket = new NotificationRepository();

// const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailText) => {
//   try {
//     await sender.sendMail({
//       from: mailFrom,
//       to: mailTo,
//       subject: mailSubject,
//       text: mailText,
//     });
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

const createNotification = async (notification) => {
  try {
    return await notificationTicket.create(notification);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const fetchPendingNotifications = async (filter) => {
  try {
    return await notificationTicket.fetchPendingNotifications(filter);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const updateNotificationStatus = async (id, data) => {
  try {
    return await notificationTicket.updateNotificationStatus(id, data);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  // sendBasicEmail,
  createNotification,
  fetchPendingNotifications,
  updateNotificationStatus,
};
