const crush = new Audio('/sound/breaking-door.mp3');

window.addEventListener('load', function() {
  const image = document.getElementById('image');
  
  setTimeout(function() {
    crush.play();
    image.classList.add('hidden');
    setTimeout(function() {
      window.location.href = '/html/game.html';
    }, 1000);
  }, 1000);
});
