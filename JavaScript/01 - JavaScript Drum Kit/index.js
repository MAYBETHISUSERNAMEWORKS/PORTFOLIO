// wind is were we are lookin for the event
window.addEventListener('keydown', (event) => {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`)
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`)
  if(!audio) return; // stop the function from running
  audio.currentTime = 0;
  key.classList.add("playing")
  audio.play();
});


