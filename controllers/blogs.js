const blogsRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, `${process.env.SECRET}`);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(id);

  try {
    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      response
        .status(401)
        .json({ error: "You are not authorized to delete this blog" });
    }
  } catch (next) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, `${process.env.SECRET}`);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  try {
    if (
      !blog["title"] ||
      !blog["url"] ||
      blog["title"] === "" ||
      blog["url"] === ""
    ) {
      response.status(400).json({ error: error.message });
    } else {
      const savedBlog = await blog.save();
      user.blog = user.blog.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
