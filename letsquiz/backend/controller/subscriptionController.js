const Subscription = require('../schema/subscriptionPlanSchema');


exports.createSubscription = async (req, res) => {
  // Log the incoming data for debugging
  console.log('Request Body:', req.body);

  // Extract data from request body
  const {
    mcq,
    fillups,
    truefalse,
    matching,
    draganddrop,
    shortanswers,
    dropdown,
    checkbox,
    date,
    email,
    poll,
    wordcloud,
    imageInQuestions,
    audioInQuestions,
    videoInQuestions,
    certificates,
    certificateTemplates,
    ownCertificateTemplate,
    createPaidQuizzes,
    description,
    subscriptionName,
    amount,
    features,
    isActive
  } = req.body;

  // Log extracted data for debugging
  console.log('Extracted Data:', {
    mcq,
    fillups,
    truefalse,
    matching,
    draganddrop,
    shortanswers,
    dropdown,
    checkbox,
    date,
    email,
    poll,
    wordcloud,
    imageInQuestions,
    audioInQuestions,
    videoInQuestions,
    certificates,
    certificateTemplates,
    ownCertificateTemplate,
    createPaidQuizzes,
    description,
    subscriptionName,
    amount,
    features,
    isActive
  }
);

  // Create a new subscription object
  const subscriptionData = {
    mcq,
    fillups,
    truefalse,
    matching,
    draganddrop,
    shortanswers,
    dropdown,
    checkbox,
    date,
    email,
    poll,
    wordcloud,
    imageInQuestions,
    audioInQuestions,
    videoInQuestions,
    certificates,
    certificateTemplates,
    ownCertificateTemplate,
    createPaidQuizzes,
    description,
    subscriptionName,
    amount,
    features,
    isActive
  };

  try {
    // Create a new subscription instance with the extracted data
    const newSubscription = new Subscription(subscriptionData);

    // Save the new subscription
    const savedSubscription = await newSubscription.save();

    // Respond with success
    res.status(201).json({
      success: true,
      subscription: savedSubscription
    });
  }
   catch (error) {
    console.error('Error saving subscription:', error); // Log the error for debugging

    // Handle errors
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};





// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const data = await Subscription.find();
    const count = await Subscription.countDocuments();
    res.status(200).json({
      success: true,
      data,
      count
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a subscription by ID
exports.getSubscriptionById = async (req, res) => {

  console.log(req.params.id)
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    console.log('Subscription:', subscription);
    res.status(200).json({
      success: true,
      subscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getSubscriptionByType = async (req, res) => {
  try {
    let type=req.body.type;
    console.log(req.body)
    if(!type)
    {
      return res.status(400).json({
        success: false,
        message: 'Type  required'
      });
    }
    const data = await Subscription.findOne({ subscriptionName: { $regex: type, $options: 'i' } });

    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
// Update a subscription by ID
exports.updateSubscription = async (req, res) => {
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    res.status(200).json({
      success: true,
      subscription: updatedSubscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a subscription by ID
exports.deleteSubscription = async (req, res) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!deletedSubscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
