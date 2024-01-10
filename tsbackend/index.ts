const express = require("express");
const app = express();
const Cookie = require("cookie-parser");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const url = require("url");
const http = require("http");
const { userManger } = require("./manager/userManager");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(Cookie());
const server = http.createServer(app);
const userManager = new userManger();
app.use("/online", (req: Request, res: any) => {
  res.status(201).json(userManager.users);
});

const wss = new WebSocketServer({ noServer: true });
wss.on("connection", (ws: any, req: Request) => {
  const urlParts = url.parse(req.url, true);
  const { number, id } = urlParts.query;
  console.log(number, id);
  userManager.addUser(id, number, ws);
  //first time you guys login
  ws.on("message", (message: any) => {
    console.log(userManager.users);
    const val = JSON.parse(message);
    console.log(val);
    userManager.sendd(val);
  });
  ws.on("close", () => {
    userManager.delUser(id, ws, wss);
    ws.close();
  });
});
server.on("upgrade", (req: Request, socket: WebSocket, head: any) => {
  wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
    wss.emit("connection", ws, req);
  });
});
server.listen(4000, () => {
  console.log(`server listening...`);
});
