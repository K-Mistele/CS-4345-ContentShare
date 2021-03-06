import {Server} from "./backend/server";
import express from 'express';
import bodyParser from "body-parser";

// app and middlewares
const app = express();
app.use(express.static('dist/frontend'));
app.use(bodyParser.json())


const port = 80;

const server = new Server(app);
server.start(port);