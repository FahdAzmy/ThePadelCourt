import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Book from "../Home/Booking";

export default function MainSection() {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 mb-6  text-center">
        Our Courts
      </h2>
      <div className="flex ">
        <Book />
      </div>
    </>
  );
}
