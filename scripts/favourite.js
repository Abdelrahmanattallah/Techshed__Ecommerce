let favItemsHolder = document.querySelector(".favItems__holder");
let emptyFav = document.querySelector(".empty__fav");


let favItemArr;
if (localStorage.getItem("favItems") !== null) {
  favItemArr = JSON.parse(localStorage.getItem("favItems"));
  favItemsDraw()
  favItemsCheck()
} else {
  favItemArr = [];
}

// draw fav items function

function favItemsDraw() { 
  let favItemHolder = ``;
  for (let i = 0 ; i < favItemArr.length ; i++) { 
    if (favItemArr[i].sale == "true") {
      favItemHolder += ` 
      <div item-id="${favItemArr[i].id}" class="fav__item">
      <div class="img__holder">
      <img src="${favItemArr[i].image}" alt="">
      </div>
      <p>${favItemArr[i].title}</p>
      <div class="pricing__info">
      <span>On Sale</span>
      <span>$${favItemArr[i].newPrice}.00EGP</span>
      </div>
      <button class="deleteFavItem"><i class="fa-solid fa-xmark"></i></button>
    </div>
      `
    } else {
      favItemHolder += ` 
      <div item-id="${favItemArr[i].id}" class="fav__item">
      <div class="img__holder">
      <img src="${favItemArr[i].image}" alt="">
      </div>
      <p>${favItemArr[i].title}</p>
      <div class="pricing__info">
      <span>$${favItemArr[i].newPrice}.00EGP</span>
      </div>
      <button class="deleteFavItem"><i class="fa-solid fa-xmark"></i></button>
    </div>
      `
    }
  }
  favItemsHolder.innerHTML = favItemHolder
  favItemsCheck()
  favItemsDeleteBtns()
}
favItemsDraw()
// fav items check function

function favItemsCheck() { 
  if (favItemArr.length == 0) { 
    favItemsHolder.innerHTML = ` 
    <div class="empty__fav active">
    <h4>Your Wishlist is empty</h4>
    <a href="index.html">Continue Shopping</a>
    </div>
    `
  }
}


// create delete fav item btns
function favItemsDeleteBtns() { 
  let favDeleteBtn = Array.from(document.querySelectorAll(".deleteFavItem"));
  favDeleteBtn.forEach((btn) => { 
    btn.addEventListener("click", () => { 
      deleteFavAction(btn)
      favItemsDraw()
    })
  })
}
// delete fav item action function

function deleteFavAction(btn) { 
  let favItemId = parseInt(btn.parentElement.getAttribute("item-id"));
  favItemArr = favItemArr.filter(function (element) {
    return element.id != favItemId;
  });
  localStorage.setItem("favItems", JSON.stringify(favItemArr));
}