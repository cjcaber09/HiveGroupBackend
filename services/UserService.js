const Contacts = require("../models/Users/contacts");
const Profile = require("../models/Users/profile");
const Users = require("../models/Users/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
          .populate("address_details");
        resolve(user);
      });
    }
  };
  this.fetchUsers = () => {
    return new Promise(async (resolve, reject) => {
      let users = await Users.find()
        .populate("contact_details")
        .populate("profile_details")
        .populate("address_details");
      if (users) resolve(users);
    });
  };
};

module.exports = new UserService();
