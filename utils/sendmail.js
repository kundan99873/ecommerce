import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = (to, subject, body) => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: to,
    subject: subject,
    html: body,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default sendMail;
