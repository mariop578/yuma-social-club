const router = require("express").Router();

const {
  getThought,
  createThought,
  getThoughts,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
