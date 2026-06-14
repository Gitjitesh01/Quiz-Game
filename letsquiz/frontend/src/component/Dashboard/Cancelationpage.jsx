import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { baseUrl, subscription, Cancelation ,USER} from "../../constants/apiUrl";
import axios from "axios";

const Cancelationpage = () => {
  const [subcription, setSubcription] = useState([]);
  const { currentuserdata ,setCurrentUser } = useUser();
  console.log(currentuserdata);
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [image, setImage] = useState(null);
  const [cancelation, setCancelation] = useState([]);
  const [loading, setloading] = useState(false);

  const getcancelation = () => {
    axios
      .get(baseUrl + "cancelation/" + currentuserdata.id)
      .then((res) => {
        setCancelation(res.data);
        console.log(res.data);

      });
  };

  useEffect(() => {
    if(currentuserdata.requestForCancelation){
      getcancelation();
    }
  }, []);

const handleCancel = async () => {
    setloading(true);
    try {
      if (reason) {
        const data = {
          email: currentuserdata.email,
          reason: reason,
          userId : currentuserdata.id,
          isActive: true,
          requestDate: new Date(), // Use new Date() for requestDate
          cancelationDate: new Date(), // Use new Date() for cancelationDate
        //   imageurl: image,
          subscriptionType: currentuserdata.subscriptionType,
        };
  
        // Post cancellation data
        const cancelationResponse = await axios.post(baseUrl + Cancelation.createCancelation, data); 
        setCancelation(cancelationResponse.data);
  
        // Update user data
        axios
        .post(baseUrl + USER.UpdateUserById + currentuserdata.id ,{ requestForCancelation : true})
        .then((res) => {
          setCurrentUser(res.data.user);
          window.location.reload();
        });
      } else {
        alert("Please select a reason for cancellation.");
      }
    } catch (error) {
      console.error("Error during cancellation:", error);
    } finally {
      setloading(false);
    }
  };
  


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      {cancelation?._id  ? (<div className=" mx-auto  w-full rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">
          Cancel Subscription
        </h2>
        <p className="mb-6 text-gray-600">
          We're sorry to see you go. Please tell us why you're canceling:
        </p>

        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mb-6 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a reason</option>
          <option value="Too expensive">Too expensive</option>
          <option value="Not using enough">Not using enough</option>
          <option value="Switching to another service">
            Switching to another service
          </option>
          <option value="Getting problem in subscription">
            Getting problem in subscription
          </option>
          <option value="Other">Other</option>
        </select>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Any additional feedback (optional)"
          className="mb-6 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <label className="mb-3 block font-medium text-gray-700">
          Upload an image (optional):
        </label>
        <div className="mb-6 flex w-full items-center justify-center">
          <label className="flex h-32 w-full cursor-pointer flex-col rounded-lg border-4 border-dashed border-gray-300 hover:border-blue-500">
            <div className="flex flex-col items-center justify-center pt-7">
              {image ? (
                <p className="text-sm text-gray-500">{image.name}</p>
              ) : (
                <>
                  <svg
                    className="h-8 w-8 text-gray-400 duration-200 group-hover:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V8a4 4 0 014-4h6a4 4 0 014 4v8a4 4 0 01-4 4H7a4 4 0 01-4-4V8h4m0 0V5m0 3h4M5 12h6m-3 0v6"
                    ></path>
                  </svg>
                  <p className="pt-1 text-sm text-gray-500">Browse to upload</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="opacity-0"
            />
          </label>
        </div>

        <button
          onClick={handleCancel}
          className="w-full rounded-lg bg-red-500 py-3 text-white duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {loading ? "Loading..." : "Cancel Subscription"}
        </button>
      </div>) : null}

      <div className="w-full text-center text-4xl  h-fit ">
              we contact you as soon as possible
      </div>
    </div>
  );
};

export default Cancelationpage;
