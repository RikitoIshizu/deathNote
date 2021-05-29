const express = require('express');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../../models/index');

const app = express();

const validation = require('../../mixin/validation.js');
const errorParameter = require('../../mixin/errorParameter.js');

module.exports = app.post('/login',
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
          mail: {[Op.eq]: mail},
          password: {[Op.eq]: password}
				}
      }

      Writers.findOne(searchCondition).then(response => {
         if(!response) {
          sendParameter.message = 'メールアドレスかパスワードに間違いがあります。';
          sendParameter.isError = true;
          
          res.send(sendParameter);
         } else {
           req.session.login = response;
           const { back } = req.session;

           sendParameter.route = !back ? '/top' : '/openDeathNote';

           res.send(sendParameter);
         }
      })
    }
  }
);