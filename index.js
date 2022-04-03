const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const db = require("./utils/database.js");
const utils = require("./utils/utils.js");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    if (req.method == "GET") {
        req.bypass = true;
        return next();
    }
    switch (req.path) {
        case "/auth/login":
            req.bypass = true;
            break;
        case "/user":
            if (req.method == "POST") {
                req.bypass = true;
            } else {
                req.bypass = false;
            }
            break;
        default:
            req.bypass = false;
            break;
    }

    next();
});

app.use(function (req, res, next) {
    if (req.bypass == true) return next();

    if (!req.headers.authorization) {
        return res.status(401).send({
            message: "Vous n'êtes pas autorisé !"
        });
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    if (token) {
        jwt.verify(token, utils.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.sendStatus(403);
            } else {
                db.userModel.findById(decoded.id, (err, user) => {
                    if (err) {
                        res.sendStatus(403);
                    } else {
                        req.authToken = token;
                        req.userId = user._id;
                        req.userIsAdmin = user.isAdmin;
                        next();
                    }
                });
            }
        });
    } else {
        res.sendStatus(403);
    }
});

require("./routes/auth.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/rover.routes.js")(app);
require("./routes/mission.routes.js")(app);

app.listen(3000, () => {
    console.log("Server is running !");
});