const toggle = document.querySelector(".toggle");
const closeBtn = document.querySelector(".close");
const menu = document.querySelector(".links");
const mainImg = document.querySelector(".selected-img");
let thumbnails = document.querySelectorAll(".imgs-menu .img-box");
let nextBtn = document.querySelector(".right-icon");
let prevBtn = document.querySelector(".left-icon");
const overlayCloseBtn = document.querySelector(".close-overlay");
let overlay = document.querySelector(".overlay");

let cartIcon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart-container");

let counter = document.querySelector(".count");
let minusIcon = document.querySelector(".minus-icon");
let plusIcon = document.querySelector(".plus-icon");

let addBtn = document.querySelector(".btn");

let data = [];
let currentIndex = 1;

nextBtn.onclick = () => {
  if (currentIndex == 4) return;
  currentIndex++;
  mainImg.src = `./images/image-product-${currentIndex}.jpg`;
};

prevBtn.onclick = () => {
  if (currentIndex == 1) return;
  currentIndex--;
  mainImg.src = `./images/image-product-${currentIndex}.jpg`;
};

toggle.addEventListener("click", () => {
  menu.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  menu.classList.remove("show");
});

cartIcon.onclick = () => {
  cart.classList.toggle("show");
};

thumbnails.forEach((pic) => {
  pic.addEventListener("click", (e) => {
    mainImg.src = e.currentTarget.children[0].src.replace("-thumbnail", "");
    thumbnails.forEach((pic) => {
      pic.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});

let modal = document.querySelector(".product-preview").cloneNode(true);
overlay.appendChild(modal);

let overlayImg = overlay.querySelector(".selected-img");
let thumbnailsMdl = overlay.querySelectorAll(".imgs-menu .img-box");

thumbnailsMdl.forEach((pic) => {
  pic.addEventListener("click", (e) => {
    overlayImg.src = e.currentTarget.children[0].src.replace("-thumbnail", "");
    thumbnailsMdl.forEach((pic) => {
      pic.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});

mainImg.onclick = () => {
  overlay.classList.add("show");
};

overlayCloseBtn.addEventListener("click", () => {
  overlay.classList.remove("show");
});

plusIcon.onclick = () => {
  counter.textContent++;
};
minusIcon.onclick = () => {
  if (counter.textContent == 0) return;

  counter.textContent--;
};

if (data.length <= 0) {
  document.querySelector(
    ".orders-list"
  ).innerHTML = `<p>Your cart is empty</p>`;
  document.querySelector(".cart button").style.display = "none";
} else {
}

addBtn.onclick = () => {
  addProdItem();
  let deleteItem = document.querySelector(".delete-btn");
  deleteItem.addEventListener("click", (e) => {
    console.log(e.target.parentNode.remove());
  });
  console.log(data);
};

function addProdItem() {
  document.querySelector(".cart button").style.display = "block";
  data.push(
    `
    <div class="prod-box">
      <img src="${mainImg.src}" alt="" />
        <div class="info">
        <div class="prod-name">Fall Limited Edition Sneakers</div>
        <div class="info">
          <div class="countity">
          $${document
            .querySelector(".new-price")
            .textContent.replace("$", "")} x ${+counter.textContent}<span>$${
      document.querySelector(".new-price").textContent.replace("$", "") *
      +counter.textContent
    }.00</span>
          </div>
        </div>
      </div>
      <i class="fa-solid fa-trash-can delete-btn"></i>
    </div>
    
    `
  );
  let unique = [...new Set(data)];
  document.querySelector(".orders-list").innerHTML = unique.join("");
}
