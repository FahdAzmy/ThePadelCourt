import { useEffect, useState } from "react";
import { getCourts } from "../../api/api"; // Function to fetch courts from the API
import CourtCart from "../CourtCart"; // Component to display individual court details
import Slider from "react-slick"; // Carousel component for displaying courts
import "slick-carousel/slick/slick.css"; // Default styles for the carousel
import "slick-carousel/slick/slick-theme.css"; // Theme styles for the carousel

const Book = () => {
  const [allCourts, setAllCourts] = useState([]); // State to hold fetched court data

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const data = await getCourts(); // Fetch courts data from API
        setAllCourts(data.courts); // Update state with fetched data
      } catch (error) {
        console.error("Error Fetching Courts:", error); // Log any fetching errors
      }
    };
    fetchCourts(); // Call fetch function on component mount
  }, []); // Run only once on mount

  const settings = {
    dots: true, // Enable pagination dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll on each action
    responsive: [
      // Responsive settings for different screen sizes
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      {" "}
      {/* Container for the slider */}
      <Slider {...settings}>
        {" "}
        {/* Slider with defined settings */}
        {allCourts.length > 0 ? ( // Check if there are courts to display
          allCourts.map(
            (
              court // Map through courts to create CourtCart components
            ) => (
              <CourtCart court={court} key={court._id} /> // Render each CourtCart with unique key
            )
          )
        ) : (
          <div>No courts available</div> // Fallback if no courts are found
        )}
      </Slider>
    </div>
  );
};

export default Book; // Exporting the Book component
