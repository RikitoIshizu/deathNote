const express = require('express');
const app = express();
const db = require('../../models/index');

module.exports = app.get('/getKilledPerson', (req, res) => {
	const { deadPersonList } = db;

	deadPersonList.findAll({
		order: [
			['createdAt', 'DESC']
		]
	}).then(response => {
		const sendData = response;
		delete sendData.createdAt;
        delete sendData.updatedAt;
        res.send(sendData);
	});
});