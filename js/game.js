const names = localStorage.getItem('names');
let namesArray = names ? JSON.parse(names) : [];
const images = Array.from(document.getElementsByClassName("icon-cards__item"));
let currentImageIndex = 0;
const rotationDuration = 500;
const totalRotationTime = 8000;
const resetBtn = document.getElementById("reset-btn");
const nameBtn = document.getElementById("name-choosed-btn");

let winningName = namesArray[namesArray.length - 1];

resetBtn.addEventListener("click", function() {
  localStorage.removeItem('names');
  window.location.href = "/html/index.html";
});

async function spinWheel() {
  const chooseRandomIndex = Math.floor(Math.random() * namesArray.length);
  const chosenName = namesArray[chooseRandomIndex];
  nameBtn.textContent = chosenName;
  namesArray.splice(chooseRandomIndex, 1);
  if (namesArray.length === 1) {
    nameBtn.textContent = winningName + " win!";
    return;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startAnimation() {
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

    const doorWidth = document.getElementById("door-content").offsetWidth;
    const imageWidth = images[currentImageIndex].offsetWidth;
    const buttonWidth = nameBtn.offsetWidth;
    const displacement = (doorWidth - imageWidth - buttonWidth) / 2;

    nameBtn.classList.add("moving-btn");
    nameBtn.style.transform = `translateX(${displacement}px)`;

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
