const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const Port = 4003;
const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  console.log("Event received:", req.body);
  if (req.body.type === "PostPending") {
    const status = req.body.data.content.includes("apple", "tomato", "banana")
      ? "rejected"
      : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "PostModerated",
      data: {
        id: req.body.data.user.id,
        username: req.body.data.user.username,
        avatar: req.body.data.user.avatar,
        postId: req.body.data.postId,
        status,
        content: req.body.data.content,
      },
    });
  }
  res.send({});
});

app.listen(Port, () => {
  console.log(`Moderation Service is running on ${Port}`);
});
