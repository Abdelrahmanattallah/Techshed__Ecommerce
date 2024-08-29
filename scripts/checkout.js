import { drawSmallCart } from "./app.js";

const checkOutItems = document.querySelector(".check__out__items");
const emptyCart = document.querySelector(".empty__cart");
const checkOutPrices = document.querySelector(".check__out__prices");
// variables belongs to pricing
let subTotal = document.getElementById("subTotal");
let FinalTotal = document.getElementById("FinalTotal");
let promoDiscountDom = document.getElementById("promoDiscount");
let promoDiscHolder = document.querySelector(".promoDisc");
const taxField = document.getElementById("tax");
const shippingField = document.getElementById("shipping");
const checkOutBtn = document.getElementById("checkOutBtn");

let taxes = 0.12;
let delivary = 100;
let promoDiscount = 0.15;

// check out array define
let checkOutArr;
if (localStorage.getItem("addCart") !== null) {
  checkOutArr = JSON.parse(localStorage.getItem("addCart"));
  checkOutCheck()
  checkoutDrawing() 
} else {
  checkOutArr = []
}
// check out array define
/******************************************** start ui check function ****************************************************** */
function checkOutCheck() {
  if (checkOutArr.length != 0) {
    emptyCart.classList.remove("active");
    checkOutPrices.classList.add("active");
    checkOutItems.classList.remove("full");
  } else {
    checkOutPrices.classList.remove("active");
    localStorage.removeItem("discount");
    checkOutItems.classList.add("full");
    checkOutItems.innerHTML = ` 
  <h4>My cart</h4>
  <div class="empty__cart active">
  <h1>Your Cart Is Empty </h1>
  <a href="index.html">Continue Shopping</a>
  </div>
  `;
  }
}
/******************************************** end ui check function ****************************************************** */

/******************************************** start drawing function ****************************************************** */
function checkoutDrawing() {
  let card = ``;
  for (let i = 0; i < checkOutArr.length; i++) {
    if (checkOutArr[i].sale == "true") {
      card += ` 
      <div item-id="${checkOutArr[i].id}"  class="check__out__singItem">
      <div class="img__holder">
      <img src="${checkOutArr[i].image}" alt="">
      </div>
      <div class="price__desc">
      <p>${checkOutArr[i].title}</p>
      <span>OnSale</span>
      <span>$${checkOutArr[i].newPrice}.00EGP</span>
      </div>
      <div class="quantity">
      <button class="decrement"><i class="fa-solid fa-minus"></i></button>
      <span>${checkOutArr[i].pCount}</span>
      <button class="increment"><i class="fa-solid fa-plus"></i></button>
      </div>
      <span class="item__total">$${
        checkOutArr[i].newPrice * checkOutArr[i].pCount
      }.00EGP</span>
      <button class="removeItem"><i class="fa-solid fa-xmark"></i></button>
      </div>
      `;
    } else {
      card += ` 
      <div item-id="${checkOutArr[i].id}" class="check__out__singItem">
      <div class="img__holder">
      <img src="${checkOutArr[i].image}" alt="">
      </div>
      <div class="price__desc">
      <p>${checkOutArr[i].title}</p>
      <span>$${checkOutArr[i].newPrice}.00EGP</span>
      </div>
      <div class="quantity">
      <button  class="decrement"><i class="fa-solid fa-minus"></i></button>
      <span>${checkOutArr[i].pCount}</span>
      <button class="increment"><i class="fa-solid fa-plus"></i></button>
      </div>
      <span class="item__total">$${
        checkOutArr[i].newPrice * checkOutArr[i].pCount
      }.00EGP</span>
      <button class="removeItem"><i class="fa-solid fa-xmark"></i></button>
      </div>
      `;
    }
  }
  checkOutItems.innerHTML = `<h4>My Cart</h4>${card}`;
  checkOutCheck();
  checkOutGetTotal();
  createDeleteBtns();
  increamentBtns();
  decrementBtns();
}
checkoutDrawing();

/******************************************** end drawing function ****************************************************** */

/******************************************** start get total  function ****************************************************** */
function checkOutGetTotal() {
  let totalHolder = 0;
  for (let i = 0; i < checkOutArr.length; i++) {
    totalHolder += checkOutArr[i].newPrice * checkOutArr[i].pCount;
  }
  subTotal.innerHTML = `$${totalHolder}.00EGP`;
  taxField.innerHTML = `$${Math.round(taxes * totalHolder)}EGP(12%)`;
  shippingField.innerHTML = `$${delivary}.00EGP`;

  if (localStorage.getItem("discount")) {
    promoDiscHolder.classList.add("active");
    promoDiscountDom.innerText = `$${Math.round(promoDiscount * totalHolder)}EGP(15%)`
    FinalTotal.innerHTML = `$${Math.round((totalHolder + delivary ) + (totalHolder * taxes) - (totalHolder * promoDiscount))}EGP`;
  } else {
    FinalTotal.innerHTML = `$${Math.round(totalHolder + delivary + (totalHolder * taxes))}EGP`;
  }
}

