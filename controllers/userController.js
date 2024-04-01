const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!userData) {
        return res.status(404).json({ message: "No user found with that ID" });
      }
      res.json({ message: "User updated successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      // Delete the user
      await User.deleteOne({ _id: req.params.userId });
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // addToSet is an update operator
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404);
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404);
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
