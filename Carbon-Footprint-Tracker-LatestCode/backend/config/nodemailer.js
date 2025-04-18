const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        ciphers: 'TLSv1.2',
        rejectUnauthorized: false,
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Nodemailer Transporter Error:', error.message);
    } else {
        console.log('Nodemailer is ready to send emails');
    }
});

module.exports = transporter;
