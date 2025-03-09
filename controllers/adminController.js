const apiController = require("./apiController");

const User = require("../models/userModel");
const Report = require("../models/reportModel");
const config = require("../config/config");

const { spawn } = require("child_process");
const path = require("path");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.mimetype.split("/")[0]) {
      case "audio":
        cb(null, "uploads/audios");
        break;
      case "video":
        cb(null, "uploads/videos");
        break;
      case "image":
        cb(null, "uploads/images");
        break;
    }
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${uniqid()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (config.allowed_filetypes.includes(file.mimetype.split("/")[0])) {
    cb(null, true);
  } else {
    cb(
      res.status(400).redirect(req.path, {
        message: "Given file is not accepted format! Try different file.",
      }),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.upload = upload;

// =================|DASHBOARD|==================
exports.getDashboard = async (req, res) => {
  res.status(200).render("admin/pages/home", {
    title: "Dashboard",
  });
};

// =================|REPORT|==================
exports.getReports = async (req, res) => {
  const reports = await apiController.getReports();
  res.status(200).render("admin/pages/reports", {
    reports: reports,
    ajax: false,
    page_name: "Reports",
  });
};

exports.getNewReport = async (req, res) => {
  apiController.getNewReport(req, res);
  //
};

exports.getReport = async (req, res) => {
  const filename = req.params.id;
  console.log(filename);
  const filePath = path.join(__dirname, "../reports", filename);
  console.log(filePath);
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("File download error:", err);
      res.status(500).send("Error downloading file");
    }
  });
};

exports.postUpload = async (req, res) => {
  const freshUser = await getUser(req.headers.cookie.split("=")[1]);
  apiController.postNewReport(req.files, freshUser._id);

  let filenames = [];
  req.files.forEach((file) => {
    filenames.push(file.filename);
  });
  this.processAudio(filenames);
  res.json({
    success: true,
    message: "Files uploaded successfully",
    files: req.files,
  });

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
  // const data = await User.find();
  res.status(200).render("admin/pages/profile", { data: data });
};
exports.getUser = async (req, res) => {
  const data = await User.find(req.params.id);
  res.status(200).render("admin/pages/user", { data: data });
};
exports.getUsers = async (req, res) => {
  const data = await User.find();
  res
    .status(200)
    .render("admin/pages/users", {
      data: data,
      ajax: false,
      page_name: "Users",
    });
};
exports.deleteUser = async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.status(200).redirect("/admin/user", {
    message: "User Successfully deleted!",
    code: 0,
  });
};
// =================|USER|==================

const getUser = async (token) => {
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decode.id);
  return freshUser;
};

exports.updateUserPage = async (req, res) => {
  const singleUser = await User.findById(req.params.id);
  res.status(200).render("admin/pages/updateUser", {
    result: singleUser,
  });
};
exports.updateUser = async (req, res) => {
  const update = {};
  await User.findByIdAndUpdate(req.params.id, update);
  res.status(202).redirect("/admin/user");
};

// =================|TEST|==================
exports.getTest = async (req, res) => {
  res.status(200).render("admin/pages/test");
};

exports.processAudio = async (filenames) => {
  filenames.forEach((filename, index) => {
    console.log(`Starting worker ${index + 1} for file: ${filename}`);

    // Create a new worker (child process)
    const worker = spawn("python", ["scripts/speech2text.py", filename]);

    // Capture stdout (standard output)
    worker.stdout.on("data", (data) => {
      console.log(
        `Worker ${index + 1} (File: ${filename}) Output: ${data.toString()}`
      );
    });

    // Capture stderr (error output)
    worker.stderr.on("data", (data) => {
      console.error(`${data.toString()}`);
    });

    // Handle process exit
    worker.on("exit", (code) => {
      if (code === 0) {
        Report.findOneAndUpdate({ name: filename }, { status: "Success" }).then(
          (report) => {
            console.log(report);
          }
        );
      } else {
        Report.findOneAndUpdate({ name: filename }, { status: "Error" }).then(
          (report) => {
            console.log(report);
          }
        );
      }
    });
  });
};
