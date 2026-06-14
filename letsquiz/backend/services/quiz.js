// const { getConnection } = require('../database/connection')
const {
  createQuizQuery,
  createQuestionQuery,
  createQuestionOptionsQuery,
  createQuestionAnsOptionsQuery,
  getAllQuizQuery,
  getQuizByIdQuery,
  createQuizReportQuery,
  updateQuizReportQuery,
  getAllQuizReportsQuery,
  getQuizReportsByIdQuery,
  getQuizResponseByQuizIdQuery,
  updateQuizResponseQuery,
  getQuizReportQuery,
  getIndividualReportQuery,
  createQuizResponseQuery,
} = require("../common/constants");
// const connection = getConnection();
const ResponseSchema = require("../schema/ResponseSchema");

const createQuizWithQuestions = (payload, questions) => {
  let query = createQuizQuery(payload);
  return new Promise(async (resolve, reject) => {
    try {
      // create quiz
      const quizRes = await createQuiz(payload);
      //.log('Quiz created')
      const quizId = quizRes.id;

      // create questions
      const questRes = await createQuestions(
        payload.createdBy,
        quizId,
        questions
      );
      //.log('Question created');

      // Form question options & answer options
      const { answer_options, options } = getquestionOptions(
        payload.createdBy,
        questRes.results,
        questions
      );
      //.log('Question options generated')

      // create question options
      await createQuestionOptions(options, "options");
      //.log('Question options created')
      // create question answer options
      await createQuestionOptions(answer_options, "answer");
      //.log('Question answer options created')

      resolve(quizRes);
    } catch (e) {
      reject({
        message: e.message || e,
      });
    }
  });
};

const createQuiz = (payload) => {
  let query = createQuizQuery(payload);
  return new Promise((resolve, reject) => {
    // connection.query(
    //   query,
    //   (error, results) => {
    //     if (error) {
    //       reject({ message: error.message || error });
    //     } else {
    //       resolve({
    //         message: 'Quiz created successfully',
    //         name: payload.name,
    //         id: results.recordset[0].ID
    //       })
    //     }
    //   }
    // );
  });
};

// const createQuestions = (email, quiz_id, questions) => {
//   const questVal = questions.map(question => {
//     return {
//       quiz_id,
//       name: question.name || '',
//       title: question.title || '',
//       description: question.description || '',
//       type: question.type || '',
//       image: question.image || '',
//       audio: question.audio || '',
//       video: question.video || '',
//       timer: question.timer || '',
//       points: question.points || '',
//       tag: question.tag || '',
//       slider: question.slider || '',
//       createdBy: email,
//       modifiedBy: email
//     }
//   })
//   let query = createQuestionQuery(questVal)
//   return new Promise((resolve, reject) => {
//     connection.query(
//       query,
//       (error, results) => {
//         if (error) {
//           reject({ message: error.message || error });
//         } else {
//           resolve({
//             message: 'Questions created successfully',
//             results: results.recordset
//           })
//         }
//       }
//     );
//   })
// }

// const getquestionOptions = (email, questionIds, questions) => {
//   let questionOptions = [];
//   let questionAnswerOptions = [];
//   questions.forEach((question, idx) => {

//     question.options.forEach(
//       option => {
//         questionOptions.push({
//           questions_id: questionIds[idx].ID,
//           text: option.text || '',
//           audio: option.audio || '',
//           video: option.video || '',
//           image: option.image || '',
//           selection: option.selection || '',
//           createdBy: email,
//           modifiedBy: email
//         })
//       })
//     question.answer_options.forEach(
//       ansOption => {
//         questionAnswerOptions.push({
//           questions_id: questionIds[idx].ID,
//           text: ansOption.text || '',
//           audio: ansOption.audio || '',
//           video: ansOption.video || '',
//           image: ansOption.image || '',
//           selection: ansOption.selection || '',
//           createdBy: email,
//           modifiedBy: email
//         })
//       })
//   })
//   return {
//     options: questionOptions,
//     answer_options: questionAnswerOptions
//   }
// }

// const createQuestionOptions = (options, type) => {

//   let query = type === 'options' ? createQuestionOptionsQuery(options) : createQuestionAnsOptionsQuery(options);
//   return new Promise((resolve, reject) => {
//     connection.query(
//       query,
//       (error, results) => {
//         if (error) {
//           reject({ message: error.message || error });
//         } else {
//           resolve({
//             message: `Questions ${type} created successfully`,
//             results: results.recordset
//           })
//         }
//       }
//     );
//   })
// }

// const getAllQuiz = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query(getAllQuizQuery, (error, results) => {
//       if (error) {
//         reject({ message: error.message || error });
//       } else {
//         const data = results.recordset.length ? formQuizRes(results.recordset) : []
//         resolve({
//           data
//         })
//       }
//     });
//   });
// };

// const formQuizRes = (result) => {
//   const quiz = [];
//   result.forEach((qdata) => {
//     const qidx = quiz.findIndex(q => q.id === qdata.quiz_id);
//     if (qidx > -1) {
//       const questionIdx = quiz[qidx].questions.findIndex(q => q.id === qdata.questions_id);
//       if (questionIdx > -1) {
//         quiz[qidx].questions[questionIdx].options.push(formQOptions(qdata))
//       } else {
//         quiz[qidx].questions.push(formQuestions(qdata))
//       }
//     } else {
//       quiz.push(formQuiz(qdata))
//     }
//   })
//   return quiz;
// }

