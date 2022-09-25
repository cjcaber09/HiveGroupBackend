const express = require("express");
const {
  FetchUsers,
  PromoteUser,
  DemoteUser,
  CreateFriendRequest,
  UpdateAddress,
  UpdateContact,
  FetchFriends,
  FetchPendingFriends,
  FetchUserInfo,
} = require("../../controllers/UsersController");
const { TokenValidation } = require("../../validations/userValidations");
const router = express.Router();

router.get("/", TokenValidation, FetchUsers);
router.get("/user/:id", TokenValidation, FetchUserInfo);
router.patch("/promote", TokenValidation, PromoteUser);
router.patch("/demote", TokenValidation, DemoteUser);
router.patch("/friend/:id", TokenValidation, CreateFriendRequest);
router.patch("/address/:id", TokenValidation, UpdateAddress);
router.patch("/contacts/:id", TokenValidation, UpdateContact);
router.get("/friends/:id/pending", TokenValidation, FetchPendingFriends);
module.exports = router;
