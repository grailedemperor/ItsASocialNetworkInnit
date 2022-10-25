const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  removeUser,
  addUserFriend,
  removeUserFriend
} = require('../../controllers/userController.js');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// GET ALL USERS DONE
// POST A new user DONE


// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(removeUser);
// GET A single user and populated thought and friend DONE
// PUT to update a user by id DONE
// DELETE to remove a user by id  DONE


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addUserFriend)
  .delete(removeUserFriend);

// POST a new friend to a user's friend list DONE
// DELETE a friend from a user's friend list DONE

module.exports = router;
