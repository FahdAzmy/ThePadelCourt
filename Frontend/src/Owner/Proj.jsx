
const API_URL = import.meta.env.VITE_APP_API_URL;
import Formlist from "./formlist";
import MyModal from "./modul"
import {  useEffect, useState } from 'react';
import ErrorMsg from "./ErrorMsg"
import Valid from "./validation"
import Appp from "./app"
import toast, { Toaster } from "react-hot-toast";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Page from "./ownerPage"
import axios from "axios";
const Proj =()=>{

    const obj ={
       NameOfStadium : "",
       Discription: "",
       ImgeUrl: "",
       Price : "",
       time :"",
       Totime:"",
       Location :""

      }

      //   ************* Show   ****************//
      const [starge,setStorge] =useState([])

      //   ************* updata   ****************//
      const [updataa ,setUpdataa]=useState([])

       //   ************* Product idx ****************//
      const [productidx ,setProductidx] =useState(0);

       //   ************* delete product ****************//
       const [deletedd ,setDeletedd] =useState([])

       //   ************* loop Product value ****************//
      const [edit ,setEtit]=useState(obj)
      console.log(edit);

      //   ************* put inputs value ****************//
      const[stataa ,setStatass]=useState(obj);

      const[ stata,setStats] =useState(obj)
      //   ************* open & close modul ****************//
      const [isOpen, setIsOpen] = useState(false)
      function open() {
        setIsOpen(true)
      }
      function close() {
        setIsOpen(false)
     }
      const onclose=()=>{
          setStats(obj);
          close();
          setMsgg(obj);
          }
  //   *************Button close Edit****************//
  const [isOpenEditmModul, setIsOpenEditmModul] = useState(false)
  function openEdit() {
    setIsOpenEditmModul(true)
  }
  function closeEdit() {
    setIsOpenEditmModul(false)
  }
  const oncloseEdit=()=>{
    setStats(obj);
    closeEdit();
  
  }


  //   *************Button close Remove****************//

  const [isOpenRemovemModul, setIsOpenremovemModul] = useState(false)
      function openRemove() {
        setIsOpenremovemModul(true)
      }
      function closeRemove() {
        setIsOpenremovemModul(false)
      }
  const oncloseRemove=()=>{
    closeRemove();
    
  }

    //   ************* make span vaild under every input ****************//
    const [msgg ,setMsgg] =useState(obj);
    //   ************* handeler for Time****************//
    
    //   *************    Api add ****************//
     const [apipost ,setApipost] = useState([])
     const addd =async()=>{

       const respose =await axios.post(`${API_URL}/ownerpage`,stata)
       console.log(respose.data);
       setApipost((old)=>{
         return[...old ,respose.data]
       })
     }
    //   *************    Api delete ****************//

    const delee =async()=>{
      console.log(productidx);
      const dele =await axios.delete(`${API_URL}/ownerpage/${productidx}`)
      setDeletedd(dele.data)

    }

    //   *************    Api updata ****************//

    const updata =async(productidx,edit)=>{
      const put =await axios.patch(`${API_URL}/ownerpage/${productidx}`,edit)
      setUpdataa(put.data);

    }
     //   *************    Api Show ****************//

    const replay = async()=>{
      const store =await axios.get(`${API_URL}/ownerpage`)

      setStorge(store.data)


    } 
    useEffect(()=>{
      replay();
    },[starge])
     
    //   ************* handeler of insert inputs****************//
    const handler =function (e){
        setStats((old)=>{
          
          return{...old,[e.target.name]:e.target.value}
      
        });}


    //   ************* handeler of Edit inputs****************//
        let handlerEdit =function (e){
          setEtit((old)=>{
            return{...old ,[e.target.name]:e.target.value}
          })
          setStatass((old)=>{
            
            return{...old,[e.target.name]:e.target.value}
        
          });
          setMsgg((old)=>{
            return{...old,[e.target.name]:""}
          })
          
        };
    //   ************* handeler of Time****************//

        const handerTime=(e)=>{
          setStats((old)=>{
          return{...old ,[e.target.name] :e.target.value}
         
        })
        setEtit((old)=>{
          return{...old ,[e.target.name]:e.target.value}
        })
        }

     //   *************submit of insert product ****************//
    const  onsubmitt= (e)=>{
        e.preventDefault();
        
        const errors =Valid(stata);
        //console.log(errors);
      
        //console.log(errors.errors);
        const haserror =Object.values(errors.errors).some(value => value ==="") 
        && Object.values(errors.errors).every(value => value==="")
        console.log(haserror);
        if(!haserror){
          
          setMsgg(errors);
           return ;
        }
        
        onclose()
        addd();
       
        //setAddproduct((old)=>{
          //console.log(old);
         //return[...old,stata]; }
        //)

      }
    
    //   *************submit of Product in the List  ****************//

    
    
      const onsubmit=(e)=>{
        e.preventDefault();
        
        const errors =Valid(stata);
        const haserror =Object.values(errors.errors).some(value => value ==="") 
        && Object.values(errors.errors).every(value => value==="") 
           if(haserror){
          setMsgg(errors)
           return ;
        }
        closeEdit();

        updata(productidx,edit);

        
    }

  //   *************Remove the product from List ****************//

    const onsubmitRemove=(e)=>{
      closeRemove();
      delee()      

      //const filterd = addproduct.filter((product)=>product.id !== edit.id)
      //setAddproduct(filterd);
      toast('your Studium deleded', {
        duration: 4000,
        position: 'top-center',
        style: {backgroundColor:"black" ,color:"white"}
    
      })
    }
    console.log();
     //   *************maping of input Edits ****************//

      const formlistlistEdit =Formlist.map(input =>(
   
        <form  key={input.id}>
           <label>{input.lable}</label>
           <input className='w-full rounded-md h-11 p-3 border-2 shadow-md 'name={input.lable} type='text' onChange={handlerEdit} value={edit[input.lable]} /><br/>
            { msgg.errors &&<ErrorMsg   msg={msgg.errors[input.lable]}/>}
 
            
           </form>
      ));

      //   *************maping of inputs of module ****************//

    const formlistlist =Formlist.map(input =>(
   
        <form  key={input.id}>
           <label>{input.lable}</label>
           <input className='w-full rounded-md h-11 p-3 border-2 shadow-md 'name={input.lable} type='text' onChange={handler}  /><br/>
            { msgg.errors && < ErrorMsg   msg={msgg.errors[input.lable]}/>}
            
           </form>
      ));
      
      //   *************maping of the product in the List  ****************//
     

      const products =starge.map((product, idx )=><Appp key={idx} openRemove={openRemove}  idx={product._id}  setProductidx={setProductidx} product={product} setEtit={setEtit} openEdit={openEdit} /> )


    return ( <>

        <Page/><br/>

        <div className="text-center">
        <MyModal stata={stata} edit={edit} handerTime={handerTime} formlistlist ={formlistlist} open={open}  isOpen={isOpen} close={close} onclose={onclose} onsubmitt={onsubmitt} />


        </div><br/>
        <div className=' w-auto ml-20 container grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 '>

        {products}

    
    {<div>
    <Button
        onClick={openEdit}
        className="  py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white "
      >
      </Button>
      <Dialog open={isOpenEditmModul} as="div" className="relative z-10 focus:outline-none" onClose={closeEdit}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel 
              transition
              className="w-full max-w-sm rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                          <h1 className='text-xl'>IDIT THIS Stadium</h1><br/>

              <DialogTitle className="space-y-1 ">
                {formlistlistEdit}
                <label>Time</label>
                <input className='w-full rounded-md h-11 p-3 border-2 shadow-md 'type ="time" name="time" value={edit["time"]} onChange={handerTime} />
                  {//console.log(edit.time)} 
                                            }
             <label>Totime</label>
             <input className='w-full rounded-md h-11 p-3 border-2 shadow-md 'type ="time" name="Totime" value={edit["Totime"]} onChange={handerTime} />
              </DialogTitle  >

              <div className="flex items-center my-3 space-x-2 ">

              
              </div>

               
              <div className="mt-4 flex space-x-3">
                <Button
                  className="w-full  rounded-md bg-blue-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-600"
                 onClick={onsubmit} >Submit</Button>
                  <Button
                  className="w-full  rounded-md bg-gray-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-600"
                  onClick={oncloseEdit}  >cancel</Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      </div>}


      {/*remove               */}


      {<div>
    <Button
        onClick={openRemove}
        className=" py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
      </Button>
      <Dialog open={isOpenRemovemModul} as="div" className="relative z-10 focus:outline-none" onClose={closeRemove}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel 
              transition
              className="w-full max-w-sm rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                          <h1 className=' text-xl'>Are you sure you want to remove this </h1><br/>

              <DialogTitle className="space-y-1  ">
                <p className='opacity-30'>
                  dopends on the company precidgios you cannot return the Item you have been removed
                </p>
                

              </DialogTitle  >

              <div className="flex items-center my-3 space-x-2 ">

              
              </div>

               
              <div className="mt-4 flex space-x-3">
                <Button
                  className="w-full  rounded-md bg-red-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-600"
                 onClick={onsubmitRemove} >Yes,Remove</Button>
                  <Button
                  className="w-full  rounded-md bg-gray-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-600"
                  onClick={oncloseRemove}  >cancel</Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      </div>}
      <Toaster/>
      </div>
    </>)
}
export default Proj ;