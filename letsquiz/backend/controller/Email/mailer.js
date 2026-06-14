const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Create the transporter object using Gmail
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "support@letsquiz.org", // Your Zoho email address
        pass: "Universal@29 "  // Your Zoho app password
    }
});

// Function to send the email
const sendTestEmail = async (toEmail, subject, data = {}) => {
    try {
        // Define default data in case it's missing
        const templateData = {
            subject: subject || 'Email Verification', // Default subject
            title: data.title || 'Hello!',
            senderName: data.senderName || 'Your Name',
            userName: data.userName || 'User',
            messageLink: data.messageLink || 'https://www.google.com',
            message: data.message || 'This is a default test message.'
        };

        // Read and render the HTML template using EJS
        const templatePath = path.join(__dirname, '../../../Email/Verification.ejs');
        const template = fs.readFileSync(templatePath, 'utf8');
        const htmlContent = ejs.render(template, templateData);

        // Email options
        const mailOptions = {
            from: '"Your Name" <support@letsquiz.org>', // Sender address
            to: toEmail,  // Receiver's email
            subject: subject || 'Email Verification',  // Subject
            html: htmlContent  // HTML content rendered from the EJS template
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId); // Log the messageId
        return info;
    } catch (error) {
        console.error('Error sending email:', error); // Handle errors
        throw error;
    }
};

// Export the function to be reused in other files
module.exports = { sendTestEmail };
