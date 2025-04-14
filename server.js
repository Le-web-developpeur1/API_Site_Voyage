const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const routes = require("./routes");
const authRoutes = require("./auth");



app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Bienvenue sur ExplorePlus API");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
