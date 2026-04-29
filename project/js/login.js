let Name = document.getElementById("name");
let Password = document.getElementById("password");
let signinBtn = document.getElementById("signin");

let UserData = JSON.parse(localStorage.getItem("User_info"));

signinBtn.onclick = function (e) {
  e.preventDefault();
  if(!UserData){alert("you do not have an account")}
  else{
      if (Name.value.trim() === "") {
    alert("Enter your name");
    return;
  }
  if (Password.value.trim() === "") {
    alert("Enter your password");
    return;
  }
  if (
    UserData &&
    UserData.Name === Name.value.trim() &&
    UserData.Password === Password.value.trim()
  ) {
    setTimeout(() => {
      window.location = "index.html";
    }, 500);
  } else {
    alert("❌ اسم المستخدم أو كلمة المرور غير صحيحة");
  }
  }

};

