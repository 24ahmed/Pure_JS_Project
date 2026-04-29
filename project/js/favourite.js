


let productDomf = document.querySelector(".products");
let noproductf = document.querySelector(".noproducts");
noproductf.style.display = "none";

// رسم المنتجات المفضلة
function drawfavouritecartproduct(allproducts = []) {
    let favouriteItems = JSON.parse(localStorage.getItem("favouriteProducts")) || allproducts
    if (favouriteItems.length === 0) {
        noproductf.style.display = "block";
        productDomf.innerHTML = ""; // امسح أي منتجات موجودة
        return;
    } else {
        noproductf.style.display = "none";
    }

    let productsuif = favouriteItems.map((item) => {
        return `<div class="product-item">
                    <img class="product-item-img" src="${item.imgurl}" alt="head">
                    <div class="product-item-desc">
                        <h2><a href="cartDetails.html">${item.title}</a></h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. dolor et tempore.</p>
                        <span>size: ${item.size}</span>
                    </div>
                    <div class="product-item-actions">
                        <button onclick="removefromfav(${item.id})">Remove</button>    
                    </div>
                </div>`;
    });

    productDomf.innerHTML = productsuif.join("");
}

drawfavouritecartproduct();
function removefromfav(id) {
    let favouriteItems = JSON.parse(localStorage.getItem("favouriteProducts")) || [];
   let totalproducts = JSON.parse(localStorage.getItem("totalproducts")) || [];

    favouriteItems = favouriteItems.filter(item => item.id !== id);
    localStorage.setItem("favouriteProducts", JSON.stringify(favouriteItems));
    totalproducts = totalproducts.map(item =>
        item.id === id ? { ...item, liked: false } : item
    );
    localStorage.setItem("totalproducts", JSON.stringify(totalproducts));
    drawfavouritecartproduct(favouriteItems);
    document.querySelectorAll(".fav-icon").forEach(icon => {
        let iconId = parseInt(icon.dataset.id);
        let product = totalproducts.find(p => p.id === iconId);
        icon.style.color = product && product.liked ? "red" : "white";
    });


}

document.addEventListener("DOMContentLoaded", () => {

    let profilename = document.querySelector("#nameofuser");
    if (profilename && UserData && UserData.Name) {
        profilename.textContent = UserData.Name;
    } else {
        console.log("profilename أو UserData.Name غير موجود");
    }

});