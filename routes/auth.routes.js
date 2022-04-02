module.exports = app => {
    const LOGIN = require("../controllers/auth/login.controller.js");

    app.post("/auth/login", LOGIN.login);
};