let nameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passInput = document.getElementById("password");
let phoneInput = document.getElementById("phone");
let signupBtn = document.getElementById("signup");

signupBtn.onclick = function (e) {
  e.preventDefault();

  let name = nameInput.value.trim();
  let email = emailInput.value.trim();
  let password = passInput.value.trim();
  let phone = phoneInput.value.trim();

  // REGEX
  let nameReg = /^[A-Za-z\u0600-\u06FF ]{3,}$/;
  let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneReg = /^01[0-2,5][0-9]{8}$/;

  if (!nameReg.test(name)) {
    alert("❌ الاسم لازم يكون 3 حروف أو أكثر — عربي/إنجليزي فقط");
    return;
  }

  if (!emailReg.test(email)) {
    alert("❌ الإيميل غير صحيح");
    return;
  }

  if (!phoneReg.test(phone)) {
    alert("❌ رقم التليفون المصري غير صحيح (11 رقم — يبدأ بـ 01)");
    return;
  }

  // لو كل شيء سليم
  let User_info = {
    Name: name,
    Email: email,
    Password: password,
    Phone: phone
  };
    setTimeout(() => {
            window.location = "login.html"
        }, 500);
  localStorage.setItem("User_info", JSON.stringify(User_info));
};
