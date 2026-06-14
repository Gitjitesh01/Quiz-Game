import React from "react";
import swal from "sweetalert";

("react");
import { useState, useEffect } from "react";
import TakeEmail from "../component/SignUpComponents/TakeEmail";
// import TakeEmail from "../component/SignUpcomponent/TakeEmail";
import ChooseUserType from "../component/SignUpComponents/ChooseUserType";
import ChooseOrganization from "../component/SignUpComponents/ChooseOrganization";
import ChooseSubscription from "../component/utility/chooseSubscription";
import SignUpForm from "../component/SignUpComponents/SignUpForm";
import Navbar from "../component/Home/Navbar";

const SignupPage = ({ setAcCreated }) => {
  const [pageNum, setPageNum] = useState(0);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [subscription, setSubscription] = useState("");
  const [organization, setOrganization] = useState("");

  const handleSubscription = (type) => {
    setSubscription(type);
  };

  // const [firstName,setFirstName]=useState("");
  // const [lastName,setLastName]=useState("");
  // const [phoneNumber,setPhoneNumber]=useState("");
  // useEffect(() => {
  //     console.log(organization);
  //     console.log(userType)
  // }, [organization, userType]);

  const pages = [
    <TakeEmail setSignUpEmail={setSignUpEmail} setPageNum={setPageNum} />,
    <ChooseUserType setUserType={setUserType} setPageNum={setPageNum} />,
    // <ChooseSubscription
    //   setSubscription={handleSubscription}
    //   setPageNum={setPageNum}
    // />,
    <ChooseOrganization
      setOrganization={setOrganization}
      setPageNum={setPageNum}
    />,
    <SignUpForm
      signUpEmail={signUpEmail}
      userType={userType}
      subscription={subscription}
      organization={organization}
      setAcCreated={setAcCreated}
    />,
  ];

  return (
    <section className="bg-gray-50 ">
      <Navbar/>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        {pages[pageNum]}
      </div>
    </section>
  );
};

export default SignupPage;
