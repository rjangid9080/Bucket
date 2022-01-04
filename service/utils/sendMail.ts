import { Transporter, createTransport } from "nodemailer";
import dotenv from "dotenv";
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config({ path: "config.env" });
const transpoterOptions: SMTPTransport.Options = {
  host: process.env.SMTP_host,
  service: process.env.SMTP_service,
  port:587,
  secure:true,
  auth: {
    user: process.env.SMTP_user,
    pass: process.env.SMTP_password,
  },
};

export default async(options: any) => {
  const transpoter: Transporter = createTransport(transpoterOptions);
  const mailOptions: SMTPTransport.MailOptions = {
    from: process.env.SMTP_user,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transpoter.sendMail(mailOptions);
};
