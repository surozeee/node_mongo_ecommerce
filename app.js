import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import CustomError from './error/CustomError';
import logger from './config/Logger';

var normalizedPath = require("path").join(__dirname, "controller");

/*const indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    todoRouter = require('./routes/todos'),
    testRouter = require('./routes/Test.js');*/

const app = express();
app.use('/public', express.static('public'));
app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// The other middleware
app.use(bodyParser.json());

// dynamic router define here
const fs = require("fs");
function addFile(folderPath) {
    fs.readdirSync(folderPath).forEach(function (file) {
        if (fs.lstatSync(folderPath + "\\" + file).isFile()) {
            console.log(folderPath + "\\" + file);
            app.use('/', require(folderPath + "\\" + file));
        } else {
            addFile(folderPath + "\\" + file);
        }
    });
}

addFile(normalizedPath);

// app.use((err, req, res) => {
//     //logger.info('test');
//     console.log('error 123')
//     if (err instanceof ErrorHandler) {
//         return res.status(503).json({
//             type: 'MongoError',
//             message: error.message
//         });
//     }
//     //logger.error('custom error: ' + err)
//     //next(err);
//     // handleError(err, res);
// });
/*app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', todoRouter);
app.use('/', testRouter);*/

module.exports = app;
