const express = require('express');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../../models/index');

const app = express();

const validation = require('../../mixin/validation.js');
const errorParameter = require('../../mixin/errorParameter.js');

module.exports = app.post('/editKilaData',
  validation.register,
  (req, res) => {
    const { sendParameter } = errorParameter;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        errors.array().map(el => {
            const returnData = el;
            delete returnData.location;
            delete returnData.value;

            return sendParameter.errorList.push(returnData);
        });
        sendParameter.message = 'エラーがあります。';
        sendParameter.isError = true;

        res.send(sendParameter);
    } else {
        const { Writers } = db;
        const { name, mail, password, age, occupation, id} = req.body;

        const searchCondition = {
            where: {
              id: {[Op.eq]: id},
            }
        };
        
        Writers.findAll(searchCondition).then(response => {
            db.sequelize.sync().then(() => {
                Writers.update({
                    name, mail, password, age, occupation,
                }, searchCondition).then(() => {
                    res.send(sendParameter);
                });
            });
        })
    }
  }
);