let names = localStorage.getItem('names');
names = names ? JSON.parse(names) : [];
const nameList = document.getElementById("name-list");
const addNameBtn = document.getElementById("add-name-btn");
const quitNameBtn = document.getElementById("quit-name-btn");
const startBtn = document.getElementById("start-btn");
const clearListBtn = document.getElementById("clear-list-btn");
const soundRemove = new Audio('/sound/name-delete.mp3');
const soundAdd = new Audio('/sound/name-entry.mp3');

// Función para renderizar la lista de nombres
function renderNameList() {
  nameList.innerHTML = "";
  for (let i = 0; i < names.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = names[i];
    listItem.addEventListener("click", selectName);
    nameList.appendChild(listItem);
  }
}

// Función para seleccionar un nombre de la lista
function selectName() {
  var selectedName = document.querySelector("li.selected");
  if (selectedName) {
    selectedName.classList.remove("selected");
  }
  this.classList.add("selected");
}

// Renderizar la lista inicial de nombres al abrir la página
renderNameList();

//Prompt para pedir nombre
addNameBtn.addEventListener("click", function() {
  const name = prompt("Nombre del jugador:");
  if (name) {
    names.push(name);
    soundAdd.play();
    // Guardar el array en el almacenamiento local
    localStorage.setItem('names', JSON.stringify(names));
    renderNameList();
  }
});

// Quitar un nombre de la lista
quitNameBtn.addEventListener("click", function() {
  if (names.length > 0) {
    const selectedName = document.querySelector("li.selected");
    if (selectedName) {
      const name = selectedName.textContent;
      const index = names.indexOf(name);
      if (index !== -1) {
        soundRemove.play();
        names.splice(index, 1);
        // Guardar el array en el almacenamiento local
        localStorage.setItem('names', JSON.stringify(names));
        renderNameList();
      }
    } else {
      alert("Por favor, seleccione un nombre de la lista.");
    }
  }
});

//Boton de vaciar la lista
clearListBtn.addEventListener("click", function() {
  soundRemove.play();
  names = [];
  // Guardar el array vacío en el almacenamiento local
  localStorage.setItem('names', JSON.stringify(names));
  renderNameList();
});

// Boton de start
startBtn.addEventListener("click", function() {
  if (names.length >= 2) {
    window.location.href = "/html/game.html";
  } else {
    alert("Debe haber al menos 2 nombres en la lista para continuar.");
  }
});
