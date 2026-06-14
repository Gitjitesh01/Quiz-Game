// makeData.js

import axios from "axios";

import { QUIZ, banner, baseUrl } from "../../../constants/apiUrl";

// Example input data
let transformedData = [];

const getAllQuestionType = async () => {
  try {
    let response = await axios.get(baseUrl + banner.getAllBanner);
    response = response.data;
    console.log(response);
    if (response) {
      response.forEach((item, ind) => {
        transformedData.push({
          id: ind + 1,
          _id: item._id,
          name: item.title,
          description: item.description,
          image: item.image,
          status: item.isActive ? "Enabled" : "Disabled",
          action: "Edit / Disable / Delete",
        });
      });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error if needed
  }
};

export const userDataService = async () => {
  transformedData = [];
  await getAllQuestionType();
  return transformedData;
};
