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

function getRandomMultipleOfTen() {
  return Math.floor(Math.random() * 11) * 10; // Generates random multiples of 10 from 0 to 100 (inclusive)
}

function getRandomOpacity() {
  return Math.random() * 0.9 + 0.1; // Generates a random opacity between 0.1 and 1.0
}

function createFallingElement() {
  const fallingTextElement = document.querySelector('.falling');

  const binaryElement = document.createElement('span');
  binaryElement.textContent = generateRandomBinary();
  binaryElement.style.position = 'absolute';

  // const initialOpacity = getRandomOpacity(); // Get the initial random opacity
  // binaryElement.style.opacity = initialOpacity;

  binaryElement.style.left = `${getRandomMultipleOfTen()}%`; // Random horizontal position from 0 to 100%
  binaryElement.style.top = '0';
  binaryElement.style.transition = 'top 2s linear, opacity 1s'; // Falling transition for top and opacity

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
setInterval(createFallingElement, 50);


// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("light-mode");
}

// Event listener for the dark mode toggle image
const darkModeToggleImg = document.getElementById("dark-mode-toggle");
darkModeToggleImg.addEventListener("click", toggleDarkMode);

//////////////////////////////////////////////////////////////////

function fallingZero() {
  const nameElement = document.querySelector('.name');
  const nameFontSize = window.getComputedStyle(nameElement).getPropertyValue('font-size');

  const fallingContainer = document.getElementById('falling-container');

  const binaryElement = document.createElement('span');
  binaryElement.classList.add('falling-text');
  binaryElement.textContent = generateRandomBinary(); // Assuming you have a function to generate random 0's and 1's
  binaryElement.style.position = 'absolute';
  binaryElement.style.fontSize = nameFontSize; // Use the same font size as the name element

  const topPosition = -50;
  binaryElement.style.top = `${topPosition}px`;

  const namePosition = nameElement.getBoundingClientRect();
  const leftPosition = namePosition.left + namePosition.width / 2;
  binaryElement.style.left = `${leftPosition}px`;

  const fallingSpeed = getRandomFallingSpeed(); // Assuming you have a function to get a random falling speed
  binaryElement.style.transition = `top ${fallingSpeed}s linear`;

  fallingContainer.appendChild(binaryElement);

  binaryElement.addEventListener('transitionend', () => {
    fallingContainer.removeChild(binaryElement);
  });

  setTimeout(() => {
    binaryElement.style.top = `${namePosition.top + namePosition.height}px`;
  }, 0);
}

// Create 5 falling elements with a delay between each
for (let i = 0; i < 5; i++) {
  setTimeout(fallingZero, i * 1000); // Adjust the delay between each falling element as needed
}
