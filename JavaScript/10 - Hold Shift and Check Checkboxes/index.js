const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
// console.log(checkboxes);

// Variable to keep track of the last checked checkbox
let lastChecked;

const handleCheck = (event) => {
  // console.log(event);
  // check if they had the shift key down
  //AND check that they are checking the box and not unchecking the box
  // console.log(event.currentTarget.shiftKey);
  // console.log(event.target.shiftKey);


  // Variable to track if we are in the range of checkboxes to be checked
  let inBetween = false;

  // Check if the Shift key is pressed and the checkbox is being checked (and not unchecked)
  if (event.shiftKey && event.target.checked) {
  // go ahead and do what we please
  // loop over every single checkbox
    checkboxes.forEach( checkbox => {
      // console.log(checkbox);

      // Check if the current checkbox is either the last checked one or the current target
      if (checkbox === event.target || checkbox === lastChecked) {
        // Toggle the inBetween flag to start/stop checking checkboxes in between
        inBetween = !inBetween;
      };
      // If we are in the range, check the checkbox
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  };
  // Update lastChecked to the current checkbox
  lastChecked = event.target;
};

checkboxes.forEach( checkbox => checkbox.addEventListener('click', handleCheck));
