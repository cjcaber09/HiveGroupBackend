const express = require("express");
const {
  FetchUsers,
  PromoteUser,
  DemoteUser,
  CreateFriendRequest,
} = require("../../controllers/UsersController");
const { TokenValidation } = require("../../validations/userValidations");
const router = express.Router();

router.get("/", TokenValidation, FetchUsers);
router.patch("/promote", TokenValidation, PromoteUser);
router.patch("/demote", TokenValidation, DemoteUser);
router.patch("/friend/:id", TokenValidation, CreateFriendRequest);
module.exports = router;
