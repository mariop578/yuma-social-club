const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

// Schema to create Post model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Virtual property to retrieve the length of the 'reactions' array
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Getter method to format the timestamp on query
thoughtSchema.set("toObject", { getters: true });
thoughtSchema.set("toJSON", { getters: true });

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
