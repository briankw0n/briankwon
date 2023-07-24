function insertOneInLeftDiv() {
  const leftDiv = document.querySelector(".left");
  if (leftDiv) {
    leftDiv.textContent = "1";
  } else {
    console.log('The element with class "left" was not found.');
  }
}
// insertOneInLeftDiv();

function calculateOnesAcross() {
  const leftDiv = document.querySelector(".left");
  if (leftDiv) {
    const computedStyle = window.getComputedStyle(leftDiv);
    const fontSize = parseFloat(computedStyle.fontSize); // Get font size in pixels
    const divWidth = leftDiv.clientWidth;
    const divHeight = leftDiv.clientHeight;

    const oneWidthInPixels = fontSize * 0.5; // Assuming '1' occupies half the width of its font size
    const numberOfOnesAcross = Math.floor(divWidth / oneWidthInPixels);
    const numberOfOnesInHeight = Math.floor(divHeight / fontSize);

    console.log("Number of '1's that fit across the div:", numberOfOnesAcross);
    console.log(
      "Number of '1's that fit in the height of the div:",
      numberOfOnesInHeight
    );

    // Call fillWithOnes function and pass both numberOfOnesAcross and numberOfOnesInHeight as arguments
    fillWithOnes(leftDiv, numberOfOnesAcross, numberOfOnesInHeight);
  } else {
    console.log('The element with class "left" was not found.');
  }
}

function fillWithOnes(divElement, numberOfOnesAcross, numberOfOnesInHeight) {
  if (divElement) {
    let content = "";
    for (let j = 0; j < numberOfOnesInHeight; j++) {
      for (let i = 0; i < numberOfOnesAcross; i++) {
        content += "0";
      }
      content += "\n"; // Add a new line after each row
    }

    divElement.textContent = content;
  } else {
    console.log("The element was not found.");
  }
}
// calculateOnesAcross();

function animateRandomBinary() {
  let leftDiv = document.querySelector(".left");
  if (!leftDiv) {
    console.log('The element with class "left" was not found.');
    return;
  }

  let intervalId;

  function updateDimensions() {
    const fontSize = parseFloat(window.getComputedStyle(leftDiv).fontSize); // Get font size in pixels
    const oneWidthInPixels = fontSize * 0.5; // Assuming '1' occupies half the width of its font size
    const oneHeightInPixels = fontSize;
    const halfWindowWidth = window.innerWidth / 2;
    const halfWindowHeight = window.innerHeight; // Use half of the window height here
    const divWidth = Math.min(leftDiv.clientWidth, halfWindowWidth);
    const divHeight = Math.min(leftDiv.clientHeight, halfWindowHeight);
    const numberOfRows = Math.floor(divHeight / fontSize);
    const numberOfColumns = Math.floor(divWidth / oneWidthInPixels);
    const maxRowIndex = Math.floor(halfWindowHeight / oneHeightInPixels); // Use half of the window height here
    const maxColumnIndex = Math.floor(halfWindowWidth / oneWidthInPixels); // Use half of the window width here

    leftDiv.textContent = ""; // Clear existing content

    let rowIndex = 0;
    let columnIndex = 0;

    function printRandomBinary() {
      const binary = Math.random() < 0.5 ? "0" : "1";
      leftDiv.textContent += binary;
      columnIndex++;

      if (columnIndex >= numberOfColumns - 1 || columnIndex >= maxColumnIndex) {
        columnIndex = 0;
        rowIndex++;
        if (rowIndex >= numberOfRows - 1 || rowIndex >= maxRowIndex) {
          clearInterval(intervalId);
        }
        leftDiv.textContent += "\n"; // Add a new line after each row
      }
    }

    intervalId = setInterval(printRandomBinary, 100); // Adjust the interval duration as needed
  }

  updateDimensions();

  // Update the animation on window resize
  window.addEventListener("resize", function () {
    clearInterval(intervalId);
    updateDimensions();
  });
}
// animateRandomBinary();

///////////////////////////////////////////////////////////////

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("light-mode");
}

// Event listener for the dark mode toggle image
const darkModeToggleImg = document.getElementById("dark-mode-toggle");
darkModeToggleImg.addEventListener("click", toggleDarkMode);

///////////////////////////////////////////////////////////////

