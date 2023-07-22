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
    const width = window.innerWidth / 2 / getCharacterWidth("1", 30);
    const height = window.innerHeight / getCharacterHeight("1", 30);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const binary = Math.random() < 0.5 ? "0" : "1";
        content += binary;
      }
      content += "\n";
    }

    leftDiv.textContent = content;
  };

  // Initial update
  updateContent();

  // Refresh every second (1000 milliseconds)
  setInterval(updateContent, 100);
}
// fillWithRandomBinary();

function generateRandomBinary() {
  return Math.random() < 0.5 ? '0' : '1';
}

function getRandomMultipleOfFive() {
  return Math.floor(Math.random() * 21) * 5; // Generates random multiples of 5 from 0 to 100 (inclusive)
}

function getRandomOpacity() {
  return Math.random() * 0.9 + 0.1; // Generates a random opacity between 0.1 and 1.0
}


function createFallingElement() {
  const fallingTextElement = document.querySelector('.left');

  const binaryElement = document.createElement('span');
  binaryElement.classList.add('falling-text');
  binaryElement.textContent = generateRandomBinary();
  binaryElement.style.position = 'absolute';

  binaryElement.style.left = `${getRandomMultipleOfFive()}%`; // Random horizontal position from 0 to 100%
  binaryElement.style.top = '0';
  binaryElement.style.transition = 'top 2s linear'; // Falling transition

  binaryElement.style.opacity = getRandomOpacity(); // Set random opacity for each number

  fallingTextElement.appendChild(binaryElement);

  binaryElement.addEventListener('transitionend', () => {
    fallingTextElement.removeChild(binaryElement);
  });

  setTimeout(() => {
    binaryElement.style.top = '100%';
  }, 0);
}

function getRandomMultipleOfFive() {
  return Math.floor(Math.random() * 21) * 5; // Generates random multiples of 5 from 0 to 100 (inclusive)
}

setInterval(createFallingElement, 1);