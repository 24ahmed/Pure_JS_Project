
const createForm = document.getElementById("createform");

const uploadPhoto = document.getElementById("uploadphoto");
const productName = document.getElementById("productname");
const productDescription = document.getElementById("productdescription");
const productSize = document.getElementById("productsize");
const submitBtn = document.getElementById("submit");

let selectedSize = "";
let uploadedImage = "";
let editId = JSON.parse(localStorage.getItem("edit-product-id"));  // لو في تعديل
let allproducts = JSON.parse(localStorage.getItem("totalproducts")) ;
let getProduct = allproducts.find(item => item.id === editId)
console.log(getProduct)


 if (editId) {
        productname.value = getProduct.title;
        productdescription.value = getProduct.desc;
        productsize.value = getProduct.size;

        selectedSize = getProduct.size;     // حفظ الحجم القديم
        uploadedImage = getProduct.imgurl;  // حفظ الصورة القديمة
    }

productSize.addEventListener("change", (e) => {
   selectedSize = e.target.value;
});

uploadphoto.addEventListener("change", function () {
    let file = this.files[0];
    if (!file) return;
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("Only JPG and PNG allowed.");
        this.value = "";
        uploadedImage = "";
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert("File > 2MB.");
        this.value = "";
        uploadedImage = "";
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        uploadedImage = e.target.result;
    };
    reader.readAsDataURL(file);
});

createform.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = productname.value.trim();
    let desc = productdescription.value.trim();

    if (name === "" || desc === "" || selectedSize === "" || uploadedImage === "") {
        alert("Please fill all fields.");
        return;
    }

    if (editId) {

        let index = allproducts.findIndex(p => p.id === editId);

        allproducts[index] = {
            ...allproducts[index],
            title: name,
            desc: desc,
            size: selectedSize,
            imgurl: uploadedImage,
        };

        localStorage.setItem("totalproducts", JSON.stringify(allproducts));
        alert("Product updated successfully!");

        localStorage.removeItem("editproductid");
        return;
    }


//     // ===========================
//     //     CREATE (new product)
//     // ===========================
    let newProduct = {
        id: allproducts.length + 1,
        title: name,
        size: selectedSize,
        desc: desc,
        imgurl: uploadedImage,
        isme: "y"
    };

    allproducts.push(newProduct);
    localStorage.setItem("totalproducts", JSON.stringify(allproducts));

    alert("Product created successfully!");

    createform.reset();
    selectedSize = "";
    uploadedImage = "";
});
