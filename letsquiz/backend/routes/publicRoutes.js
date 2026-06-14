const express = require('express');
const router = express.Router();
const {
    createSubject, editSubject, getAllSubjects,
    createQuestion, editQuestion, getAllQuestions,
    createGrade, editGrade, getAllGrades,
    deleteSubject,
    deleteQuestion,
    deleteGrade
} = require('../controller/publicController');
const { bulkSubjects, bulkQuestion, bulkGrade } = require('../controller/publicController');

// Subject routes
router.post('/subject', createSubject);
router.post('/bulk-subjects', bulkSubjects);
router.post('/subject/:id', editSubject);
router.post('/delete-subject/:id', deleteSubject);
router.get('/subjects', getAllSubjects);

// Question routes
router.post('/question', createQuestion);
router.post('/bulk-questions', bulkQuestion);
router.post('/question/:id', editQuestion);
router.post('/delete-question/:id', deleteQuestion);
router.get('/questions', getAllQuestions);

// Grade routes
router.post('/grade', createGrade);
router.post('/bulk-grades', bulkGrade);
router.post('/edit-grade/:id', editGrade);
router.post('/delete-grade/:id', deleteGrade);
router.get('/grades', getAllGrades);

module.exports = router;
