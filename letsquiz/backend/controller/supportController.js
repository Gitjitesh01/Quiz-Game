const Support = require('../schema/supportSchema');



// Create a new support ticket
exports.createSupport = async (req, res) => {

    const generateSupportCode = async () => {
        const lastSupport = await Support.findOne().sort({ createdAt: -1 });
        const lastCode = lastSupport && lastSupport.supportcode ? parseInt(lastSupport.supportcode.split('-')[1], 36) : 0;
        const newCode = (lastCode + 1).toString(36).toUpperCase();
        return 'SUP-' + newCode.padStart(9, '0');
    };

    const supportcode = await generateSupportCode();


    const data ={
        supportcode,
        ...req.body
    }

    // const support = new Support({
    //     supportcode,
    //     ...req.body
    // });



    try {
        const support = new Support(data);
        await support.save();
        res.status(201).json(support);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update the status of a support ticket by ID
exports.updateSupportStatus = async (req, res) => {

    console.log(req.params.id, req.params.status);
    try {
        const support = await Support.findByIdAndUpdate(req.params.id, { status: req.params.status }, { new: true, runValidators: true });
        if (!support) {
            return res.status(404).json({ message: 'Support ticket not found' });
        }
        res.status(200).json(support);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all support tickets
exports.getAllSupports = async (req, res) => {
    try {
        const supports = await Support.find();
        res.status(200).json(supports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single support ticket by ID
exports.getSupportById = async (req, res) => {
    try {
        const support = await Support.findById(req.params.id);
        if (!support) {
            return res.status(404).json({ message: 'Support ticket not found' });
        }
        res.status(200).json(support);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a support ticket by ID
exports.updateSupport = async (req, res) => {
    try {
        const support = await Support.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!support) {
            return res.status(404).json({ message: 'Support ticket not found' });
        }
        res.status(200).json(support);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a support ticket by ID
exports.deleteSupport = async (req, res) => {
    try {
        const support = await Support.findByIdAndDelete(req.params.id);
        if (!support) {
            return res.status(404).json({ message: 'Support ticket not found' });
        }
        res.status(200).json({ message: 'Support ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};