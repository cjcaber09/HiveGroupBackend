const bcrypt = require("bcrypt");
const UserService = require("../services/UserService");

const Register = async (req, res) => {
  let oldPassword = req.body.user.password;
  req.body.user.password = await bcrypt.hash(req.body.user.password, 10);
  let createdUser = await UserService.createUser(req.body);
  if (createdUser) {
    let token = await UserService.loginUser(createdUser.username, oldPassword);
    res.status(200).json({ user: createdUser, token });
  }
};
const Login = async (req, res) => {
  let Inputs = req.body;
  UserService.loginUser(Inputs.username, Inputs.password)
    .then((result) => {
      if (result) {
        res.status(200).json({ token: result });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "Incorrect username or password." });
    });
};

const FetchUserByToken = async (req, res) => {
  let tokenBearer = req.headers["authorization"];
  let tokenArr = tokenBearer.split(" ");
  let user = await UserService.fetchUserbyToken(tokenArr[1]);
  res.json(user);
};
module.exports = {
  Register,
  Login,
  FetchUserByToken,
};
