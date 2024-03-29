const express = require("express");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const secretKey = "your-secret-key";

// Dummy user data
const users = [
  { id: 1, username: "test", password: "test" },
  { id: 2, username: "test2", password: "test2" },
];

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password provided
  if (!username || !password) {
    res.status(400).send("Username and password are required");
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  // Generate JWT token
  const token = jwt.sign({ sub: user.id }, secretKey, { expiresIn: "3 hours" });
  res.json({ access_token: token });
});

app.listen(port, () => {
  console.log(`Auth service is runing on  ${port}`);
});
