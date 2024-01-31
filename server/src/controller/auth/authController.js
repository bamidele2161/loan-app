const UserDB = require("../../model/auth/userModel");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../utils/sendEmail");
const otpGenerator = require("otp-generator");
const { generateToken, matchChecker } = require("../../utils/index");
const axios = require("axios");

exports.SignUp = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    let round = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(data.password, round);

    const findUser = await UserDB.findOne({ email: data.email });

    if (findUser) {
      return res.status(404).json({ error: "Email already exists" });
    }

    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: cryptedPassword,
    };
    const createUser = await UserDB.create(user);

    if (!createUser) {
      return res.status(400).json({ error: "Error while creating user" });
    }

    sendEmail(
      { name: user.firstName },
      user.email,
      "Welcome to BamsBank",
      "../view/registration.ejs"
    );

    const userSecret = process.env.TOKEN_USER_SECRET;
    const token = generateToken({ id: createUser._id }, userSecret, "14d");
    return res.status(200).json({
      data: {
        firstname: createUser.firstName,
        lastname: createUser.lastName,
        email: createUser.email,
        phone: createUser.phone,
        occupation: createUser.occupation,
        token: token,
      },
      message: "Account created successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.AddProfile = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    const findUserByEmail = await UserDB.findOne({ email: data.email });

    if (!findUserByEmail) {
      return res.status(404).send({ error: "User not found" });
    }

    const user = {
      phone: data.phone,
      kinName: data.kinName,
      occupation: data.occupation,
      kinPhone: data.kinPhone,
    };
    const UpdateUser = await UserDB.updateOne(
      { _id: findUserByEmail._id },
      user
    );

    if (!UpdateUser) {
      return res.status(400).json({ error: "Error while updating user" });
    }

    const findUser = await UserDB.findOne({ email: data.email });

    return res.status(200).send({
      data: {
        firstname: findUser.firstName,
        lastname: findUser.lastName,
        email: findUser.email,
        phone: findUser.phone,
        occupation: findUser.occupation,
        phone: findUser.phone,
        kinName: findUser.kinName,
        occupation: findUser.occupation,
        kinPhone: findUser.kinPhone,
      },
      message: "Account updated successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Something went wrong" });
  }
};

exports.AddAddress = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    const findUser = await UserDB.findOne({ email: data.email });

    if (!findUser) {
      return res.status(404).send({ error: "User not found" });
    }

    const user = {
      state: data.state,
      lga: data.lga,
      town: data.town,
      dob: data.dob,
    };
    const UpdateUser = await UserDB.updateOne({ _id: findUser._id }, user);

    if (!UpdateUser) {
      return res.status(400).json({ error: "Error while updating user" });
    }

    const getUserData = await UserDB.findOne({ email: data.email });
    return res.status(200).send({
      message: "Account updated successfully",
      data: {
        firstname: getUserData.firstName,
        lastname: getUserData.lastName,
        email: getUserData.email,
        phone: getUserData.phone,
        occupation: getUserData.occupation,
        phone: getUserData.phone,
        kinName: getUserData.kinName,
        occupation: getUserData.occupation,
        kinPhone: getUserData.kinPhone,
        state: getUserData.state,
        lga: getUserData.lga,
        town: getUserData.town,
        dob: getUserData.dob,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Something went wrong" });
  }
};

exports.VerifyBvn = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    const url = "https://api.flutterwave.com//v3/bvn/verifications";

    const token = process.env.FLW_SECRET_KEY;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      bvn: data.bvn,
      firstname: data.firstname,
      lastname: data.lastname,
    };

    const res = await axios.post(url, payload, options);

    const verifyUrl = `https://api.flutterwave.com/v3/bvn/verifications/${res?.data?.data?.reference}`;

    const verifyOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(verifyUrl, verifyOptions);

    const user = {
      bvn: data.bvn,
    };
    const UpdateUser = await UserDB.updateOne({ email: data.email }, user);

    if (!UpdateUser) {
      return res.status(400).json({ error: "Error while updating user" });
    }

    return res.status(200).send({
      message: "User verified successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.SignIn = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    const findUser = await UserDB.findOne({ email: data.email });

    if (!findUser) {
      return res.status(404).send({ error: "User not found" });
    }

    const comparePass = await matchChecker(data.password, findUser.password);

    if (!comparePass) {
      return res.status(404).send({ error: "Invalid credentials" });
    }

    const userSecret = process.env.TOKEN_USER_SECRET;
    const token = generateToken({ id: findUser._id }, userSecret, "14d");
    return res.status(200).send({
      findUser,
      message: "User login successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Something went wrong" });
  }
};
