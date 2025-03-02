const Report = require("../models/reportModel");

exports.getReports = async (req, res) => {
  const reports = await Report.find().sort({ date: -1 });
  // AJAX
  try {
    if (req.headers["x-requested-with"] == "XMLHttpRequest") {
      res.render("admin/pages/reports", {
        ajax: true,
        reports: reports,
        page_name: "Reports",
      });
    }
  } catch {
    return reports;
  }
};

exports.getNewReport = async (req, res) => {
  let ajax;
  try {
    if (req.headers["x-requested-with"] == "XMLHttpRequest") {
      ajax = true;
    }
  } catch {
    ajax = false;
  }
  console.log(ajax);
  res.render("admin/pages/upload", {
    ajax: ajax,
    page_name: "Generate New Report",
  });
};

exports.postNewReport = async (files, user) => {
  files.forEach((file) => {
    const newReport = new Report({
      name: file.filename,
      status: "Pending",
      generatedBy: user,
      textData: `reports/${file.filename.split(".")[0]}.txt`,
      date: new Date(),
    });
    newReport.save();
  });
  //
};

exports.getReport = async () => {
  //
};

exports.putReport = async () => {
  //
};

exports.deleteReport = async () => {
  //
};

exports.methodNotAllowed = async () => {
  //
};
