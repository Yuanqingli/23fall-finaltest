let displayColorImage = false;
let currentPrompt = "";

class Figure {
  constructor(name, bwimagePath, imagePath, naturalColor, voicePrompt) {
    this.name = name;
    this.bwimage = loadImage(bwimagePath); 
    this.image = loadImage(imagePath);
    this.naturalColor = naturalColor;
    this.voicePrompt = voicePrompt; 
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
  createCanvas(windowWidth,windowHeight); 

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

// Prompt text
fill(0); 
textSize(24); 
text(currentPrompt, 50, 50); 

  // Draw buses
  drawBuses();
}

function startGame() {
  displayColorImage = false;
  selectedFigure = selectRandomFigure(figures);
  selectedFigure.speakPrompt(figures); 
  currentPrompt = "What is the color of " + selectedFigure.voicePrompt + "?";
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
  currentPrompt = "Fantastic job! You got it right!";
  mSpeech.speak(currentPrompt);

  // Implement the logic to display the figure in its natural color
  console.log(currentPrompt);

  // Proceed to the next figure after a pause
  setTimeout(() => {
    startGame();
    currentPrompt = "What is the color of " + selectedFigure.voicePrompt + "?";
  }, 3000); 
}

// Handle incorrect selection
function handleIncorrectSelection() {
  // Prompt the child to try again or show a hint
  displayColorImage = false;
  currentPrompt = "Let's try one more time!";
  mSpeech.speak(currentPrompt);
  // Implement the logic for incorrect selection
  console.log(currentPrompt);
}

// End the game
function endGame() {
  // Display a summary of correct and incorrect answers
  displaySummary();

  // Provide an option to restart the game
  displayRestartOption();
}

// Function to restart the game
function restartGame() {
  // Reset game variables
  resetGameVariables();
  // Start the game again
  startGame();
}