const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

ctx.lineCap = "round";
ctx.lineJoin = "round";

function drawStroke(s) {
  if (s.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = s.color;
  }

  ctx.lineWidth = s.size;
  ctx.beginPath();
  ctx.moveTo(s.start.x, s.start.y);
  ctx.lineTo(s.end.x, s.end.y);
  ctx.stroke();
}

function rebuild(strokes) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes.forEach(drawStroke);
}
