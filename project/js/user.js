let info = document.getElementById("info");
let enter = document.getElementById("enter");
let logoutBtn = document.getElementById("logout");

let UserData = JSON.parse(localStorage.getItem("User_info"));

function information() {
  if (UserData) {
    enter.style.display = "none";
    info.style.display = "flex";
  } else {
    enter.style.display = "flex";
    info.style.display = "none";
  }
}
information();
logoutBtn.onclick = function () {
  localStorage.clear();
  enter.style.display = "block";
  info.style.display = "none";
  window.location = "login.html";
};