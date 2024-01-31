const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./src/routes/router");
const connectDB = require("./src/database/connection");
// const readdirSync = require("fs").readFileSync;

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, "./.env") });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
connectDB();

app.get("/", (req, res) => {
  res.send("testing");
});

app.use("/api", router);

const port = process.env.PORT || "8000";
app.listen(port, () => {
  console.log("Port 8000 Active");
});
