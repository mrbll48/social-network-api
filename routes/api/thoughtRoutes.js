const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  newThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(newThought);

router
  .route("/:id")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
