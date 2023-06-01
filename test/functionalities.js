function validateNames(names) {
    return names.length >= 2 && names.every(name => name.trim() !== "");
}

function isNameSelected() {
    const selectedName = document.querySelector("li.selected");
    if (!selectedName) {
      alert("Please select a name from the list");
      return false;
    }
    return true;
  }

function getPlayerName() {
    return prompt("Name:");
  }
  
  function addNameToList(names, name) {
    names.push(name);
    localStorage.setItem('names', JSON.stringify(names));
}
  

module.exports = {
    validateNames,
    isNameSelected,
    getPlayerName,
    addNameToList,
}