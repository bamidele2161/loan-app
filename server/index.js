const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
// const readdirSync = require("fs").readFileSync;

dotenv.config();
const app = express();
dotenv.config({ path: path.resolve(__dirname, "./.env") });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

//routes
// readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
// mongoose
//   .connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Database connection established"))
//   .catch((err) => console.log("error connecting to database", err));

app.get("/", (req, res) => {
  res.send("Method not allowed");
  logger.info({ message: "Testing the server" });
});
const port = process.env.PORT || "8000";
app.listen(port, () => {
  console.log("Port 8000 Active");
});
