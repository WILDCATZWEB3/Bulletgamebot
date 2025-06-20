window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const leaderboard = document.getElementById("leaderboard");

  let score = 0;
  const targetImage = new Image();
  targetImage.src = "./human-target.png";

  const shotSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_2bdf3f8619.mp3");

  let x = Math.random() * 240;
  let y = Math.random() * 240;

  function drawTarget() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(targetImage, x, y, 60, 60);
  }

  function updateLeaderboard() {
    leaderboard.innerHTML = `<h3>🏆 Leaderboard</h3>
      <ul>
        <li>@sniperjoe – 15</li>
        <li>@gunnerx – 12</li>
        <li>@katashoot – 10</li>
        <li>@ninjaop – 9</li>
        <li>@apetrade – 7</li>
      </ul>`;
  }

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (
      mouseX >= x && mouseX <= x + 60 &&
      mouseY >= y && mouseY <= y + 60
    ) {
      score++;
      shotSound.currentTime = 0;
      shotSound.play();
      x = Math.random() * 240;
      y = Math.random() * 240;
      drawTarget();
    }
  });

  window.endGame = () => {
    alert(`🎯 Game over! Your score: ${score}`);
    updateLeaderboard();
  };

  targetImage.onload = () => drawTarget();
});