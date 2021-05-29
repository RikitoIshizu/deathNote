const express = require('express');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../../models/index');

const app = express();

const validation = require('../../mixin/validation.js');
const errorParameter = require('../../mixin/errorParameter.js');

module.exports = app.post('/resetPassword',
	validation.resetPassword,
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
      const { mail, password } = req.body;
      const searchCondition = {
        where: {
					mail: {[Op.eq]: mail}
				}
      }
      
      Writers.findAll(searchCondition).then(response => {
        if(!response.length) {
					sendParameter.isError = true;
					sendParameter.message = 'メールアドレスが登録されていません。';
					res.send(sendParameter);
				} else {
          db.sequelize.sync().then(() => {
						Writers.update({ password }, searchCondition).then(() => {
							res.send(sendParameter);
						});
					});
        }
      });
    }
  }
);