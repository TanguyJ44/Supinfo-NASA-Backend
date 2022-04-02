/* 
 * UPDATE USER 
*/

const db = require("../../utils/database.js");

exports.update = (req, res) => {
    db.userModel.findByIdAndUpdate(req.userId, req.body, {
        new: true
    }, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        user.password = undefined;
        return res.status(200).json({
            "status": "success",
            "detail": "Utilisateur modifié avec succès !",
            "user": user
        });
    });
};
