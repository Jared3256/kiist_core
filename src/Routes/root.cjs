const express = require("express");
const rootRouter = express.Router();
const path = require("path");

rootRouter.get("^/$|/index(.html)?", (req, res) => {

    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});


rootRouter.get("/public/css/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/css", "style.css"))
});

rootRouter.get("/public/css/script.js", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/css", "script.js"))
});
module.exports = {rootRouter};


