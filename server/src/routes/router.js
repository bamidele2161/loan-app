const express = require("express");
const route = express();
const authController = require("../controller/auth/authController");

//User
route.post("/register", authController.SignUp);
route.post("/add-profile", authController.AddProfile);
route.post("/add-address", authController.AddAddress);
route.post("/verifybvn", authController.VerifyBvn);
route.post("/login", authController.SignIn);
route.post("/pin", authController.AddPIn);
route.post("/getProfile", authController.GetUserProfile);
route.post("/request", authController.Request);
route.post("/loandata", authController.GetLoanData);

module.exports = route;