// const formQuiz = (qdata) => {
//   const questions = [];
//   questions.push(formQuestions(qdata));
//   return {
//     id: qdata.quiz_id,
//     name: qdata.name.length >= 1 ? qdata.name[0] : null,
//     title: qdata.title.length >= 1 ? qdata.title[0] : null,
//     description: qdata.description.length >= 1 ? qdata.description[0] : null,
//     subject: qdata.subject,
//     grade: qdata.grade,
//     video: qdata.video.length >= 1 ? qdata.video[0] : null,
//     audio: qdata.audio.length >= 1 ? qdata.audio[0] : null,
//     image: qdata.image.length >= 1 ? qdata.image[0] : null,
//     language: qdata.language,
//     createdOn: qdata.createdOn[0],
//     createdBy: qdata.createdBy[0],
//     modifiedOn: qdata.modifiedOn[0],
//     modifiedBy: qdata.modifiedBy[0],
//     questions
//   }
// }
// const formQuestions = (qdata) => {
//   let options = [];
//   options.push(formQOptions(qdata));
//   return {
//     id: qdata.questions_id,
//     quiz_id: qdata.quiz_id,
//     name: qdata.name.length >= 2 ? qdata.name[1] : null,
//     title: qdata.title.length >= 2 ? qdata.title[1] : null,
//     description: qdata.description.length >= 2 ? qdata.description[1] : null,
//     type: qdata.type,
//     video: qdata.video.length >= 1 ? qdata.video[1] : null,
//     audio: qdata.audio.length >= 1 ? qdata.audio[1] : null,
//     image: qdata.image.length >= 1 ? qdata.image[1] : null,
//     timer: qdata.timer,
//     points: qdata.points,
//     tag: qdata.tag,
//     slider: qdata.slider,
//     createdOn: qdata.createdOn[1],
//     createdBy: qdata.createdBy[1],
//     modifiedOn: qdata.modifiedOn[1],
//     modifiedBy: qdata.modifiedBy[1],
//     options
//   }
// }
// const formQOptions = (qdata) => {
//   return {
//     id: qdata.id[2],
//     text: qdata.text,
//     video: qdata.video.length >= 2 ? qdata.video[2] : null,
//     audio: qdata.audio.length >= 2 ? qdata.audio[2] : null,
//     image: qdata.image.length >= 2 ? qdata.image[2] : null,
//     selection: qdata.selection,
//     createdOn: qdata.createdOn[2],
//     createdBy: qdata.createdBy[2],
//     modifiedOn: qdata.modifiedOn[2],
//     modifiedBy: qdata.modifiedBy[2],
//   }
// }

// const getQuizById = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query(getQuizByIdQuery(id), (error, results) => {
//       if (error) {
//         reject({ message: error.message || error });
//       } else {
//         const data = results.recordset.length ? formQuizRes(results.recordset) : []
//         resolve({
//           data
//         })
//       }
//     });
//   });
// };

// const createAndUpdateQuizReport = (payload) => {
//   let query = updateQuizReportQuery(payload);

//   return new Promise((resolve, reject) => {
//     connection.query(
//       query,
//       (error, results) => {
//         if (error) {
//           reject({ message: error.message || error });
//         } else {
//           resolve(results.recordsets[0])
//         }
//       }
//     );
//   })
// }

const createAndUpdateQuizResponseService = (payload) => {
  //.log(payload)
  return new Promise((resolve, reject) => {
    // below function commented now because now we dont update data only create

    // getQuizResponseService(payload).then(res => {
    // const isCreate = res.data.length === 0;

    //above isCreate want to pass in createQuizResponseService but now we dont use that
    createQuizResponseService(payload)
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });

    // }).catch(e => {
    //   reject(e)
    // })
  });
};

const getQuizResponseService = (payload) => {
  const { createdBy, quiz_id, questions_id } = payload;
  let query = getQuizResponseByQuizIdQuery(createdBy, quiz_id, questions_id);
  return new Promise((resolve, reject) => {
    query
      .then((done) => {
        resolve({
          message: `Fetch Quiz Response successfully`,
          data: results.recordset,
        });
      })
      .catch((error) => {
        reject({ message: error.message || error });
      });
  });
};

const createQuizResponseService = (payload) => {
  // let query = isCreate ? createQuizResponseQuery(payload) : updateQuizResponseQuery(payload);
  return new Promise((resolve, reject) => {
    const data = new ResponseSchema(payload);
    data
      .save()
      .then((done) => {
        resolve({
          message: `Quiz Response Created successfully`,
          data: done,
        });
      })
      .catch((error) => {
        //.log(error)
        reject({ message: error.message || error });
      });
  });
};

// const getQuizReports = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query(getAllQuizReportsQuery, (error, results) => {
//       if (error) {
//         reject({ message: error.message || error });
//       } else {
//         resolve({
//           data: results.recordset
//         })
//       }
//     });
//   });
// };

// const getQuizAllReports = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query(getQuizReportQuery(id), (error, results) => {
//       if (error) {
//         reject({ message: error.message || error });
//       } else {
//         resolve({
//           data: results.recordset
//         })
//       }
//     });
//   });
// };

// const getQuizIndividualReports = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query(getIndividualReportQuery(id), (error, results) => {
//       if (error) {
//         reject({ message: error.message || error });
//       } else {
//         resolve({
//           data: results.recordset
//         })
//       }
//     });
//   });
// };

// const getQuizReportsById = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query(getQuizReportsByIdQuery(id), (error, results) => {
//       if (error) {
//         reject({ message: error.message || error });
//       } else {
//         resolve({
//           data: results.recordset
//         })
//       }
//     });
//   });
// };

module.exports = {
  // getQuizById,
  // getAllQuiz,
  createQuizWithQuestions,
  // createAndUpdateQuizReport,
  createAndUpdateQuizResponseService,
  // getQuizReports,
  // getQuizReportsById,
  // getQuizAllReports,
  // getQuizIndividualReports
};
