import { useState } from "react";
import PropTypes from "prop-types"
import { FaStar } from "react-icons/fa";
import "./styles.css";

function StarRating({noOfStars}){

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    // console.log(getCurrentIndex);
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    // console.log(getCurrentIndex);
    setHover(getCurrentIndex);

  }

  function handleMouseLeave() {
    // console.log(getCurrentIndex);
    setHover(rating);
  }

  return(
    <div className="star-rating">
      {
        [...Array(noOfStars)].map((_,index) => {
          index += 1

          return <FaStar
            key={index}
            className={index <= (hover || rating) ? 'active' : 'inactive'}
            onClick={() => handleClick(index)}
            onMouseMove={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
            size={40}
          />
        })
      }
    </div>
  )
}
StarRating.propTypes = {
  noOfStars: PropTypes.number
}
StarRating.defaultProps = {
  noOfStars: 5
}
export default StarRating;
