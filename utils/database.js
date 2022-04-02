const mongoose = require("mongoose");

const mongo = mongoose.connect("mongodb+srv://supinfo:supinfo@cluster.f54yc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connecté !"))
    .catch(() => console.log("MongoDB erreur !"));


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    pseudo: {
        type: String,
        unique: true,
    },
    password: String,
    isAdmin: Boolean,
});

const userModel = mongoose.model("users", userSchema);

module.exports = {
    mongo,
    userSchema,
    userModel,
};