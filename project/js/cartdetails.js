let products = JSON.parse(localStorage.getItem("totalproducts"));
let productid = localStorage.getItem("productid");
let productDetailsItem = products.find((item) => item.id == productid)

let itemdom = document.querySelector(".item-details")
itemdom.innerHTML = `<img src="${productDetailsItem.imgurl}" alt=""/>
                <h2>${productDetailsItem.title}</h2>
                <span>${productDetailsItem.size}</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat tempore, debitis, 
                velit voluptates, illo laudantium suscipit quibusdam accusamus expedita 
                illum maiores porro hic mollitia aperiam earum
                 repellendus delectus! Modi, doloremque.</p>`;
