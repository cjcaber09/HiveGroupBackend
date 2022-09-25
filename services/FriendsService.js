const friends = require("../models/Users/friends");
const users = require("../models/Users/users");
const FriendsService = function () {
  this.changeFriendStatus = (currentId, friendId, status) => {
    return new Promise(async (resolve, reject) => {
      let acceptedRequest = await friends.updateOne(
        { _id: friendId },
        { status: status }
      );
      resolve(acceptedRequest);
    });
  };
  this.denieFriendRequest = (friendId) => {
    console.log(friendId);
    return new Promise((resolve, reject) => {
      friends.deleteOne({ _id: friendId }).then(async (result) => {
        let update = await users.updateMany(
          { friendLists: friendId },
          {
            $pull: { friendLists: friendId },
          }
        );
        resolve(update);
      });
    });
  };
  this.fetchFriends = (_id, status = "active") => {
    return new Promise(async (resolve, reject) => {
      let user = await friends
        .find({
          $or: [{ requestor: _id }, { requested: _id }],
          status: status,
        })
        .populate({
          path: "requestor",
          populate: ["profile_details", "contact_details", "address_details"],
        })
        .populate({
          path: "requested",
          populate: ["profile_details", "contact_details", "address_details"],
        });
      if (user) {
        resolve(user);
      }
      resolve([]);
    });
  };
  // this.pullRequest = (currentId, friendId, status) => {
  //   return new Promise(async (resolve, reject) => {
  //     // Fetch and Update Requestee
  //     let requestee = await users.findOneAndUpdate(
  //       { _id: currentId, "friends.friend_id": friendId },
  //       { $set: { status: status } }
  //     );
  //     // Remove User from requests.
  //     users
  //       .updateOne(
  //         {
  //           _id: currentId,
  //         },
  //         {
  //           $pull: {
  //             friendRequests: {
  //               friend_id: requestee,
  //             },
  //           },
  //           $push: {
  //             friends: {
  //               friend_id: requestee,
  //               status: status,
  //             },
  //           },
  //         }
  //       )
  //       .exec((result) => {
  //         // update requestee
  //         console.log(result);
  //         resolve(result);
  //       });
  //   });
  // };
};
module.exports = new FriendsService();
