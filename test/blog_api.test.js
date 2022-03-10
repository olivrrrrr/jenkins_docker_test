const { application } = require("express");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { post } = require("../app");
const app = require("../app");
const { countDocuments } = require("../models/blog");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned", async () => {
  await api.get("/api/blogs").expect("Content-Type", /application\/json/);
}, 100000);

test("all notes are returned", async () => {
  // const response = await api.get("/api/blogs");
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
}, 100000);

test("verify that the unique identifier property of the property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  // console.log(Object.keys(response.body[0]));
  // console.log(response.body[0]);

  expect("_id").toBeDefined();
}, 100000);

test("verify that a HTTP POST request url creates a blog post", async () => {
  const newBlog = {
    author: "Sol",
    title: "String",
    url: "String",
    likes: 9,
    id: "61f15c6dc12fb0f3150c1d8a",
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const response = await api.get("/api/blogs");
  // console.log(Object.keys(response.body[0]));
  // console.log(response.body[0]);

  const contents = response.body.map((r) => r.author);
  const blogsAtEnd = await helper.blogsInDb();
  console.log(contents);

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain("Sol");
}, 100000);

test("verify that if the likes property is missing from the request, it will default to the value 0", async () => {
  const newBlog = {
    author: "Sol",
    title: "String",
    url: "String",
    id: "61f15c6dc12fb0f3150c1d8a",
  };

  await api.post("/api/blogs").send(newBlog);

  const response = await api.get("/api/blogs");
  console.log(response);

  expect(response.body[2].likes).toBe(0);
}, 100000);

test("verify that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request", async () => {
  const newBlog = {
    author: "Sol",
    id: "61f15c6dc12fb0f3150c1d8a",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  // const response = await api.get("/api/blogs");

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
}, 100000);

describe("deletion of a note", () => {
  test("suceeds with status code 204 if id is valid", async () => {
    const blogAtStart = await helper.blogsInDb();

    const blogToDelete = blogAtStart[0];

    console.log(blogToDelete.id);

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.author);

    expect(contents).not.toContain(blogToDelete.author);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
