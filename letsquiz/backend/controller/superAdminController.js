const superAdminSchema = require("../schema/superAdminSchema")
const catchAsyncError = require("../utils/catchAsyncError");


exports.registerSuperAdmin = catchAsyncError(async (req, res) => {
    const { email, password, firstname, lastname, organization } = req.body;

    try {
        const admin = await superAdminSchema.create({
            email,
            password,
            firstname,
            lastname,
            organization
        })
        res.status(200).json({
            success: true,
            user: "superadmin",
            admin
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal Server Error"
        })
    }

})

exports.loginSuperAdmin = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;

    const resData = await superAdminSchema.findOne({ email }).select("+password");

    if (!resData) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isPasswordMatched = await resData.comparePassword(password)

    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    res.status(200).json({
        success: true,
        user: "superadmin",
        resData
    })
})