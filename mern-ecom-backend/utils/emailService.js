import nodemailer from "nodemailer";

export const sendEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const mailOptions = {
    from: process.env.MAIL_SENDER_ADDRESS,
    to: email,
    subject: "Password Reset",
    html: `Hi, please follow this <a href="${resetLink}">link</a> to reset your password. This link is valid for 30 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
