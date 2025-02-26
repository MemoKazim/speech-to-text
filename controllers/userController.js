const dotenv = require("dotenv");
const Report = require("../models/reportModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
dotenv.config("../.env");

// ==============|CUSTOM FUNCTIONS|================
const getUser = async (token) => {
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decode.id);
  return freshUser;
};

exports.test = async (req, res) => {
  const freshUser = await getUser(req.headers.cookie.split("=")[1]);
  res.status(200).render("user/pages/home", { id: freshUser.id });
};

exports.register = async (req, res) => {};
