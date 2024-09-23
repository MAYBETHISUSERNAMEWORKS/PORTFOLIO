document.addEventListener('DOMContentLoaded', function() {

  const inputs = document.querySelectorAll('.controls input');

  const handleUpdate = (event) => {
    // log the value of the ranges
    // console.log(event.currentTarget.value);
    // console.log(event.currentTarget.dataset.sizing);
    const sufix = event.currentTarget.dataset.sizing || '';
    // console.log(event.currentTarget.name);
    document.documentElement.style.setProperty(`--${event.currentTarget.name}`, event.currentTarget.value + sufix)
  };
  // listening for value changes
  inputs.forEach( input => input.addEventListener('change', handleUpdate));
  // listening for the slide of the range
  inputs.forEach( input => input.addEventListener('mousemove', handleUpdate));
});
