const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const Port = 4003;
const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  console.log("Event received:", req.body);
});

app.listen(Port, () => {
  console.log(`Moderation Service is running on ${Port}`);
});
