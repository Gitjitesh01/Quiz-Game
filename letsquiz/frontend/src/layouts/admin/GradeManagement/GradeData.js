// makeData.js

import axios from "axios";

import { QUIZ, USER, baseUrl } from "../../../constants/apiUrl";
export const data = [
  {
    id: 1,
    qtype: "Multiple Choice",
    icon: 23,
    totalquestions: 22,
    status: "Enabled",
    action: "Edit / Disable / Delete",
  },
  {
    id: 1,
    qtype: "Fill Ups",
    icon: 23,
    totalquestions: 22,
    status: "Enabled",
    action: "Edit / Disable / Delete",
  },

  // Add more data as needed
];

// Example input data
let transformedData = [];

const getAllQuestionType = async () => {
  try {
    let response = await axios.post(baseUrl + QUIZ.getquizGradeWise, {
      quizType: "QUIZ",
    });
    response = response.data.data;
    const allGrades = JSON.parse(localStorage.getItem("allGrades"));

    console.log(response, allGrades);
    if (allGrades) {
      allGrades.forEach((item, ind) => {
        if (response[item.value])
          transformedData.push({
            id: ind + 1,
            name: item.name,
            type: item.value,
            icon: item.url,
            totalquiz: response[item.value].count,
            revenue: response[item.value].totalAmount,
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
