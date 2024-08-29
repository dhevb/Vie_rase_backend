import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetPasswordEmail = async (to: string, newPassword: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset',
    text: `Your new password is: ${newPassword}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
