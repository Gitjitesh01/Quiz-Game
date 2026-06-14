import React,{useState} from "react";
import swal from "sweetalert";
import UpdateProfile from "../Update-profile/Update-Profile";
import chooseSubscription from "../../component/utility/chooseSubscription";
import { Link } from "react-router-dom";

("react");

const Settings = () => {

  const [showdialoag, setshowdialoag] = useState(false)

  const handleShowDialog = () => {
    setshowdialoag(()=>!showdialoag)
  }
  return (
    <section className="flex justify-center  flex-col gap-3 bg-white  ">
      <div className="w-full">
        <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900   ">
          Settings
        </h2>
       
      </div>
      <div className="w-full h-full flex justify-center items-center flex-wrap gap-2 ">
        <div className="border-2 border-zinc-500 rounded-xl p-5 w-[45%] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold">Update profile</h2>
        <Link
          // onClick={handleShowDialog}
          to="/dashboard/profile"
          className="bg-[#1890e5] font-semibold font-thin ml-3 text-white rounded-lg px-4 py-2 mt-2"
        >
          update profile
        </Link>
      {showdialoag && 
      
        <div className="w-screen h-screen flex -ml-1 -mt-1 justify-center p-3 items-center fixed bg-zinc-300/50 backdrop-blur-sm  left-1 z-50 top-1">
            <div className="w-1/2 rounded-xl h-3/4 p-3 bg-white">
            
            <UpdateProfile handleShowDialog={handleShowDialog}  />
            
            </div>
        </div>
        
      }
        </div>
        <div className="border-2 border-zinc-500 rounded-xl p-5 w-[45%] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold">Subsciption</h2>
        <Link
        to='/dashboard/choosesubscription'
          className="bg-[#1890e5] font-semibold font-thin ml-3 text-white rounded-lg px-4 py-2 mt-2"
        >
          Update Subcription
         </Link>
         </div>
      </div>
    
      
    </section>
  );
};

export default Settings;
