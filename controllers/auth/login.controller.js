/* 
 * AUTH LOGIN
 */

const jwt = require("jsonwebtoken");
const db = require("../../utils/database.js");
const utils = require("../../utils/utils.js");

exports.login = (req, res) => {

    if (!checkBodyParams(req.body)) {
        return res.status(400).json({
            "status": "error",
            "detail": "Un ou plusieurs paramètres de votre requête sont incorrects ou manquants !",
        });
    }

    db.userModel.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user != null && user.password == req.body.password) {
                const token = jwt.sign({
                    id: user.id
                }, utils.TOKEN_SECRET, {
                    expiresIn: '600s'
                });

                res.status(200).json({
                    "status": "success",
                    "token": token,
                });
            } else {
                res.status(401).json({
                    "status": "error",
                    "detail": "Email ou mot de passe incorrect !",
                });
            }
        })
        .catch(() => {
            res.status(500).json({
                "status": "error",
                "detail": "Erreur interne au serveur !"
            });
        });

};

function checkBodyParams(bodyParam) {
    if (!bodyParam.email) return false;
    if (!bodyParam.password) return false;

    return true;
}