function getCharacterWidth(char, fontSize) {
  const span = document.createElement("span");
  span.style.fontSize = `${fontSize}pt`;
  span.style.fontFamily = "Source Code Pro, monospace";
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.textContent = char;
  document.body.appendChild(span);
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width;
}

function getCharacterHeight(char, fontSize) {
  const span = document.createElement("span");
  span.style.fontSize = `${fontSize}pt`;
  span.style.fontFamily = "Source Code Pro, monospace";
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.textContent = char;
  document.body.appendChild(span);
  const height = span.offsetHeight;
  document.body.removeChild(span);
  return height;
}

function fillWithRandomBinary() {
  const leftDiv = document.querySelector(".left");
  if (!leftDiv) {
    console.log('The element with class "left" was not found.');
    return;
  }

  const updateContent = () => {
    let content = "";
    const width = (window.innerWidth / 2) / getCharacterWidth("1", 30);
    const height = window.innerHeight / getCharacterHeight("1", 30);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const binary = Math.random() < 0.5 ? "0" : "1";
        content += binary;
      }
      content += "<br>";
    }

    leftDiv.innerHTML = content;
  };

  // Initial update
  updateContent();

  // Refresh every second (1000 milliseconds)
  setInterval(updateContent, 100);

  // Set timeout to make the numbers disappear after 2 seconds
  // setTimeout(() => {
  //   leftDiv.style.transition = "opacity 2s"; // Apply a transition to the opacity property with a longer duration (3 seconds)
  //   leftDiv.style.opacity = "0"; // Set opacity to 0 for fade-out effect
  // }, 1500);
}

// Call the function to fill the left div completely with random 0's and 1's and make them disappear after 2 seconds with a slower fade-out effect
fillWithRandomBinary();

//////////////////////////////////////////////////////////////////

function generateRandomBinary() {
  return Math.random() < 0.5 ? '0' : '1';
}

function getRandomMultipleOfOne() {
  return Math.floor(Math.random() * 101); // Generates random multiples of 10 from 0 to 100 (inclusive)
}

function getRandomOpacity() {
  return Math.random() * 0.9 + 0.1; // Generates a random opacity between 0.1 and 1.0
}

function createFallingElement() {
  const fallingTextElement = document.querySelector('.falling');

  const binaryElement = document.createElement('span');
  binaryElement.textContent = generateRandomBinary();
  binaryElement.style.position = 'absolute';
  // binaryElement.style.color = `#${generateRandomHexColor()}`; // Generate random text color

  // const initialOpacity = getRandomOpacity(); // Get the initial random opacity
  // binaryElement.style.opacity = initialOpacity;

  binaryElement.style.left = `${getRandomMultipleOfOne()}%`; // Random horizontal position from 0 to 100%
  binaryElement.style.top = '0';
  binaryElement.style.transition = 'top 5s linear, opacity 5s'; // Falling transition for top and opacity

  fallingTextElement.appendChild(binaryElement);

  // Remove the falling element after the transition is complete
  binaryElement.addEventListener('transitionend', () => {
    fallingTextElement.removeChild(binaryElement);
  });

  // Use setTimeout to adjust opacity gradually after a short delay
  setTimeout(() => {
    binaryElement.style.opacity = '0'; // Set opacity to 0 for the fading effect
  }, 100);

  setTimeout(() => {
    binaryElement.style.top = '100%';
  }, 0);
}
// setInterval(createFallingElement, 1);

// setInterval(() => {
//   // Call createFallingElement function multiple times within the interval
//   for (let i = 0; i < 5; i++) {
//     createFallingElement();
//   }
// }, 1);

//////////////////////////////////////////////////////////////////

function generateRandomHexChar() {
  const hexChars = '0123456789ABCDEF';
  return hexChars[Math.floor(Math.random() * hexChars.length)];
}

function generateRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generates a random color in hexadecimal format (without leading #)
  return randomColor.padStart(6, '0'); // Pad the color to 6 digits (e.g., '00FF00')
}

function getRandomMultipleOfOne() {
  return Math.floor(Math.random() * 101); // Generates random multiples of 10 from 0 to 100 (inclusive)
}

