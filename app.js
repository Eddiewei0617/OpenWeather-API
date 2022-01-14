const express = require("express");
const app = express();
const ejs = require("ejs");
const fetch = require("node-fetch");

// api key
let myKey = "80ba4bb9e4cf01eb1f5da19387466d5e";

// K to C (絕對溫標轉攝氏)
function ktoC(k) {
  return (k - 273.15).toFixed(2);
}

// middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", async (req, res) => {
  //   console.log(req.params); { city: 'taipei' }
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
  let d = await fetch(url);
  let djs = await d.json();
  // 呼叫轉換溫標function
  let { temp } = djs.main;
  let newTemp = ktoC(temp);
  console.log("djs", djs);
  res.render("weather.ejs", { djs, newTemp });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
