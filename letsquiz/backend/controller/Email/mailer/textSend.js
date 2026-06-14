const { sendTestEmail } = require('../mailer');
const nodemailer = require('nodemailer');

const fakeTemplateData = {
    subject: 'Account Verification',          // Email subject
    title: 'Welcome to Our Service!',         // Title in the email
    senderName: 'Support Team',               // Sender's name
    userName: 'Kanishk Soni',                 // Recipient's name
    messageLink: 'https://example.com/verify',// Link in the email
    message: 'Please verify your email to start using your account.' // Email body message
};




// Function to call the send email function and log the result
const testSendFunction = async () => {
    try {
        const info = await sendTestEmail('kanishk21soni@gmail.com', 'kanishk21soni@gmail.com' ,data = {fakeTemplateData});
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error occurred while sending the email:', error);
    }
};

// Call the test function
testSendFunction();