function createFallingHexElement() {
  const fallingTextElement = document.querySelector('.falling');

  const hexElement = document.createElement('span');
  hexElement.textContent = generateRandomHexChar();
  hexElement.style.position = 'absolute';
  // hexElement.style.color = `#${generateRandomHexColor()}`; // Generate random text color

  hexElement.style.left = `${getRandomMultipleOfOne()}%`; // Random horizontal position from 0 to 100%
  hexElement.style.top = '0';
  hexElement.style.transition = 'top 5s linear, opacity 5s'; // Falling transition for top and opacity

  fallingTextElement.appendChild(hexElement);

  // Remove the falling element after the transition is complete
  hexElement.addEventListener('transitionend', () => {
    fallingTextElement.removeChild(hexElement);
  });

  // Use setTimeout to adjust opacity gradually after a short delay
  setTimeout(() => {
    hexElement.style.opacity = '0'; // Set opacity to 0 for the fading effect
  }, 100);

  setTimeout(() => {
    hexElement.style.top = '100%';
  }, 0);
}
// setInterval(createFallingHexElement, 10);

//////////////////////////////////////////////////////////////

// Function to generate random Japanese characters
function generateRandomJapaneseCharacter() {
  const characters = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

function createFallingJapaneseElement() {
  const fallingTextElement = document.querySelector('.falling');

  const japaneseElement = document.createElement('span');
  japaneseElement.textContent = generateRandomJapaneseCharacter();
  japaneseElement.style.position = 'absolute';
  // japaneseElement.style.color = `#${generateRandomHexColor()}`; // Generate random text color

  // const initialOpacity = getRandomOpacity(); // Get the initial random opacity
  // japaneseElement.style.opacity = initialOpacity;

  japaneseElement.style.left = `${getRandomMultipleOfOne()}%`; // Random horizontal position from 0 to 100%
  japaneseElement.style.top = '0';
  japaneseElement.style.transition = 'top 2s linear, opacity 1s'; // Falling transition for top and opacity

  fallingTextElement.appendChild(japaneseElement);

  // Remove the falling element after the transition is complete
  japaneseElement.addEventListener('transitionend', () => {
    fallingTextElement.removeChild(japaneseElement);
  });

  // Use setTimeout to adjust opacity gradually after a short delay
  setTimeout(() => {
    japaneseElement.style.opacity = '0'; // Set opacity to 0 for the fading effect
  }, 100);

  setTimeout(() => {
    japaneseElement.style.top = '100%';
  }, 0);
}
// setInterval(createFallingJapaneseElement, 1); // Call createFallingElement every 100 milliseconds

function generateRandomBinary() {
  return Math.random() < 0.5 ? '0' : '1';
}

function getRandomMultipleOfTen() {
  return Math.floor(Math.random() * 11) * 10; // Generates random multiples of 10 from 0 to 100
}

function getRandomOpacity() {
  return Math.random() * 0.9 + 0.1; // Generates a random opacity between 0.1 and 1.0
}

function createFallingElement() {
  const fallingTextElement = document.querySelector('.falling');

  for (let i = 0; i < 5; i++) {
    const container = document.createElement('div');
    // container.style.position = 'relative';
    container.style.width = '100%';
    container.style.top = '0'; // Set the initial top position to 0 (start from the top)

    for (let j = 0; j < 3; j++) {
      const binaryElement = document.createElement('span');
      binaryElement.textContent = generateRandomBinary();
      binaryElement.style.position = 'absolute';
      binaryElement.style.left = `${getRandomMultipleOfTen()}%`; // Random horizontal position from 0 to 100%
      binaryElement.style.top = `${-i * 25}%`; // Negative top position to make them start from the top
      binaryElement.style.transition = 'top 3s linear, opacity 3s'; // Falling transition for top and opacity

      const opacity = 1 - j * 0.2; // Decreasing opacity for trailing elements
      binaryElement.style.opacity = opacity; // Set initial opacity

      container.appendChild(binaryElement);

      // Use setTimeout to adjust opacity gradually after a short delay
      setTimeout(() => {
        binaryElement.style.opacity = '0'; // Set opacity to 0 for the fading effect
      }, 100);

      setTimeout(() => {
        binaryElement.style.top = '100%';
      }, 0);
    }

    fallingTextElement.appendChild(container);
  }
}

setInterval(createFallingElement, 100);