const nodemailer = require('nodemailer');
const Email = require('email-templates');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dcas2019@gmail.com',
        pass: '9860662485',
    },
});

const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
});

module.exports = email