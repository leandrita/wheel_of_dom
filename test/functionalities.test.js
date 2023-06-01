const index = require('./functionalities');
const validateNames = index.validateNames;
const { isNameSelected, getPlayerName, addNameToList } = require('./functionalities');

describe('validateNames', () => {
    test('should return true for an array with two or more non-empty names', () => {
        const names = ['Lea', 'Milena'];
        expect(validateNames(names)).toBe(true);
    });

    test('should return false for an empty array', () => {
        const names = [];
        expect(validateNames(names)).toBe(false);
    });

    test('should return false for an array with one or more empty names', () => {
        const names = ['', 'Milena'];
        expect(validateNames(names)).toBe(false);
    });

    test('should return false for an array with names containing only whitespace', () => {
        const names = ['   ', 'Milena'];
        expect(validateNames(names)).toBe(false);
    });
});

describe('isNameSelected', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li class="selected">test</li>
        <li>test 1</li>
        <li>test 2</li>
      </ul>
    `;
  });

  test('should return true if a name was selected', () => {
    expect(isNameSelected()).toBe(true);
  });

  test('should display an alert and return false if no name was selected', () => {
    document.querySelector('.selected').classList.remove('selected');
    window.alert = jest.fn();

    expect(isNameSelected()).toBe(false);
    expect(window.alert).toHaveBeenCalledWith('Please select a name from the list');
  });
});


describe('getPlayerName', () => {
  test('should return the name entered by the user', () => {
    const mockPrompt = jest.fn(() => 'Pepe');
    global.prompt = mockPrompt;

    expect(getPlayerName()).toBe('Pepe');
    expect(mockPrompt).toHaveBeenCalledWith('Name:');
  });
});


describe('addNameToList', () => {
  let names = [];

  beforeEach(() => {
    localStorage.clear();
  });

  test('should add the name to the list and update the local storage', () => {
    const localStorageMock = (function() {
      let store = {};

      return {
        getItem: function(key) {
          return store[key];
        },
        setItem: function(key, value) {
          store[key] = value.toString();
        },
        clear: function() {
          store = {};
        }
      };
    })();

    global.localStorage = localStorageMock;
    addNameToList(names, 'Pepe');

    expect(names).toEqual(['Pepe']);
    expect(localStorage.getItem('names')).toEqual(JSON.stringify(['Pepe']));
  });
});


