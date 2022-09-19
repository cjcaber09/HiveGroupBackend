const UserService = require("../services/UserService");
const FetchUsers = async (req, res) => {
  let Users = await UserService.fetchUsers();
  if (Users) {
    res.json({ Users });
  }
};

module.exports = { FetchUsers };
