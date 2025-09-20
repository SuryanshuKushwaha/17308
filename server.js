const express = require("express");
const app = express();
const { Log } = require("./loggingMiddleware"); // import function

app.get("/", async (req, res) => {
  await Log("backend", "info", "service", "Homepage accessed");
  res.send("Hello World");
});

app.listen(3000, () => console.log("Server running on port 3000"));
