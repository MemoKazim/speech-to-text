const home = document.getElementById("content-home");

// const getReconciliation = () => {
//   var xhttp = new XMLHttpRequest();
//   document.getElementById("content-home").innerHTML = `
//     <div class="loading-snippet">
//       <p>Loading reconciliation page, please wait...</p>
//       <i class="fa-solid fa-spinner fa-3x spin"></i>
//     </div>
//   `;
//   window.history.pushState(
//     "Reconciliation",
//     "Dashboard | Reconciliation",
//     "/dashboard/reconciliation"
//   );
//   xhttp.onreadystatechange = () => {
//     if (xhttp.readyState == 4 && xhttp.status == 200) {
//       document.getElementById("content-home").innerHTML = xhttp.responseText;
//     }
//   };
//   xhttp.open("GET", "/dashboard/reconciliation", true);
//   xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//   xhttp.send();
// };

const getProfile = () => {
  home.style.all = "";
  var xhttp = new XMLHttpRequest();
  window.history.pushState("Users", "Dashboard | Users", "/admin/users");
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      console.log(xhttp.responseText);
      home.innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "/admin/users", true);
  xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhttp.send();
};

const getReports = () => {
  home.style.all = "";
  var xhttp = new XMLHttpRequest();
  window.history.pushState("Reports", "Dashboard | Reports", "/admin/reports");
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      home.innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "/api/reports", true);
  xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhttp.send();
};

const getNewReport = () => {
  home.style.all = "";
  var xhttp = new XMLHttpRequest();
  window.history.pushState(
    "New Report",
    "Dashboard | New Report",
    "/admin/reports/new"
  );
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      home.innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "/admin/reports/new", true);
  xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhttp.send();
};

const getUsers = () => {
  home.style.all = "";
  var xhttp = new XMLHttpRequest();
  window.history.pushState("Users", "Dashboard | Users", "/dashboard/users");
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      home.innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "/dashboard/users", true);
  xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhttp.send();
};

const getCreateUser = () => {
  home.style.all = "";
  var xhttp = new XMLHttpRequest();
  window.history.pushState(
    "Create user",
    "Dashboard | Create user",
    "/dashboard/createUser"
  );
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      home.innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "/dashboard/createUser", true);
  xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhttp.send();
};

const logoff = () => {
  var xhttp = new XMLHttpRequest();
  window.history.pushState(
    "Logoff",
    "Dashboard | Logoff",
    "/dashboard/profile/logoff"
  );
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    }
  };
  xhttp.open("GET", "/dashboard/profile/logoff", true);
  xhttp.send();
  clearAllCookies();
};

function clearAllCookies() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  }
  console.log("All cookies have been cleared.");
}
