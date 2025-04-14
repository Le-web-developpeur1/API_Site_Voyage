const express = require("express");
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const router = express.Router();

// Inscription d'un utilisateur
router.post("/register", [
    body("nom").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nom, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO utilisateurs (nom, email, password) VALUES (?, ?, ?)", 
    [nom, email, hashedPassword], 
    (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Inscription réussie !" });
    });
});

// Connexion d'un utilisateur
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM utilisateurs WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(401).json({ message: "Utilisateur non trouvé !" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect !" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, message: "Connexion réussie !" });
    });
});

module.exports = router;
