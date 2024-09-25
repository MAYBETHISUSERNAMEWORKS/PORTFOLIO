import { useEffect, useRef } from "react";

function MyComponent() {

  const inputRef = useRef(null); // returns an object
  const inputRef2 = useRef(null); // returns an object
  const inputRef3 = useRef(null); // returns an object

  useEffect( () => {
    console.log('componenet Render');
    // console.log(inputRef);
  });

  function handleClick() {
    inputRef.current.focus();
    // console.log(ref.current);
    inputRef.current.style.backgroundColor = 'yellow';
    inputRef2.current.style.backgroundColor = '';
    inputRef3.current.style.backgroundColor = '';
  }

  function handleClick2() {
    inputRef2.current.focus();
    // console.log(ref.current);
    inputRef.current.style.backgroundColor = '';
    inputRef2.current.style.backgroundColor = 'yellow';
    inputRef3.current.style.backgroundColor = '';
  }

  function handleClick3() {
    inputRef3.current.focus();
    // console.log(ref.current);
    inputRef.current.style.backgroundColor = '';
    inputRef2.current.style.backgroundColor = '';
    inputRef3.current.style.backgroundColor = 'yellow';
  }

  return(
    <>
    <button onClick={handleClick}>
      Click Me!
    </button>
    <input type="text" ref={inputRef}/>

    <button onClick={handleClick2}>
      Click Me 2!
    </button>
    <input type="text" ref={inputRef2}/>

    <button onClick={handleClick3}>
      Click Me 3!
    </button>
    <input type="text" ref={inputRef3}/>
    </>
  )
};

export default MyComponent;
