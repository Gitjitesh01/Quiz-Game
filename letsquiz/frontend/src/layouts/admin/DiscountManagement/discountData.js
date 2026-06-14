// makeData.js

import axios from "axios";

import { QUIZ, discount, baseUrl } from "../../../constants/apiUrl";

// Example input data
let transformedData = [];

const getAllQuestionType = async () => {
  try {
    let response = await axios.get(baseUrl + discount.getAllDiscount);
    response = response.data.data;

    if (response) {
      response.forEach((item, ind) => {
        transformedData.push({
          id: ind + 1,
          code: item.code,
          type: item?.type,
          value: item?.value,
          validFrom: item?.valid?.from,
          validTo: item?.valid?.to,
          status: item?.isActive ? "Enabled" : "Disabled",
          action: "Edit / Disable / Delete",
        });
      });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error if needed
  }
};

export const dataService = async () => {
  transformedData = [];
  await getAllQuestionType();
  return transformedData;
};
