const express = require("express");
let router = express.Router();
const { authenticate } = require("../middlewares/auth-middleware");
const {
  addSalary,    
  getSalaryByID,
  getSalaries,
  getSumupOfMonth,
} = require("../controllers/salary-controller");

router.post("/addsalary", authenticate, addSalary);
router.get("/salary/:id", authenticate, getSalaryByID);
router.get("/salarys", authenticate, getSalaries);
router.get("/salarySumUp", authenticate, getSumupOfMonth);


module.exports = router;
