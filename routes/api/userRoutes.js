const router = require("express").Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  getFriends,
  deleteFriends,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendId").post(getFriends).delete(deleteFriends);

module.exports = router;
