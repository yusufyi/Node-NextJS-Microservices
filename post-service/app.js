const express = require("express");
const bodyParser = require("body-parser");
const post = require("./posts");
//const verifyToken = require("../auth-service/middleware/verifyToken");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 4001;
app.use(cors());
const axios = require("axios");

const db = new sqlite3.Database("PostDb.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the Post database.");
});

app.use(bodyParser.json());

app.post("/posts", async (req, res) => {
  console.log(req.body);
  const { content } = req.body;

  if (!content) {
    console.log("Content is required");
    return res.status(400).send("Content is required");
  }

  await axios.post("http://localhost:4005/events", {
    type: "PostPending",
    data: req.body,
  });
  res.status(201).send("Post created successfully");
});

// app.get("/posts", verifyToken, (req, res) => {
//   // For simplictity, just filter the posts by userId
//   console.log(req.user.sub);
//   //const userPosts = post.filter((p) => p.userId === parseInt(req.user.sub));
//   const sql = `SELECT * FROM posts WHERE userId = ${req.user.sub}`;
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log(rows);
//     res.json(rows);
//   });
//   //res.json(userPosts);
// });

// app.post("/posts", async (req, res) => {
//   const { userId, title, content } = req.body;
//   console.log(req.body);
//   console.log(userId);
//   console.log(title);
//   console.log(content);
//   const sql = `INSERT INTO posts(userId, title, content) VALUES(${req.user.sub},"${title}", "${content}")`;
//   console.log(sql); //debugging
//   db.run(sql, (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//   });
//   await axios.post("http://localhost:4005/events", {
//     type: "PostCreated",
//     data: { userId, title, content },
//   });
//   res.status(201).send("Post created successfully");
// });

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(port, () => {
  console.log(`Post service is running on ${port}`);
});

// Compare this snippet from auth-service/app.js:
