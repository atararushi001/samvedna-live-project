require("dotenv").config({ path: ".env" });

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

require("./config/db.config");

const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const uploadDirectory = path.join(__dirname, "public/uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.get("/404", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use("*", (req, res) => {
  res.status(400).redirect("/404");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
