import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import withGuard from "../../utils/withGuard";
import { getCourt } from "../../api/api";

const Bookk = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  useEffect(() => {
    const fetchCourtDetails = async () => {
      try {
        const response = await getCourt(id);
        setCourt(response.court);
        console.log(response);
      } catch (error) {
        console.error("Error fetching court details:", error);
      }
    };

    fetchCourtDetails();
  }, [id]);
  if (!court) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <div className="flex justify-between bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto my-10">
        <div className="w-2/5">
          <img
            src={court.courtImg.url}
            alt="Hotel"
            className="w-full h-96 rounded-lg"
          />
        </div>

        <div className="w-3/5 pl-6">
          {court.Discription}

          <h2 className="text-2xl font-bold mb-2"> {court.name}</h2>

          <p className="text-gray-500 mb-4"></p>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            size="1x"
            style={{ color: "black" }}
          />

          {court.Location}
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="font-semibold">Check-in</h2>
              <p className="text-gray-600">{court.time}, 13 Oct 2024</p>
            </div>
            <div>
              <h2 className="font-semibold">Check-out</h2>
              <p className="text-gray-600">{court.Totime}, 14 Oct 2024</p>
            </div>
            <div>
              <h2 className="font-semibold">Length of stay</h2>
              <p className="text-gray-600">1 hour</p>
            </div>
          </div>

          <p className="mb-6">
            You selected: <span className="font-semibold">For one hour</span>
          </p>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-xl">Price summary</h2>
              <p className="text-gray-600">{court.pricePerHour}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-green-600">
                ${court.pricePerHour}
              </h2>
              <p className="text-gray-500">Taxes and charges included</p>
            </div>
          </div>

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
