const express = require("express");

const {
  Register,
  Login,
  FetchUserByToken,
} = require("../../controllers/UserController");

const { TokenValidation } = require("../../validations/userValidations");

const router = express.Router();

router.post("/", Login);
router.post("/register", Register);
router.get("/user", TokenValidation, FetchUserByToken);

module.exports = router;
