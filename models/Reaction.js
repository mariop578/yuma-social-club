const mongoose = require("mongoose");
const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Getter method to format the timestamp on query
reactionSchema.set("toObject", { getters: true });
reactionSchema.set("toJSON", { getters: true });

module.exports = reactionSchema;
