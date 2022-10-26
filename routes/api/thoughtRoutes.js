const router = require('express').Router();
const {
  getThoughts,
  addThought,
  getSingleThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(addThought)

// GET all thoughts DONE
// POST a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field) DONE
// GET a thought by its id DONE
// PUT to update a thought by its id DONE
// DELETE a thought by its id DONE

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
   .get(getSingleThought)
   .put(updateThought)
   .delete(removeThought);
// GET a thought by its id DONE
// PUT to update a thought by its id DONE
// DELETE a thought by its id

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);
// POST to create a reaction stored in a single thought's reactions array field DONE

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);
// DELETE to pull and remove a reaction by the reaction's reactionId value DONE
 



module.exports = router;
