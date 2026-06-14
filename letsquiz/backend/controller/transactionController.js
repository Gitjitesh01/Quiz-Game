const express = require("express");
const router = express.Router();
const Transaction = require("../schema/transaction.js");
const User = require("../schema/userSchema.js");
const Quiz = require("../schema/quizschema.js");
const Payout = require("../schema/payoutSchema.js");

const getTransactionById = (id) => Transaction.findById(id);

const getAllTransactions = () => Transaction.find();

const getTransactionByType = (type) => Transaction.find({ type });

const createTransaction = (transactionData) => Transaction.create(transactionData);

const updateTransaction = (id, transactionData) =>
  Transaction.findByIdAndUpdate(id, transactionData, { new: true });

const deleteTransaction = (id) => Transaction.findByIdAndDelete(id);

const generateSequentialTransactionId = async () => {
  const lastTransaction = await Transaction.findOne()
    .sort({ transactionId: -1 })
    .exec();

  if (!lastTransaction || isNaN(parseInt(lastTransaction.transactionId, 10))) {
    return "000001";
  }

  return (parseInt(lastTransaction.transactionId, 10) + 1)
    .toString()
    .padStart(6, "0");
};

const generateSequentialPayoutId = async () => {
  const lastPayout = await Payout.findOne()
    .sort({ PayoutId: -1 })
    .exec();

  if (!lastPayout || isNaN(parseInt(lastPayout.PayoutId, 10))) {
    return "000001";
  }

  return (parseInt(lastPayout.PayoutId, 10) + 1)
    .toString()
    .padStart(6, "0");
};

const getTransactionByIdHandler = (req, res) => {
  const id = req.params.id;
  getTransactionById(id)
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(500).json({ error: err.message }));
};

const getTransactionByuseridandquizid = async (req, res) => {
  const { userid, quizid } = req.params;

  try {
    const data = await Transaction.find({ userId: userid, quizId: quizid });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No transaction found" });
    }

    const user_to_send = {
      type: data[0].type,
      account: data[0].account,
      userId: data[0].userId,
      quizId: data[0].quizId,
      transactionId: data[0].transactionId,
      amount: data[0].amount,
      status: data[0].status,
      username: data[0].username,
      useremail: data[0].useremail,
      persentepaidtoowner: data[0].persentepaidtoowner,
    };

    res.json({ data: user_to_send });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTransactionByTypeHandler = (req, res) => {
  const type = req.params.type;
  getTransactionByType(type)
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(500).json({ error: err.message }));
};

const getAllTransactionsHandler = (req, res) => {
  getAllTransactions()
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(500).json({ error: err.message }));
};

const createTransactionHandler = async (req, res) => {
  try {
    const transactionData = req.body;
    const {
      type,
      account,
      userId,
      amount,
      quizId,
      paymentMethod,
      status,
      tax,
      persentepaidtoowner,
      username,
      useremail,
    } = transactionData;

    const transactionId = await generateSequentialTransactionId();
    const payoutId = await generateSequentialPayoutId();

    const total_taxes = tax.reduce((acc, t) => acc + (t.taxamount || 0), 0);
    const amount_paid_to_creator = amount - total_taxes;

    const savedata = {
      type,
      account,
      userId,
      transactionId,
      amount,
      quizId,
      paymentMethod,
      status,
      persentepaidtoowner,
      username,
      tax,
      useremail,
    };

    const quiz = await Quiz.findById(quizId).exec();
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const quiz_owner = quiz.userId;

    const transaction = await createTransaction(savedata);

   if(account == "credit"){
    const payout = {
      reciveamounttranstionId: transaction._id,
      creatorId: quiz_owner,
      totalPayment: amount,
      paidToCreator: amount_paid_to_creator,
      paymentMakerId: userId,
      payoutcode: payoutId,
      payoutType: "quiz",
    };

    await new Payout(payout).save();
  }

    const response = {
      transactionId,
      _id: transaction._id,
      ...transactionData,
    };

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTransactionHandler = (req, res) => {
  const id = req.params.id;
  const transactionData = req.body;
  updateTransaction(id, transactionData)
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(500).json({ error: err.message }));
};

const deleteTransactionHandler = (req, res) => {
  const id = req.params.id;
  deleteTransaction(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(500).json({ error: err.message }));
};

const getTransactionByuserIdHandler = (req, res) => {
  const userId = req.params.userId;
  Transaction.find({ userId })
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports = {
  getTransactionByIdHandler,
  getTransactionByTypeHandler,
  getAllTransactionsHandler,
  createTransactionHandler,
  getTransactionByuserIdHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
  getTransactionByuseridandquizid,
  router,
};
