// Check for the SpeechRecognition API in the window object, including vendor-prefixed versions
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create a new instance of SpeechRecognition
const recognition  = new SpeechRecognition();
// Enable interim results so that partial (not yet final) results are returned
recognition.interimResults = true;


// Create a new paragraph element to display the recognized speech
let p = document.createElement('p');
// Select the container element where the recognized words will be displayed
const words = document.querySelector('.words');
// Append the paragraph element to the container
words.appendChild(p);

// Add an event listener for the 'result' event, which is triggered when speech is recognized

recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map( result => result[0])
    .map(result => result.transcript)
    .join('')

    // Set the text content of the paragraph element to the recognized transcript
    p.textContent = transcript;
    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p)
    }

  console.log(transcript);
});

// Add an event listener for the 'end' event, which is triggered when speech recognition ends
// Restart speech recognition when it ends
recognition.addEventListener('end', recognition.start);
recognition.start();
