const express = require("express");
const fs = require("fs");

const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

app.get("/api/v1/tours", (req, res) => {
    res.status(200).json({
        status : "success",
        result : tours.length,
        data : {
            tours
        }
    })
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "🤶", app: "matours" });
});

app.post("/", (req, res) => {
  res.send("post here babe");
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
