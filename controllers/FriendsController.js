const FriendsService = require("../services/FriendsService");

const AcceptRequest = async (req, res) => {
  let pulled = await FriendsService.changeFriendStatus(
    req.params.id,
    req.body.friend_id,
    req.body.status
  );
  res.json(pulled);
};
const FetchFriends = async (req, res) => {
  let Friends = await FriendsService.fetchFriends(req.params.id, "active");
  res.json(Friends);
};
const DenieRequest = async (req, res) => {
  let friends = await FriendsService.denieFriendRequest(req.body.friend_id);
  res.json(friends);
};
module.exports = {
  AcceptRequest,
  FetchFriends,
  DenieRequest,
};
