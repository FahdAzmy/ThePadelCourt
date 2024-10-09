import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const Appp=({product,setEtit,openEdit,openRemove ,setProductidx,idx})=> {
    const Edit =()=>{
        setEtit(product);
        setProductidx(idx)
        openEdit();
        

    }
    const dele=()=>{
        setEtit(product);
        openRemove();
        setProductidx(idx)

    }
 return(
    
        
<div className="ml-4 p-2 border-black bg-slate-100 max-w-60 mb-10" >
    <div>
    
    <img src={product.ImgeUrl} className="rounded-md w-full h-48 "  alt=''/>
    <h2 className="text-lg">{product.NameOfStadium}</h2>
    </div>
    <p className="opacity-40"> {product.Discription} 
    </p><br/>

    <div className="text-xl">
    <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" style={{ color: 'black' }} />

    {product.Location}
    </div><br/>
    <div className="flex items-center space-x-1"> 
        <span className="pl-2 w-14 h-7 bg-black text-white rounded-md cursor-pointer  hover:bg-slate-600">{product.time}</span>
        <span className="pl-2 w-14 h-7 bg-black text-white rounded-md cursor-pointer  hover:bg-slate-600">{product.Totime}</span>

    </div>
   
    <p className="text-blue-600">
        ${product.Price}
        
        
    </p><br/>
    <div className="flex align-text-bottom space-x-2">
        <button className="bg-blue-600 rounded-md w-full text-white hover:bg-blue-500  h-9" onClick={Edit}>Edit</button>
        <button className="bg-red-600 rounded-md w-full text-white hover:bg-red-500 h-9" id={idx} onClick={dele}>delete</button>
        </div>
    </div>
    
 )}
 export default Appp ;
    