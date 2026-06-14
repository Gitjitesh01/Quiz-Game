import React, { useEffect, useState } from "react";
import { baseUrl, USER } from "../../constants/apiUrl";
import axios from "axios";
import { useUser } from "../../context/userContext";
import swal from "sweetalert";
import PropTypes from "prop-types";

const Index = ({ handleShowDialog }) => {
  // Add prop validation
  Index.propTypes = {
    handleShowDialog: PropTypes.func.isRequired,
  };
  const { currentuserdata, setcurrentuserdata } = useUser();
  const [data, setdata] = useState();

  const [formData, setFormData] = useState({
    userid: currentuserdata?._id,
    email: currentuserdata?.email || "",
    phoneNumber: currentuserdata?.phoneNumber || "",
    password: currentuserdata?.password || "",
    language: "eng",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}${USER.UpdateUserById}/${currentuserdata?._id}`,
        formData
      );
      swal("Form submitted successfully");
      setcurrentuserdata(response.data.user); // Update current user after successful submission
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-3">
      <h3 className="text-center text-3xl font-semibold">Update</h3>
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
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Phone No.
        </label>
        <input
          type="text"
          name="phone"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm outline-none focus:border-primary-500 focus:ring-primary-500"
          placeholder="Enter Phone No."
          required
          value={formData.phone}
          onChange={handleChange}
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
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="countries"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Select an option
        </label>
        <select
          id="countries"
          name="language"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
          value={formData.language}
          onChange={handleChange}
        >
          <option value="eng">English</option>
          <option value="tam">Tamil</option>
        </select>
      </div>
      <div className="flex items-center justify-evenly">
        <button
          type="button"
          onClick={handleShowDialog}
          className="mr-4 rounded-lg bg-red-700 px-5 py-3 text-center text-sm font-medium text-white outline-none duration-150 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-fit"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="mr-4 rounded-lg bg-[#1D4ED8] px-5 py-3 text-center text-sm font-medium text-white outline-none duration-150 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-fit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Index;
