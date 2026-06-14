const subjectSchema = require("../schema/subjectSchema");
const questionSchema = require("../schema/questionTypeSchema");
const gradeSchema = require("../schema/gradeSchema");

exports.createSubject = async (req, res) => {
    try {
        const { name ,value,url} = req.body;
        const data = await subjectSchema.create({name: name ,value:value,url:url});
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.createQuestion = async (req, res) => {
    try {
        const { name,value } = req.body;
        const data = await questionSchema.create({ name:name,value:value });
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.createGrade = async (req, res) => {
    try {
        const { name,value } = req.body;
        const data = await gradeSchema.create({ name:name,value:value });
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.bulkSubjects = async (req, res) => {
    try {
        const list = req.body.list; // Expecting an array of subjects

        if (!Array.isArray(list)) {
            return res.status(400).json({
                success: false,
                message: "Input data should be an array of subjects"
            });
        }

        const data = await subjectSchema.insertMany(list);

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.bulkQuestion = async (req, res) => {
    try {
        const list = req.body.list; // Expecting an array of subjects

        if (!Array.isArray(list)) {
            return res.status(400).json({
                success: false,
                message: "Input data should be an array "
            });
        }

        const data = await questionSchema.insertMany(list);

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.bulkGrade = async (req, res) => {
    try {
        const list = req.body.list; // Expecting an array of subjects

        if (!Array.isArray(list)) {
            return res.status(400).json({
                success: false,
                message: "Input data should be an array of subjects"
            });
        }

        const data = await gradeSchema.insertMany(list);

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateDocument = async (schema, id, updates, res) => {
    try {
        const data = await schema.findByIdAndUpdate(id, updates, { new: true });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const deleteDocument = async (schema, id,  res) => {
    try {
        const data = await schema.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }
        else
        return res.status(200).json({
            success: true,
            message: "Item Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.editSubject = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await updateDocument(subjectSchema, id, updates, res);
};

exports.editQuestion = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await updateDocument(questionSchema, id, updates, res);
};

exports.editGrade = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await updateDocument(gradeSchema, id,updates, res);
};

exports.deleteSubject = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await deleteDocument(subjectSchema, id,res);
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await deleteDocument(questionSchema, id,res);
};

exports.deleteGrade = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await deleteDocument(gradeSchema, id,  res);
};
const getAllDocuments = async (schema, res) => {
    try {
        const data = await schema.find();
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllSubjects = async (req, res) => {
    await getAllDocuments(subjectSchema, res);
};

exports.getAllQuestions = async (req, res) => {
    await getAllDocuments(questionSchema, res);
};

exports.getAllGrades = async (req, res) => {
    await getAllDocuments(gradeSchema, res);
};
