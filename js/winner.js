const resetBtn = document.getElementById("reset-btn");
const win = new Audio('/sound/applause.mp3');

document.addEventListener("DOMContentLoaded", function() {
  win.play();
  const nameSpan = document.querySelector(".name");
  const winningName = localStorage.getItem('winningName');

  if (winningName) {
    nameSpan.textContent = winningName;
  }
});

resetBtn.addEventListener("click", function() {
  localStorage.removeItem('names');
  localStorage.removeItem('winningName');
  window.location.href = "/html/index.html";
});