const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  newThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(newThought);

router
  .route("/:id")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:id/reactions").post(createReaction);

router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
