const { objectId } = require("mongoose").Types;
const { User, Reaction, Thought } = require("../models");

module.exports = {
  // find all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      console.log(users);

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // find one user
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      });

      console.log(user);

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // create new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      console.log(user);

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.studentId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      console.log(user);

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove(
        { _id: req.params.userId }
        // { $pull: thought: {  }}
      );

      console.log(user);

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
