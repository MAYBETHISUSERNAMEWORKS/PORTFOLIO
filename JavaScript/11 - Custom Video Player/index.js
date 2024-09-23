// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const togglePlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

const updateButton = (event) => {
  const icon = event.target.paused  ? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.log('update the button');
};

const skip = (event) => {
  // console.log(event.target.dataset.skip);
  video.currentTime += parseFloat(event.target.dataset.skip)
};

const handleRangeUpdate = (event) => {
  video[event.currentTarget.name] = event.currentTarget.value;
  // console.log(event.currentTarget.value);
  // console.log(event.currentTarget.name);
};

const handleProgress = () => {
  const percent = (video.currentTime/ video.duration) * 100;
  progressBar.style.flexBasis = `${percent}`;
};

const scrub = (event) => {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach( button => button.addEventListener('click', skip));

ranges.forEach( range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach( range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (event) => mousedown && scrub(event));
progressBar.addEventListener('mousedown', () => {
  mousedown = true
});
progressBar.addEventListener('mouseup', () => {
  mousedown = false
});
