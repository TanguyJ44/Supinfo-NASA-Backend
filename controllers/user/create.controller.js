/* 
 * CREATE USER 
 */

const db = require("../../utils/database.js");
const Joi = require("@hapi/joi");

exports.create = async (req, res) => {

    /*if (!checkBodyParams(req.body)) {
        return res.status(400).json({
            "status": "error",
            "detail": "Un ou plusieurs paramètres de votre requête sont incorrects ou manquants !",
        });
    }*/

    const validator = await checkBodyParams(req.body);

    if (!validator) {
        return res.status(400).json({
            "status": "error",
            "detail": "Un ou plusieurs paramètres de votre requête sont incorrects ou manquants !",
        });
    }

    const newUser = new db.userModel({
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: req.body.password,
        isAdmin: false,
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
    return new Promise(resolve => {
        const schema = Joi.object().keys({
            email: Joi.string().email().min(3).max(30).required(),
            pseudo: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().alphanum().min(3).max(30).required(),
        });

        const result = Joi.validate(bodyParam, schema);

        result.then(() => {
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });

}

/*if (!bodyParam.email) return false;
    if (!bodyParam.pseudo) return false;
    if (!bodyParam.password) return false;

    return true;*/