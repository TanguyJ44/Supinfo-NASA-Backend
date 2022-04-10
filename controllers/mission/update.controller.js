/* 
 * UPDATE MISSION 
 */

const db = require("../../utils/database.js");

exports.update = (req, res) => {
    db.missionModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, mission) => {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "detail": "Une erreur est survenue lors de la mise à jour de la mission !",
            });
        }
        return res.status(200).json({
            "status": "success",
            "detail": "Mission modifié avec succès !",
            "mission": mission
        });
    });
};