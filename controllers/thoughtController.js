const { ObjectId } = require("mongoose").Types;
const { Thought, User, Reaction } = require("../models");
const { findOneAndUpdate } = require("../models/Thought");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      console.log(thoughts);

      res.json(thoughts);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },
  // get single thought
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      console.log(thought);

      res.json(thought);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },
  // create new thought
  async newThought(req, res) {
    try {
      console.log("hello");
      const thought = await Thought.create(req.body);

      const thoughtArr = User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      console.log(thought, thoughtArr);

      res.json(thoughtArr);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },
  // update a thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },
  // delete a thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      const userThought = User.findOneAndUpdate(
        {
          thoughts: req.params.thoughtId,
        },
        {
          $pull: { thoughts: req.params.thoughtId },
        },
        {
          new: true,
        }
      );

      console.log(thought, userThought);

      res.json(thought);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate({});
    } catch (error) {
      console.log(err);
    }
  },

  async deleteReaction(req, res) {
    try {
    } catch (error) {}
  },
};
