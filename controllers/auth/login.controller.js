/* 
 * AUTH LOGIN
 */

const db = require("../../utils/database.js");
const utils = require("../../utils/utils.js");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

exports.login = async (req, res) => {

    const validator = await checkBodyParams(req.body);

    if (!validator) {
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
                    expiresIn: '3600s'
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
    return new Promise(resolve => {
        const schema = Joi.object().keys({
            email: Joi.string().email().min(3).max(30).required(),
            password: Joi.string().alphanum().min(3).max(30).required()
        });

        const result = Joi.validate(bodyParam, schema);

        result.then(() => {
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });

}