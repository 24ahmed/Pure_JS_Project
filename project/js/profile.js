document.addEventListener("DOMContentLoaded", () => {
    if (!UserData) return;

    document.querySelector(".username").textContent = "Name:"+UserData.Name ?? "No Name";
    document.querySelector(".email").textContent = "Email:"+UserData.Email ?? "No Email";
    document.querySelector(".password").textContent = "Password:"+UserData.Password ?? "No Password";
});

const profilePhoto = document.getElementById("profilePhoto");  
const profilePhoto2 = document.getElementById("profilePhoto2");    

const uploadPhoto = document.getElementById("uploadPhoto");

const savedPhoto = localStorage.getItem("UserProfilePhoto");
document.addEventListener("DOMContentLoaded", () => {

    if (savedPhoto) {
        profilePhoto.src = savedPhoto;
        profilePhoto2.src = savedPhoto;

    }

    // عند اختيار صورة جديدة
    uploadPhoto.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const base64 = event.target.result;
            profilePhoto.src = base64;
            profilePhoto2.src = base64; 
            localStorage.setItem("UserProfilePhoto", base64); 
        }
        reader.readAsDataURL(file);
    });
});
// const profilePhoto = document.getElementById("profilePhoto");
const openSection = document.querySelector(".open-section");

// نبدأ بالـ section مخفي
openSection.style.display = "none";

// فتح/قفل عند الضغط على الصورة
profilePhoto.addEventListener("click", (e) => {
    e.stopPropagation(); // يمنع الكليك من الوصول للـ document
    if (openSection.style.display === "block") {
        openSection.style.display = "none";
    } else {
        openSection.style.display = "block";
    }
});

// قفل الـ section لما تضغط في أي مكان خارجها
document.addEventListener("click", (event) => {
    if (!openSection.contains(event.target) && event.target !== profilePhoto) {
        openSection.style.display = "none";
    }
});

