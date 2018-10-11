const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const jwtGenerator = require("jsonwebtoken");

var things = require("./things");

app.use(cors());
app.use(bodyParser());
const users = [
  { username: "rhys", password: "a" },
  { username: "doyle", password: "b" }
];

app.get("/hello", (req, res) => res.send("Hello World!"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.post("/login", (req, res) => {
  if (
    users.find(
      obj =>
        obj.username === req.body.username && obj.password === req.body.password
    )
  ) {
    let token = jwtGenerator.sign(
      { username: req.body.username },
      "scorey-time",
      {
        expiresIn: 1209600 //14 days
      }
    );
    res.json({ token: token, expiresIn: 1209600 });
  } else {
    res.json({ error: "invalid" });
  }
});

app.use("/things", things);

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
