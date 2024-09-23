const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates')
// Retrieve the 'items' array from localStorage, parse it, and assign it to the variable items, or assign an empty array if 'items' does not exist in localStorage
const items = JSON.parse(localStorage.getItem('items')) || [];

// Define the addItem function which will be called when the form is submitted
const addItem = (event) => {
  event.preventDefault();
  // console.log(event.target);
  const text = (event.target.querySelector('[name=item]')).value;
  const item = {
    text: text,
    done: false,
  }
  // console.log(item);
  // Add the new item to the items array
  items.push(item);
  // Update the displayed list of items
  populateList(items, itemsList);
  // Save the updated items array to localStorage
  localStorage.setItem('items', JSON.stringify(items));
  // Reset the form input field
  event.target.reset();
};

// Define the populateList function which updates the displayed list of items
const populateList = (plates = [], platesList) => {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join(''); // Join the array of list items into a single string and set it as the innerHTML of platesList
};

const toggleDone = (event) => {
  if (!event.target.matches('input')) return;
  const el = event.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
};

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
