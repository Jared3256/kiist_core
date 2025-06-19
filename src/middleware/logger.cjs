const {format} = require("date-fns");
const {request} = require("express");
const {v4: uuid} = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t\t${uuid()}\t\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        }
        await fsPromises.appendFile(
            path.join(__dirname, "..", "logs", logFileName),
            logItem
        );
    } catch (err) {

    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t\t${req.url}\t\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method}  ${req.path}`);
    next();
};
module.exports = {logger, logEvents};
