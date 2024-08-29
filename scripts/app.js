/* ******************************************* start events on header part two ********************************************/
const userNotLogged = document.querySelector(".user__not__logged");
const userLogIn = document.querySelector(".user__log__in");
const userAccountName = document.querySelector(".user__account");
const logOut = document.querySelector(".log__out");
// in case the user already creat an account and login
if (localStorage.getItem("client")) {
  userNotLogged.classList.remove("active");
  userLogIn.classList.add("active");
  userAccountName.innerHTML = JSON.parse(localStorage.getItem("client")).cName;
}
// in case the user dosent creat an account yet
else {
  userNotLogged.classList.add("active");
  userLogIn.classList.remove("active");
}
/* ******************************************* end events on header part two ********************************************/

/******************************************** start small cart show icon ********************************************/
let small__cart = document.querySelector(".small__cart");
let body__overlay = document.querySelector(".body__overlay");
const shop__cart = document.querySelector(".shop__cart");
const closeSmallCart = document.getElementById("closeSmallCart");
const small__cart__body = document.querySelector(".small__cart__body");
const smallCartTotal = document.getElementById("smallCartTotal");
const shopCount = document.getElementById("shopCount");
shop__cart.addEventListener("click", smallCartActions);
closeSmallCart.addEventListener("click", smallCartActions);

export function smallCartActions() {
  small__cart.classList.toggle("active");
  body__overlay.classList.toggle("active");
}

/******************************************** end small cart show icon ********************************************/

// ******************************************* small cart drawing *******************************************//
export function drawSmallCart(addProduct = cardsArr) {
  let smallCartArray = cardsArr;
  let card = ``;
  // drawing the small card
  for (let i = 0; i < smallCartArray.length; i++) {
    card += ` 
    <div class="cart__item" item-id="${smallCartArray[i].id}">
    <div class="cart__item__img">
      <img src="${smallCartArray[i].image}" alt="">
    </div>
    <div class="cart__item__det">
      <p>${smallCartArray[i].title}</p>
      <span class="item__price">$${
        smallCartArray[i].newPrice * smallCartArray[i].pCount
      }.00EGP</span>
      </div>
      <button  class="remove__item"><i class="fa-solid fa-xmark"></i></button>
      <span class="item__quantity">${smallCartArray[i].pCount}</span>
    </div> `;
  }
  //
  small__cart__body.innerHTML = card;
  shopCount.innerHTML = smallCartArray.length;
  getSmallCartTotal(smallCartArray);
  // total price function
  createRemoveBtns();
}
/******************************************** end small cart show icon********************************************/

/******************************************** start small cart total********************************************/
function getSmallCartTotal(smallCartArray) {
  let priceHolder = 0;
  for (let i = 0; i < smallCartArray.length; i++) {
    priceHolder += smallCartArray[i].pCount * smallCartArray[i].newPrice;
  }
  smallCartTotal.innerHTML = `$${priceHolder}.00EGP`;
}
/******************************************** end small cart total********************************************/

// ******************************************* cards array conditions *******************************************
let favArr;
if (localStorage.getItem("favItems") !== null) {
  favArr = JSON.parse(localStorage.getItem("favItems"));
} else {
  favArr = [];
}
// add to cart array
let cardsArr;
if (localStorage.getItem("addCart") !== null) {
  cardsArr = JSON.parse(localStorage.getItem("addCart"));
  drawSmallCart();
} else {
  cardsArr = [];
}
// ******************************************* cards array conditions *******************************************


// this var responsilbe about any item count (key) inside his object belongs to test() function
let itemsIndex = 1;
// this var responsilbe about any item count (key) inside his object belongs to test() function

function createRemoveBtns() {
  let removeBtns = Array.from(document.querySelectorAll(".remove__item"));
  removeBtns.map(function (btn) {
    btn.addEventListener("click", function () {
      deleteItem(btn);
      drawSmallCart();
    });
  });
}

