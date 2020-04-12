var cron = require('node-cron');
var dotenv = require('dotenv').config();
var logger = require('../config/Logger');

cron.schedule('* * * * *', () => {
    //logger.info(process.env.EMAIL_ADDRESS)
    //logger.info('running a task every minute');
});

cron.schedule('1,2,4,5 * * * *', () => {
    //logger.info('running every minute 1, 2, 4 and 5');
});

cron.schedule('1-5 * * * *', () => {
    //logger.info('running every minute to 1 from 5');
});