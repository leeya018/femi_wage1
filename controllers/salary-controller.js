const SalaryModel = require("../models/salary-model");
const util = require("../util");

addSalary = async (req, res) => {
  debugger
  let id_number = req.headers.id_number;
  let salary = req.body;
  let isFound;
  // try {
  //   isFound = await util.isTodaySalaryInDb(id_number);
  //   if (isFound) {
  //     return res
  //       .status(406)
  //       .json({
  //         success: false,
  //         message: " כבר יש משמרת של היום במאגר נתונים",
  //       });
  //   }
  // } catch (error) {
  //   return res.status(400).json({ success: false, message: error });
  // }
  let newSalary;
  // newSalary = new SalaryModel({ ...salary, creationDate: new Date() });
  // let date = new Date(1501, 1, 22);
  let creationDate = salary.creationDate || new Date();

  newSalary = new SalaryModel({ ...salary, creationDate });
  if (!newSalary) {
    return res.status(400).json({ success: false, message: err });
  }
  newSalary
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: newSalary._id,
        message: "משמרת נשמרה",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: error.message,
      });
    });
};

getSalaryByID = (req, res) => {
  let { id } = req.params;
  SalaryModel.findOne({ _id: id }, (err, salary) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }
    if (salary) {
      return res.status(200).json(salary);
    } else {
      res
        .status(404)
        .json({ success: false, message: "Salary id is not in the db" });
    }
  });
};

getSalaries = (req, res) => {
  let id_number = req.headers.id_number;

  let { month, year } = req.query;
  if (!year) {
    year = new Date().getFullYear();
  }

  SalaryModel.find({
    id_number,
    creationDate: {
      $gte: new Date(year, month, 1),
      $lt: new Date(year, month + 1, 1),
    },
  })
    .select("_id total creationDate")
    .sort("creationDate")
    .exec((err, salaries) => {
      if (err) {
        return res.status(400).json({ success: false, message: error });
      }
      if (salaries.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "אין ימי עבודה על החודש הזה" });
      }
      return res.status(200).json(salaries);
    });
};

getSumupOfMonth = (req, res) => {
  let id_number = req.headers.id_number;

  let { month, year } = req.query;
  if (!year) {
    year = new Date().getFullYear();
  }
  SalaryModel.find({
    id_number,
    creationDate: {
      $gte: new Date(year, month, 1),
      $lt: new Date(year, month + 1, 1),
    },
  }).exec((err, salaries) => {
    if (err) {
      return res.status(400).json({ success: false, message: error });
    }
    if (salaries.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "אין ימי עבודה על החודש הזה" });
    }
    let sumUpSalaryPorMonth = util.sumUpMonth(salaries, id_number);
    return res.status(200).json(sumUpSalaryPorMonth);
  });
};

module.exports = { addSalary, getSalaryByID, getSalaries, getSumupOfMonth };
