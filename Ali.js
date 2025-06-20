import { db } from './firebase.js';
import {
  doc, setDoc, getDocs, collection, query, orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

export async function saveScore(score) {
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe.user;

  const ref = doc(db, "users", user.id.toString());
  await setDoc(ref, {
    username: user.username || "anon",
    score: score,
    updatedAt: new Date().toISOString()
  }, { merge: true });

  alert(`Score saved! You scored: ${score}`);
}

export async function getLeaderboard() {
  const q = query(collection(db, "users"), orderBy("score", "desc"), limit(5));
  const querySnapshot = await getDocs(q);
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "<h3>🏆 Leaderboard</h3>";
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    leaderboard.innerHTML += `<div>@${d.username}: ${d.score}</div>`;
  });
}