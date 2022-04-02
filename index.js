const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const utils = require("./utils/utils.js");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

/*app.use(function (req, res, next) {
    const token = req.headers.authorization.replace("Bearer ", "");
    
    if (token) {
        jwt.verify(token, utils.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
});*/

require("./routes/auth.routes.js")(app);
require("./routes/user.routes.js")(app);

app.listen(3000, () => {
    console.log("Server is running !");
});