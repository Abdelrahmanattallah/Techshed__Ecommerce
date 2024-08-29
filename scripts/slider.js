/* ************************************************start functionalty of slider*************************************************/
/* start making the home slider show */
const nextBtn = document.querySelector(".carousel__holder .next");
const prevBtn = document.querySelector(".carousel__holder .prev");
let sliderImg = document.querySelector(".slider__show");
let sliderImages = [
  "../images/banners/slider1.webp",
  "../images/banners/slider2.webp",
  "../images/banners/slider3.webp",
];
let sliderIndex = 0;
sliderImg.style.cssText = ` background-image: url(${sliderImages[sliderIndex]});`;
// function to make  slider
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);
function nextImage() {
  if (sliderIndex < sliderImages.length - 1) {
    sliderIndex++;
    sliderImg.style.cssText = ` background-image: url(${sliderImages[sliderIndex]});`;
  } else {
    sliderIndex = 0;
    sliderImg.style.cssText = ` background-image: url(${sliderImages[sliderIndex]});`;
  }
}
function prevImage() {
  if (sliderIndex > 0) {
    sliderIndex--;
    sliderImg.style.cssText = ` background-image: url(${sliderImages[sliderIndex]});`;
  } else {
    sliderIndex = sliderImages.length - 1;
    sliderImg.style.cssText = ` background-image: url(${sliderImages[sliderIndex]});`;
  }
}
function sliderShow() {
    sliderImg.style.cssText = `background-image: url(${sliderImages[sliderIndex]})`;
  if (sliderIndex < sliderImages.length - 1) {
    sliderIndex++;
  } else {
    sliderIndex = 0;
  }
setTimeout(sliderShow,3000)
}
window.onload = sliderShow()
/* end making the home slider show */

/* ************************************************end functionalty of slider*************************************************/



import { data, dataLength, dataKeys, datavalues, test} from "./app.js";
const mainPageBs = document.getElementById("mainPageBestSeller");
// best seller function on main page
(() => {
  let card = ``;
  datavalues.map((item) => {
    item.filter((item) => {
      if (item.sale === true) {
        card += ` 
      <div  class="card" special-data=${item.id}>
      <div class="un__used">
        <span>${item.id}</span>
        <span>${item.sale}</span>
        <span>${item.category}</span>
      </div>
      <div class="card__header">
      <img src="${item.image}" alt="">
      <span class="label">Sale</span>
      <div class="icons">
      <span class="add"><i class="fa-solid fa-cart-plus"></i></span>
      <span class="fav"><i class="fa-solid fa-heart"></i></span>
      <span class="view"><i class="fa-solid fa-eye"></i></span>
      </div>
      </div>
      <div class="card__footer">
      <p>${item.title}</p>
      <div class="prices">
      <span class="old__price">$${item.oldprice}.00 EGP</span>
      <span class="new__price">$${item.price}.00 EGP</span>
      </div>
      </div>
      </div>`;
      } else if (item.price < 300) {
        card += ` 
          <div class="card" special-data=${item.id}>
          <div class="un__used">
          <span>${item.id}</span>
          <span>${item.sale}</span>
          <span>${item.category}</span>
        </div>
          <div class="card__header">
          <img src="${item.image}" alt="">
          <div class="icons">
          <span class="add"><i class="fa-solid fa-cart-plus"></i></span>
          <span class="fav"><i class="fa-solid fa-heart"></i></span>
          <span class="view"><i class="fa-solid fa-eye"></i></span>
          </div>
          </div>
          <div class="card__footer">
          <p>${item.title}</p>
          <div class="prices">
          <span class="new__price">$${item.price}.00 EGP</span>
          </div>
          </div>
          </div>`;
      }
    });

    mainPageBs.innerHTML = card;
  });
})();

// on sale function on main page
const mainPageSale = document.getElementById("mainPageSale");
function onSale() {
  let card = ``;
  datavalues.map((item) => {
    item.filter((item) => {
      if (item.sale === true) {
        card += ` 
      <div class="card" special-data=${item.id}>
      <div class="un__used">
      <span>${item.id}</span>
      <span>${item.sale}</span>
      <span>${item.category}</span>
      </div>
      <div class="card__header">
      <img src="${item.image}" alt="">
      <span class="label">Sale</span>
      <div class="icons">
      <span class="add"><i class="fa-solid fa-cart-plus"></i></span>
      <span class="fav"><i class="fa-solid fa-heart"></i></span>
      <span class="view"><i class="fa-solid fa-eye"></i></span>
      </div>
      </div>
      <div class="card__footer">
      <p>${item.title}</p>
      <div class="prices">
      <span class="old__price">$${item.oldprice}.00 EGP</span>
      <span class="new__price">$${item.price}.00 EGP</span>
      </div>
      </div>
      </div>`;
      } else {
        false;
      }
      mainPageSale.innerHTML = card;
    });
  });
}
onSale();
// exported main function
test();


// showing less cards in home page


// best seller section
let bestSellercards = Array.from(document.querySelectorAll("#mainPageBestSeller .card"));
bestSellercards.forEach((item) => { 
  Number(item.getAttribute("special-data")) <= 6 ? false : item.style.display = "none"
});

// on sale section
let onSalecards = Array.from(document.querySelectorAll("#mainPageSale .card"));
onSalecards.forEach((item) => { 
  Number(item.getAttribute("special-data")) <= 11 ? false : item.style.display = "none"
});