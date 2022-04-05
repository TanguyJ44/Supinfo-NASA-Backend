/* 
 * UPDATE MISSION 
 */

const db = require("../../utils/database.js");

exports.update = (req, res) => {
    db.missionModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, mission) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({
            "status": "success",
            "detail": "Mission modifié avec succès !",
            "mission": mission
        });
    });
};