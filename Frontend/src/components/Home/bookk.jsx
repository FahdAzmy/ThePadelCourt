import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import withGuard from "../../utils/withGuard";
const API_URL = import.meta.env.VITE_APP_API_URL;
const Bookk = () => {
  const location = useLocation();
  const { bookidx } = location.state || {};
  console.log(bookidx);
  const [storbook, setStorbook] = useState([]);
  const replay = async () => {
    if (!bookidx) {
    } else {
      const store = await axios.get(`${API_URL}/book/${bookidx}`);
      setStorbook(store.data);
    }
  };
  useEffect(() => {
    replay();
  }, [bookidx]);
  return (
    <>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <div className="flex justify-between bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto my-10">
        <div className="w-2/5">
          <img
            src={storbook.ImgeUrl}
            alt="Hotel"
            className="w-full h-96 rounded-lg"
          />
        </div>

        <div className="w-3/5 pl-6">
          {storbook.Discription}

          <h2 className="text-2xl font-bold mb-2"> {storbook.NameOfStadium}</h2>

          <p className="text-gray-500 mb-4"></p>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            size="1x"
            style={{ color: "black" }}
          />

          {storbook.Location}
          {/* تفاصيل الحجز */}
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="font-semibold">Check-in</h2>
              <p className="text-gray-600">{storbook.time}, 13 Oct 2024</p>
            </div>
            <div>
              <h2 className="font-semibold">Check-out</h2>
              <p className="text-gray-600">{storbook.Totime}, 14 Oct 2024</p>
            </div>
            <div>
              <h2 className="font-semibold">Length of stay</h2>
              <p className="text-gray-600">1 hour</p>
            </div>
          </div>

          {/* عدد الغرف والأشخاص */}
          <p className="mb-6">
            You selected: <span className="font-semibold">For one hour</span>
          </p>

          {/* السعر */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-xl">Price summary</h2>
              <p className="text-gray-600">{storbook.Price}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-green-600">
                ${storbook.Price}
              </h2>
              <p className="text-gray-500">Taxes and charges included</p>
            </div>
          </div>

          {/* بيانات المستخدم */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-4">Your details</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Surname"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* زر التغيير */}
          <div className="mt-6 text-right">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
              Change your selection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default withGuard(Bookk);
