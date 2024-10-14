/* eslint-disable react/prop-types */
import { MapPin, DollarSign, Edit, Trash2 } from "lucide-react";

const Appp = ({ product, setEtit, openRemove }) => {
  const handleEdit = () => {
    setEtit(product);
  };

  return (
    <div className="ml-4 p-6 bg-gradient-to-br from-gray-100 to-slate-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 mb-10 max-w-sm">
      <div className="mb-5">
        <img
          src={product.courtImg.url}
          className="rounded-lg w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
          alt={product.name}
        />
        <h2 className="text-xl font-bold text-gray-800 mt-4">{product.name}</h2>
      </div>

      <div className="text-gray-600 mb-4">
        <div className="flex items-center mb-1">
          <MapPin className="w-5 h-5 text-blue-500 mr-2" />
          <p className="text-md font-bold">Location</p>
        </div>
        <span className="text-lg font-semibold">{product.location}</span>
      </div>

      <div className="flex flex-col  gap-3 mb-4">
        <p className="font-semibold ">operatingHours</p>
        <div className=" flex gap-2">
          <span>From</span>
          <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors">
            {product.operatingHours?.start} AM
          </span>
          <span>To</span>
          <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors">
            {product.operatingHours?.end} PM
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 text-gray-700">
        <p className="text-lg font-medium">Price per Hour:</p>
        <div className="flex items-center ">
          <span className="text-xl font-bold text-green-600">
            {product.pricePerHour}
          </span>
          <DollarSign className="w-4 h-4 mt-1 font-bold text-green-600" />
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg py-2 hover:from-blue-700 hover:to-blue-600 transition-all transform hover:-translate-y-1 flex items-center justify-center"
          onClick={handleEdit}
        >
          <Edit className="w-5 h-5 mr-2" />
          Edit
        </button>
        <button
          className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg py-2 hover:from-red-700 hover:to-red-600 transition-all transform hover:-translate-y-1 flex items-center justify-center"
          onClick={openRemove}
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Appp;
