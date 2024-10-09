import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'



export default function MyModal({stata,edit,formlistlist,open,isOpen,close, onclose,onsubmitt ,handerTime}) {
return(

    <>
      <Button
        onClick={open}
        className="w-48 rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Create Stadium
      </Button>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel 
              transition
              className="w-full max-w-sm rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                          <h1 className='text-xl'>Add A New Stadium</h1><br/>

              <DialogTitle className="space-y-1 ">
                {formlistlist}
                <label>Time</label>
                <input className='w-full rounded-md h-11 p-3 border-2 shadow-md 'type ="time" name="time" value={edit[stata.time]} onChange={handerTime} />
                <label>Totime</label>

                <input className='w-full rounded-md h-11 p-3 border-2 shadow-md 'type ="time" name="Totime" value={edit[stata.time]} onChange={handerTime} />


              </DialogTitle  >

              <div className="flex items-center my-3 space-x-2 ">

              
              </div>

               
              <div className="mt-4 flex space-x-3">
                <Button
                  className="w-full  rounded-md bg-blue-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-600"
                  onClick={onsubmitt} >Submit</Button>
                  <Button
                  className="w-full  rounded-md bg-gray-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-600"
                  onClick={onclose}>cancel</Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      
</>


      
)}