import React from "react";
import swal from "sweetalert";

("react");
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER, baseUrl } from "../../constants/apiUrl";
import Select from "react-select";

const SignUpForm = (props, { setAcCreated }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("M");
  const [country, setCountry] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  //console.log(props.setAcCreated)

  const generateMongoId = (email) => {
    // Convert email to ArrayBuffer
    const encoder = new TextEncoder();
    const emailBuffer = encoder.encode(email);

    // Use SHA-256 hash function
    return window.crypto.subtle
      .digest("SHA-256", emailBuffer)
      .then((hashBuffer) => {
        // Convert hashBuffer to hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedEmail = hashArray
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");

        // Use the first 24 characters of the hashed email
        return hashedEmail.slice(0, 24);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const data = {
    //     firstname: firstName,
    //     lastname: lastName,
    //     phoneNumber: phoneNumber,
    //     password: password,
    //     email: props.signUpEmail,
    //     organization: props.organization
    // };
    // axios.post(props.userType, data)
    //     .then((response) => {
    //         // Handle success response if needed
    //         //console.log('Response:', response.data);
    //         props.setAcCreated(true)
    //         navigate('/');
    //     })

    const apiData = {
      returnSecureToken: true,
      email: props.signUpEmail,
      password: password,
      clientType: "CLIENT_TYPE_WEB",
    };
    try {
      // const response = await axios.post(
      //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANmzM-Q-qWaC5QgVx1pLFxK74uUp7Ghsw ",
      //   apiData
      // );
      // if (response.status !== 200) {
      //   alert("Email Already Exists");
      // }
      // const tokenId = response.data.idToken;
      // try {
      //   const response = await axios.post(
      //     "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyANmzM-Q-qWaC5QgVx1pLFxK74uUp7Ghsw",
      //     {
      //       idToken: tokenId,
      //     }
      //   );
      try {
        const localId = await generateMongoId(props.signUpEmail);
        const getUser = async () => {
          try {
            const data = {
              _id: localId,
              firstname: firstName,
              lastname: lastName,
              phoneNumber: phoneNumber,
              password: password,
              email: props.signUpEmail,
              organization: props.organization,
              userType: props.userType,
              subscriptionType: "basic",
              gender: gender,
              countryName: country.label.substring(
                country.label.indexOf(" ") + 1
              ),
              countryShort: country.value,
              city: city,
            };

            console.log(data);
            // navigate("/");
            await axios.post(baseUrl + USER.SIGNUP, data).then((response) => {
              //https://letsquiz.org/api/user/user-signup
              // Handle success response if needed
              console.log("Response:", response.data);
              props.setAcCreated(true);
              navigate("/");
            });
          } catch (error) {
            console.error("LOCAL SIGN UP ERROR", error);
          }
        };
        getUser();
      } catch (error) {
        console.error("API2 ERROR", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex w-[700px] justify-center gap-8 rounded-xl bg-white p-5">
        <div className="lg:w-3/4">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Your account details
            </h1>
          <form onSubmit={handleSubmit} className="space-y-8 flex justify-center items-start flex-wrap gap-3">
           <div className="mt-8">
           <div className="">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500        "
                placeholder="Enter First Name"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500        "
                placeholder="Enter Last Name"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Gender
              </label>
              <select
                id="countries"
                className="my-2 block w-[10rem] w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value={"M"} className=" text-black" selected>
                  Male
                </option>
                <option value={"F"} className=" text-black">
                  Female
                </option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500        "
                placeholder="Enter Phone Number"
                required
              />
            </div>
           </div>
            <div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Country
              </label>
              <CountrySelect country={country} setCountry={setCountry} />
            </div>

            
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500        "
                placeholder="Enter State"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500        "
                placeholder="Enter City"
                required
              />
            </div>
            </div>
            

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500        "
                placeholder="Enter Password"
                required
              />
              <span className="text-sm text-red-500">
                Password should be at least 6 characters
              </span>
            </div>

            <button
              type="submit"
              className="mr-4 rounded-lg bg-sky-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-fit   "
            >
              Create Account
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
const CountrySelect = ({ country, setCountry }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setCountry(data.userSelectValue);
      });
  }, []);
  return (
    <Select
      options={countries}
      value={country}
      onChange={(selectedOption) => setCountry(selectedOption)}
    />
  );
};
export default SignUpForm;
