const UserService = require("../services/UserService");
const FetchUsers = async (req, res) => {
  let token = req.headers["authorization"];
  let Users = await UserService.fetchUsers(token);
  if (Users) {
    res.json({ Users });
  }
};
const PromoteUser = async (req, res) => {
  let userId = req.body._id;
  let promoted = await UserService.changeType("promote", req.body.rank, userId);
  if (promoted) {
    res.json({ message: "promotion success" });
  }
};
const DemoteUser = async (req, res) => {
  let userId = req.body._id;
  let promoted = await UserService.changeType("demote", req.body.rank, userId);
  if (promoted) {
    res.json({ message: "demotion success" });
  }
};
const CreateFriendRequest = async (req, res) => {
  let currentUserId = req.params.id;
  let requestedFriend = req.body;
  UserService.requestFriend(currentUserId, requestedFriend)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
const UpdateAddress = async (req, res) => {
  let _id = req.params.id;
  let address = req.body.address;
  let updated = await UserService.updateAddress(_id, address);
  if (updated) {
    res.json({ address: updated });
  }
};
const UpdateContact = async (req, res) => {
  let _id = req.params.id;
  let contacts = req.body.contacts;
  let updated = await UserService.updateContact(_id, contacts);
  if (updated) {
    res.json({ contact: updated });
  }
};

const FetchPendingFriends = async (req, res) => {
  let _id = req.params.id;
  let status = "pending";
  let users = await UserService.fetchPendingFriends(_id, status);
  res.json(users);
};
const FetchUserInfo = async (req, res) => {
  let _id = req.params.id;
  let users = await UserService.fetchUserbyId(_id);
  res.json(users);
};
module.exports = {
  FetchUsers,
  PromoteUser,
  DemoteUser,
  CreateFriendRequest,
  UpdateAddress,
  UpdateContact,
  FetchUserInfo,
  FetchPendingFriends,
};
