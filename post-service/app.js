const express = require("express");
const bodyParser = require("body-parser");
const post = require("./posts");
const verifyToken = require("../auth-service/middleware/verifyToken");

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/posts", verifyToken, (req, res) => {
  // For simplictity, just filter the posts by userId
  console.log(req.user.sub);
  const userPosts = post.filter((p) => p.userId === parseInt(req.user.sub));
  res.json(userPosts);
  //res.json(userPosts);
});

app.listen(port, () => {
  console.log(`Post service is running on ${port}`);
});
