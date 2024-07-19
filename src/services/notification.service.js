const { sender } = require("../config/index.config").email;
const { NotificationRepository } = require("../repository/index.repository");

const notificationTicket = new NotificationRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailText) => {
  try {
    await sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailText,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const createNotification = async (notification) => {
  try {
    return await notificationTicket.create(notification);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const fetchPendingNotifications = async () => {
  try {
    return await notificationTicket.fetchPendingNotifications();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  sendBasicEmail,
  createNotification,
  fetchPendingNotifications,
};
