import {
  data,
  dataLength,
  dataKeys,
  datavalues,
  test,
  megaFilter,
} from "./app.js";
const homeCinemaHolder = document.getElementById("homeCinemaHolder");

(() => {
  let card = ``;
  data.HomeCinema.map((item) => {
    if (item.sale === true) {
      card += ` 
      <div class="card" item-filter="sale">
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
      card += ` 
      <div class="card" item-filter="best seller">
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
  homeCinemaHolder.innerHTML = card;
})();
// exported main function
test();
// exported filter function
megaFilter();