import { useEffect, useState } from "react";
import { getCourts } from "../../api/api";
import CourtCart from "../CourtCart";

const Book = () => {
  const [allCourts, setAllCourts] = useState([]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const data = await getCourts();
        setAllCourts(data.courts);
      } catch (error) {
        console.error("Error Fetching Courts:", error);
      }
    };
    fetchCourts();
  }, []);

  return (
    <div className="flex overflow-x-auto gap-gutter pb-md hide-scrollbar pr-margin-mobile md:pr-margin-desktop snap-x">
      {allCourts.length > 0 ? (
        allCourts.map((court) => (
          <CourtCart court={court} key={court._id} />
        ))
      ) : (
        <div className="text-on-surface-variant font-label-md text-label-md">No courts available</div>
      )}
    </div>
  );
};

export default Book;
