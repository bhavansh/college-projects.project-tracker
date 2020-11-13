const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello from Project Tracker.",
  });
});

//Serve static assets in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server up and running on port ${port} ....`);
});
