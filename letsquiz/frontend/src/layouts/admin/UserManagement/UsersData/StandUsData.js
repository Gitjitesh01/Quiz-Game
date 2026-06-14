import axios from "axios";

import { USER, baseUrl } from "../../../../constants/apiUrl";
import { useState } from "react";

const transformUserData = (user, index) => {
  const quizzesAttended = user.quizes_attended_info || [];
  const quizzesAttendedFree = quizzesAttended.filter(
    (quiz) => quiz.paymentType === "free"
  );
  const quizzesAttendedPaid = quizzesAttended.filter(
    (quiz) => quiz.paymentType === "paid"
  );

  const amountSpentPaid = quizzesAttendedPaid.reduce(
    (total, quiz) => total + parseFloat(quiz.payment_status.amount || 0),
    0
  );
  const revenueToPremiumUsersCurrent = quizzesAttendedPaid.reduce(
    (total, quiz) => total + (quiz.payment_to_user || 0),
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
    quizesCreated: user.free_quiz_created_count + user.paid_quiz_created_count,
    quizzesAttendedfree: quizzesAttendedFree.length,
    quizzesAttendedPaid: quizzesAttendedPaid.length,
    amountSpentPaid: amountSpentPaid.toFixed(2),
    quiz: "Mathematics", // Assuming fixed value, update logic if dynamic value required
    totalCertificatesEarnedFree: totalCertificatesEarnedFree,
    totalCertificatesEarnedPaid: totalCertificatesEarnedPaid,
    revenueToPremiumUsersCurrent: revenueToPremiumUsersCurrent.toFixed(2),
    revenueToPremiumUsersGross: 150.0, // Assuming fixed value, update logic if dynamic value required
    revenueToAdminCurrent: revenueToAdminCurrent.toFixed(2),
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
  await getAllUserData();
  return transformedData;
};

export const data = [
  {
    sno: 1,
    userId: "USR001",
    userType: "Student",
    status: "Active",
    freeQuizzesCreated: 5,
    quizzesAttendedfree: 10,
    quizzesAttendedPaid: 15,
    amountSpentPaid: 50.0,
    quiz: "Mathematics",
    totalCertificatesEarnedFree: 8,
    totalCertificatesEarnedPaid: 12,
    revenueToPremiumUsersCurrent: 100.0,
    revenueToPremiumUsersGross: 150.0,
    revenueToAdminCurrent: 80.0,
    revenueToAdminGross: 120.0,
    userEnableDisableDelete: "Edit/Delete",
  },
  {
    sno: 2,
    userId: "USR002",
    userType: "Teacher",
    status: "Active",
    freeQuizzesCreated: 0,
    quizzesAttendedfree: 0,
    quizzesAttendedPaid: 0,
    amountSpentPaid: 0.0,
    quiz: "Science",
    totalCertificatesEarnedFree: 0,
    totalCertificatesEarnedPaid: 0,
    revenueToPremiumUsersCurrent: 0.0,
    revenueToPremiumUsersGross: 0.0,
    revenueToAdminCurrent: 0.0,
    revenueToAdminGross: 0.0,
    userEnableDisableDelete: "Edit/Delete",
  },
  {
    sno: 3,
    userId: "USR002",
    userType: "Teacher",
    status: "Active",
    freeQuizzesCreated: 8,
    quizzesAttendedfree: 12,
    quizzesAttendedPaid: 20,
    amountSpentPaid: 70.0,
    quiz: "Science",
    totalCertificatesEarnedFree: 10,
    totalCertificatesEarnedPaid: 18,
    revenueToPremiumUsersCurrent: 120.0,
    revenueToPremiumUsersGross: 180.0,
    revenueToAdminCurrent: 100.0,
    revenueToAdminGross: 150.0,
    userEnableDisableDelete: "Edit/Delete",
  },
  // {
  //   sno: 2,
  //   userId: 'USR002',
  //   userType: 'Teacher',
  //   status: 'Active',
  //   freeQuizzesCreated: 8,
  //   quizzesAttendedfree: 12,
  //   quizzesAttendedPaid: 20,
  //   amountSpentPaid: 70.00,
  //   quiz: 'Science',
  //   totalCertificatesEarnedFree: 10,
  //   totalCertificatesEarnedPaid: 18,
  //   revenueToPremiumUsersCurrent: 120.00,
  //   revenueToPremiumUsersGross: 180.00,
  //   revenueToAdminCurrent: 100.00,
  //   revenueToAdminGross: 150.00,
  //   userEnableDisableDelete: 'Edit/Delete',
  // }, {
  //   sno: 2,
  //   userId: 'USR002',
  //   userType: 'Teacher',
  //   status: 'Active',
  //   freeQuizzesCreated: 8,
  //   quizzesAttendedfree: 12,
  //   quizzesAttendedPaid: 20,
  //   amountSpentPaid: 70.00,
  //   quiz: 'Science',
  //   totalCertificatesEarnedFree: 10,
  //   totalCertificatesEarnedPaid: 18,
  //   revenueToPremiumUsersCurrent: 120.00,
  //   revenueToPremiumUsersGross: 180.00,
  //   revenueToAdminCurrent: 100.00,
  //   revenueToAdminGross: 150.00,
  //   userEnableDisableDelete: 'Edit/Delete',
  // },
  // Add more rows as needed
];
