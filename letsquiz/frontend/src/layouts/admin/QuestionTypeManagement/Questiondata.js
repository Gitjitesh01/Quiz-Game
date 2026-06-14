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

const getAllQuestionType = async (quizType) => {
  try {
    let response = await axios.post(baseUrl + QUIZ.getquizQuestionWise, {
      quizType: quizType,
    });
    response = response.data.data;
    const allQuestion = JSON.parse(localStorage.getItem("allQuestions"));

    console.log(response, allQuestion);
    if (allQuestion) {
      allQuestion.forEach((item, ind) => {
        if (response[item.value])
          transformedData.push({
            id: ind + 1,
            name: item.name,
            qtype: item.value,
            icon: item.value,
            totalquestions: response[item.value],
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

export const userDataService = async (quizType) => {
  await getAllQuestionType(quizType);
  return transformedData;
};
