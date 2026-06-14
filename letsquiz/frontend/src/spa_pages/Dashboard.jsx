import React from "react";
import swal from "sweetalert";
import Navbar from "../component/Home/Navbar";
import Footer from '../component/Home/Footer'

("react");
import MainBoard from "../component/Dashboard/MainBoard";
import Sidebar from "../component/Dashboard/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useUser} from '../context/userContext'
import axios from "axios";
import { USER, baseUrl } from "../constants/apiUrl";

const Dashboard = (props) => {
  const {currentuserdata} = useUser()
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    // console.log(props.idToken);
    // This function will run when the component is rendered
    const curr = currentuserdata;
    const currentUser = currentuserdata;

    if ( isLogin || curr) {
      const getUser = async () => {
        try {
          if (currentUser) {
            // console.log(response)
            setUserType(currentUser.userType);
            console.log(currentUser.userType);
            setUserName(`${currentUser.firstname} ${currentUser.lastname}`);

            setLogin(true);
          } else {
            console.log("sending to /login");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error sending POST request:", error);
          navigate("/login");
        }
      };
      getUser();
    } else {
      console.log("sending to /login");
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-[97vw] overflow-x-hidden">
      <div className="flex h-fit w-[98.4vw] overflow-x-hidden">
      <div className="w-[15%]">
      <Navbar/>
      <Sidebar userType={userType}  />
      </div>
      <div className="ml-28n  w-[85%]  ">
      <MainBoard userType={userType} userName={userName} />
      </div>
      
    </div>
    
    </div>
  );
};

export default Dashboard;
