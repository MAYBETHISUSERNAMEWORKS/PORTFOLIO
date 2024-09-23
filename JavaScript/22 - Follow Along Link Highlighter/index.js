
const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
// Add a class named 'highlight' to the created 'span' element
highlight.classList.add('highlight');
// Append the highlight 'span' element to the body of the document
document.body.append(highlight);

// Function to highlight the link by creating a highlight effect
const highlightLink = (event) => {
   // Get the coordinates and dimensions of the hovered link
  const linkCoords = event.target.getBoundingClientRect();
  // console.log(linkCoords);
  // Calculate the coordinates including any scrolling offset
  coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  }
  // Set the dimensions of the highlight element to match the link
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  // Position the highlight element over the link
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`
};

triggers.forEach( a => a.addEventListener('mouseenter', highlightLink));
