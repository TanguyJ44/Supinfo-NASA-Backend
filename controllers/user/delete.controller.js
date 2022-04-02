/* 
 * DELETE USER 
*/

const db = require("../../utils/database.js");

exports.delete = (req, res) => {
    db.userModel.findByIdAndRemove(req.userId, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({
            "status": "success",
            "detail": "Utilisateur supprimé avec succès !"
        });
    });
};