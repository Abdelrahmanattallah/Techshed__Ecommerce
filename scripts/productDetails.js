import {
  drawSmallCart,
  data,
  dataLength,
  dataKeys,
  datavalues,
  test,
  smallCartActions
} from "./app.js";

const productDetailsHolder = document.getElementById("productDetailsHolder");

let viewItem = JSON.parse(localStorage.getItem("viewProduct"));

function proDetails() {
  let card;
  if (viewItem.sale === "true") {
    card = ` 
    <div class="pro__holder">
    <div class="pro__image">
      <img src="${viewItem.image}" alt="">
    </div>
    <div item-id="${viewItem.id}"  class="pro__details">
      <h2>${viewItem.title}</h2>
      <span>SKU: 0037</span>
      <div class="pricing">
        <span>On Sale</span>
        <span>$${viewItem.newPrice * viewItem.pCount}.00 EGP</span>
      </div>
      <div class="Quantity">
      <label for="itemNumber">Quantity</label>
      <div class="QuantityHolder">
      <button id="minusItem"><i class="fa-solid fa-minus"></i></button>
      <span id="itemQuantity">${viewItem.pCount}</span>
      <button id="plusItem"><i class="fa-solid fa-plus"></i></button>
      </div>
      </div>
      <button class="btn__first__shape" id="addItemBtn">Add to Cart</button>
      <div class="policy__attention">
        <div>
          <h3>Product Info</h3>
          <i class="fa-solid fa-angle-down"></i>
        </div>
        <p>I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.</p>
      </div>
      <div class="policy__attention">
        <div>
          <h3>Return & Refund Policy</h3>
          <i class="fa-solid fa-angle-down"></i>
        </div>
        <p>I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</p>
      </div>
      <div class="policy__attention">
        <div>
          <h3>Shipping Info</h3>
          <i class="fa-solid fa-angle-down"></i>
        </div>
        <p>I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.</p>
      </div>
    </div>
  </div>
    `;
  } else {
    card = ` 
    <div class="pro__holder">
    <div class="pro__image">
      <img src="${viewItem.image}" alt="">
    </div>
    <div item-id="${viewItem.id}" class="pro__details">
      <h2>${viewItem.title}</h2>
      <span>SKU: 0037</span>
      <div class="pricing">
        <span>$${viewItem.newPrice * viewItem.pCount}.00EGP</span>
      </div>
      <div class="Quantity">
      <label for="itemNumber">Quantity</label>
      <div class="QuantityHolder">
        <button id="minusItem"><i class="fa-solid fa-minus"></i></button>
        <span id="itemQuantity">${viewItem.pCount}</span>
        <button id="plusItem"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
      <button class="btn__first__shape" id="addItemBtn">Add to Cart</button>
      <div class="policy__attention">
        <div>
          <h3>Product Info</h3>
          <i class="fa-solid fa-angle-down"></i>
        </div>
        <p>I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.</p>
      </div>
      <div class="policy__attention">
        <div>
          <h3>Return & Refund Policy</h3>
          <i class="fa-solid fa-angle-down"></i>
        </div>
        <p>I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</p>
      </div>
      <div class="policy__attention">
        <div>
          <h3>Shipping Info</h3>
          <i class="fa-solid fa-angle-down"></i>
        </div>
        <p>I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.</p>
      </div>
    </div>
  </div>
    `;
  }
  productDetailsHolder.innerHTML = card;
  // calling area
  createMinusBtn();
  createPlusBtn();
  createAddBtn();
}
proDetails();

// minusItemBtn

function createMinusBtn() {
  let minusItemBtn = document.getElementById("minusItem");
  minusItemBtn.addEventListener("click", function () {
    viewItem.pCount -=1
    localStorage.setItem("viewProduct", JSON.stringify(viewItem));
    proDetails()
  });
}

// plusItem Btn function

function createPlusBtn() {
  let plusItemBtn = document.getElementById("plusItem");
  plusItemBtn.addEventListener("click", function () {
  viewItem.pCount+=1
    localStorage.setItem("viewProduct", JSON.stringify(viewItem));
    proDetails()
  });
}

// add item to cart

let proDetailsArr;
  if (localStorage.getItem("addCart") !== null) {
    proDetailsArr = JSON.parse(localStorage.getItem("addCart"));
  } else {
    proDetailsArr = [];
}


function createAddBtn() {
  let addItemBtn = document.getElementById("addItemBtn");
  addItemBtn.addEventListener("click", function () {
    addingItem(addItemBtn)
    proDetails()
    location.reload()
  });
}

function addingItem(btn) { 
  let itemId = parseInt(btn.parentElement.getAttribute("item-id"));
  console.log(itemId);
  if (localStorage.getItem("addCart") != null) {
    proDetailsArr.find((item) => { 
      return item.id == itemId ? (item.pCount+=1) :proDetailsArr.push(viewItem)
    })
  } else { 
    proDetailsArr.push(viewItem)
  }
  localStorage.setItem("addCart", JSON.stringify(proDetailsArr))
}