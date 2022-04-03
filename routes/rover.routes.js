module.exports = app => {
    const CREATE = require("../controllers/rover/create.controller.js");
    const READ = require("../controllers/rover/read.controller.js");
    const UPDATE = require("../controllers/rover/update.controller.js");
    const DELETE = require("../controllers/rover/delete.controller.js");

    app.post("/rover", CREATE.create);
    app.get("/rover", READ.getAll);
    app.get("/rover/:id", READ.getOne);
    app.put("/rover/:id", UPDATE.update);
    app.delete("/rover/:id", DELETE.delete);
};