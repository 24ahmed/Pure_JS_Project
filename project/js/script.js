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
  localStorage.removeItem("User_info");
  localStorage.removeItem("UserProfilePhoto");
  enter.style.display = "block";
  info.style.display = "none";
  window.location = "login.html";
};
let productDom = document.querySelector(".products");
let cartproductmenu = document.querySelector(".carts-products");
let cardproduction = document.querySelector(".carts-products div");
let badgedom = document.querySelector(".badge");
let shoppingcarticon = document.querySelector(".shoppingcart i");

shoppingcarticon.addEventListener("click", opencartmenu);
function opencartmenu() {

  // لو مفيش منتجات
  if (!cardproduction.innerHTML.trim()) {
    cartproductmenu.style.display = "none";
    return; // وقف هنا
  }

  // Toggle
  if (cartproductmenu.style.display === "block") {
    cartproductmenu.style.display = "none";
  } else {
    cartproductmenu.style.display = "block";
  }
}

let totalproducts = JSON.parse(localStorage.getItem("totalproducts")) || [];

let drawproductsui = function (products = []) {
  let productsui = products.map((item) => {
    return `
      <div class="product-item">
        <img class="product-item-img" src="${item.imgurl}" alt="head">
        <div class="product-item-desc">
            <a onclick='saveitemdata(${item.id})'>${item.title}</a>
            <p>${item.desc}</p>
            <span>Size: ${item.size}</span>
          ${
            item.isme === "y"
              ? `<button onclick="editproduct(${item.id})" class="editproduct">Edit</button>`
              : ""
          }
        </div>
        <div class="product-item-actions">
            <button class="add-to-cart" onclick="addedtocart(${item.id})">AddToCart</button>
            <i onclick="addToFavourite(${item.id}, this)" 
              style="color: ${item.liked ? 'red' : 'white'}"
              class="fa fa-heart fav-icon" 
              data-id="${item.id}"></i>
        </div>
      </div>`;
  });

  productDom.innerHTML = productsui.join("");
};
drawproductsui(totalproducts);
let addeditem = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [];
if (addeditem.length != 0) {
  addeditem.map((item) => {
    cardproduction.innerHTML += `<p>${item.title}</p>`;
  });
  badgedom.style.display = "block";
  badgedom.innerHTML += `${addeditem.length}`;
}



let allitems = [];
function addedtocart(id) {
  if (!UserData) {
    window.location = "login.html";
    return;
  }

  let choosenitem = totalproducts.find((item) => item.id === id);

  let existingItem = allitems.find((i) => i.id === choosenitem.id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    allitems.push({ ...choosenitem, qty: 1 });
  }

  cardproduction.innerHTML = "";
  allitems.forEach((item) => {
    cardproduction.innerHTML += `<p>${item.title} : ${item.qty}</p>`;
  });

  let addeditem = JSON.parse(localStorage.getItem("products")) || [];

  let storedItem = addeditem.find((i) => i.id === choosenitem.id);

  if (storedItem) {
    storedItem.qty += 1;
  } else {
    addeditem.push({ ...choosenitem, qty: 1 });
  }

  localStorage.setItem("products", JSON.stringify(addeditem));

  let cartproductitems = document.querySelectorAll(".carts-products p");
  badgedom.style.display = "block";
  badgedom.innerHTML = `${cartproductitems.length}`;
}






function saveitemdata(id) {
  localStorage.setItem("productid", id);
  window.location = "cartDetails.html";
}

let input = document.querySelector("#search");

input.addEventListener("keyup", function (e) {
  
  let value = e.target.value.toLowerCase().trim();

  searchbar(value, totalproducts);

  if (value === "") {
    drawproductsui(totalproducts);
  }
});

function searchbar(title, myArray) {
  let arr = myArray.filter((item) => item.title.toLowerCase().includes(title));
  drawproductsui(arr);
}


let favItems = document.getElementById("favItems");

let favouriteItems = JSON.parse(localStorage.getItem("favouriteProducts")) 
    ? JSON.parse(localStorage.getItem("favouriteProducts")) 
    : [];
if(favouriteItems.length === 0){
  favItems.style.display = 'none';
}
function addToFavourite(id, element) {
  if (!UserData) {
    window.location = "login.html";
    return;
  }
  const alreadyFav = favouriteItems.some(item => item.id === id);

  if (alreadyFav) {
    favouriteItems = favouriteItems.filter(item => item.id !== id);
    totalproducts = totalproducts.map(item =>
      item.id === id ? { ...item, liked: false } : item
    );
  } else {
    let chosenItem = totalproducts.find(item => item.id === id);
    chosenItem.liked = true;
    favouriteItems.push(chosenItem); 
    favouriteItems = [
      ...new Map(favouriteItems.map(item => [item.id, item])).values()
    ];

    totalproducts = totalproducts.map(item =>
      item.id === chosenItem.id ? { ...item, liked: true } : item
    );
  }
  localStorage.setItem("favouriteProducts", JSON.stringify(favouriteItems));
  localStorage.setItem("totalproducts", JSON.stringify(totalproducts));

 totalproducts = totalproducts.map(item => ({
  ...item,
  liked: favouriteItems.some(fav => fav.id === item.id)
}));

drawproductsui(totalproducts);
if (favouriteItems.length === 0) {
        favItems.style.display = "none";
    } 
else {
        favItems.style.display = "block";
    }
}


let sizefilter = document.querySelector("#sizefilter")
sizefilter.addEventListener("change",filtertarget)
function filtertarget(e){
 let val = e.target.value;
 let productsall = totalproducts;
//  JSON.parse(localStorage.getItem("totalproducts"))
 if(val === "all")
 {
  drawproductsui(productsall)
 }
 else{
  productsall = productsall.filter(i => i.size === val)
  drawproductsui(productsall)
 }
}

function editproduct(id)
{
  
  localStorage.setItem("edit-product-id", id)
  window.location = "editproduct.html";
}
document.addEventListener("DOMContentLoaded", () => {

    let profilename = document.querySelector("#profilename");
    if (profilename && UserData && UserData.Name) {
        profilename.textContent = UserData.Name;
    } else {
        console.log("profilename أو UserData.Name غير موجود");
    }

});
