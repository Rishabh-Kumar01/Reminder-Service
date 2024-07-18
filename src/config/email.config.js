const { nodemailer } = require("../utils/imports.util");
const { EMAIL_ID, EMAIL_PASS, EMAIL_SERVICE } = require("./serverConfig");

const sender = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASS,
  },
});

module.exports = {
  sender,
};
