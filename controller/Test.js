var express = require('express');
var router = express.Router();

import Email from '../config/Email';
import FCM from '../config/FCM';
import logger from '../config/Logger';
const UploadImage = require('../utils/Upload_File')

/**
 * @swagger
 * /send_email:
 *   get:
 *     tags:
 *       - Test
 *     name: Email Sent
 *     summary: Send test email
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Email Sent
 *       '403':
 *         description: No authorization / Email failed
 */
/* Send Email */
router.get('/send_email', function (req, res) {
    console.log('called')
    try {
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
        }).then(() => {
            res.status(200).json('recovery email sent');
            console.log('email has been send!')
        }).catch(() => {
            res.status(202).json('failed');
            console.log('email has been failed!')
        });

        /*const mailOptions = new Email({
            to: 'suroz@yopmail.com',
            subject: 'Link To Reset Password',
            text:
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                + `http://localhost:3031/reset/token\n\n`
                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        });*

        logger.info('sending mail');

        email.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('there was an error : ', err);
            } else {
                console.log('here is the res: ', response);
                res.status(200).json('recovery email sent');
            }
        });*/


    } catch (err) {
        console.log('Error in sending data\n', err);
    }
});


/**
 * @swagger
 * /send_notification:
 *   post:
 *     tags:
 *       - Test
 *     name: Notification Sent
 *     summary: Send test notification
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       '200':
 *         description: Notification Sent
 *       '403':
 *         description: No authorization / Notification failed
 */
/* Send Notification */
router.post('/send_notification', function (req, res) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'cZfQH157I5s:APA91bHiL9bdiggMutvobyUMJjmb5X4EszIhxQRl1WHGn9oH8p4QB5x3PUhGO6eSmQlRPnUAgxCunoxovXpsNZgntAk39iHtz2Cd0TfVni3Nir9F1YQnfBnPLYWouiiwOwKLsAQKCYVv',
        collapse_key: 'your_collapse_key',

        notification: {
            title: 'Title of your push notification',
            body: 'Body of your push notification'
        },

        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    }
    FCM.send(message, function (err, response) {
        if (err) {
            console.log('error found', err.toString());
            res.status(417).json('error on notification sent');
        } else {
            console.log('response here', response);
            res.status(200).json('notification sent');
        }
    });
});


const { fork } = require('child_process');
router.get('/thread_test', (request, response) => {
    // fork another process
    logger.info("start");
    const process = fork('../backend/utils/Send_Email.js');
    const mails = request.body.emails;
    // send list of e-mails to forked process
    logger.info("email start");
    process.send({ mails });
    logger.info("email send");
    // listen for messages from forked process
    process.on('message', (message) => {
        logger.info(`Number of mails sent ${message.counter}`);
    });
    return response.json({ status: true, sent: true });
});


router.get('/upload', (req, res) => {
    var image = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
    // to declare some path to store your converted image
    const success = UploadImage.uploadImage("./public/", image);
    return res.json({ status: success });
});

var Request = require("request");


router.get('/thirdParty', (req, res) => {
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://httpbin.org/post",
        "body": JSON.stringify({
            "firstname": "Nic",
            "lastname": "Raboy"
        })
    }, (error, response, body) => {
        if (error) {
            logger.error(error);
            return console.dir(error);
        }
        // console.dir(JSON.parse(body));
        //logger.info(body);
        logger.info(body);
    });
});

module.exports = router;