import {useState, useEffect, useRef} from 'react';
// Importing hooks from React: useState to manage state, useEffect for side-effects, and useRef for mutable reference values.

function Stopwatch() {

  // useState hook to track whether the stopwatch is running or not (boolean).
  const [isRunning, setIsRunning] = useState(false);

  // useState hook to track the elapsed time (in milliseconds).
  const [elapsedTime, setElapsedTime] = useState(0);

  // useRef to store the interval ID, which allows us to clear the interval when needed.
  const intervalIdRef = useRef(null);

  // useRef to store the start time of the stopwatch (avoiding re-renders).
  const startTimeRef = useRef(0);

  // useEffect runs whenever the isRunning state changes.
  // If the stopwatch is running, it sets up a repeating interval to update elapsedTime every 10ms.
  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current); // Update the elapsed time relative to the start time.
      }, 10); // Run every 10 milliseconds.
    }

    // Cleanup function to clear the interval when the component unmounts or isRunning changes.
    return () => {
      clearInterval(intervalIdRef.current); // Clears interval to prevent memory leaks.
    };
  }, [isRunning]); // Dependency array ensures this effect only runs when isRunning changes.

  // Function to start the stopwatch.
  function start() {
    setIsRunning(true); // Set the running state to true.
    startTimeRef.current = Date.now() - elapsedTime; // Calculate the start time, accounting for any previously elapsed time.
  }

  // Function to stop the stopwatch.
  function stop() {
    setIsRunning(false); // Set the running state to false.
  }

  // Function to reset the stopwatch.
  function reset() {
    setElapsedTime(0); // Reset elapsed time to 0.
    setIsRunning(false); // Stop the stopwatch if it's running.
  }

  // Function to format the elapsed time into hours, minutes, seconds, and milliseconds.
  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60)); // Calculate hours.
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60); // Calculate minutes.
    let seconds = Math.floor(elapsedTime / (1000) % 60); // Calculate seconds.
    let milliseconds = Math.floor((elapsedTime % 1000) / 10); // Calculate milliseconds (rounded to two decimal places).

    // Ensure all values are two digits, adding leading zeros if necessary.
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    // Return formatted time as a string.
    return(`${hours}:${minutes}:${seconds}:${milliseconds}`)
  }

  // JSX for rendering the stopwatch interface.
  return(
    <div className='stopwatch'>
      {/* Display formatted time */}
      <div className='display'>{formatTime()}</div>

      {/* Stopwatch control buttons: Start, Stop, and Reset */}
      <div className='controls'>
        <button onClick={start} className='start-button'>Start</button>
        <button onClick={stop} className='stop-button'>Stop</button>
        <button onClick={reset} className='reset-button'>Reset</button>
      </div>
    </div>
  )
};

export default Stopwatch;
// Exporting the Stopwatch component so it can be used in other parts of the application.
