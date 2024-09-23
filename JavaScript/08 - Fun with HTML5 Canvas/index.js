// Select the canvas element from the DOM
const canvas = document.querySelector('#draw');

// Get the 2D drawing context from the canvas
const ctx = canvas.getContext('2d'); // where you'll be drawing in 2d

// Set the canvas dimensions to match the window's width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set the stroke color for drawing lines
ctx.strokeStyle = '#BADA55';

// Set the style for the ends and corners of lines
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

// Set the initial width of the lines
ctx.lineWidth = 100;

// Initialize variables to handle drawing state and position
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// Function to handle drawing on the canvas
const draw = (event) => {
  if (!isDrawing) return; // Stop the function if the mouse is not pressed down

  console.log(event);

  // Set the stroke color using the hue variable
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  // Begin a new path for drawing
  ctx.beginPath();
  // Move to the last position recorded
  ctx.moveTo(lastX, lastY);
  // Draw a line to the current mouse position
  ctx.lineTo(event.offsetX, event.offsetY);
  // Apply the stroke to the canvas
  ctx.stroke();

  // Update the last position to the current position
  lastX = event.offsetX;
  lastY = event.offsetY;

  // Increment the hue, and reset it if it exceeds 360
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  // Reverse the direction of line width changes at boundaries
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  // Increase or decrease line width based on the direction
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
};

// Event listeners to handle mouse events on the canvas
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true; // Set drawing state to true
  lastX = event.offsetX; // Update the last position to the current mouse position
  lastY = event.offsetY; // Update the last position to the current mouse position
});

canvas.addEventListener('mousemove', draw); // Call the draw function when the mouse moves

canvas.addEventListener('mouseup', () => isDrawing = false); // Stop drawing when the mouse button is released

canvas.addEventListener('mouseout', () => isDrawing = false); // Stop drawing when the mouse leaves the canvas
