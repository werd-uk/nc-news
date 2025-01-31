const userRouter = require("express").Router();
const { getUser, getUsers } = require("../controllers/usersController");

userRouter.get("", getUsers);
userRouter.get("/:username", getUser);

module.exports = userRouter;
