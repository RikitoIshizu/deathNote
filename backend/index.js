const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const checklogin = require('./api/get/checkLogin.js');
const getKilaData = require('./api/get/getKilaData.js');

const register = require('./api/post/register.js');
const resetPassword = require('./api/post/resetPassword.js');
const login = require('./api/post/login.js');
const logout = require('./api/post/logout.js');
const editKilaData = require('./api/post/editKilaData.js');
const registerKillerPerson = require('./api/post/registerKillerPerson.js');
const getKilledPerson = require('./api/get/getKilledPerson.js');
const deleteKilaData = require('./api/post/deleteKilaData.js');

const app = express();
const session_opt = {
    secret: 'keybord cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
};

app.use(session(session_opt));
app.use(bodyParser.json());
app.use(cors());

// api
app.use(register);
app.use(resetPassword);
app.use(login);
app.use(checklogin);
app.use(logout);
app.use(getKilaData);
app.use(editKilaData);
app.use(registerKillerPerson);
app.use(getKilledPerson);
app.use(deleteKilaData);

app.listen(process.env.PORT || 8000);