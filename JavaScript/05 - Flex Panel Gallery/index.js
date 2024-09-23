document.addEventListener('DOMContentLoaded', function() {

  // Select all elements with the class 'panel' and store them in the 'panels' variable
  const panels = document.querySelectorAll('.panel');

  // Define the toggleOpen function to toggle the 'open' class on the clicked panel
  const toggleOpen = (event) => {
    // Toggle the 'open' class on the element that triggered the event
    event.currentTarget.classList.toggle('open');
  };

  // Define the toggleActive function to toggle the 'open-active' class based on the transition property
  const toggleActive = (event) => {
    // Log the name of the CSS property that has finished transitioning
    //console.log(event.propertyName);
    // If the transitioned property includes 'flex', toggle the 'open-active' class
    if(event.propertyName.includes('flex')){
      event.currentTarget.classList.toggle('open-active');
    }
  };
  // Add a click event listener to each panel to call toggleOpen when clicked
  panels.forEach( panel => panel.addEventListener('click', toggleOpen));
  // Add a transitionend event listener to each panel to call toggleActive when a CSS transition ends
  panels.forEach( panel => panel.addEventListener('transitionend', toggleActive));
});

