// Select the slider element
const slider = document.querySelector('.items');

// Variables to track mouse state and slider position
let isDown = false;
let startx;
let scrollLeft;

// Event listener for when the mouse button is pressed down on the slider
slider.addEventListener('mousedown', (event) => {
  isDown = true; // Set isDown to true indicating the mouse is pressed
  slider.classList.add('active'); // Add 'active' class to the slider
  startx = event.pageX - slider.offsetLeft; // Calculate the initial x position
  scrollLeft = slider.scrollLeft; // Store the initial scroll position
});

// Event listener for when the mouse leaves the slider area
slider.addEventListener('mouseleave', () => {
  slider.classList.remove('active'); // Remove 'active' class from the slider
  isDown = false; // Set isDown to false indicating the mouse is released
});

// Event listener for when the mouse button is released
slider.addEventListener('mouseup', () => {
  slider.classList.remove('active'); // Remove 'active' class from the slider
  isDown = false; // Set isDown to false indicating the mouse is released
});

// Event listener for when the mouse is moved over the slider
slider.addEventListener('mousemove', (event) => {
  if (!isDown) return; // If the mouse is not pressed, exit the function
  event.preventDefault(); // Prevent default behavior
  const x = event.pageX - slider.offsetLeft; // Calculate the current x position
  const walk = x - startx; // Calculate the distance moved
  slider.scrollLeft = scrollLeft - walk; // Scroll the slider by the calculated distance
});
