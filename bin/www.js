#!/usr/bin/env node

/**
 * Module dependencies.
 */
import logger from '../config/Logger';
import CustomError from '../error/CustomError';
import swaggerConfig from '../config/Swagger';
import corn from '../cron/Cron';
import WebSocket from '../config/WebSocket';

const app = require('../app'),
	http = require('http'),
	mongoose = require('mongoose');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**
 * Create HTTP server.
 */

app.all('*', (req, res, next) => {
	res.status(404).json({
		status: 'fail',
		message: `Can't find ${req.originalUrl} on this server!`
	});
	console.log('all error 404')
});

app.use((err, req, res, next) => {
	err.status = err.status || 500;
	err.status = err.status || 'error';
	logger.warn(err);
	res.status(422).json(err);
});
const server = http.createServer(app);

/**
 * Connect to MongoDB
 */

mongoose.connect('mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_HOST + '/' + process.env.MONGO_DB,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	}
)
	.then(() => {
		logger.info("MongoDB is Connected");
	})
	.catch((error) => {
		logger.error("MongoDB is not connected because of: " + error);
	})

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	logger.info('Listening on ' + bind);
}


module.exports = app;