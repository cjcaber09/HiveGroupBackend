const express = require("express");
const { TokenValidation } = require("../validations/userValidations");
const {
  AcceptRequest,
  FetchFriends,
  DenieRequest,
} = require("../controllers/FriendsController");
const router = express.Router();

router.patch("/accept/:id", TokenValidation, AcceptRequest);
router.get("/:id", TokenValidation, FetchFriends);
router.delete("/:id/denie", TokenValidation, DenieRequest);

module.exports = router;
