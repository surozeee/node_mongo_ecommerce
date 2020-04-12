const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res, next) {
	// res.sendFile(__dirname + 'ws.html');
	res.sendFile('ws.html', { root: './public/' });
});

module.exports = router;
