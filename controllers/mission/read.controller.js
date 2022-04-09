/* 
 * READ MISSION 
 */

const db = require("../../utils/database.js");

exports.getAll = (req, res) => {
    let limit = 10;
    let date = null;

    if (req.query.limit) {
        limit = req.query.limit;
    }
    if (req.query.date) {
        date = new Date(req.query.date);
    }

    db.missionModel.find({
            name: req.query.name ? req.query.name : {
                $exists: true
            },
            start_date: date ? date : {
                $exists: true
            },
            country: req.query.country ? req.query.country : {
                $exists: true
            }
        })
        .limit(limit)
        .exec()
        .then(missions => {
            res.status(200).json({
                "status": "success",
                "missions": missions,
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Une erreur est survenue lors de la récupération des missions !",
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

    db.missionModel.findOne({
            _id: req.params.id
        })
        .then(mission => {
            if (!mission) {
                res.status(404).json({
                    "status": "error",
                    "detail": "Mission introuvable !",
                });
            } else {
                res.status(200).json({
                    "status": "success",
                    "mission": mission,
                });
            }
        })
        .catch(() => {
            res.status(500).json({
                "status": "error",
                "detail": "Une erreur est survenue lors de la récupération de la mission !",
            });
        });

};