/******************************************** end get total  function ****************************************************** */

/* ***********************start increament function zone *********************** */
function increamentBtns() {
  let increamentBtnsArr = Array.from(document.querySelectorAll(".increment"));
  increamentBtnsArr.map((btn) => {
    btn.addEventListener("click", () => {
      incrementCount(btn);
      checkOutGetTotal();
      checkoutDrawing();
      window.location.reload();
    });
  });
}

function incrementCount(btn) {
  let targetItemId = parseInt(
    btn.parentElement.parentElement.getAttribute("item-id")
  );
  checkOutArr.find((item) => {
    item.id == targetItemId ? (item.pCount += 1) : false;
  });
  localStorage.setItem("addCart", JSON.stringify(checkOutArr));
  drawSmallCart(checkOutArr);
}
/************************ end increament function zone ************************/

/* ***********************start decrement function zone *********************** */
function decrementBtns() {
  let increamentBtnsArr = Array.from(document.querySelectorAll(".decrement"));
  increamentBtnsArr.map((btn) => {
    btn.addEventListener("click", () => {
      decrementCount(btn);
      checkOutGetTotal();
      checkoutDrawing();
      window.location.reload();
    });
  });
}

function decrementCount(btn) {
  let targetItemId = parseInt(
    btn.parentElement.parentElement.getAttribute("item-id")
  );
  checkOutArr.find((item) => {
    item.id == targetItemId ? (item.pCount -= 1) : false;
  });
  localStorage.setItem("addCart", JSON.stringify(checkOutArr));
}
/* ***********************end decrement function zone *********************** */

/* ***********************start removeItem function zone *********************** */
function createDeleteBtns() {
  let removeBtnsArr = Array.from(document.querySelectorAll(".removeItem"));
  removeBtnsArr.forEach((btn) => {
    btn.addEventListener("click", () => {
      eraseItem(btn);
      checkoutDrawing();
      window.location.reload();
    });
  });
}

function eraseItem(btn) {
  let choosenItmId = parseInt(btn.parentElement.getAttribute("item-id"));
  checkOutArr = checkOutArr.filter(function (element) {
    return element.id != choosenItmId;
  });
  localStorage.setItem("addCart", JSON.stringify(checkOutArr));
  checkOutGetTotal();
}
/* ***********************end removeItem function zone *********************** */

/* ************************start promo code area *************************/
const promoLink = document.getElementById("promoLink");
const coponeCode = document.querySelector(".copone__code");
const promoInp = document.getElementById("promoInp");
const promoBtn = document.getElementById("promoBtn");
// addeventlistner area
promoLink.addEventListener("click", () =>
  coponeCode.classList.toggle("active")
);
promoBtn.addEventListener("click", (e) => {
  if (promoInp.value === "") {
    e.preventDefault();
    e.stopPropagation();
  } else if (promoInp.value === "eraasoft" || promoInp.value === "elzero") {
    let discount = promoInp.value;
    localStorage.setItem("discount", discount);
    checkOutGetTotal();
    promoInp.value = "";
  } else {
    promoInp.value = "";
  }
});
// addeventlistner area

/* ************************end promo code area *************************/



/* ************************start final checkout code area *************************/
const checkOutForm = document.querySelector(".check__out__form");
const closeCheckFormBtn = document.querySelector(".close__check");
const checkFirstInp = document.getElementById("first");
const checkSecondInp = document.getElementById("second");
const checkThirdInp = document.getElementById("third");
const checkFourInp = document.getElementById("four");
const checklaunchBtn= document.getElementById("launch");


closeCheckFormBtn.addEventListener("click",()=>checkOutForm.classList.remove("active") )



checkOutBtn.addEventListener("click", function () { 
  if (localStorage.getItem("client") == null) { 
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: `We apologize for this error,you have to sign up first , it wouldn't take more than 2 minutes`,
      footer: '<a class="btn__first__shape" href="signup.html">Create an Account</a>'
    })
  } else { 
    launchOrder()
  }
})
/* ************************end final checkout code area *************************/

function launchOrder() { 
  checkOutForm.classList.add("active")
  let clientObjCheck = JSON.parse(localStorage.getItem("client"));
  checkFirstInp.value = clientObjCheck.cName;
  checkSecondInp.value = clientObjCheck.cEmail;
  checklaunchBtn.addEventListener("click", () => { 
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: 'Your order has been launched',
      showConfirmButton: false,
      timer: 1500
    })
    checkOutForm.classList.remove("active")
  })
}