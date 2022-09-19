const express = require("express");
const router = express.Router();

const LoginRoutes = require("./Users/Login");
const UserRoutes = require("./Users/Users");

router.use("/login", LoginRoutes);
router.use("/users", UserRoutes);

module.exports = router;
