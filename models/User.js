const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      // match: /.\@\w /
      validate: [
        (val) => {
          isEmail;
        },
        "Please enter a valid email",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtual: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return `${this.friends}`;
});

const User = model("User", userSchema);

module.exports = User;
