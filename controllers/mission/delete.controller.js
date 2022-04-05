/* 
 * DELETE MISSION 
 */

const db = require("../../utils/database.js");

exports.delete = (req, res) => {

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
                if (req.userIsAdmin == false || mission.author != req.userId) {
                    return res.status(403).json({
                        "status": "error",
                        "detail": "Seul un administrateur ou l'auteur peut supprimer une mission !"
                    });
                }

                db.missionModel.findByIdAndRemove(req.params.id, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.status(200).json({
                        "status": "success",
                        "detail": "Mission supprimé avec succès !"
                    });
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