const nodemailer = require('nodemailer');

const transporter = nodemailer.createTranporter({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, 
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
      const sendEmail = async (to, subject, text) => {
        try {
          const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
          };
      
          const info = await transporter.sendMail(mailOptions);
          console.log(`Email sent: ${info.messageId}`);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };

module.exports = sendEmail;