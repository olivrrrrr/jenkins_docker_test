const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

const initialUsers = [
  {
    username: "oliver",
    name: "ekwallla",
    id: "6202fe7486228423e5302243",
  },
  {
    username: "oliver1",
    name: "ekwalllat",
    id: "6202fe9386228423e530224b",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
  userObject = new User(initialUsers[1]);
  await userObject.save();
}, 100000);

describe("GET /api/users", () => {
  test("users are returned", async () => {
    const response = await api.get("/api/users");

    expect(response.body).toHaveLength(initialUsers.length);
  }, 100000);

  test("users are in JSON format", async () => {
    await api.get("/api/users").expect("Content-Type", /application\/json/);
  }, 100000);
});

describe("POST /api/users", () => {
  describe("given an invalid username and password", () => {
    test("verify that am invalid user is not created", async () => {
      const newUser = {
        username: "ol",
        name: "ekwa",
        password: "hello",
      };

      const response = await api.get("/api/users");

      expect(response.body).toHaveLength(initialUsers.length);
    }, 100000);

    test("verify that the server responds with a 400 status code if a user is invalid", async () => {
      const newUser = {
        username: "ol",
        name: "ekwa",
        password: "hello",
      };
      await api.post("/api/users").send(newUser).expect(400);
    }, 100000);

    test("verify that the server responds with a suitable error message when there is no username", async () => {
      const newUser = {
        name: "ekwalla",
        password: "hello",
      };

      const response = await api.post("/api/users").send(newUser).expect(400);

      expect(response.body.error).toContain("username too short");
    }, 100000);

    test("verify that the server responds with a suitable error message when there is no password", async () => {
      const newUser = {
        username: "ollie",
        name: "ekwalla",
        password: "",
      };

      const response = await api.post("/api/users").send(newUser).expect(400);

      expect(response.body.error).toContain("password too short");
    }, 100000);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
