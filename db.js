const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error("Erreur de connexion à MySQL:", err);
    } else {
        console.log("Base de données connectée !");
    }
});

module.exports = db;