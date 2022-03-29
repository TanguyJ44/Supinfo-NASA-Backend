const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

require("./routes/user.routes.js")(app);

app.listen(3000, () => {
    console.log("Server is running !");
});