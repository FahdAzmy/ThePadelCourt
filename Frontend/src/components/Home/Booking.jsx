import axios from "axios";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_APP_API_URL;

const Book =({index ,starge,setBookidx,bookidx})=>{
 
    const nav =useNavigate();
    const [loading, setLoading]=useState(false);
    
    
  
      const handelbook=()=>{
        setLoading(true);
        setBookidx(index);

        setTimeout(() => {
            nav("/book" ,{state :{bookidx :index}});
            setLoading(false);
        }, 100);

    }

    return<>
    <div
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
            <span className="text-gray-600 text-sm">
              {starge.Location}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-600 text-sm">
              Open 7 AM - 11 PM
            </span>
          </div>
        
          <button onClick={handelbook} disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center">
            <Calendar className="w-5 h-5 mr-2" />
            View Details
          </button>
        </div>
      </div>
    </div>
</>
  
  }

export default Book ;