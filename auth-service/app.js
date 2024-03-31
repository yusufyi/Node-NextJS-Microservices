const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/verifyToken");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3002;

const secretKey = "your-secret-key";

const db = new sqlite3.Database("Users.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the Users database.");
});

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password provided
  if (!username || !password) {
    res.status(400).send("Username and password are required");
  }

  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.get(sql, [username, password], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if (!row) {
      return res.status(401).send("Invalid username or password");
    }
    const user = { id: row.id, username: row.username };
    // eventBus.emit("userLoggedIn", { username });

    // Generate JWT token
    const token = jwt.sign({ sub: user.id }, secretKey, {
      expiresIn: "3 hours",
    });
    res.json({ access_token: token });
  });
});

//Protected route using middleware
app.get("/protected", verifyToken, (req, res) => {
  //if the middleware passes, return the user is authenticated
  res.json({ messega: "User is authenticated", user: req.user });
});

app.listen(port, () => {
  console.log(`Auth service is runing on  ${port}`);
});
