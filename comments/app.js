const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();
app.use(bodyParser.json());
app.use(cors());
const port = 4001;

const db = new sqlite3.Database("Comments.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the Comments database.");
});

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  const sql = `INSERT INTO comments(postId, content) VALUES(${req.params.id}, "${content}")`;
  console.log(sql); //debugging
  db.run(sql, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: comments.length + 1,
      content,
      postId: req.params.id,
    },
  });

  res.send("Post created successfully", 201);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(port, () => {
  console.log(`Comments service is running on ${port}`);
});
// Path: eventbus/eventbus.js
// Compare this snippet from auth-service/app.js:
