const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  return res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  // 1. 기존에 해당 PostId에 코멘트가 존재하면 그 값을 가져오고 존재하지 않는다면 배열로 초기화한다.
  const comments = commentsByPostId[req.params.id] || [];

  // 2. 요청으로 부터 받아온 content와 무작위로 생성한 id 값을 하나의 객체에 담아 comments 배열에 담는다.
  comments.push({ id: commentId, content });

  // 3. 생성한 comments 배열(content가 담긴) 배열을 특정한 post에 붙여준다.
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  return res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  return res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
