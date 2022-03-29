module.exports = app => {
    const CREATE = require("../controllers/user/create.controller.js");
    const READ = require("../controllers/user/read.controller.js");
    const UPDATE = require("../controllers/user/update.controller.js");
    const DELETE = require("../controllers/user/delete.controller.js");

    app.post("/user", CREATE.create);
    app.get("/user", READ.getAll);
    app.get("/user/:id", READ.getOne);
    app.put("/user", UPDATE.update);
    app.delete("/user", DELETE.delete);
};