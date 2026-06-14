import React, { useState, useRef, useEffect } from "react";
import swal from "sweetalert";
import Card from "../utility/subscriptionCard";
import axios from "axios";
import ChooseSubscription from "../../component/utility/chooseSubscription";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { baseUrl, USER } from "../../constants/apiUrl";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import profiledemo from "../../assets/img/profieldemo.jpg";
import { responsiveFontSizes } from "@mui/material";

const Profile = ({ userName, subscriptionType }) => {
  const { currentuserdata, setcurrentuserdata, setCurrentUser } = useUser();
  console.log(currentuserdata);

  const [subscription, setSubscription] = useState(
    currentuserdata?.subscriptionType
  );
  const [viewPage, setViewPage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(currentuserdata?.profilePic);
  const [about, setAbout] = useState(currentuserdata?.about || "");
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    userid: currentuserdata?._id,
    email: currentuserdata?.email || "",
    phoneNumber: currentuserdata?.phoneNumber || "",
    password: currentuserdata?.password || "",
    language: "eng",
  });

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = async () => {
    try {
      const updatedUser = {
        ...currentuserdata,
        about,
        profilePic: selectedFile,
      };
      console.log(updatedUser);
      const response = await axios.post(
        baseUrl + USER.GETUSERBYIDANDUPDATE + currentuserdata.id,
        updatedUser
      );

      if (response.status === 200) {
        swal("Success", "Profile updated successfully!", "success");
        console.log(response.data.user);
        setCurrentUser(response.data.user);
      } else {
        swal("Error", "Failed to update profile. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      swal("Error", "An error occurred while updating your profile.", "error");
    }
  };

  const handleSubscription = (choice) => {
    const updatedUser = { ...currentuserdata, subscriptionType: choice };
    setcurrentuserdata(updatedUser);
    setSubscription(choice);
  };

  const handleViewMore = () => {
    setViewPage(!viewPage);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveChanges();
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return viewPage ? (
    <ChooseSubscription
      handleViewMore={handleViewMore}
      setSubscription={handleSubscription}
    />
  ) : (
    <MProfile
      userName={userName}
      currentUser={currentuserdata}
      subscriptionType={subscription}
      handleViewMore={handleViewMore}
      saveChanges={saveChanges}
      currentuserdata={currentuserdata}
      selectedFile={selectedFile}
      fileInputRef={fileInputRef}
      handleImageClick={handleImageClick}
      handleFileChange={handleFileChange}
      about={about}
      setAbout={setAbout}
      edit={edit}
      toggleEdit={toggleEdit}
      formData={formData}
      handleFormChange={handleFormChange}
      handleSubmit={handleSubmit}
    />
  );
};

Profile.propTypes = {
  userName: PropTypes.string.isRequired,
  subscriptionType: PropTypes.string,
};


const MProfile = ({
  userName,
  subscriptionType,
  currentUser,
  saveChanges,
  handleViewMore,
  selectedFile,
  fileInputRef,
  handleImageClick,
  handleFileChange,
  about,
  setAbout,
  edit,
  currentuserdata,
  toggleEdit,
  formData,
  handleFormChange,
  handleSubmit,
}) => {
  const [activeTab, setActiveTab] = useState("profile"); // To manage active tab
  const [data_is_get , setdata_is_get] = useState(false);
  console.log(currentuserdata)
  
  const [userid, setUserid] = useState(currentuserdata?.id);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountType, setAccountType] = useState("savings"); // Should be one of: 'Savings', 'Current', 'Fixed Deposit', 'Recurring Deposit'
  const [contactNumber, setContactNumber] = useState(currentuserdata?.phoneNumber);

  // useEffect(() => {
  //   setBankDetails((prevDetails) => ({
  //     ...prevDetails,
  //     contactNumber: currentuserdata.phoneNumber,
  //     userid: currentuserdata.id,
  //   }));
  //   console.log(currentuserdata?.phoneNumber);
  // }, [currentuserdata]);
 
  // console.log(bankDetails)
  console.log(currentuserdata?.id);
  
  // Handle changes for bank details form inputs
  const handleBankDetailChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const getdetails = async () => {

    try {
      const response = await axios.get(baseUrl + `bankdetails/${currentuserdata?.id}`);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data[0])
        setAccountHolderName(response.data[0].accountHolderName);
        setAccountNumber(response.data[0].accountNumber);
        setIfscCode(response.data[0].ifscCode);
        setBankName(response.data[0].bankName);
        setBranchName(response.data[0].branchName);
        setAccountType(response.data[0].accountType);
        setContactNumber(response.data[0].contactNumber);
        if(responsiveFontSizes.data[0] !== undefined){
          setdata_is_get(true);
        }else{
          return;
        }
      } else {
        swal("Error", "Failed to fetch bank details. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      // swal("Error", "An error occurred while fetching bank details.", "error");

    }
  };

  useEffect(()=>{
    getdetails();
  },[])

  // Submit bank details to the backend
  const handleBankDetailSubmit = async (e) => {
    e.preventDefault();
    if(data_is_get){
      await updateBankDetails();
    } else {
      await saveBankDetails();
    }
  };


  const updateBankDetails = async () => {
    const updatedBankDetails = {
      accountHolderName: accountHolderName,
      accountNumber: accountNumber,
      ifscCode: ifscCode,
      bankName: bankName,
      branchName: branchName,
      accountType: accountType,
      contactNumber: contactNumber,
      userid : currentuserdata?.id

    };

    try {
      const response = await axios.patch(baseUrl + `bankdetails/${currentuserdata?.id}`, updatedBankDetails);
      console.log(response);
      if (response.status === 200) {
        swal("Success", "Bank details updated successfully!", "success");
      } else {
        swal("Error", "Failed to update bank details. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error updating bank details:", error);
      swal("Error", "An error occurred while updating bank details.", "error");
    }
  };

  const saveBankDetails = async () => {
    try {
      const response = await axios.post(baseUrl + `bankdetails`, {
        accountHolderName: accountHolderName,
        accountNumber: accountNumber,
        ifscCode: ifscCode,
        bankName: bankName,
        branchName: branchName,
        accountType: accountType,
        contactNumber: contactNumber,
        userid : currentuserdata?.id
      });
      console.log(response);
      if (response.status === 201) {
        swal("Success", "Bank details saved successfully!", "success");
       

      } else {
        swal("Error", "Failed to save bank details. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error saving bank details:", error);
      swal("Error", "An error occurred while saving bank details.", "error");
    }
  };




  const profilepic = localStorage.getItem("userpic");


  return (
    <>
    {!edit ? <section className="text-bold flex justify-center gap-8 bg-white">
      <div className="w-[80vw] px-12">
        {!edit && (
          <div className="flex items-center justify-center gap-5 py-3  ">
            {console.log(currentuserdata?.profilePic)}
            <img
              src={
                profilepic
                  ? profilepic
                  : currentuserdata?.profilePic
                  ? currentuserdata?.profilePic
                  : profiledemo
              }
              className="h-28 w-28 rounded-full object-cover"
              alt=""
            />
            <div className="mb-4 flex  flex-col text-center font-extrabold tracking-tight text-[rgb(0,103,179)] ">
              <p className="text-4xl">{userName}</p>
              <p className="text-lg font-light text-zinc-600">
                {about ? about : "Bio goes here"}
              </p>
              <button
                onClick={toggleEdit}
                className="ml-3 mt-2 rounded-lg bg-[#1890e5] px-4 py-2 font-semibold font-thin text-white"
              >
                Edit profile
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {edit && (
            <div className="space-y-8 p-3">
              <h3 className="text-center text-3xl font-semibold">Update</h3>
              <div className="text-center">
                <h2>My Subscription</h2>
              </div>

              <div className="flex w-full items-center justify-center">
                <div className="relative">
                  <img
                    className={`h-40 ${
                      selectedFile ? "" : "bg-blue-500 ring-blue-500"
                    } w-40 cursor-pointer rounded-full object-cover p-1 shadow-2xl ring-2 `}
                    src={selectedFile || profilepic}
                    alt={currentUser?.firstName}
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  {selectedFile && (
                    <div className="absolute right-0 top-0">
                      <FaPencil onClick={handleImageClick} />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="mb-2 block text-xl font-bold text-gray-900"
                >
                  My Bio
                </label>
                <input
                  id="bio"
                  rows="4"
                  onChange={(e) => setAbout(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Write about yourself"
                  value={about}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm outline-none focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Enter Email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Phone No.
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm outline-none focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Enter Phone No."
                  required
                  value={formData.phoneNumber}
                  onChange={handleFormChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm outline-none focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleFormChange}
                />
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Select Language
                </label>
                <select
                  id="language"
                  name="language"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
                  value={formData.language}
                  onChange={handleFormChange}
                >
                  <option value="eng">English</option>
                  <option value="tam">Tamil</option>
                </select>
              </div>

              <div className="flex items-center justify-evenly">
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="mr-4 rounded-lg bg-red-700 px-5 py-3 text-center text-sm font-medium text-white duration-150 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mr-4 rounded-lg bg-[#1D4ED8] px-5 py-3 text-center text-sm font-medium text-white duration-150 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section> :   <section className="text-bold flex justify-center gap-8 bg-white">
      <div className="w-[80vw] px-12">
        {/* Tab Navigation */}
        <div className="mb-6 flex justify-center border-b">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === "profile" ? "border-b-2 border-blue-600" : "text-gray-500"
            }`}
          >
            Update Profile
          </button>
          <button
            onClick={() =>{ if(!currentuserdata.phoneNumber){
              swal("Error", "please provide phone number first", "error");
              return;
            }
               setActiveTab("bankDetails")}}
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === "bankDetails" ? "border-b-2 border-blue-600" : "text-gray-500"
            }`}
          >
            Update Bank Details
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
         <section className="flex justify-center bg-white py-8">
         <div className="w-full max-w-5xl px-6 md:px-12">
           {!edit && (
             <div className="flex flex-col items-center gap-6 py-6 md:flex-row md:gap-10">
               {console.log(currentuserdata?.profilePic)}
               <img
                 src={
                   profilepic
                     ? profilepic
                     : currentuserdata?.profilePic
                     ? currentuserdata?.profilePic
                     : profiledemo
                 }
                 className="h-32 w-32 rounded-full object-cover shadow-lg border-4 border-blue-500"
                 alt="Profile"
               />
               <div className="text-center md:text-left">
                 <p className="text-3xl font-bold text-blue-600">{userName}</p>
                 <p className="mt-2 text-base text-gray-600">
                   {about ? about : "Bio goes here"}
                 </p>
                 <button
                   onClick={toggleEdit}
                   className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-blue-300"
                 >
                   Edit Profile
                 </button>
               </div>
             </div>
           )}
       
           {edit && (
             <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-md">
               <h3 className="text-center text-2xl font-bold text-gray-800">Update Profile</h3>
       
               <div className="text-center">
                 <h4 className="text-lg font-semibold text-gray-700">My Subscription</h4>
               </div>
       
               <div className="flex justify-center">
                 <div className="relative">
                   <img
                     className={`h-40 w-40 rounded-full object-cover shadow-lg ${
                       selectedFile ? "" : "bg-blue-500 ring-blue-500"
                     }`}
                     src={selectedFile || profilepic}
                     alt={currentUser?.firstName}
                     onClick={handleImageClick}
                   />
                   <input
                     type="file"
                     accept="image/*"
                     onChange={handleFileChange}
                     ref={fileInputRef}
                     className="hidden"
                   />
                   {selectedFile && (
                     <div className="absolute right-0 top-0 cursor-pointer bg-gray-200 p-1 rounded-full">
                       <FaPencil onClick={handleImageClick} />
                     </div>
                   )}
                 </div>
               </div>
       
               <div>
                 <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                   My Bio
                 </label>
                 <textarea
                   id="bio"
                   rows="3"
                   onChange={(e) => setAbout(e.target.value)}
                   className="block w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                   placeholder="Write about yourself"
                   value={about}
                 ></textarea>
               </div>
       
               <div>
                 <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                   Email
                 </label>
                 <input
                   type="email"
                   id="email"
                   name="email"
                   className="block w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                   placeholder="Enter Email"
                   required
                   value={formData.email}
                   onChange={handleFormChange}
                 />
               </div>
       
               <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-2">
                   Phone Number
                 </label>
                 <input
                   type="text"
                   name="phoneNumber"
                   className="block w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                   placeholder="Enter Phone Number"
                   required
                   value={formData.phoneNumber}
                   onChange={handleFormChange}
                 />
               </div>
       
               <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-2">
                   Password
                 </label>
                 <input
                   type="password"
                   name="password"
                   className="block w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                   placeholder="Enter Password"
                   value={formData.password}
                   onChange={handleFormChange}
                 />
               </div>
       
               <div>
                 <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-2">
                   Select Language
                 </label>
                 <select
                   id="language"
                   name="language"
                   className="block w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                   value={formData.language}
                   onChange={handleFormChange}
                 >
                   <option value="eng">English</option>
                   <option value="tam">Tamil</option>
                 </select>
               </div>
       
               <div className="flex items-center justify-between">
                 <button
                   type="button"
                   onClick={toggleEdit}
                   className="rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600 focus:ring-2 focus:ring-red-300"
                 >
                   Cancel
                 </button>
                 <button
                   type="submit"
                   className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                 >
                   Save
                 </button>
               </div>
             </form>
           )}
         </div>
       </section>
       
        )}

        {/* Bank Details Tab */}
        {activeTab === "bankDetails" && (
         <form onSubmit={handleBankDetailSubmit} className="space-y-6">
         <h3 className="text-center text-3xl font-semibold">Update Bank Details</h3>
       
         {/* Account Holder Name */}
         <div>
           <label
             htmlFor="accountHolderName"
             className="mb-2 block text-sm font-medium text-gray-900"
           >
             Account Holder Name
           </label>
           <input
             type="text"
             id="accountHolderName"
             name="accountHolderName"
             className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
             placeholder="Enter Account Holder Name"
             valuebankDetails ={ accountHolderName}
             onChange={(e)=> setAccountHolderName(e.target.value)}
             required
           />
         </div>
       
         {/* Account Number */}
         <div>
           <label
             htmlFor="accountNumber"
             className="mb-2 block text-sm font-medium text-gray-900"
           >
             Account Number
           </label>
           <input
             type="text"
             id="accountNumber"
             name="accountNumber"
             className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
             placeholder="Enter Account Number"
             value={accountNumber}
             onChange={(e)=> setAccountNumber(e.target.value)}
             required
           />
         </div>
       
        
      {/* IFSC Code */}
      <div>
        <label
          htmlFor="ifscCode"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          IFSC Code
        </label>
        <input
          type="text"
          id="ifscCode"
          name="ifscCode"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
          placeholder="Enter IFSC Code"
          value={ifscCode}
          onChange={(e)=> setIfscCode(e.target.value)}
          pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
          title="IFSC code must be 11 characters long, starting with 4 letters, followed by a 0, and ending with 6 alphanumeric characters."
          required
        />
      </div>
       
         {/* Bank Name */}
         <div>
           <label
             htmlFor="bankName"
             className="mb-2 block text-sm font-medium text-gray-900"
           >
             Bank Name
           </label>
           <input
             type="text"
             id="bankName"
             name="bankName"
             className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
             placeholder="Enter Bank Name"
             value={bankName}
             onChange={(e)=> setBankName(e.target.value)}
             required
           />
         </div>
       
         {/* Branch Name */}
         <div>
           <label
             htmlFor="branchName"
             className="mb-2 block text-sm font-medium text-gray-900"
           >
             Branch Name
           </label>
           <input
             type="text"
             id="branchName"
             name="branchName"
             className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
             placeholder="Enter Branch Name"
             value={branchName}
             onChange={(e)=> setBranchName(e.target.value)}
             required
           />
         </div>
       
         {/* Account Type */}
         <div>
           <label
             htmlFor="accountType"
             className="mb-2 block text-sm font-medium text-gray-900"
           >
             Account Type
           </label>
           <select
             id="accountType"
             name="accountType"
             className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
             value={accountType}
             onChange={(e)=> setAccountType(e.target.value)}
             required
           >
             <option value="" disabled>
               Select Account Type
             </option>
             <option value="Savings">Savings</option>
             <option value="Current">Current</option>
             <option value="Fixed Deposit">Fixed Deposit</option>
             <option value="Recurring Deposit">Recurring Deposit</option>
           </select>
         </div>
       
         {/* Contact Number */}
       {/*   <div>
           <label
             htmlFor="contactNumber"
             className="mb-2 block text-sm font-medium text-gray-900"
           >
             Contact Number
           </label>
           <input
             type="text"
             id="contactNumber"
             name="contactNumber"
             className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
             placeholder="Enter Contact Number"
             value={bankDetails && bankDetails.contactNumber}
             onChange={handleBankDetailChange}
             required
           />
         </div> */}
       
         {/* Save Button */}
         <div className="flex justify-between">
         <button
                  type="button"
                  onClick={toggleEdit}
                  className="mr-4 rounded-lg bg-red-700 px-5 py-3 text-center text-sm font-medium text-white duration-150 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  Cancel
                </button>
           <button
             type="submit"
             className="rounded-lg bg-blue-600 px-4 py-2 text-white"
           >
             {data_is_get ? "Update Bank Details" : "Save Bank Details"}
           </button>
           
         </div>
       </form>
       
        )}
      </div>
    </section> }
    
  
    </>
  
  );
};


MProfile.propTypes = {
  userName: PropTypes.string.isRequired,
  subscriptionType: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  saveChanges: PropTypes.func.isRequired,
  handleViewMore: PropTypes.func.isRequired,
  selectedFile: PropTypes.oneOfType([PropTypes.string, PropTypes.null])
    .isRequired,
  fileInputRef: PropTypes.object.isRequired,
  handleImageClick: PropTypes.func.isRequired,
  currentuserdata: PropTypes.object.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  about: PropTypes.string.isRequired,
  setAbout: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Profile;
