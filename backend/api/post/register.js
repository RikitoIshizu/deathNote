const express = require('express');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../../models/index');

const app = express();

const validation = require('../../mixin/validation.js');
const errorParameter = require('../../mixin/errorParameter.js');

module.exports = app.post('/register',
	validation.register,
	(req, res) => {
		const { sendParameter } = errorParameter;

		console.log(req);

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
			const { name, mail, password, age, occupation} = req.body;

			Writers.findAll({
				where: {
					mail: {[Op.eq]: mail}
				}
			}
			).then(response => {
				if(response.length) {
					sendParameter.isError = true;
					sendParameter.message = 'そのメールアドレスはすでに登録されています。';
					res.send(sendParameter);
				} else {
					db.sequelize.sync().then(() => {
						Writers.create({
							name,
							mail,
							password,
							age,
							occupation
						}).then(() => {
							res.send(sendParameter);
						})
					});
				} 
			})
		}
	}
);