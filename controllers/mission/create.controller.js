/* 
 * CREATE MISSION 
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

    const rovers = req.body.rovers;

    let next = true;
    let rover_count = 0;

    var roversCheck = new Promise((resolve, reject) => {
        rovers.forEach(rover => {
            db.missionModel.countDocuments({
                rovers: rover
            }, function (err, count) {
                rover_count++;
                if (count > 0) {
                    next = false;
                }
                if (rovers.length == rover_count) resolve();
            });
        });
    });

    roversCheck.then(() => {
        if (!next) {
            return res.status(400).json({
                "status": "error",
                "detail": "Un ou plusieurs rovers sont déjà affectés à une mission !",
            });
        } else {
            const newMission = new db.missionModel({
                name: req.body.name,
                country: req.body.country,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                rovers: req.body.rovers,
                author: req.userId
            });

            newMission.save(function (err, mission) {
                if (err) {
                    return res.status(400).json({
                        "status": "error",
                        "detail": "La mission existe déjà ! Le nom de la mission doit être unique.",
                    });
                } else {
                    return res.status(201).json({
                        "status": "success",
                        "detail": "Mission créé avec succès !",
                        "id": mission._id,
                    });
                }
            });
        }
    });

};

function checkBodyParams(bodyParam) {
    return new Promise(resolve => {
        const schema = Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(30).required(),
            country: Joi.string().alphanum().min(3).max(30).required(),
            start_date: Joi.string(),
            end_date: Joi.string().required(),
            rovers: Joi.array().items(Joi.string()).required()
        });

        const result = Joi.validate(bodyParam, schema);

        result.then(() => {
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });

}