import { MapPin, Calendar, Clock } from "lucide-react";

export default function MainSection() {
  const courts = [
    {
      image: "/FirstCourt.jpg",
      title: "Court 1 - New Cairo",
      description:
        "Enjoy playing paddle in New Cairo's best court with modern facilities.",
      location: "456 Padel Ave, New Cairo, Cairo",
    },
    {
      image:
        "https://c8.alamy.com/comp/2JCNCYB/view-of-an-empty-blue-padel-court-padel-is-a-mix-between-tennis-and-squash-its-usually-played-in-doubles-on-an-enclosed-court-2JCNCYB.jpg",
      title: "Court 3 - Maadi",
      description:
        "Maadi's finest paddle court, offering a beachfront experience in the heart of Cairo.",
      location: "789 River Rd, Maadi, Cairo",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/tennis-padel-court-grass-turf-260nw-2056500071.jpg",
      title: "Court 4 - Heliopolis",
      description:
        "This Heliopolis court features modern amenities and a convenient location for paddle lovers.",
      location: "101 Central Blvd, Heliopolis, Cairo",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
        Our Premium Courts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courts.map((court, index) => (
          <div
            key={index}
            className="transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={court.image}
                  alt={court.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Available
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{court.title}</h3>
                <p className="text-gray-600 mb-4">{court.description}</p>
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 text-sm">
                    {court.location}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 text-sm">
                    Open 7 AM - 11 PM
                  </span>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
