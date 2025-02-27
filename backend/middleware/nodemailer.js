const nodemailer = require('nodemailer');
require('dotenv').config();

  let transporter = nodemailer.createTransport({
    service: 'gmail',
   
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
      const sendResetEmail = async (email, resetURL) => {
        try {
            await transporter.sendMail({
                from: `"CSIA" <${process.env.SMTP_USER}>`,
                to: email,
                subject: "Password Reset",
                html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                       <a href="${resetURL}">${resetURL}</a>
                       <p>If you didn’t request this, please ignore this email.</p>`
            });
    
            console.log("Password reset email sent!");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };
    
    module.exports = sendResetEmail;
    