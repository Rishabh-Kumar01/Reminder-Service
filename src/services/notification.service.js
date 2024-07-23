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

const createBookingConfirmationNotification = async (bookingData) => {
  const notification = {
    type: "BOOKING_CONFIRMATION",
    subject: "Booking Confirmation",
    content: `Your booking for flight ${bookingData.flightNumber} has been confirmed.`,
    recipientEmail: bookingData.recipientEmail,
    notificationTime: bookingData.notificationTime,
    metadata: {
      bookingId: bookingData.bookingId,
      flightId: bookingData.flightId,
    },
  };
  return await createNotification(notification);
};

const createBookingReminderNotification = async (bookingData) => {
  const reminderTime = new Date(bookingData.departureTime);
  reminderTime.setHours(reminderTime.getHours() - 24);

  const notification = {
    type: "BOOKING_REMINDER",
    subject: "Upcoming Flight Reminder",
    content: `Reminder: Your flight ${bookingData.flightNumber} is departing in 24 hours.`,
    recipientEmail: bookingData.recipientEmail,
    notificationTime: reminderTime,
    metadata: {
      bookingId: bookingData.bookingId,
      flightId: bookingData.flightId,
    },
  };
  return await createNotification(notification);
};

const createAccountVerificationNotification = async (userData) => {
  const notification = {
    type: "ACCOUNT_VERIFICATION",
    subject: "Verify Your Account",
    content: `Please click the link to verify your account: ${userData.verificationLink}`,
    recipientEmail: userData.email,
    notificationTime: new Date(),
    metadata: { userId: userData.userId },
  };
  return await createNotification(notification);
};

const subscribeEvents = async (payload) => {
  let service = payload.service;
  let data = payload.data;
  switch (service) {
    case "CREATE_BOOKING":
      await createBookingConfirmationNotification(data);
      await createBookingReminderNotification(data);
      break;
    case "CREATE_USER":
      await createAccountVerificationNotification(data);
      break;
    case "SEND_BASIC_MAIL":
      await sendBasicEmail(data);
      break;
    default:
      console.log("No valid event received");
      break;
  }
};

module.exports = {
  sendBasicEmail,
  createNotification,
  fetchPendingNotifications,
  updateNotificationStatus,
  subscribeEvents,
};
