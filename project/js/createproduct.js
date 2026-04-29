let productname = document.querySelector("#productname");
let productdescription = document.querySelector("#productdescription");
let productsizeSelect = document.querySelector("#productsize");
let uploadphoto = document.querySelector("#uploadphoto");
let createform = document.querySelector("#createform");

let selectedSize = "";
let uploadedImage = "";

productsizeSelect.addEventListener("change", (e) => {
    selectedSize = e.target.value;
});

uploadphoto.addEventListener("change", function() {
    let file = this.files[0];
    if (!file) return;

    // تحقق من نوع الملف
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("File type not supported. Only JPG and PNG allowed.");
        this.value = ""; // مسح الملف
        uploadedImage = "";
        return;
    }

    // تحقق من الحجم
    if (file.size > 2 * 1024 * 1024) { // 2MB
        alert("File is bigger than 2MB.");
        this.value = "";
        uploadedImage = "";
        return;
    }

    // تحويل الصورة إلى Base64
    let reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage = e.target.result; // صورة Base64
    };
    reader.readAsDataURL(file);
});

// حدث إنشاء المنتج
createform.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = productname.value.trim();
    let desc = productdescription.value.trim();

    // validation
    if (name === "" || desc === "" || selectedSize === "" || uploadedImage === "") {
        alert("Please enter all fields and upload an image");
        return;
    }

    let allproducts = JSON.parse(localStorage.getItem("totalproducts")) || [];

    let obj = {
        id: allproducts.length + 1,
        title: name,
        size: selectedSize,
        desc: desc,
        imgurl: uploadedImage ,
        isme: "y"
    };

    allproducts.push(obj);
    let newp = [...allproducts, obj];

    localStorage.setItem("totalproducts", JSON.stringify(newp));

    alert("Product created successfully!");

    createform.reset();
    selectedSize = "";
    uploadedImage = "";
});

