import axios from "axios";

import { USER, baseUrl } from "../../../../constants/apiUrl";
import { useState } from "react";
// makeData.js
export const data = [
  {
    id: 1,
    userid: "ABC1",
    usertype: "User1",
    totalquiz: 23,
    freequiz: 22,
    paidquiz: 34,
    revenue: "500$",
  },
  {
    id: 1,
    userid: "ABC1",
    usertype: "User1",
    totalquiz: 23,
    freequiz: 22,
    paidquiz: 34,
    revenue: "500$",
  },
  {
    id: 1,
    userid: "ABC1",
    usertype: "User1",
    totalquiz: 23,
    freequiz: 22,
    paidquiz: 34,
    revenue: "500$",
  },
  {
    id: 1,
    userid: "ABC1",
    usertype: "User1",
    totalquiz: 23,
    freequiz: 22,
    paidquiz: 34,
    revenue: "500$",
  },
  {
    id: 1,
    userid: "ABC1",
    usertype: "User1",
    totalquiz: 23,
    freequiz: 22,
    paidquiz: 34,
    revenue: "500$",
  },
  {
    id: 1,
    userid: "ABC1",
    usertype: "User1",
    totalquiz: 23,
    freequiz: 22,
    paidquiz: 34,
    revenue: "500$",
  },

  // Add more data as needed
];

const transformUserData = (user, index) => {
  const quizzesAttended = user.quizes_attended_info || [];
  const quiz_amount_received_info = user.quiz_amount_received_info;
  const survey_amount_received_info = user.quiz_amount_received_info;
  const poll_amount_received_info = user.quiz_amount_received_info;
  const quizzesAttendedFree = quizzesAttended.filter(
    (quiz) => quiz.paymentType === "free"
  );
  const quizzesAttendedPaid = quizzesAttended.filter(
    (quiz) => quiz.paymentType === "paid"
  );

  // const amountEarnt = quizzesAttendedPaid.reduce((total, quiz) => total + parseFloat(quiz.payment_status.amount || 0), 0);
  const revenueToPremiumUsersCurrent = quizzesAttendedPaid.reduce(
    (total, quiz) => total + (quiz.payment_to_user || 0),
    0
  );
  const quizrevenue = quiz_amount_received_info.reduce(
    (total, quiz) => total + (quiz.amountReceived || 0),
    0
  );
  const pollrevenue = poll_amount_received_info.reduce(
    (total, poll) => total + (poll.amountReceived || 0),
    0
  );
  const surveyrevenue = survey_amount_received_info.reduce(
    (total, survey) => total + (survey.amountReceived || 0),
    0
  );
  const revenueToAdminCurrent = quizzesAttendedPaid.reduce(
    (total, quiz) => total + (quiz.payment_to_admin || 0),
    0
  );

  const totalCertificatesEarnedFree = quizzesAttendedFree.filter(
    (quiz) => quiz.certificate_status
  ).length;
  const totalCertificatesEarnedPaid = quizzesAttendedPaid.filter(
    (quiz) => quiz.certificate_status
  ).length;

  return {
    sno: index + 1,
    userId: user.userId,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    organization: user.organization,
    phoneNumber: user.phoneNumber,
    countryName: user.countryName,
    countryShort: user.countryShort,
    user_status: user.isActive,
    subscriptionType: user.subscriptionType,
    userType: user.userType.charAt(0).toUpperCase() + user.userType.slice(1),
    status: user.user_status ? "Active" : "Inactive",
    freeQuizzesCreated: user.free_quiz_created_count,
    paidQuizzesCreated: user.paid_quiz_created_count,
    paidPollsCreated: user.paid_poll_created_count,
    paidSurveysCreated: user.paid_survey_created_count,
    freePollsCreated: user.free_poll_created_count,
    freeSurveysCreated: user.free_survey_created_count,
    quizesCreated: user.free_quiz_created_count + user.paid_quiz_created_count,
    pollsCreated: user.free_poll_created_count + user.paid_poll_created_count,
    surveysCreated:
      user.free_survey_created_count + user.paid_survey_created_count,

    quizzesAttendedfree: quizzesAttendedFree.length,
    quizzesAttendedPaid: quizzesAttendedPaid.length,

    quiz: "Mathematics", // Assuming fixed value, update logic if dynamic value required
    totalCertificatesEarnedFree: totalCertificatesEarnedFree,
    totalCertificatesEarnedPaid: totalCertificatesEarnedPaid,
    revenueToPremiumUsersCurrent: revenueToPremiumUsersCurrent.toFixed(2),
    revenueToPremiumUsersGross: 150.0, // Assuming fixed value, update logic if dynamic value required
    revenueToAdminCurrent: revenueToAdminCurrent.toFixed(2),
    quizrevenue: quizrevenue,
    pollrevenue: pollrevenue,
    surveyrevenue: surveyrevenue,
    revenueToAdminGross: 120.0, // Assuming fixed value, update logic if dynamic value required
    userEnableDisableDelete: "Edit/Delete",
  };
};

// Example input data
let transformedData = [];

const getAllUserData = async () => {
  try {
    const response = await axios.get(baseUrl + USER.GETALLUSERS);

    if (response.data) {
      transformedData = response.data.data.map((user, index) =>
        transformUserData(user, index)
      );
      console.log(transformedData);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error if needed
  }
};

export const userDataService = async () => {
  transformedData = [];
  await getAllUserData();
  return transformedData;
};
