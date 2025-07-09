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
rootRouter.get("/public/images/image-1.png", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/images", "image-1.png"))
});
rootRouter.get("/public/images/image-2.png", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/images", "image-2.png"))
});
module.exports = {rootRouter};


