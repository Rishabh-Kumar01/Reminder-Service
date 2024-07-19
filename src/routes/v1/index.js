const router = require("../../utils/imports.util").express.Router();
const {
  NotificationController,
} = require("../../controllers/index.controller");

router.post("/notification", NotificationController.createNotification);

module.exports = router;
