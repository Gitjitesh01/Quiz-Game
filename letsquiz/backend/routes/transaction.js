const express = require("express");
const router = express.Router();
const {
    getTransactionByIdHandler,
    getTransactionByuserIdHandler,
    getTransactionByTypeHandler,
    getAllTransactionsHandler,
    createTransactionHandler,
    updateTransactionHandler,
    deleteTransactionHandler,

    getTransactionByuseridandquizid,
} = require("../controller/transactionController.js");

router.get("/transaction/:id", getTransactionByIdHandler);
router.get("/transactionbyuserid/:userId", getTransactionByuserIdHandler);
router.get("/transaction/type/:type", getTransactionByTypeHandler);
router.get("/transaction/", getAllTransactionsHandler);
router.post("/transaction/", createTransactionHandler);
router.patch("/transaction/:id", updateTransactionHandler);
router.delete("/transaction/:id", deleteTransactionHandler);
router.get("/transaction/:quizid/:userid" , getTransactionByuseridandquizid)
router.get ("/transaction/",
    (req ,res) => {
        res.send("Hello World");
    }
);


module.exports = router;
