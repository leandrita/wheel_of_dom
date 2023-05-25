const names = localStorage.getItem('names');
let namesArray = names ? JSON.parse(names) : [];
let winningName = localStorage.getItem('winningName');
const images = Array.from(document.getElementsByClassName("icon-cards__item"));
let currentImageIndex = 0;
const rotationDuration = 500;
const totalRotationTime = 9000;
const resetBtn = document.getElementById("reset-btn");
const nameBtn = document.getElementById("name-choosed-btn");
const song = new Audio('/sound/animation.mp3')
winningName = namesArray[namesArray.length - 1];

resetBtn.addEventListener("click", function() {
  localStorage.removeItem('names');
  window.location.href = "/html/index.html";
});

async function spinWheel() {
  const chooseRandomIndex = Math.floor(Math.random() * namesArray.length);
  const chosenName = namesArray[chooseRandomIndex];
  nameBtn.textContent = chosenName;
  namesArray.splice(chooseRandomIndex, 1);
  localStorage.setItem('names', JSON.stringify(namesArray));
  if (namesArray.length === 1) {
    localStorage.setItem('winningName', winningName);
    window.location.href = "/html/winner.html";
    return;
  }
  await delay(1000);
  window.location.href = "/html/crush.html";
    return;
  }


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startAnimation() {
  song.play();
  await delay (2000);
  const startTime = Date.now();
  const endTime = startTime + totalRotationTime;
  while (Date.now() < endTime - rotationDuration) {
    currentImageIndex = Math.floor((Date.now() - startTime) / rotationDuration) % images.length;
    images.forEach(function (image, index) {
      if (index === currentImageIndex) {
        image.classList.add("image-transition");
        image.style.display = "block";
      } else {
        image.style.display = "none";
      }
    });

    const currentIndex = Math.floor((Date.now() - startTime) / rotationDuration) % namesArray.length;
    nameBtn.textContent = namesArray[currentIndex];

    await delay(rotationDuration);

    if (Date.now() >= endTime - rotationDuration) {
      images.forEach(function (image, index) {
        if (index === images.length - 1) {
          image.style.display = "none";
        } else {
           image.style.display = "none";
         }
      });

      images[images.length - 1].src = "/img/puertafinal1.svg";
      images[images.length - 1].style.display = "block";
      await spinWheel();
    }

    images.forEach(function (image) {
      image.classList.remove("image-transition");
    });

    nameBtn.classList.remove("moving-btn");
    nameBtn.style.transform = "";
  }
}

spinBtn.addEventListener("click", startAnimation);
