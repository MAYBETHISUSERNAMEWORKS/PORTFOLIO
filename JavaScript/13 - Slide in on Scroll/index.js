// Define a debounce function to limit the rate at which a function can fire.
const debounce = (func, wait = 20, immediate = true) => {
  let timeout;// Variable to store the timeout ID
  return function() {
    const context = this, args = arguments;
    const later = () => {
      timeout = null;
      // If not immediate, execute the function after the wait period
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout; // Determine if the function should be called immediately
    clearTimeout(timeout); // Clear any existing timeout
    timeout = setTimeout(later, wait);// Set a new timeout
    // If callNow is true, call the function immediately
    if (callNow) func.apply(context, args);
  };
};


const sliderImages = document.querySelectorAll('.slide-in');
// Define the function to check if the images should slide in
const checkSlide = () => {
  sliderImages.forEach( sliderImage => {
    // Calculate the point where the image should start to slide in
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height/ 2;
    // Calculate the bottom position of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    // Check if the image is half shown
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    // Check if the image is not scrolled past
    const isNotScrolledPast = window.scrollY < imageBottom;
    // Add 'active' class if the image is half shown and not scrolled past, otherwise remove it
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
};
// Add a scroll event listener to the window, using the debounce function to limit the rate of function calls
window.addEventListener('scroll', debounce(checkSlide));
