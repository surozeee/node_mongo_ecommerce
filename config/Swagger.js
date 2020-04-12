const app = require('../app');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
	info: {
		title: 'MERN Swagger API',
		version: '1.0.0',
		description: 'Endpoints to test the routes',
	},
	host: 'localhost:3000',
	basePath: '/',
	securityDefinitions: {
		bearerAuth: {
			type: 'apiKey',
			name: 'Authorization',
			scheme: 'bearer',
			in: 'header',
		},
	},
};


const options = {
	swaggerDefinition,
	apis: ['./controller/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
