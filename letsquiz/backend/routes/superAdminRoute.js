const { registerSuperAdmin, loginSuperAdmin } = require("../controller/superAdminController");
const { createAdmin } = require("../controller/adminController");




let router = require("express").Router();

router.post("/superadmin-signup", registerSuperAdmin);
router.post("/superadmin-login", loginSuperAdmin);
router.post("/register-admin", createAdmin);
module.exports = router;