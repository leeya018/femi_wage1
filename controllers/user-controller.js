const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

async function findUsername(username) {
  return await UserModel.findOne({ username });
}
async function findEmail(email) {
  return await UserModel.findOne({ email });
}
 signup = async (req, res) => {
  let { username, password, email,confirm } = req.body;
  if (username == undefined || password == undefined || email == undefined || confirm== false) {
    return res.status(400).json({ message: "All fields need to be supplied" });
  }
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  if (await findUsername(username)) {
    return res.status(400).json({ message: "שם שמשתמש כבר קיים במאגר" });
  }
  if (await findEmail(email)) {
    return res.status(400).json({ message: "האימייל כבר קיים במאגר" });
  }

  let newUser = new UserModel({
    username,
    email,
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
  let { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      status: 400,
      message: "צריך למלא את כל השדות!!",
    });
  }

  UserModel.findOne({ username: username }, (err, user) => {
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
        username: user.username,
      },
      process.env.PRIVATE_KEY
    );
    return res.status(200).json({
      message: "You are logged in",
      token: "Bearer " + token,
      username,
    });
  });
};

module.exports = { signup, login };
