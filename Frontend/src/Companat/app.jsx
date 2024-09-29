

const Appp=({product,setEtit,openEdit,openRemove ,setProductidx,idx})=> {

    const Edit =()=>{
        setEtit(product);
        setProductidx(idx)
        openEdit();
        

    }
    const dele=()=>{
        setEtit(product);
        openRemove();

    }
 return(
    
        
<div className="ml-4 p-2 border-black bg-slate-100 max-w-60 mb-10" >
    <div>
    
    <img src={product.ImgeUrl} className="rounded-md w-full h-48 "  alt=''/>
    <h2 className="text-lg">{product.NameOfStadium}</h2>
    </div>
    <p className="opacity-40"> {product.Discription} 
    </p><br/>
   
    <div className="flex items-center space-x-1"> 
        <span className="pl-3 w-20 h-8 bg-red-600 text-white rounded-md cursor-pointer  hover:bg-red-500">{product.time}</span>


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
    