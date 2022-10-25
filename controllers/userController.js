const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of friends overall
// const friendCount = async () =>
//   User.aggregate()
//     .count('friendCount')
//     .then((numberOfFriends) => numberOfFriends);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => {
        // const userObj = {
        //   users
        //   friendCount: await friendCount(),
        // };
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      //.select('-__v')
      .then(async (users) => {
        const userObj = {
          users
          // friendCount: await friendCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the course
  removeUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        return !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { user: req.params.userId },
              { $pull: { user: req.params.userId } },
              { new: true }
            )}
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true },
      // { new: true }
    )
      .then((user) =>
      {if (!user) {
        return res.status(404).json({ message: 'No user with this id!' })}
        res.json(user)
      })
      //   !user
      //     ? return (res.status(404).json({ message: 'No user with this id!' }))
      //     : res.json(user)
       
      .catch((err) => res.status(500).json(err));
  },
  // Add a friend to a user
  addUserFriend(req, res) {
    console.log('You are adding a user');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: {_id: req.body }}},
      { runValidators: true, new: true },
      //{ new: true }
    )
      .then((user) => {
        return !user
          ? res
              .status(404)
              .json({ message: 'No users found with that ID :(' })
          : res.json(user)
      })
      .catch((err) => res.status(500).json(err));
  },
  // Remove a friend from a user
  removeUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { userId: req.params.userId } } },
      { runValidators: true, new: true },
      //{ new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No users found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
