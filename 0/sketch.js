class Figure {
  constructor(name, imagePath, naturalColorPath, voicePrompt) {
    this.name = name;
    this.image = loadImage(imagePath); // Load the black and white image
    this.naturalColorImage = loadImage(naturalColorPath); // Load the image for the natural color
    this.voicePrompt = voicePrompt; // The voice prompt text
  }

  // You can add a method to speak the prompt if needed
  speakPrompt() {
    mSpeech.speak("What is the color of " + this.voicePrompt + "?");
  }
}

let figures = [];
let selectedFigure;
let buses = [];
let mSpeech;

function setup() {
  createCanvas(800, 600); // Create a canvas of the desired size

  // Initialize the speech object
  mSpeech = new p5.Speech();
  mSpeech.interrupt = false;

  // Initialize figures
  figures.push(new Figure("Tomato", "bwtomato.png", "tomato.png", "tomato"));

  // Example usage
  figures[0].speakPrompt(); // This will speak the prompt for the first figure

  // Initialize buses
  buses = [
    { color: "green", position: { x: 100, y: 300 } },
    { color: "red", position: { x: 200, y: 300 } },
    { color: "yellow", position: { x: 300, y: 300 } },
    { color: "brown", position: { x: 400, y: 300 } },
  ];

  // Start the game
  startGame();
}

// This standalone function can be used to speak any prompt
function sayPrompt(word) {
  mSpeech.speak("What is the color of " + word + "?");
}

function draw() {
  background(255); // Set background color to white

  // Draw the selected figure
  if (selectedFigure) {
    image(selectedFigure.image, 150, 100, 100, 100); // Adjust position and size as needed
  }

  // Draw buses
  drawBuses();
}

function startGame() {
  // Randomly select a figure
  selectedFigure = selectRandomFigure(figures);

  // Play voice prompt for the selected figure
  selectedFigure.voicePrompt.play();
}

function selectRandomFigure(figures) {
  let randomIndex = int(random(figures.length));
  return figures[randomIndex];
}

function drawBuses() {
  buses.forEach((bus) => {
    fill(bus.color);
    rect(bus.position.x, bus.position.y, 50, 20); // Draw bus as a rectangle
  });
}
