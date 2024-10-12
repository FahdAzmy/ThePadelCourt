import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_APP_API_URL;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Book from "../Home//Booking"
import Bookk from "./bookk";
export default function MainSection() {
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrow :true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
    //   ************* Show   ****************//
    const [starge,setStorge] =useState([])
       //   *************    Api Show ****************//

       const replay = async()=>{
        const store =await axios.get(`${API_URL}/ownerpage`)
  
        setStorge(store.data)
  
  
      } 
      useEffect(()=>{
        replay();
      },[1])

      const handelbook=()=>{
      }
      const [bookidx ,setBookidx] =useState(0);
 
      const book=starge.map((starge, index) => <Book key={index} bookidx={bookidx} starge={starge} index={starge._id} handelbook={handelbook}setBookidx={setBookidx}  />)
return <>
<Slider {...settings}>
{book}
</Slider>
</>

}
