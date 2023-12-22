let displayColorImage = false;

class Figure {
  constructor(name, bwimagePath, imagePath, naturalColor, voicePrompt) {
    this.name = name;
    this.bwimage = loadImage(bwimagePath); // Load the black and white image
    this.image = loadImage(imagePath);
    this.naturalColor = naturalColor;
    this.voicePrompt = voicePrompt; // The voice prompt text
  }

  speakPrompt() {
    mSpeech.speak("What is the color of " + this.voicePrompt + "?");
  }
}

let figures = [];
let selectedFigure;
let buses = [];
let mSpeech;

function setup() {
  createCanvas(windowWidth,windowHeight); // Create a canvas of the desired size

  // Initialize the speech object
  mSpeech = new p5.Speech();
  mSpeech.interrupt = false;

  // Initialize figures
  figures.push(new Figure("Tomato", "bwtomato.png", "tomato.png",'red', "tomato"));
  figures.push(new Figure("Pepper", "bwpepper.png", "greenpepper.png",'green', "pepper"));
  figures.push(new Figure("Moon", "bwmoon.png", "moon.png",'yellow', "moon"));
  figures.push(new Figure("Chestnut", "bwchestnut.png", "chestnut.png",'brown', "chestnut"));

  

  // Initialize buses
  buses = [
    { color: "green" },
    { color: "red" },
    { color: "yellow" },
    { color: "brown" },
  ];

  // Start the game
  startGame();
}

// This standalone function can be used to speak any prompt
function sayPrompt(word) {
  mSpeech.speak("What is the color of " + word + "?");
}

function draw() {
  background(255); 

  // Draw the selected figure
  if (selectedFigure) {
    if (displayColorImage) {
      // Display the color image
      image(selectedFigure.image, 150, 150, 500, 500);
    } else {
      // Display the black and white image
      image(selectedFigure.bwimage, 150, 150, 500, 500);
    }
  }

  // Draw buses
  drawBuses();
}

function startGame() {
  displayColorImage = false;
  selectedFigure = selectRandomFigure(figures);
  selectedFigure.speakPrompt(figures); 

}

function selectRandomFigure(figures) {
  let randomIndex = int(random(figures.length));
  return figures[randomIndex];
}

function drawBuses() {
  const busWidth = 180;
  const busHeight = 100;
  const gap = 30; 

  // Calculate total height needed for all buses and gaps
  const totalHeight = buses.length * busHeight + (buses.length - 1) * gap;

  // Starting Y position to center the buses vertically
  const startY = (windowHeight - totalHeight) / 2;

  buses.forEach((bus, index) => {
    // Calculate the Y position of each bus
    const yPos = startY + index * (busHeight + gap);

    fill(bus.color);
    // X position is set to keep the bus inside the canvas, adjust as needed
    const xPos = windowWidth - busWidth - 80; 
    rect(xPos, yPos, busWidth, busHeight);
  });
}

function keyPressed() {
  if (key === 'g') {
      checkSelection('green');
  } else if (key === 'r') {
      checkSelection('red');
  } else if (key === 'y') {
      checkSelection('yellow');
  } else if (key === 'b') {
      checkSelection('brown');
  }
}

// Check if the selection matches the figure's color
function checkSelection(selectedColor) {
  if (selectedColor === selectedFigure.naturalColor) {
      handleCorrectSelection();
  } else {
      handleIncorrectSelection();
  }
}

// Handle correct selection
function handleCorrectSelection() {
  // Display the figure in its natural color
  displayColorImage = true;
  mSpeech.speak("Fantastic job! You got it right!");
  // Implement the logic to display the figure in its natural color
  console.log("Fantastic job! You got it right!");
  // Proceed to the next figure after a brief pause
  setTimeout(startGame, 3000); // Adjust the delay as needed
}

// Handle incorrect selection
function handleIncorrectSelection() {
  // Prompt the child to try again or show a hint
  displayColorImage = false;
  mSpeech.speak("Let's try one more time!");
  // Implement the logic for incorrect selection
  console.log("Incorrect selection. Let's try one more time!");
}