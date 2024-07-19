const { NotificationService } = require("../services/index.services");

const createNotification = async (req, res) => {
  try {
    const response = await NotificationService.createNotification(req.body);
    if (response) {
      return res.status(201).json({
        success: true,
        data: response,
        message: "Notification created successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Notification creation failed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      data: [],
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  createNotification,
};
