const { NotificationTicket } = require("../models/index");
const { Op } = require("../utils/imports.util").sequelize;

class NotificationRepository {
  async create(data) {
    try {
      const ticket = await NotificationTicket.create({
        content: data.content,
        subject: data.subject,
        recipientEmail: data.recipientEmail,
        notificationTime: data.notificationTime,
        type: data.type,
      });
      return ticket;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async fetchPendingNotifications(filter) {
    try {
      const notifications = await NotificationTicket.findAll({
        where: {
          status: filter.status,
          notificationTime: {
            [Op.lte]: new Date(),
          },
        },
      });
      return notifications;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async updateNotificationStatus(id, data) {
    try {
      const notification = await NotificationTicket.findByPk(id);
      if (!notification) {
        throw new Error("Notification not found");
      }
      notification.status = data.status;
      await notification.save();
      return notification;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

module.exports = NotificationRepository;
