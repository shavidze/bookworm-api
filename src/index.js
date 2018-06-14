import express from "express";
import path from "path";

const app = express();

app.post("/api/auth", (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials" } });
  console.log(res);
});

app.get("/*", (req, res) => {
  console.log("movida");
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log("Running on localhost:8080"));
