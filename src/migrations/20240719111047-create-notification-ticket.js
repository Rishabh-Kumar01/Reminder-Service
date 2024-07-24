"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("NotificationTickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      recipientEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["PENDING", "SUCCESS", "FAILED"],
        allowNull: false,
        defaultValue: "PENDING",
      },
      type: {
        type: Sequelize.ENUM,
        values: [
          "BOOKING_CONFIRMATION",
          "BOOKING_REMINDER",
          "BOOKING_CANCELLATION",
          "ACCOUNT_VERIFICATION",
        ],
        allowNull: false,
      },
      notificationTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("NotificationTickets");
  },
};
