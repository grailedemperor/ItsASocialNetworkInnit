const { User, Thought} = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Add a thought
  addThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
      User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id }},
        { new: true }
      ))
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such thought created' })
          : res.json('Thought created!')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      //.select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true },
      //{ new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a Thought
  removeThought(req, res) {
    User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId} },
      { new: true }
    )
      .then((thought) =>
        typeof thought != 'undefined'
          ? Thought.findOneAndRemove({ _id: req.params.thoughtId })
          : res.status(404).json({ message: 'Thought could not be deleted' })
      )
      .then(() => res.json({ message: 'Thought successfully deleted' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Add a reaction
 addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true },
      //{ new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thoughts found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove a reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {_id: req.params.reactionId} } },
      { runValidators: true, new: true },
      //{ new: true }
    )
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
};
 
 