function deleteItem(btn) {
  let itemId = parseInt(btn.parentElement.getAttribute("item-id"));
  cardsArr.find((item) => {
    item.id == itemId ? (item.pCount = 1) : console.log("not match");
  });
  cardsArr = cardsArr.filter(function (element) {
    return element.id != itemId;
  });
  localStorage.setItem("addCart", JSON.stringify(cardsArr));
  getSmallCartTotal(cardsArr);
}
//******************************************* in case the user want to log out *******************************************
logOut.addEventListener("click", removeAccount);
function removeAccount() {
  Swal.fire({
    title: "Do you want to log out ?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes im sure",
    denyButtonText: `No keep me in`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.removeItem("client");
      userNotLogged.classList.add("active");
      userLogIn.classList.remove("active");
    } else if (result.isDenied) {
      false;
    }
  });
}
/******************************************** end incase the user want to logout ********************************************/

/********************************************  start handling the navbar menu ********************************************/
const openMenuBtn = document.querySelector(".nav__menu");
const navMenuLinks = document.querySelector(".nav__menu__links");
const closeMenuBtn = document.querySelector(".close__menu");
// opening the navbarmenu
openMenuBtn.addEventListener("click", function () {
  navMenuLinks.classList.toggle("active");
  navMenuLinks.classList.add("fixed");
});
// closing the navbarmenu
closeMenuBtn.addEventListener("click", function () {
  navMenuLinks.classList.toggle("active");
  navMenuLinks.classList.remove("fixed");
});
/********************************************  end handling the navbar menu ********************************************/

/******************************************** start handling the to top button ********************************************/
const toTopBtn = document.querySelector(".to__top");

window.addEventListener("scroll", windowScrolling);
function windowScrolling() {
  if (window.scrollY >= 600) {
    toTopBtn.classList.add("active");
  } else if (window.scrollY < 400) {
    toTopBtn.classList.remove("active");
  }
  toTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
/******************************************** end handling the to top button ********************************************/

/******************************************** start handling the header fixed postion ********************************************/
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (this.scrollY) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});
/********************************************end handling the header fixed postion ********************************************/

/******************************************** start search engine ************************************************************/
const searchInp = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const itemsMenu = document.querySelector(".items__menu");
let searchInpValue;
searchInp.addEventListener("keyup", () => {
  itemsMenu.classList.add("active");
});
searchInp.addEventListener("blur", () => {
  itemsMenu.classList.remove("active");
  // searchInp.value = "";
});
itemsMenu.addEventListener("mouseleave", () => {
  itemsMenu.classList.remove("active");
  searchInp.blur();
  searchInp.value = "";
});
searchBtn.addEventListener("click", function (e) {
  if (searchInp.value == "") {
    e.stopPropagation();
    e.preventDefault();
  } else {
    itemsMenu.classList.remove("active");
    searchInpValue = searchInp.value;
    searchInp.value = "";
    setTimeout(() => {
      window.location.href = `${searchInpValue}.html`;
    }, 2000);
  }
});
// start items menu function
function itemsMenuDrawing() {
  let itemHolder = ``;
  let itemsMenuArr = JSON.parse(localStorage.getItem("myData"));
  Object.values(itemsMenuArr).forEach((arr) => {
    arr.map((item) => {
      itemHolder += ` 
      <a href="${item.category}.html">
        <img src="${item.image}" alt="">
        <p>${item.title}</p>
      </a>
      `;
    });
  });
  itemsMenu.innerHTML = itemHolder;
}
/******************************************** end search engine ********************************************/

