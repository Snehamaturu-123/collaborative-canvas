const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../client")));

let strokes = [];
let redoStack = [];

io.on("connection", socket => {
  socket.emit("init", strokes);

  socket.on("draw", stroke => {
    strokes.push(stroke);
    redoStack = [];
    socket.broadcast.emit("draw", stroke);
  });

  socket.on("undo", () => {
    if (!strokes.length) return;
    redoStack.push(strokes.pop());
    io.emit("rebuild", strokes);
  });

  socket.on("redo", () => {
    if (!redoStack.length) return;
    strokes.push(redoStack.pop());
    io.emit("rebuild", strokes);
  });
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
