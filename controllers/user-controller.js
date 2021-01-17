const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

async function findid_number(id_number) {
  return await UserModel.findOne({ id_number });
}

 signup = async (req, res) => {
  let { id_number, password, email,confirm } = req.body;
  if (id_number == undefined || password == undefined || confirm== false) {
    return res.status(400).json({ message: "All fields need to be supplied" });
  }
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  if (await findid_number(id_number)) {
    return res.status(400).json({ message: "שם שמשתמש כבר קיים במאגר" });
  }

  let newUser = new UserModel({
    id_number,
    password: hash,
    confirm,
    creationDate: new Date(),
  });

  if (!newUser) {
    return res.status(400).json({ success: false, message: err });
  }
  newUser
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: newUser._id,
        message: "user created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "user not created!",
      });
    });
};
login = (req, res) => {
  let { id_number, password } = req.body;
  if (!id_number || !password) {
    return res.json({
      status: 400,
      message: "צריך למלא את כל השדות!!",
    });
  }

  UserModel.findOne({ id_number: id_number }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!user) {
      return res.status(400).json({
        message: "המשתמש לא קיים במאגר נתונים",
      });
    }
    let isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "הסיסמה שגוייה",
      });
    }
    let token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 100, // 100 hour expiration
        id_number: user.id_number,
      },
      process.env.PRIVATE_KEY
    );
    return res.status(200).json({
      message: "You are logged in",
      token: "Bearer " + token,
      id_number,
    });
  });
};

module.exports = { signup, login };
