import InputField from "../../component/fields/InputField";
// import InputField from "component/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "../../../src/component/checkbox/index";
import { useState } from "react";
import axios from 'axios'
import { baseUrl,Admin } from "../../constants/apiUrl";

export default function SignIn() {

  const [admin, setAdmin] = useState()

  const [data, setdata] = useState({
    firstname:"",
    lastname:"",
    email:"",
    username:"",
    password:"",
    isActive:true,
  })

  const submitAdminForm = (e) => {
    e.preventDefault();
    console.log(data)
    axios.post(baseUrl + Admin.getAdminLogin ,data)
    .then((res)=>{
      console.log(res)
      localStorage.setItem('Admin', JSON.stringify(res.data));
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center ">
       <span className="self-center whitespace-nowrap fixed top-0 text-3xl font-bold ">
            Lets Quiz
          </span>
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
     
        <h4 className="text-navy-700 mb-2.5 text-4xl font-bold dark:text-white">
          Admin login page
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
       
        <div className="mb-6 flex items-center  gap-3">
          <div className="dark:bg-navy-700 h-px w-full bg-gray-200" />
          <div className="dark:bg-navy-700 h-px w-full bg-gray-200" />
        </div>
        <form action="" onSubmit={(e)=>submitAdminForm(e)}>
             {/* username */}
       
          {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          value={data.email}
          setvalue={(val)=>setdata({...data,email:val})}
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          value={data.password}
          setvalue={(val)=>setdata({...data,password:val})}
          placeholder="Min. 8 characters"
          id="password"
          type="password"
        />
        
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="text-navy-700 ml-2 text-sm font-medium dark:text-white">
              Keep me logged In
            </p>
          </div>
      
        </div>
        <input type="submit" value="Sign In"
        className="linear bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 mt-2 w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200 dark:text-white">
          
        </input>
        </form>
        
      </div>
    </div>
  );
}
