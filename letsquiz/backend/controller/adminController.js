const AdminSchema = require("../schema/adminSchema");

// >> Register Admin
exports.createAdmin = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password, isActive, _id } =
      req.body;

    const checkAvailebleAdmin = await AdminSchema.findOne({ email });

    if (checkAvailebleAdmin) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const admin = await AdminSchema.create({
      firstname,
      lastname,
      email,
      username,
      password,
      isActive,
      _id,
    });
    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: error.message,
    });
  }
};

// >> Login Admin
exports.adminLogin = async (req, res) => {
  const { emailId, password } = req.body;

  const admin = await AdminSchema.findOne({ emailId });
  if (!admin) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordMatched = true;

  if (!isPasswordMatched) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    success: true,
    user: "admin",
    admin,
  });
};

exports.adminFind = async (req, res) => {
  const { uid } = req.body;
  //.log(req.body.uid)
  const admin = await AdminSchema.findOne({ _id: uid });
  if (!admin) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } else {
    res.status(200).json({
      success: true,
      user: "admin",
      admin,
    });
  }
};
