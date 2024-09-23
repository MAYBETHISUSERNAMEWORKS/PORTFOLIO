// Create a new instance of SpeechSynthesisUtterance to handle the speech synthesis
const msg = new SpeechSynthesisUtterance();
// Initialize an empty array to store available voices
let voices = [];
// Get the dropdown element for selecting a voice
const voicesDropdown = document.querySelector('[name="voice"]');
// Get all range inputs and text input elements
const options = document.querySelectorAll('[type="range"], [name="text"]');
// Get the button elements for speaking and stopping
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Set the initial text for the speech synthesis from the text input value
msg.text = document.querySelector('[name="text"]').value;

// Function to populate the voices dropdown with available voices
const populateVoices = (event) => {
  // Get the list of available voices from the event
  voices = event.target.getVoices();

  // Populate the dropdown with the available voices
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</Option>`)
    .join('');
};

// Function to set the selected voice for the speech synthesis
const setVoice = (event) => {
  // Find the selected voice from the voices array
  msg.voice = voices.find( voice => voice.name === event.target.value);

  // Restart speech synthesis with the new voice
  toggle();
};

// Function to start or stop the speech synthesis
const toggle = (startOver = true) => {
  // Cancel any ongoing speech synthesis
  speechSynthesis.cancel();

  // If startOver is true, start the speech synthesis with the current message
  if (startOver) {
    speechSynthesis.speak(msg);
  }
};

// Function to set options like rate, pitch, and text for the speech synthesis
const setOption = (event) => {
  // Log the name and value of the changed option
  // console.log(event.target.name , event.target.value);

  // Set the corresponding property of the speech synthesis message
  msg[event.target.name ] = event.target.value;

  // Restart the speech synthesis with the new option
  toggle();
};

// Event listener to populate voices when they change (e.g., when voices are loaded)
speechSynthesis.addEventListener('voiceschanged', populateVoices);

// Event listener to change the voice when a new voice is selected from the dropdown
voicesDropdown.addEventListener('change', setVoice);

// Event listeners to update options (rate, pitch, text) when they are changed
options.forEach(option => option.addEventListener('change', setOption));

// Event listener to start speech synthesis when the speak button is clicked
speakButton.addEventListener('click', toggle);

// Event listener to stop speech synthesis when the stop button is clicked
stopButton.addEventListener('click', () => toggle(false));
