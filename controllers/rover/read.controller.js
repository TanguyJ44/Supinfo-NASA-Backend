/* 
 * READ ROVER 
 */

const db = require("../../utils/database.js");

exports.getAll = (req, res) => {
    let limit = 10;

    if (req.query.limit) {
        limit = req.query.limit;
    }

    db.roverModel.find({
            name: req.query.name ? req.query.name : {
                $exists: true
            },
            construction_date: req.query.construction_date ? req.query.construction_date : {
                $exists: true
            }
        })
        .limit(limit)
        .exec()
        .then(rovers => {
            res.status(200).json({
                "status": "success",
                "rovers": rovers,
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Une erreur est survenue lors de la récupération des rovers !",
                error: err
            });
        });
};

exports.getOne = (req, res) => {

    if (!req.params.id) {
        return res.status(400).json({
            "status": "error",
            "detail": "Un ou plusieurs paramètres de votre requête sont incorrects ou manquants !",
        });
    }

    db.roverModel.findOne({
            _id: req.params.id
        })
        .then(rover => {
            if (!rover) {
                res.status(404).json({
                    "status": "error",
                    "detail": "Rover introuvable !",
                });
            } else {
                res.status(200).json({
                    "status": "success",
                    "rover": rover,
                });
            }
        })
        .catch(() => {
            res.status(500).json({
                "status": "error",
                "detail": "Une erreur est survenue lors de la récupération du rover !",
            });
        });

};