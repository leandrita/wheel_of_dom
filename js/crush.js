const chosenName = localStorage.getItem('chosenName');

document.addEventListener('DOMContentLoaded', function() {
  const image = document.getElementById('image');
  
  setTimeout(function() {
    image.classList.add('hidden');
    setTimeout(function() {
      window.location.href = '/html/game.html';
    }, 300);
  }, 1000);
});
