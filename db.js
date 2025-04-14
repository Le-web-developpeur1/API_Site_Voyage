const mysql = require("mysql2");
require("dotenv").config();
console.log("🔍 Vérification des variables MySQL : ", process.env); 

console.log("🔍 DB_HOST:", process.env.DB_HOST);
console.log("🔍 DB_USER:", process.env.DB_USER);
console.log("🔍 DB_PASS:", process.env.DB_PASS ? "Mot de passe présent" : "❌ Mot de passe vide !");
console.log("🔍 DB_NAME:", process.env.DB_NAME);
console.log("🔍 DB_PORT:", process.env.DB_PORT || 3306);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306});

db.connect(err => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
    } else {
        console.log("Base de données connectée !");
    }
});

module.exports = db;