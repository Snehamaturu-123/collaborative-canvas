document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  let drawing = false;
  let prev = null;
  let tool = "brush";

  const canvas = document.getElementById("canvas");
  const colorInput = document.getElementById("color");
  const sizeInput = document.getElementById("size");
  const brushBtn = document.getElementById("brush");
  const eraserBtn = document.getElementById("eraser");
  const undoBtn = document.getElementById("undo");
  const redoBtn = document.getElementById("redo");

  socket.on("init", strokes => {
    rebuild(strokes);
  });

  canvas.addEventListener("mousedown", e => {
    drawing = true;
    prev = getPos(e);
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    prev = null;
  });

  canvas.addEventListener("mousemove", e => {
    if (!drawing) return;

    const curr = getPos(e);

    const stroke = {
      start: prev,
      end: curr,
      color: colorInput.value || "#000000",
      size: sizeInput.value || 4,
      tool
    };

    drawStroke(stroke);
    socket.emit("draw", stroke);

    prev = curr;
  });

  socket.on("draw", drawStroke);
  socket.on("rebuild", rebuild);

  brushBtn.addEventListener("click", () => {
    tool = "brush";
    console.log("Brush selected");
  });

  eraserBtn.addEventListener("click", () => {
    tool = "eraser";
    console.log("Eraser selected");
  });

  undoBtn.addEventListener("click", () => {
    socket.emit("undo");
  });

  redoBtn.addEventListener("click", () => {
    socket.emit("redo");
  });

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };
  }
});
