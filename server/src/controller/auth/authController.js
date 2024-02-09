const UserDB = require("../../model/auth/userModel");
const LoanDB = require("../../model/auth/loanModel");
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
      statusCode: 200,
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
      statusCode: 200,
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
      statusCode: 200,
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

    const findUser = await UserDB.findOne({ email: data.email });

    if (!findUser) {
      return res.status(404).send({ error: "User not found" });
    }

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

    const respon = await axios.post(url, payload, options);

    const verifyUrl = `https://api.flutterwave.com/v3/bvn/verifications/${respon?.data?.data?.reference}`;

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

    sendEmail(
      { name: findUser.firstName },
      findUser.email,
      "Account Verification Successful!",
      "../view/verify.ejs"
    );

    return res.status(200).json({
      message: "User BVN verified successfully",
      statusCode: 200,
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
      data: findUser,
      token: token,
      message: "User login successfully",
      statusCode: 200,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Something went wrong" });
  }
};

exports.AddPIn = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;

    const findUser = await UserDB.findOne({ email: data.email });

    if (!findUser) {
      return res.status(404).send({ error: "User not found" });
    }

    const user = {
      transactionPin: data.transactionPin,
    };
    const UpdateUser = await UserDB.updateOne({ _id: findUser._id }, user);

    if (!UpdateUser) {
      return res.status(400).json({ error: "Error while updating user" });
    }

    const getUserData = await UserDB.findOne({ email: data.email });
    return res.status(200).send({
      message: "Transaction PIN added successfully",
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
        transactionPin: getUserData.transactionPin,
      },
      statusCode: 200,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Something went wrong" });
  }
};

exports.GetUserProfile = async (req, res) => {
  try {
    const email = req.body.email;

    const getUserData = await UserDB.findOne({ email: email });
    if (!getUserData) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send({
      message: "User data fetched successfully",
      data: getUserData,
      statusCode: 200,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Something went wrong" });
  }
};

exports.Request = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });
    const data = req.body;
    const findUser = await UserDB.findOne({ email: data.userEmail });
    if (!findUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const request = {
      amount: data.amount,
      firstguarantor: data.firstguarantor,
      guarantoremail: data.guarantoremail,
      secguarantor: data.secguarantor,
      secguarantoremail: data.secguarantoremail,
      duration: data.duration,
      bankname: data.bankname,
      accountname: data.accountname,
      accountno: data.accountno,
      userEmail: data.userEmail,
      bankStatement: data.bankStatement,
      status: "Pending",
    };
    const createRequest = await LoanDB.create(request);

    if (!createRequest) {
      return res.status(400).json({ error: "Error while creating request" });
    }

    sendEmail(
      { name: findUser.firstName },
      findUser.email,
      "Loan Requested Successfully",
      "../view/registration.ejs"
    );

    return res.status(200).json({
      data: createRequest,
      message: "Loan Request successfully",
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.GetLoanData = async (req, res) => {
  try {
    const email = req.body.email;

    const getUserData = await LoanDB.find({ userEmail: email });
    if (!getUserData) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send({
      message: "User data fetched successfully",
      data: getUserData,
      statusCode: 200,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Something went wrong" });
  }
};
