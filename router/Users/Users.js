const express = require("express");
const { FetchUsers } = require("../../controllers/UsersController");
const { TokenValidation } = require("../../validations/userValidations");
const router = express.Router();

router.get("/", TokenValidation, FetchUsers);
module.exports = router;
