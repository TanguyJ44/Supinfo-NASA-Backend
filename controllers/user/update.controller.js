/* 
 * UPDATE USER 
*/

const db = require("../../utils/database.js");

exports.update = (req, res) => {
    if (req.userIsAdmin == false && req.params.id != req.userId) {
        return res.status(403).send({
            "status": "error",
            "message": "Vous ne pouvez pas modifier un autre utilisateur sans être admin !"
        });
    }

    if (req.userIsAdmin == false && req.body.isAdmin != null) {
        return res.status(403).send({
            "status": "error",
            "message": "Vous ne pouvez pas modifier votre grade sans être admin !"
        });
    }

    db.userModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, user) => {
        if (err) {
            return res.status(500).send({
                "status": "error",
                "message": "Une erreur est survenue lors de la mise à jour de l'utilisateur !",
            });
        }
        user.password = undefined;
        return res.status(200).json({
            "status": "success",
            "detail": "Utilisateur modifié avec succès !",
            "user": user
        });
    });
};
