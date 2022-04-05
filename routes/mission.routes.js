module.exports = app => {
    const CREATE = require("../controllers/mission/create.controller.js");
    const READ = require("../controllers/mission/read.controller.js");
    const UPDATE = require("../controllers/mission/update.controller.js");
    const DELETE = require("../controllers/mission/delete.controller.js");

    app.post("/mission", CREATE.create);
    app.get("/mission", READ.getAll);
    app.get("/mission/:id", READ.getOne);
    app.put("/mission/:id", UPDATE.update);
    app.delete("/mission/:id", DELETE.delete);
};