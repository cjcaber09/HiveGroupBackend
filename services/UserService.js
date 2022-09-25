const Contacts = require("../models/Users/contacts");
const Profile = require("../models/Users/profile");
const Users = require("../models/Users/users");
const AddressModel = require("../models/Users/address");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const { reject } = require("underscore");
const { default: mongoose } = require("mongoose");
const friends = require("../models/Users/friends");
const FriendsService = require("./FriendsService");

const UserService = function () {
  this.loginUser = (username, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        let findUser = await Users.findOne({ username });
        if (findUser) {
          let passwordMatched = await bcrypt.compare(
            password,
            findUser.password
          );
          if (passwordMatched) {
            let token = await jwt.sign(
              { username: findUser.username, email: findUser.email },
              process.env.SECRET_KEY
            );
            resolve(token);
          }
        }
        reject({ message: "Username or password not found." });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
  this.createUser = (data) => {
    let Userdata = new Users(data.user);
    let Usercontact = new Contacts(data.contact);
    let userprofile = new Profile(data.profile);
    return new Promise(async (resolve, reject) => {
      try {
        let profile = await Profile.create(userprofile);
        let contact = await Contacts.create(Usercontact);
        Users.create(Userdata).then((result) => {
          result.profile_details = profile;
          result.contact_details = contact;
          result.save();
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  this.fetchUserbyToken = async (token) => {
    let verifiedTokenValue = await jwt.decode(token);
    if (verifiedTokenValue) {
      return new Promise(async (resolve, reject) => {
        let user = await Users.findOne({
          username: verifiedTokenValue.username,
        })
          .populate("contact_details")
          .populate("profile_details")
          .populate("friendLists")
          .populate("address_details");
        resolve(user);
      });
    }
  };
  this.fetchUsers = (token) => {
    return new Promise(async (resolve, reject) => {
      let tokenArr = token.split(" ");
      let user = await this.fetchUserbyToken(tokenArr[1]);
      // Fetch user's friends
      let UsersFriends = await FriendsService.fetchFriends(user.id);
      // Map users ids
      let UsersFriendsId = UsersFriends.map((a) =>
        a.requestor._id == user.id ? a.requested._id : a.requestor._id
      );
      // push User Id
      UsersFriendsId.push(user.id);
      // find user not including the array of friends
      let users = await Users.find({
        _id: { $nin: UsersFriendsId },
      })
        .populate("contact_details")
        .populate("profile_details")
        .populate("address_details")
        .populate("friendLists");
      if (users) resolve(users);
    });
  };
  this.changeType = (changeType, currentRank, userId) => {
    return new Promise((resolve, reject) => {
      let typesByRank = ["user", "supervisor", "admin"];
      let typeIndex = typesByRank.findIndex((rank) => rank == currentRank);
      let newRankIndex =
        changeType == "promote" ? typeIndex + 1 : typeIndex - 1;
      let changedType = Users.findOneAndUpdate(
        { _id: userId },
        {
          type: typesByRank[newRankIndex],
        }
      );
      if (changedType) {
        resolve(changedType);
      }
    });
  };

  this.requestFriend = (currentUserId, requestedUser) => {
    return new Promise(async (resolve, reject) => {
      // add friend for currentUser
      let findDuplicate = await friends.findOne({
        requestor: currentUserId,
        requested: requestedUser._id,
      });

      if (!findDuplicate) {
        let createdFriendList = await friends.create({
          requestor: currentUserId,
          status: "pending",
          requested: requestedUser._id,
        });
        let users = await Users.updateMany(
          { _id: { $in: [currentUserId, requestedUser._id] } },
          {
            $push: {
              friendLists: createdFriendList,
            },
          }
        );

        resolve(createdFriendList);
      }
    });
  };
  this.updateAddress = (id, addressData) => {
    return new Promise(async (resolve, reject) => {
      let addressModel = new AddressModel(addressData);
      let user = await Users.findOneAndUpdate(
        { _id: id },
        { address_details: addressModel }
      ).catch((err) => reject(err));
      addressModel.save();
      resolve(addressModel);
    });
  };
  this.updateContact = (id, contactData) => {
    return new Promise((resolve, reject) => {
      let contactModel = new Contacts(contactData);
      Users.findOneAndUpdate(
        { _id: id },
        { contact_details: contactModel }
      ).catch((err) => reject(err));
      contactModel.save();
      resolve(contactModel);
    });
  };

  this.fetchPendingFriends = (id, status) => {
    return new Promise(async (resolve, reject) => {
      let Pending = await friends
        .find({ requested: id, status: status })
        .populate("requested")
        .populate("requestor")
        .populate({ path: "requested", populate: "profile_details" });
      resolve(Pending);
    });
  };
  this.fetchUserbyId = (id) => {
    return new Promise(async (resolve, reject) => {
      let user = await Users.findOne({ _id: id })
        .populate("contact_details")
        .populate("profile_details")
        .populate("address_details");
    });
    resolve(user);
  };
};

module.exports = new UserService();
