/* 
 * UPDATE ROVER 
 */

const db = require("../../utils/database.js");

exports.update = (req, res) => {
    db.roverModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, rover) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({
            "status": "success",
            "detail": "Rover modifié avec succès !",
            "rover": rover
        });
    });
};