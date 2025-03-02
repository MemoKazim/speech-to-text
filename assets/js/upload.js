const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const sendButton = document.getElementById("sendButton");
let filesArray = [];

uploadBox.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (event) =>
  handleFiles(event.target.files)
);

uploadBox.addEventListener("dragover", (event) => {
  event.preventDefault();
  uploadBox.classList.add("dragover");
});

uploadBox.addEventListener("dragleave", () =>
  uploadBox.classList.remove("dragover")
);

uploadBox.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadBox.classList.remove("dragover");
  handleFiles(event.dataTransfer.files);
});

function handleFiles(files) {
  Array.from(files).forEach((file) => {
    filesArray.push(file);
    renderFileList();
  });
}

function renderFileList() {
  fileList.innerHTML = "";
  filesArray.forEach((file, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <span class="uploading">${file.name}</span>
    <i class="fa-solid fa-xmark" style="color: #ff0000; cursor:pointer; margin: " onclick="removeFile(${index})"></i>
    `;
    fileList.appendChild(li);
  });
}

function removeFile(index) {
  filesArray.splice(index, 1);
  renderFileList();
}

sendButton.addEventListener("click", () => {
  if (filesArray.length === 0) {
    alert("No files to upload.");
    return;
  }

  const formData = new FormData();
  filesArray.forEach((file, index) => {
    formData.append(`files`, file);
  });

  fetch("/admin/reports/new", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Files uploaded successfully!");
      filesArray = [];
      renderFileList();
    })
    .catch((error) => {
      alert("Error uploading files.");
      console.error(error);
    });
});
