const express = require('express');
const app = express();

module.exports = app.post('/logout', (req, res) => {
    delete req.session.login;
    res.send({ logout: true });
});