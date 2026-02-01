const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 🔥 SERVE CLIENT FILES
app.use(express.static(path.join(__dirname, "../client")));

// 🔥 SERVE INDEX.HTML ON ROOT
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

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

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
