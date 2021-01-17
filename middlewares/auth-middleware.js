const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticate(req, res, next) {
  let auth = req.headers.authorization;
  let id_number = req.headers.id_number;

  let token = auth.split(" ")[1];
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    if (decoded.id_number !== id_number) {
      return res
        .status(401)
        .json({ message: "You are not allowed to access the data" });
    } else {
      next();
    }
  });
}

validateFields = (req, res, next) => {
  let { id_number, password } = req.body;
  let errMessages = [];
  if (!id_number) {
    errMessages.push("id_number is missing");
  }
  if (!password) {
    errMessages.push("password is missing");
  }
  if (errMessages.length > 0) {
    return res.status(400).json({
      success: false,
      validation: false,
      errors: errMessages,
    });
  }
  next();
};

module.exports = { authenticate, validateFields };
