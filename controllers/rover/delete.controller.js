/* 
 * DELETE ROVER 
 */

const db = require("../../utils/database.js");

exports.delete = (req, res) => {

    if (req.userIsAdmin == false) {
        return res.status(403).json({
            "status": "error",
            "detail": "Seul un administrateur peut supprimer un rover !"
        });
    }

    db.roverModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "detail": "Erreur lors de la suppression du rover !"
            });
        }
        return res.status(200).json({
            "status": "success",
            "detail": "Rover supprimé avec succès !"
        });
    });

};