/* 
 * CREATE ROVER 
 */

const db = require("../../utils/database.js");
const Joi = require("@hapi/joi");

exports.create = async (req, res) => {

    const validator = await checkBodyParams(req.body);

    if (!validator) {
        return res.status(400).json({
            "status": "error",
            "detail": "Un ou plusieurs paramètres de votre requête sont incorrects ou manquants !",
        });
    }

    const newRover = new db.roverModel({
        name: req.body.name,
        launch_date: req.body.launch_date != undefined ? req.body.launch_date : new Date(),
        construction_date: req.body.construction_date,
        manufacturer: req.body.manufacturer,
        image: req.body.image,
    });

    newRover.save(function (err, rover) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "detail": "Le rover existe déjà ! Le nom du rover doit être unique.",
            });
        } else {
            return res.status(201).json({
                "status": "success",
                "detail": "Rover créé avec succès !",
                "id": rover._id,
            });
        }
    });

};

function checkBodyParams(bodyParam) {
    return new Promise(resolve => {
        const schema = Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(30).required(),
            launch_date: Joi.string(),
            construction_date: Joi.string().required(),
            manufacturer: Joi.string().alphanum().min(3).max(30).required(),
            image: Joi.string().uri().required()
        });

        const result = Joi.validate(bodyParam, schema);

        result.then(() => {
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });

}