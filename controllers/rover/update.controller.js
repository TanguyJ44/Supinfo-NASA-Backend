/* 
 * UPDATE ROVER 
 */

const db = require("../../utils/database.js");

exports.update = (req, res) => {
    db.roverModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, rover) => {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "detail": "Une erreur est survenue lors de la mise à jour du rover !",
            });
        }
        return res.status(200).json({
            "status": "success",
            "detail": "Rover modifié avec succès !",
            "rover": rover
        });
    });
};