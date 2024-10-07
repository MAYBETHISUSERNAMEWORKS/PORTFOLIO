import { useState, useEffect, useCallback } from "react";

// Main component for generating random colors
function RandomColor() {

  // State to keep track of the type of color (hex or rgb)
  const [typeOfColor, setTypeOfColor] = useState('hex');

  // State to keep track of the current color being displayed
  const [color, setColor] = useState('#000000');

  // Utility function to generate random numbers within a specified length
  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  // Function to generate a random HEX color, memoized with useCallback
  const handleCreateRandomHexColor = useCallback(() => {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    // Loop to generate a 6-character hex code
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }

    // Update the color state with the new hex color
    setColor(hexColor);
  }, []); // Empty dependency array means the function is memoized and won't be recreated on each render

  // Function to generate a random RGB color, memoized with useCallback
  const handleCreateRandomRgbColor = useCallback(() => {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);

    // Update the color state with the new RGB color
    setColor(`rgb(${r},${g},${b})`);
  }, []); // Empty dependency array ensures this function is also memoized

  // useEffect hook that runs when 'typeOfColor' changes.
  // It generates a new color based on the selected type (hex or rgb)
  useEffect(() => {
    if (typeOfColor === 'rgb') {
      handleCreateRandomRgbColor();
    } else {
      handleCreateRandomHexColor();
    }

    // No cleanup needed in this useEffect since we're only setting state
  }, [typeOfColor, handleCreateRandomHexColor, handleCreateRandomRgbColor]); // Dependencies ensure the effect re-runs when 'typeOfColor' or the functions change

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: color // Set the background color of the page to the current color state
      }}
    >
      <button onClick={() => setTypeOfColor('hex')}>Create HEX Color</button>

      <button onClick={() => setTypeOfColor('rgb')}>Create RGB Color</button>

      <button onClick={typeOfColor === 'hex' ? handleCreateRandomHexColor : handleCreateRandomRgbColor}>
        Generate Random Color
      </button>

      {/* Display the current type of color (HEX or RGB) and the generated color value */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff', // Font color for visibility against the background
        fontSize: '45px',
        marginTop: '50px',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h3>{typeOfColor === 'rgb' ? 'RGB Color' : 'HEX Color'}</h3>
        <h1>{color}</h1> {/* Display the generated color code */}
      </div>
    </div>
  )
}

export default RandomColor;
