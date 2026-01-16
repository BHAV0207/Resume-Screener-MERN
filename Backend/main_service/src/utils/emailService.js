const nodemailer = require("nodemailer");

// Email configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (to, subject, message) => {
  try {
      await transporter.sendMail({
          from: process.env.EMAIL,
          to,
          subject,
          text: message
      });

      console.log(`Email sent to ${to}`);
  } catch (error) {
      console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;