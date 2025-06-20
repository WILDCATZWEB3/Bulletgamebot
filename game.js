import { saveScore, getLeaderboard } from "./api.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let score = 0;
let x = Math.random() * 280;
let y = Math.random() * 280;

function drawTarget() {
  ctx.clearRect(0, 0, 300, 300);
  ctx.beginPath();
  ctx.arc(x + 10, y + 10, 10, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const dist = Math.hypot(mouseX - (x + 10), mouseY - (y + 10));
  if (dist < 15) {
    score++;
    x = Math.random() * 280;
    y = Math.random() * 280;
    drawTarget();
  }
});

window.endGame = async () => {
  await saveScore(score);
  await getLeaderboard();
};

drawTarget();