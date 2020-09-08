const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  return res.status(200).send(posts);
});

app.post("/posts", (req, res) => {
  // Randomly Generate a post
  // 4 bytes of random data
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  return res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on 4000...");
});
