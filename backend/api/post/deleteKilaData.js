const express = require('express');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../../models/index');

const app = express();

module.exports = app.post('/deleteKilaData',
    (req, res) => {
    db.sequelize.sync().then(() => {
        const { id } = req.body;
        db.Writers.destroy({
            where: {
                id: {[Op.eq]: id},
            } 
        }).then(() => {
            res.send({ result: 1 });
        });
    });
  	}
)