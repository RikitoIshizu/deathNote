const express = require('express');
const app = express();

module.exports = app.get('/checkLogin', (req, res) => {
    res.send({ isLogin: req.session.login });
});