window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const leaderboard = document.getElementById("leaderboard");

  const fighterImg = new Image();
  fighterImg.src = "./IMG_2639.png"; // Your image

  const shotSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_2bdf3f8619.mp3");

  let gameRunning = false;
  let roundStarted = false;

  let fighter1 = { x: 30, y: 100, hp: 5 };
  let fighter2 = { x: 210, y: 100, hp: 5 };

  function drawPlayers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw fighters
    ctx.drawImage(fighterImg, fighter1.x, fighter1.y, 60, 60);
    ctx.drawImage(fighterImg, fighter2.x, fighter2.y, 60, 60);

    // Draw HP bars
    ctx.fillStyle = "red";
    ctx.fillRect(fighter1.x, fighter1.y - 10, fighter1.hp * 10, 5);
    ctx.fillRect(fighter2.x, fighter2.y - 10, fighter2.hp * 10, 5);
  }

  function startCountdown(callback) {
    let count = 3;
    leaderboard.innerHTML = `<h2>⏳ Fight starts in ${count}...</h2>`;
    const interval = setInterval(() => {
      count--;
      leaderboard.innerHTML = `<h2>⏳ Fight starts in ${count}...</h2>`;
      if (count === 0) {
        clearInterval(interval);
        leaderboard.innerHTML = "";
        callback();
      }
    }, 1000);
  }

  function handleHit(target) {
    target.hp--;
    shotSound.currentTime = 0;
    shotSound.play();

    // Flash effect (animation)
    ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
    ctx.fillRect(target.x, target.y, 60, 60);
    setTimeout(drawPlayers, 100);

    if (target.hp <= 0) {
      gameRunning = false;
      leaderboard.innerHTML = `<h2>🏆 ${target === fighter1 ? "Fighter 2" : "Fighter 1"} Wins!</h2>`;
    }
  }

  canvas.addEventListener("click", (e) => {
    if (!gameRunning || !roundStarted) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (
      mouseX >= fighter1.x && mouseX <= fighter1.x + 60 &&
      mouseY >= fighter1.y && mouseY <= fighter1.y + 60
    ) {
      handleHit(fighter1);
    }

    if (
      mouseX >= fighter2.x && mouseX <= fighter2.x + 60 &&
      mouseY >= fighter2.y && mouseY <= fighter2.y + 60
    ) {
      handleHit(fighter2);
    }

    drawPlayers();
  });

  window.startFight = () => {
    fighter1.hp = 5;
    fighter2.hp = 5;
    gameRunning = true;
    roundStarted = false;
    drawPlayers();
    startCountdown(() => {
      roundStarted = true;
    });
  };

  window.endFight = () => {
    gameRunning = false;
    roundStarted = false;
    leaderboard.innerHTML = `<h2>🛑 Fight Cancelled</h2>`;
  };

  fighterImg.onload = drawPlayers;
});