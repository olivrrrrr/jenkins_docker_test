const bcrypt = require("bcrypt");
const blog = require("../models/blog");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
  const users = await User.find({}).populate("blog");
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  try {
    if (body.username === undefined || body.username.length < 3) {
      response.status(400).json({ error: "username too short" });
    } else if (body.name === undefined) {
      response.status(400).json({ error: "name is required" });
    } else if (body.password === undefined || body.password.length < 3) {
      response.status(400).json({ error: "password too short" });
    } else {
      const savedUser = await user.save();
      response.status(201).json(savedUser.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
  // try {
  //   if (!user.username || !user.password) {
  //     const savedUser = await user.save();
  //     response.status(201).json(savedUser.toJSON());
  //   } else {
  //     response.status(400).json({ error: error.name });
  //   }
  // } catch (exception) {
  //   next(exception);
  // }
});

module.exports = usersRouter;
