const Payout = require("../schema/payoutSchema");

const getPayoutByType = async (req, res) => {
  const { type } = req.params;
  try {
    const payouts = await Payout.find({ payoutType: type,  });
    res.status(200).json(payouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPayout = async (req, res) => {
  const {
    reciveamounttranstionId,
    giveamounttranstionId,
    creatorId,
    totalPayment,
    paidToCreator,
    paymentMakerId,
    status,
    payoutType,
  } = req.body;

  const generateSequentialPayoutId = async () => {
    const lastTransaction = await Transaction.findOne().sort({
      transactionId: -1,
    });
    if (lastTransaction) {
      return (parseInt(lastTransaction.transactionId, 10) + 1)
        .toString()
        .padStart(6, "0");
    } else {
      return "000001";
    }
  };

  try {
    const newPayout = new Payout({
      payoutcode: generateSequentialPayoutId(),
      reciveamounttranstionId,
      giveamounttranstionId,
      creatorId,
      totalPayment,
      paidToCreator,
      paymentMakerId,
      status,
      payoutType,
    });
    const savedPayout = await newPayout.save();
    res.status(201).json(savedPayout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPayoutById = async (req, res) => {
  const { id } = req.params;
  try {
    const payout = await Payout.findById(id)
      .populate("creatorId", "firstname lastname email")
      .populate("paymentMakerId", "name email")
      .populate("reciveamounttranstionId")
      .populate("giveamounttranstionId")
      .exec();
    if (!payout) {
      return res.status(404).json({ message: "Payout not found" });
    }

    res.status(200).json(payout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePayoutById = async (req, res) => {
  const { id } = req.params;

  const updates = req.body;
  console.log(req.body);
  try {
    const updatedPayout = await Payout.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedPayout) {
      return res.status(404).json({ message: "Payout not found" });
    }
    res.status(200).json(updatedPayout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePayoutStatusById = async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters
  const { status } = req.body; // Extract the new status from the request body
  console.log(status);
  console.log(id , "from update status");

  try {
    // Update the payout status and return the updated document
    const updatedPayout = await Payout.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );


    // If no payout is found, return a 404 error
    if (!updatedPayout) {
      return res.status(404).json({ message: "Payout not found" });
    }
    

    // Successfully updated
    res
      .status(200)
      .json({ message: "Payout status updated successfully", updatedPayout });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ message: error.message });
  }
};

const deletePayoutById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPayout = await Payout.findByIdAndDelete(id);
    if (!deletedPayout) {
      return res.status(404).json({ message: "Payout not found" });
    }
    res.status(200).json({ message: "Payout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayout,
  getPayoutById,
  updatePayoutById,
  deletePayoutById,
  getPayoutByType,
  updatePayoutStatusById,
};
