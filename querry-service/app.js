const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
const axios = require("axios");

app.use(bodyParser.json());
// Create a new SQLite database connection
const db = new sqlite3.Database("queries.db");

const events = [];
app.post("/posts", async (req, res) => {
  console.log("Event received:", req.body);
  console.log("Post received");
  res.send("Post received");
  const title = "test";

  const { id, content, username, avatar } = req.body.data;
  console.log(username);
  sql = `INSERT INTO Posts (id, title, body, username, avatar) VALUES ('${Math.floor(
    Math.random() * 10
  )}', '${title}', '${content}', '${username}', '${avatar}')`;
  console.log(sql);
  db.run(sql, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  await axios.post("http://localhost:4005/events", {
    type: "PostCompleted",
    data: {
      id,
      postId: req.body.data.id,
      content,
      username,
    },
  });
});

// Route to get all posts with their associated comments
app.get("/posts", (req, res) => {
  // Query to retrieve all posts
  db.all("SELECT * FROM Posts", (err, posts) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // For each post, retrieve its associated comments
    const postsWithComments = [];
    posts.forEach((post) => {
      db.all(
        "SELECT * FROM Comments WHERE post_id = ?",
        [post.id],
        (err, comments) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          // Add comments to the post object
          post.comments = comments;
          // Add the post with comments to the list
          postsWithComments.push(post);

          // Check if this is the last post
          if (postsWithComments.length === posts.length) {
            // Send the response when all posts have been processed
            res.json(postsWithComments);
          }
        }
      );
    });
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
