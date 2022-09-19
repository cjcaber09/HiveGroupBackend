const UserService = require("../services/UserService");
const FetchUsers = async (req, res) => {
  let Users = await UserService.fetchUsers();
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

module.exports = { FetchUsers, PromoteUser, DemoteUser, CreateFriendRequest };
