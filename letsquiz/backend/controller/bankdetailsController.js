const express = require('express');
const mongoose = require('mongoose');
const BankDetails = require('../schema/bankdetailsSchema'); // Adjust the path as necessary

const createBankDetail = async (req, res) => {
    try {
        const bankDetail = new BankDetails(req.body);
        await bankDetail.save();
        res.status(201).send(bankDetail);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAllBankDetails = async (req, res) => {
    try {
        const bankDetails = await BankDetails.find({});
        res.status(200).send(bankDetails);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getBankDetailById = async (req, res) => {
    try {
        const bankDetail = await BankDetails.find({userid : req.params.id});
        if (!bankDetail) {
            return res.status(404).send();
        }
        res.status(200).send(bankDetail);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateBankDetailById = async (req, res) => {
    const updates = Object.keys(req.body);

    console.log(req.body);

    const allowedUpdates = ['userid', 'accountHolderName', 'accountNumber', 'ifscCode', 'bankName', 'branchName', 'accountType', 'contactNumber'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const bankDetail = await BankDetails.findOne({userid : req.params.id});
        if (!bankDetail) {
            return res.status(404).send();
        }

        updates.forEach((update) => bankDetail[update] = req.body[update]);
        await bankDetail.save();
        res.status(200).send(bankDetail);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteBankDetailById = async (req, res) => {
    try {
        const bankDetail = await BankDetails.findByIdAndDelete(req.params.id);
        if (!bankDetail) {
            return res.status(404).send();
        }
        res.status(200).send(bankDetail);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createBankDetail,
    getAllBankDetails,
    getBankDetailById,
    updateBankDetailById,
    deleteBankDetailById
};
