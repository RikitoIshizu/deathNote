const express = require('express');
const { validationResult } = require('express-validator');
const db = require('../../models/index');

const app = express();

const { registerKillerData } = require('../../mixin/validation.js');
const errorParameter = require('../../mixin/errorParameter.js');

module.exports = app.post('/registerKillerPerson',
    registerKillerData,
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
				const { deadPersonList } = db;
				const { body, session } = req;
				const { causeOfDeath, detail, killPersonName } = body;
				const { id, name } = session.login;

        db.sequelize.sync().then(() => {
          deadPersonList.create({
            killerId: id,
            killerName: name,
            causeOfDeath: !causeOfDeath ? '心臓麻痺' : causeOfDeath,
            detail,
            killPersonName,
          }).then(() => {
            res.send(sendParameter);
          })
				});
    	}
  	}
)