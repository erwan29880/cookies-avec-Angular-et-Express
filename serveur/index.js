const express = require("express");
const app = express();
const PORT = 5100;
app.set("trust proxy", 1);
app.use("/", require('./router/route'));

// installation Bdd, exécuter 2 fois (création bdd, alimentation table)
// const Bdd = require('./bdd/bdd');
// const db = new Bdd();
// db.createTable();
// db.insertInitialData();

app.listen(PORT, () => console.log(`serveur listening on port ${PORT}`));