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
      console.log(req.params.id);

      const thought = await Thought.findOne({ _id: req.params.id });

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
      const thought = await Thought.create(req.body);

      console.log(thought._id);

      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      // console.log(thought);

      res.json(thought);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },

  // update a thought by id
  async updateThought(req, res) {
    try {
      console.log(req.params.id);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      res.json(thought);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },
  // delete a thought by id
  async deleteThought(req, res) {
    try {
      console.log(req.params.id);
      const thought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });

      console.log(thought);

      const userThought = User.findOneAndUpdate(
        {
          thoughts: req.params.id,
        },
        {
          $pull: { thoughts: req.params.id },
        },
        {
          new: true,
        }
      );

      // console.log(userThought);

      res.json(thought);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: { reactions: req.body },
        },
        {
          new: true,
        }
      );

      res.json(reaction);
    } catch (error) {
      console.log(err);

      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );

      console.log(reaction);

      res.json(reaction);
    } catch (error) {
      console.log(err);

      res.status(500).json(err);
    }
  },
};
