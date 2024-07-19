const { NotificationTicket } = require("../models/index");
const { Op } = require("../utils/imports.util").sequelize;

class NotificationRepository {
  async create(data) {
    try {
      const ticket = await NotificationTicket.create({
        content: data.content,
        subject: data.subject,
        recepientEmail: data.recepientEmail,
        notificationTime: data.notificationTime,
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
}

module.exports = NotificationRepository;
