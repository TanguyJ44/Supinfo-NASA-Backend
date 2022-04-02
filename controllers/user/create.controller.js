/* 
 * CREATE USER 
 */

const db = require("../../utils/database.js");

exports.create = (req, res) => {

    if (!checkBodyParams(req.body)) {
        return res.status(400).json({
            "status": "error",
            "detail": "Un ou plusieurs paramètres de votre requête sont incorrects ou manquants !",
        });
    }

    let newUser = new db.userModel({
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    });

    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "detail": "L'utilisateur existe déjà ! L'email et le pseudo doivent être unique.",
            });
        } else {
            return res.status(201).json({
                "status": "success",
                "detail": "Utilisateur créé avec succès !",
                "id": user._id,
            });
        }
    });

};

function checkBodyParams(bodyParam) {
    if (!bodyParam.email) return false;
    if (!bodyParam.pseudo) return false;
    if (!bodyParam.password) return false;
    if (typeof bodyParam.isAdmin !== "boolean") return false;

    return true;
}