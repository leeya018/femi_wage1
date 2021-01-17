const express = require("express");
let router = express.Router();
const { signup ,login} = require("../controllers/user-controller");
const { authenticate,validateFields } = require('../middlewares/auth-middleware')

router.post("/auth/signup",validateFields, signup);
router.post("/auth/login", login);


module.exports = router;