const express = require("express");
const route = express();
const authController = require("../controller/auth/authController");

//User
route.post("/register", authController.SignUp);
route.post("/add-profile", authController.AddProfile);
route.post("/add-address", authController.AddAddress);
route.post("/verifybvn", authController.VerifyBvn);
route.post("/login", authController.SignIn);

module.exports = route;
