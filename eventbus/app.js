const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const Port = 4005;
const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  console.log("Event received:", event);
  if (event.type === "PostModerated") {
    console.log("Post Moderated Event Received");
    if (event.data.status === "approved") {
      console.log("Post Moderated Event Approved");
      await axios
        .post("http://localhost:4000/posts", {
          type: "PostCreated",
          data: {
            id: event.data.id,
            postId: event.data.postId,
            content: event.data.content,
            username: event.data.username,
            avatar: event.data.avatar,

            status: "approved",
          },
        })
        .catch((err) => {
          console.log("Error For Query-Services:", err.message);
        });
    }
  }

  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log("Error For Comment-Services:", err.message);
  });
  axios.post("http://localhost:3005/events", event).catch((err) => {
    console.log("Error For Post-Services:", err.message);
  });
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log("Error For Moderation-Services:", err.message);
  });
  //axios.post("http://localhost:3002/events", event);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});
//ss

app.listen(Port, () => {
  console.log(`Event Bus is running on ${Port}`);
});
