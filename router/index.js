const express = require("express");
const router = express.Router();

const LoginRoutes = require("./Users/Login");
const UserRoutes = require("./Users/Users");
const FriendsRoutes = require("./friends");

router.use("/login", LoginRoutes);
router.use("/users", UserRoutes);
router.use("/friends", FriendsRoutes);

module.exports = router;
