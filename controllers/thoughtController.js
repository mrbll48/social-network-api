const { ObjectId } = require("mongoose").Types;
const { Thought, User, Reaction } = require("../models");

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
      const thought = await Thought.create(req.body);

      console.log(thought);

      res.json(thought);
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
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },
};
