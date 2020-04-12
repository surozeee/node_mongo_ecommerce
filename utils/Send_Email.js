const Email = require('../config/Email');

async function sendMultipleMails(mails) {
    console.log('thread start');
    let sendMails = 0;
    // logic for
    // sending multiple mails
    sendEmail();
    console.log('thread end');
    return sendMails;
}
// receive message from master process
process.on('message', async (message) => {
    const numberOfMailsSend = await sendMultipleMails(message.mails);

    // send response to master process
    process.send({ counter: numberOfMailsSend });
});


function sendEmail(){
    Email.send({
        template: 'hello',
        message: {
            from: 'Suroz Awal <no-reply@blog.com>',
            to: 'suroz@yopmail.com',
            subject: 'asdfagasdas'
        },
        locals: {
            name: 'John',
            lastname: 'Snow',
        },
    });
}