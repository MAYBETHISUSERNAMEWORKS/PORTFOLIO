import { useState } from "react";
import data from "./data";
// Import the CSS file to apply styles
import './style.css';

function Accordian() {

  // State to store the ID of the selected item in single-selection mode
  const [selected, setSelected] = useState(null);

  // State to track whether multi-selection mode is enabled or not (default: false)
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);

  // State to store the IDs of multiple selected items in multi-selection mode
  const [multiple, setMutiple] = useState([]);

  // Function to handle selection for single-selection mode
  function handleSingleSelection(getCurrentId) {
    // If the clicked item is already selected, deselect it (set to null); otherwise, set the new selected ID
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Function to handle selection for multi-selection mode
  function handleMultiSelection(getCurrentId) {
    // Create a copy of the current multiple selections
    let cpyMultiple = [...multiple];

    // Find the index of the current clicked ID in the copied array
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    // If the ID is not found in the array, add it (select the item)
    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentId);
    } else {
      // If the ID is already in the array, remove it (deselect the item)
      cpyMultiple.splice(findIndexOfCurrentId, 1);
    }

    // Update the multiple selection state with the modified array
    setMutiple(cpyMultiple);
  }

  // Log the current selected state for single and multi-selection modes (for debugging)
  console.log(selected, multiple);

  return (
    <div className="wrapper">
      {/* Button to toggle between single and multi-selection modes */}
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
      >
        Enable Multi Selection
      </button>

      <div className="accordian">
        {/* Check if data exists and map through each item */}
        {
          data && data.length > 0 ?
            data.map((dataItem) => {
              return (
                <>
                  <div className="item">
                    <div
                      // Click handler for toggling between single and multi-selection modes
                      onClick={
                        enableMultiSelection
                          ? () => handleMultiSelection(dataItem.id) // Multi-selection click handler
                          : () => handleSingleSelection(dataItem.id) // Single-selection click handler
                      }
                      className="title"
                    >
                      {/* Display the question */}
                      <h3>{dataItem.question}</h3>
                      {/* Display "+" icon (later this can change to "-" when the item is open) */}
                      <span>+</span>
                    </div>

                    {/* Conditionally render content based on the selection mode */}
                    {
                      enableMultiSelection
                        ? (
                          // In multi-selection mode, show content if the ID is in the multiple state array
                          multiple.includes(dataItem.id) && (<div className="content">{dataItem.answer}</div>)
                        )
                        : (
                          // In single-selection mode, show content if the ID matches the selected state
                          selected === dataItem.id && (<div className="content">{dataItem.answer}</div>)
                        )
                    }
                  </div>
                </>
              )
            })
            : (<div>No data found!</div>)  // If no data is found, show a fallback message
        }
      </div>
    </div>
  );
}

export default Accordian;
