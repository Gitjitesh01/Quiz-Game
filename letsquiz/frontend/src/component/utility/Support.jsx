import axios from 'axios';
import React, { useState } from "react";
import { baseUrl } from '../../constants/apiUrl';
import { useUser } from '../../context/userContext';
import swal from 'sweetalert';

const Support= () => {

    const {currentuserdata} = useUser();
    console.log(currentuserdata);

  const [formData, setFormData] = useState({
    name: currentuserdata.firstname + " " + currentuserdata.lastname,
    email: currentuserdata.email,
    subject: "",
    message: "",
    userPhone: currentuserdata.phoneNumber,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    // Add submission logic here


    axios.post(baseUrl + 'support', formData)
        .then((response) => {
            console.log('Success:', response.data);
            swal("Success", "Your query has been submitted successfully", "success");
            // Optionally, reset the form or show a success message
            setFormData({
                // name: "",
                // email: "",
                subject: "",
                message: "",
                // userPhone: "",
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
  };

  return (
    <div className="flex items-center justify-center   h-[80vh]">
      <div className="relative bg-white  rounded-lg p-6 w-full max-w-lg">
        {/* Decorative SVG */}
        <div className="absolute top-0 left-0 -z-10 w-44 h-38  rounded-full" />
        <div className="absolute bottom-0 right-0 -z-10 w-56 h-56 bg-blue-200 rounded-full" />

        <div className="text-center">
        <svg className="w-16 h-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1D4ED8"><path d="M22 17.0022C21.999 19.8731 19.9816 22.2726 17.2872 22.8616L16.6492 20.9476C17.8532 20.7511 18.8765 20.0171 19.4649 19H17C15.8954 19 15 18.1046 15 17V13C15 11.8954 15.8954 11 17 11H19.9381C19.446 7.05369 16.0796 4 12 4C7.92038 4 4.55399 7.05369 4.06189 11H7C8.10457 11 9 11.8954 9 13V17C9 18.1046 8.10457 19 7 19H4C2.89543 19 2 18.1046 2 17V12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V12.9987V13V17V17.0013V17.0022Z"></path></svg>
          <h2 className="text-3xl font-bold mb-4 text-blue-600">
            Need Help? Contact Us
          </h2>
          <p className="text-gray-600 mb-6">
            We're here to help! Fill out the form below, and we'll get back to
            you as soon as possible.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2 flex  flex-wrap gap-3">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>

        {/* Phone Number */}
        <div>
            <label
                htmlFor="userPhone"
                className="block text-sm font-medium text-gray-700"
            >
                Phone Number
            </label>
            <input
                type="tel"
                id="userPhone"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your Phone Number"
                required
            />
        </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your Email"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Subject"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
