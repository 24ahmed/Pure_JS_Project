
let productDom = document.querySelector(".products");
let noproduct = document.querySelector(".noproducts")

function drawcartproduct(allproducts = []) {
    if(JSON.parse( localStorage.getItem("products")).length === 0)
    {
        noproduct.style.display= "block";
    }
    let products = JSON.parse( localStorage.getItem("products")) || allproducts;
    let productsui = products.map((item) => {
    return `<div class="product-item">
                    <img class="product-item-img" src="${item.imgurl}" alt="head">
                    <div class="product-item-desc">
                        <h2><a href= "cartDetails.html">${item.title}</a></h2>
                                        
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. dolor et tempore.</p>
                        <span>size: ${item.size}</span>
                    </div>
                    <div class="product-item-actions">
                        <button class="add-to-cart" onclick= "removefromcart(${item.id})">remove</button>
                        <span>quantity: ${item.qty}</span>
                    </div>
                </div>`;
  });
  productDom.innerHTML = productsui.join("");
}

drawcartproduct();

function removefromcart(id){
     let productsincart = localStorage.getItem("products");
    
    if(productsincart)
    {
        let items = JSON.parse(productsincart);
        let filtereditems = items.filter((item) => item.id !== id);
        localStorage.setItem("products", JSON.stringify(filtereditems));
        drawcartproduct(filtereditems)
   
    }
    //  console.log(productsincart)

 }