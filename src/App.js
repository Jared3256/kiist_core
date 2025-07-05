import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {notFound} from "./Handlers/ErrorManager.js";
import {logger} from "./middleware/logger.cjs";
import {corsOptions} from "./config/cors/corsOptions.js";
import errorHandler from "./middleware/errorHandler.js";
import {rootRouter} from "./Routes/root.cjs";
import systemRouter from "./Routes/system.route.js";
import morgan from "morgan";
import http from "http";
import {Server as SocketIo} from 'socket.io';
import path from 'path';

// create our Express app
const app = express();

app.use(logger);
app.use(morgan("dev"));

app.use(cors(corsOptions));

app.use(express.json());

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static("./public/css/"));

app.use("/", rootRouter);
app.use("/api/v1", systemRouter);

app.use(errorHandler);
app.use(notFound);

const serverApp = http.createServer(app);

// socket IO connection
const io = new SocketIo(serverApp, {cors: {origin: '*'}});

io.on('connection', (socket) => {

    socket.on('join-wait', (UserId) => {

        socket.join(UserId);
    });
});


export default serverApp;
