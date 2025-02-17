"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotificationTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotificationTicket.init(
    {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      recipientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["PENDING", "SUCCESS", "FAILED"],
        allowNull: false,
        defaultValue: "PENDING",
      },
      type: {
        type: DataTypes.ENUM,
        values: [
          "BOOKING_CONFIRMATION",
          "BOOKING_REMINDER",
          "BOOKING_CANCELLATION",
          "ACCOUNT_VERIFICATION",
        ],
        allowNull: false,
      },
      notificationTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "NotificationTicket",
    }
  );
  return NotificationTicket;
};
