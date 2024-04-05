const Thought = require("../models/Thought");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      if (!thoughts) {
        return res.status(404);
      }
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(200).json(thought);
    } catch (error) {
      res.status(500), json(error);
    }
  },
  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404);
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        {
          new: true,
        }
      );
      if (!thought) {
        return res.status(404);
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({
        _id: req.params.thoughtId,
      });
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
      );
      if (!thought) {
        return res.status(404);
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }
      );
      if (!thought) {
        res.status(404);
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
