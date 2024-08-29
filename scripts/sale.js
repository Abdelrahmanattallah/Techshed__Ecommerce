import { data, dataLength, dataKeys, datavalues,test } from "./app.js";

const saleHolder = document.getElementById("saleHolder");

(() => {
  let card = ``;
  datavalues.map((item) => {
    item.forEach((item) => {
      if (item.sale === true) {
        card += `
        <div class="card">
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
        false
      }
    });
    saleHolder.innerHTML = card;
  });
})();
test();



