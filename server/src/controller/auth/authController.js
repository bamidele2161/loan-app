const UserDB = require("../../model/auth/userModel");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../utils/sendEmail");
const otpGenerator = require("otp-generator");
const generateToken = require("../../utils/index");
const axios = require("axios");

exports.SignUp = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    let round = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(data.password, round);

    const findUser = await UserDB.findOne({ email: data.email });

    if (findUser) {
      res.status(404).send({ error: "Email already exists" });
    }

    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: cryptedPassword,
    };
    const createUser = await UserDB.create(user);

    if (!createUser) {
      res.status(400).json({ error: "Error while creating user" });
    }

    sendEmail(
      { name: user.firstName },
      user.email,
      "Welcome to BamsBank",
      "../view/registration.ejs"
    );

    const userSecret = process.env.TOKEN_USER_SECRET;
    const token = generateToken({ id: createUser._id }, userSecret, "14d");
    return res.status(200).send({
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
    res.status(500).send({ message: err.message || "Something went wrong" });
  }
};

exports.AddProfile = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    const findUser = await UserDB.findOne({ email: data.email });

    if (!findUser) {
      res.status(404).send({ error: "User not found" });
    }

    const user = {
      phone: data.phone,
      kinName: data.kinName,
      occupation: data.occupation,
      kinPhone: data.kinPhone,
    };
    const UpdateUser = await UserDB.updateOne({ _id: findUser._id }, user);

    if (!UpdateUser) {
      res.status(400).json({ error: "Error while updating user" });
    }

    return res.status(200).send({
      data: {
        firstname: UpdateUser.firstName,
        lastname: UpdateUser.lastName,
        email: UpdateUser.email,
        phone: UpdateUser.phone,
        occupation: UpdateUser.occupation,
        phone: UpdateUser.phone,
        kinName: UpdateUser.kinName,
        occupation: UpdateUser.occupation,
        kinPhone: UpdateUser.kinPhone,
      },
      message: "Account updated successfully",
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Something went wrong" });
  }
};

exports.AddAddress = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    const findUser = await UserDB.findOne({ email: data.email });

    if (!findUser) {
      res.status(404).send({ error: "User not found" });
    }

    const user = {
      state: data.state,
      lga: data.lga,
      town: data.town,
      dob: data.dob,
    };
    const UpdateUser = await UserDB.updateOne({ _id: findUser._id }, user);

    if (!UpdateUser) {
      res.status(400).json({ error: "Error while updating user" });
    }

    return res.status(200).send({
      data: {
        firstname: UpdateUser.firstName,
        lastname: UpdateUser.lastName,
        email: UpdateUser.email,
        phone: UpdateUser.phone,
        occupation: UpdateUser.occupation,
        phone: UpdateUser.phone,
        kinName: UpdateUser.kinName,
        occupation: UpdateUser.occupation,
        kinPhone: UpdateUser.kinPhone,
        state: UpdateUser.state,
        lga: UpdateUser.lga,
        town: UpdateUser.town,
        dob: UpdateUser.dob,
      },
      message: "Account updated successfully",
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Something went wrong" });
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

    try {
      const res = await axios.post(url, payload, options);

      const verifyUrl = `https://api.flutterwave.com/v3/bvn/verifications/${res?.data?.data?.reference}`;

      const token = process.env.FLW_SECRET_KEY;

      const verifyOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(verifyUrl, verifyOptions);

      const user = {
        bvn: data.bvn,
      };
      const UpdateUser = await UserDB.updateOne({ _id: findUser._id }, user);

      if (!UpdateUser) {
        res.status(400).json({ error: "Error while updating user" });
      }

      return res.status(200).send({
        data: response?.data,
        message: "Bvn verified successfully",
      });
    } catch (error) {
      res.status(500).send({ message: err.message || "Something went wrong" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Something went wrong" });
  }
};

exports.SignIn = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    const findUser = await UserDB.findOne({ email: data.email });

    if (!findUser) {
      res.status(404).send({ error: "User not found" });
    }

    const comparePass = await matchChecker(data.password, findUser.password);

    if (!comparePass) {
      res.status(404).send({ error: "Invalid credentials" });
    }

    const userSecret = process.env.TOKEN_USER_SECRET;
    const token = generateToken({ id: createUser._id }, userSecret, "14d");
    return res.status(200).send({
      data: createUser,
      message: "User login successfully",
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Something went wrong" });
  }
};