/******************************************** start fetching data ********************************************/
async function dataFetching() {
  const stepOne = await fetch("data.json");
  const stepTwo = await stepOne.json();
  localStorage.setItem("myData", JSON.stringify(stepTwo));
  itemsMenuDrawing();
}
dataFetching();
export const data = JSON.parse(localStorage.getItem("myData"));
export const dataLength = Object.keys(data).length;
export const dataKeys = Object.keys(data);
export const datavalues = Object.values(data);
/******************************************** end fetching data ********************************************/
export function test() {
  let cards = Array.from(document.querySelectorAll(".card"));
  cards.map((card) => {
    // start creating variables
    let singleItem = card;
    let itemAdd = singleItem.querySelector(".add");
    let itemFav = singleItem.querySelector(".fav");
    let itemView = singleItem.querySelector(".view");
    // creating an object belongs to the item
    let itemObj = {
      id: singleItem.querySelector(".un__used span:nth-of-type(1)").textContent,
      image: singleItem.querySelector("img").src,
      title: singleItem.querySelector("p").textContent,
      sale: singleItem.querySelector(".un__used span:nth-of-type(2)")
        .textContent,
      newPrice: Number(
        singleItem
          .querySelector(".new__price")
          .textContent.split(" ")
          .splice(0, 1)
          .join("")
          .slice(1)
      ),
      category: singleItem.querySelector(".un__used span:nth-of-type(3)")
        .textContent,
      pCount: itemsIndex,
    };
    // start action on view item
    itemView.addEventListener("click", function () {
      if (localStorage.getItem("addCart") != null) {
        let detailsCheck = JSON.parse(localStorage.getItem("addCart"));
        detailsCheck.find((item) => {
          item.id == itemObj.id? localStorage.setItem("viewProduct", JSON.stringify(item)): localStorage.setItem("viewProduct", JSON.stringify(itemObj));});
        } else {
        localStorage.setItem("viewProduct", JSON.stringify(itemObj));
      }
      setTimeout(() => {
        window.location.href = "productdetails.html";
      }, 1000);
    });
    // start fav item actions
    itemFav.addEventListener("click", () => {
      itemFav.classList.toggle("clicked");
      favItems(itemObj);
    });
    // start add cart function
    itemAdd.addEventListener("click", () => {
      addItem(itemObj);
      drawSmallCart();
    });
  });
}
// ******************************************* end export function responsible to adding *******************************************

function addItem(itemObj) {
  const checkItem = cardsArr.find((item) => itemObj.id == item.id);
  if (checkItem) {
    itemObj.pCount += 1;
  } else {
    cardsArr.push(itemObj);
  }
  localStorage.setItem("addCart", JSON.stringify(cardsArr));
  createRemoveBtns();
  smallCartActions();
}

// fav item function

function favItems(itemObj) {
  const checkFavItem = favArr.find((item) => itemObj.id == item.id);
  if (checkFavItem) {
    favArr = favArr.filter(function (element) {
      return element.id != itemObj.id;
    });
  } else {
    favArr.push(itemObj);
  }
  localStorage.setItem("favItems", JSON.stringify(favArr));
}


/* ********************** start filteration items function ****************** */
export function megaFilter() { 
  let switcherTabs = Array.from(document.querySelectorAll(".filter__holder .filter__choose"));
  
  // looping throw the tabs
  switcherTabs.forEach((tab) => { 
    tab.addEventListener("click", () => { 
      removeActive()
      tab.classList.add("active");
      let choosedtab = tab.innerHTML;
      loopinginsidecards(choosedtab)
    })
  })
  // remove active class from the other tabs
  function removeActive() { 
    switcherTabs.forEach((tab)=>{ 
      tab.classList.remove("active");
    })
  }
  // holding all cards inside html in array
  let cardsPage = Array.from(document.querySelectorAll(".card"));
  
  // making actions on the cards and the action of each tab
  function loopinginsidecards(tab) { 
    if (tab == "All") { 
      cardsPage.forEach((item) => { 
        item.style.display = "block"
      })
    } else if (tab == "Sale") { 
      cardsPage.find((item) => { 
        item.getAttribute("item-filter") == "sale" ? item.style.display = "block" : item.style.display = "none"
      })
    } else if (tab == "Best Seller") { 
      cardsPage.find((item) => { 
        item.getAttribute("item-filter") == "best seller" ? item.style.display = "block" : item.style.display = "none"
      })
    }
  }
  }
/* ********************** end filteration items function ****************** */