import { useEffect, useState } from "react";
import { getCourts } from "../../api/api";
import CourtCart from "../CourtCart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const Book = () => {
  const [allCourts, setAllCourts] = useState([]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const data = await getCourts();
        setAllCourts(data.courts);
        console.log(allCourts);
      } catch (error) {
        console.error("Error Fetching Courts:", error);
      }
    };
    fetchCourts();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // عدد العناصر اللي هتظهر
    slidesToScroll: 1, // عدد العناصر اللي هتتحرك لما تقلب
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
    
      {" "}
      <div className="w-full">
      <Slider {...settings}>
        {allCourts.length > 0 ? (
          
          allCourts.map((court) => <CourtCart court={court} key={court._id} />)
        ) : (
          <div></div>
          
        )
        }
        </Slider>
      </div>
      
    </>
  );
};

export default Book;
{
  /* <div
className="p-4" // يضيف مساحة حول العنصر
>
<div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
  <div className="relative">
    <img
      src={starge.ImgeUrl}
      alt={starge.title}
      className="w-full h-56 object-cover"
    />
    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
      Available
    </div>
  </div>
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-2">{starge.title}</h3>
    <p className="text-gray-600 mb-4">{starge.Discription}</p>
    <div className="flex items-center mb-2">
      <MapPin className="w-5 h-5 text-gray-400 mr-2" />
      <span className="text-gray-600 text-sm">{starge.Location}</span>
    </div>
    <div className="flex items-center mb-4">
      <Clock className="w-5 h-5 text-gray-400 mr-2" />
      <span className="text-gray-600 text-sm">Open 7 AM - 11 PM</span>
    </div>

    <button
      onClick={handelbook}
      disabled={loading}
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
    >
      <Calendar className="w-5 h-5 mr-2" />
      View Details
    </button>
  </div>
</div>
</div> */
}
