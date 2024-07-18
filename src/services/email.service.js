const { sender } = require("../config/index.config").email;

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

module.exports = {
  sendBasicEmail,
};
