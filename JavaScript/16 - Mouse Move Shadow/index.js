const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 100; //100px

// Define the shadow function to be executed on mouse move
const shadow = (event) => {
  // Get the width and height of the hero element
  const width = hero.offsetWidth;
  const height = hero.offsetHeight;

  // Get the mouse position relative to the hero element
  let x = event.offsetX;
  let y = event.offsetY;

  // Adjust the mouse position if the event target is not the current target
  if (event.currentTarget !== event.target) {
    x = x + event.target.offsetLeft;
    y = y + event.target.offsetTop;
  }
  // Calculate the shadow offset values based on the mouse position
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  // Apply the calculated text shadow styles to the h1 element
  text.style.textShadow = `
  ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
  ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
  ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
  ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
`;
};

hero.addEventListener('mousemove', shadow);
