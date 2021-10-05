import {Server} from "./backend/server";
import express from 'express';
import bodyParser from "body-parser";

const app = express();
app.use(express.static('frontend'));
app.use(bodyParser.json())

const port = 8080;

const server = new Server(app);
server.start(port);