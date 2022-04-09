/* 
 * CREATE ROVER 
 */

const db = require("../../utils/database.js");

exports.create = (req, res) => {

    if (!checkBodyParams(req.body)) {
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
    if (!bodyParam.name) return false;
    if (!bodyParam.construction_date) return false;
    if (!bodyParam.manufacturer) return false;
    if (!bodyParam.image) return false;

    return true;
}