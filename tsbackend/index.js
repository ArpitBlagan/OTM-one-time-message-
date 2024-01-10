"use strict";
const express = require("express");
const app = express();
const Cookie = require("cookie-parser");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const url = require("url");
const http = require("http");
const { addUser, delUser, sendd, users } = require("./socket");
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use(Cookie());
const server = http.createServer(app);
app.use("/online", (req, res) => {
    res.status(201).json(users);
});
const wss = new WebSocketServer({ noServer: true });
wss.on("connection", (ws, req) => {
    const urlParts = url.parse(req.url, true);
    const { number, id } = urlParts.query;
    console.log(number, id);
    addUser(id, number, ws);
    //first time you guys login
    ws.on("message", (message) => {
        console.log(users);
        const val = JSON.parse(message);
        console.log(val);
        sendd(val);
    });
    ws.on("close", () => {
        delUser(id, ws, wss);
        ws.close();
    });
});
server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
    });
});
server.listen(4000, () => {
    console.log(`server listening...`);
});
