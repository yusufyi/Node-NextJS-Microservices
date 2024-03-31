const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("../auth-service/middleware/verifyToken");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 4001;

const commentsByPostId = {};

app.get("/posts/:id/comments", verifyToken, (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: comments.length + 1, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(port, () => {
  console.log(`Comments service is running on ${port}`);
});
// Path: eventbus/eventbus.js
// Compare this snippet from auth-service/app.js:
