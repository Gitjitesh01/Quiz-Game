export const baseUrl1 = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : '');
export const baseUrl = baseUrl1.endsWith('/') ? `${baseUrl1}api/` : `${baseUrl1}/api/`;
export const USER = {
  get LOGIN() {
    return "user/user-login";
  },
  get USERCLASSIFICATION() {
    return "user/user-classfication";
  },
  get SIGNUP() {
    return "user/user-signup";
  },
  get getusersubcription() {
    return "getusersubcription";
  },
  get GETALLUSERS() {
    return "user/getallusers";
  },
  get GETUSERBYID() {
    return "user/user/";
  },
  get GETUSERFORCANCELATION() {
    return "user/user-for-cancelation";
  },
  get GETUSERBYIDANDUPDATE() {
    return "user/user-update/";
  },
  get addUserQuiz() {
    return "user/add-userquiz";
  },
  get addUserTransaction() {
    return "user/add-transaction";
  },
  get getCategoryWiseUsers() {
    return "user/user-categorywise";
  },
  get getSubCategoryWiseUsers() {
    return "user/user-subcategorywise";
  },

  get UpdateUserById() {
    return "user/user-update/";
  },

  //make delete user port
  get deleteUser() {
    return "user/delete-user";
  },
};

export const QUIZ = {
  //you can also use getQuiz to delete quiz just send and delete req. and id
  get giveRating(){
    return "quiz/quiz-rating";
  },
  get getQuiz() {
    return "quiz/quiz/";
  },
  get postQuizResponse() {
    return "quiz/quiz-response";
  },
  get updatePollVote() {
    return "quiz/poll-updatevote";
  },
  get postPollResponse() {
    return "quiz/poll-response";
  },
  get getQuizbyUser() {
    return "quiz/quizbyUserID/";
  },
  get getQuizbyresponseId() {
    return "quiz/quiz-responsebyId/";
  },
  get QuizresponsebyUserId() {
    return "quiz/responseby-userId/";
  },
  get getallQuizresponses (){
    return "quiz/quiz-reports";
  },
  get createQuiz() {
    return "quiz/create-quiz";
  },
  get createPoll() {
    return "quiz/create-poll";
  },
  get createSurvey() {
    return "quiz/create-survey";
  },
  get addQuizTransaction() {
    return "quiz/add-transaction";
  },
  get getQuizAttempts() {
    return "quiz/get-quizattempts";
  },
  get toggleActivityStatus() {
    return "quiz/toggleActivityStatus";
  },
  get getQuizByIdAndUpdate() {
    return "quiz/update-quiz";
  },
  //related to admin panel
  get getCategoryWiseQuiz() {
    return "quiz/quiz-categoryWise";
  },
  get getAllQuiz() {
    return "quiz/allquiz";
  },
  get getallPoll() {
    return "quiz/allpoll";
  },
  get getpollbyuserid() {
    return "quiz/getpollbyuserid/";
  },
  get getquizbyuserid() {
    return "quiz/quizbyuserid";
  },
  get getquizGradeWise() {
    return "quiz/quiz-gradewise";
  },
  get getquizQuestionWise() {
    return "quiz/quiz-questionType";
  },
  get getquizSubjectWise() {
    return "quiz/quiz-subjectWise";
  },
  get getAllGrades() {
    return "grades";
  },
  get getAllQuestions() {
    return "questions";
  },
  get getAllSubjects() {
    return "subjects";
  },
  get getGradeByIdAndEdit() {
    return "edit-grade";
  },
  get getGradeByIdAndDelete() {
    return "delete-grade";
  },
};

export const PUBLICURL = {
  get getAllQuestions() {
    return "questions/";
  },
  get postBulkQuestions() {
    return "bulk-questions";
  },
  get updateQuestions() {
    return "questions/:id";
  },
  get getAllSubjects() {
    return "subjects/";
  },
  get postBulkSubjects() {
    return "bulk-subjects";
  },
  get updateSubjects() {
    return "subjects/:id";
  },
  get getAllGrades() {
    return "grades/";
  },
  get postBulkGrades() {
    return "bulk-grades";
  },
  get updateGrades() {
    return "grade/:id";
  },
};

export const subscription = {
  get getSubscriptionbyid() {
    return "subscription";
  },
  get getSubscriptionbyType() {
    return "get-subscriptionbytype";
  },
  get createSubscription() {
    return "subscription";
  },
  get getAllSubscription() {
    return "subscriptions";
  },
  get editSubscriptionbyid() {
    return "editsubscription/:id";
  },
  get getDiscountbyid() {
    return "delete-subscription/:id";
  },
};

export const banner = {
  get getBannerbyid() {
    return "banner/:id";
  },
  get createBanner() {
    return "banner";
  },
  get getAllBanner() {
    return "banners";
  },
  get editBannerbyid() {
    return "editbanner/";
  },
  get deleteBannerbyid() {
    return "delete-banner/";
  },
};
export const discount = {
  get getDiscountbyid() {
    return "discount/";
  },
  get createDiscount() {
    return "discount";
  },
  get getAllDiscount() {
    return "discount";
  },
  get editBannerByID() {
    return "editdiscount/";
  },
};

export const tax = {
  get getTaxbyid() {
    return "tax/:id";
  },
  get getTaxbytype() {
    return "get-taxbytype";
  },
  get getAllTax() {
    return "taxes";
  },
  get createTax() {
    return "tax-create";
  },
  get editTaxbyid() {
    return "edittax";
  },
  get deleteTaxbyid() {
    return "delete-tax";
  },
};

export const Admin = {
  get getAdminbyid() {
    return "admin/:id";
  },
  get createAdmin() {
    return "register-admin";
  },
  get getAdminLogin() {
    return "login-admin";
  },
  // get deleteAdminbyid() {return '
};


export const Cancelation ={
  get getCancelationbyid() {
    return "cancelation/";
  },
  get createCancelation() {
    return "cancelation-create";
  },
  get getAllCancelation() {
    return "cancelations";
  },
  get editCancelationbyid() {
    return "cancelation-update";
  },
  get deleteCancelationbyid() {
    return "delete-cancelation/";
  },
};

