
document.addEventListener("DOMContentLoaded", () => {

    let usernameInput = document.querySelector("#username");
    let emailInput = document.querySelector("#email");
    let passwordInput = document.querySelector("#password");
    let form = document.querySelector(".profile-form");

    let UserData = JSON.parse(localStorage.getItem("User_info"));

    if (!UserData) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // يمنع الريلود

        UserData.Name = usernameInput.value;
        UserData.Email = emailInput.value;
        UserData.Password = passwordInput.value;

        localStorage.setItem("User_info", JSON.stringify(UserData));

        alert("Profile updated successfully ✅");
        setTimeout(()=>{
            window.location = "profile.html"
        }, 500)
    });
});


// document.addEventListener("DOMContentLoaded", () => {

