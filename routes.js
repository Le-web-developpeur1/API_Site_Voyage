const express = require("express");
const db = require("./db");
const router = express.Router();


// Liste des voyages
router.get("/voyages", (req, res) => {
    db.query("SELECT * FROM voyages", (err, results) => {
        if (err) res.status(500).json(err);
        else res.json(results);
    });
});

// Ajouter une réservation
router.post("/reserver", (req, res) => {
    const { destination, date_depart, date_retour, utilisateur_id } = req.body;
    db.query(
        "INSERT INTO reservations (destination, date_depart, date_retour, utilisateur_id) VALUES (?, ?, ?, ?)",
        [destination, date_depart, date_retour, utilisateur_id],
        (err, result) => {
            if (err) res.status(500).json(err);
            else res.json({ message: "Réservation enregistrée !" });
        }
    );
});

module.exports = router;
