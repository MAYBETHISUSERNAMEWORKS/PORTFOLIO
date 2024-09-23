const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');


speed.addEventListener('mousemove', (event) => {
  // console.log(event.pageY, event.currentTarget.offsetTop);
  // Get the vertical position of the mouse relative to the 'speed' element
  const y = event.pageY - event.currentTarget.offsetTop;
  // Calculate the percentage of the mouse position within the 'speed' element
  const percent = y / event.currentTarget.offsetHeight;
  // Define the minimum and maximum playback rates
  const min = 0.4;
  const max = 4;
  // Calculate the height of the bar as a percentage
  const height = Math.round(percent * 100) + '%';
  // Calculate the playback rate based on the mouse position
  const playBackRate = percent * (max - min) + min;
  // Set the height of the 'speed-bar' to reflect the mouse position
  bar.style.height = height;
  // Display the playback rate in the 'speed-bar'
  bar.textContent = playBackRate.toFixed(2) + 'x';
  // Set the playback rate of the video
  Video.playBackRate = playBackRate;
});


