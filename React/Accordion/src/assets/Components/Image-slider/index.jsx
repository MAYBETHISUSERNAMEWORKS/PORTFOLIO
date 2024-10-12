// Import necessary dependencies and components
import { PropTypes } from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

// Define the ImageSlider component, accepting props: url, limit, and page
function ImageSlider({ url, limit, page }) {
  // Declare state variables for images, currentSlide, error message, and loading state
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch images from the provided API URL
  const fetchImages = useCallback(async (getUrl) => {
    try {
      setLoading(true);// Set loading state to true before fetching

      // Fetch images from API with pagination (page & limit)
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      // Set fetched images and turn off the loading state
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      // Handle and set error message if fetching fails
      setErrorMsg(e.message);
    }
  }, [page, limit]); // Add 'page' and 'limit' as dependencies

  // useEffect to fetch images when 'url' changes
  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url, fetchImages]); // 'fetchImages' is now a dependency

  // Debugging: log fetched images to the console
  console.log(images);

  // Return a loading message if data is being fetched
  if (loading) {
    return <div>Loading data! Please wait</div>;
  }

  // Return an error message if any error occurs
  if (errorMsg !== null) {
    return <div>Error occurred! {errorMsg}</div>;
  }

  // Function to handle previous slide navigation
  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  // Function to handle next slide navigation
  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  return (
    // Container for the image slider and navigation buttons
    <div className="container">
      {/* Left arrow for previous slide navigation */}
      <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left" />

      {/* Render images if available, show only the current image */}
      {
        images && images.length ?
          images.map((imageItem, index) =>
            <img
              key={imageItem.id} // Set unique key for each image
              alt={imageItem.download_url} // Set image alt text
              src={imageItem.download_url} // Set image source URL
              className={currentSlide === index
                ? "current-image" // Apply current image class if this is the active slide
                : "current-image hide-current-image"} // Hide other images
            />
          )
          : null
      }

      {/* Right arrow for next slide navigation */}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />

      {/* Circle indicators for navigation between slides */}
      <span className="circle-indicators">
        {
          images && images.length ?
            images.map((_, index) =>
              <button
                key={index} // Set unique key for each indicator
                className={
                  currentSlide === index
                    ? "current-indicator" // Highlight the active indicator
                    : "current-indicator inactive-current-indicator" // Inactive indicator for other slides
                }
                onClick={() => currentSlide(index)} // Set current slide on indicator click
              >
              </button>
            )
            : null
        }
      </span>
    </div>
  )
}

// Define prop types for the ImageSlider component to ensure correct props are passed
ImageSlider.propTypes = {
  url: PropTypes.string,
  limit: PropTypes.number,
  page: PropTypes.number
}

// Set default props for ImageSlider in case they are not provided
ImageSlider.default = {
  limit: 5,
  page: 1
}

// Export the ImageSlider component for use in other parts of the app
export default ImageSlider;
