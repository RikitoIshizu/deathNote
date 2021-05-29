const express = require('express');
const app = express();
const { Op } = require('sequelize');
const db = require('../../models/index');

module.exports = app.get('/getKilaData', (req, res) => {
    const { mail, password } = req.session.login;

    const searchCondition = {
        where: {
          mail: {[Op.eq]: mail},
          password: {[Op.eq]: password}
		}
    };

    db.Writers.findOne(searchCondition).then(response => {
        const sendData = response;
        delete sendData.createdAt;
        delete sendData.updatedAt;
        res.send(sendData);
    });
});