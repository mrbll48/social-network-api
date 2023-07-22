const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: String,
    username: String,
    reactions: [],
  },
  { timestamps: true }
);
