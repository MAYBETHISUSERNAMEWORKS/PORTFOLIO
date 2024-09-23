let countdown; // Variable to store the interval ID
const timerDisplay = document.querySelector('.display__time-left'); // Element to display the remaining time
const endTime = document.querySelector('.display__end-time'); // Element to display the end time
const buttons = document.querySelectorAll('[data-time]'); // All buttons with data-time attribute

// Function to start the timer
const timer = (seconds) => {
  // Clear any existing timers
  clearInterval(countdown);

  const now = Date.now(); // Current time in milliseconds
  const then = now + seconds * 1000; // End time in milliseconds
  displayTimeLeft(seconds); // Display the initial time left
  displayEndTime(then); // Display the end time

  // Set up the interval to update the countdown every second
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // Calculate the remaining seconds
    // Check if the countdown should stop
    if (secondsLeft < 0) {
      clearInterval(countdown); // Clear the interval
      return;
    }
    displayTimeLeft(secondsLeft); // Update the time left display
  }, 1000);
};

// Function to display the remaining time
const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60); // Calculate minutes
  const remainderSeconds = seconds % 60; // Calculate remaining seconds
  // Format the display string
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display; // Update the document title with the time left
  timerDisplay.textContent = display; // Update the displayed time left
};

// Function to display the end time
const displayEndTime = (timestamp) => {
  const end = new Date(timestamp); // Create a Date object for the end time
  const hour = end.getHours(); // Get the hour
  const minutes = end.getMinutes(); // Get the minutes
  // Format and display the end time
  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
};

// Function to start the timer when a button is clicked
const startTimer = (event) => {
  const seconds = parseInt(event.target.dataset.time); // Get the time from the data attribute
  timer(seconds); // Start the timer with the specified time
};

// Add click event listeners to all buttons to start the timer
buttons.forEach(button => button.addEventListener('click', startTimer));

// Select the custom form
const customForm = document.querySelector('[name="customForm"]');
// Add submit event listener to the custom form
customForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
  const mins = event.target.minutes.value; // Get the minutes from the form input
  timer(mins * 60); // Start the timer with the specified minutes converted to seconds
  event.target.reset(); // Reset the form input
});
