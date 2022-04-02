/* 
 * READ USER 
 */

const db = require("../../utils/database.js");

exports.getAll = (req, res) => {
    db.userModel.find({})
        .then(users => {
            users.forEach(user => {
                user.password = undefined;
            });
            return res.status(200).json({
                "status": "success",
                "users": users,
            });
        }).catch(() => {
            return res.status(500).json({
                "status": "error",
                "detail": "Erreur lors de la récupération des utilisateurs",
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

    db.userModel.findOne({
            _id: req.params.id
        })
        .then(user => {
            if (!user) {
                res.status(404).json({
                    "status": "error",
                    "detail": "Utilisateur introuvable !",
                });
            } else {
                user.password = undefined;
                res.status(200).json({
                    "status": "success",
                    "user": user,
                });
            }
        })
        .catch(() => {
            res.status(500).json({
                "status": "error",
                "detail": "Une erreur est survenue lors de la récupération de l'utilisateur !",
            });
        });
};