const apiController = require("./apiController");

const User = require("../models/userModel");
const Report = require("../models/reportModel");

const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}-${uniqid()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      res.status(400).redirect(req.path, { message: "Only image allowed!" }),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// =================|DASHBOARD|==================
exports.getDashboard = async (req, res) => {
  res.status(200).render("admin/pages/home", {
    title: "Dashboard",
  });
};

// =================|REPORT|==================
exports.getReports = async (req, res) => {
  const reports = await apiController.getReports();
  res.status(200).render("admin/pages/reports", { reports: reports });
};

exports.getNewReport = async (req, res) => {
  //
};

exports.getReport = async (req, res) => {
  //
};

// =================|USER PROFILE|==================
exports.changePassword = async (req, res) => {
  await User.findOneAndUpdate(
    { role: "admin" },
    { password: req.body.newPassword }
  );
  res.status(200).render("admin/pages/profile", {
    message: "Password Changed Successfully!",
    code: 0,
  });
};
exports.getProfile = async (req, res) => {
  res.status(200).render("admin/pages/profile");
};
exports.getUser = async (req, res) => {
  const data = await User.find(req.params.id);
  res.status(200).render("admin/pages/user", { data: data });
};
exports.getUsers = async (req, res) => {
  const data = await User.find();
  res.status(200).render("admin/pages/users", { data: data });
};
exports.deleteUser = async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.status(200).redirect("/admin/user", {
    message: "User Successfully deleted!",
    code: 0,
  });
};
// =================|USER|==================

exports.updateUserPage = async (req, res) => {
  const singleUser = await User.findById(req.params.id);
  res.status(200).render("admin/updateUser", {
    result: singleUser,
  });
};
exports.updateUser = async (req, res) => {
  const update = {};
  await User.findByIdAndUpdate(req.params.id, update);
  res.status(202).redirect("/admin/user");
};
