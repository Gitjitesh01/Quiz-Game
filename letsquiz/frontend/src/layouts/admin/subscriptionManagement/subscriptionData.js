// makeData.js

import axios from "axios";

import { baseUrl, subscription } from "../../../constants/apiUrl";

// Example input data
let transformedData = [];

const getAllSubscription = async () => {
  try {
    let response = await axios.get(baseUrl + subscription.getAllSubscription);
    response = response.data.data;
    console.log(response);
    if (response) {
      response.forEach((item, ind) => {
        transformedData.push({
          id: ind + 1,
          _id: item._id,
          subscriptionName: item.subscriptionName,
          price: item.amount,
          description: item.description,
          mcq: item.mcq,
          fillups: item.fillups,
          truefalse: item.truefalse,
          matching: item.matching,
          draganddrop: item.draganddrop,
          shortanswer: item.shortanswer,
          dropdown: item.dropdown,
          checkbox: item.checkbox,
          date: item.date,
          email: item.email,
          poll: item.poll,
          wordcloud: item.wordCloud,
          imageInQuestions: item.imageInQuestions,
          audioInQuestions: item.audioInQuestions,
          videoInQuestions: item.videoInQuestions,
          certificates: item.certificates,
          certificateTemplates: item.certificateTemplates,
          ownCertificateTemplate: item.ownCertificateTemplate,
          createPaidQuizzes: item.createPaidQuizzes,
          isActive: item.isActive,
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

export const dataService = async () => {
  transformedData = [];
  await getAllSubscription();
  console.log(transformedData);
  return transformedData;
};
