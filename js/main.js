import fetchProducts from "./api.js";
import { addToCart } from "./cart.js";
import {
  calculateCartTotal,
  getFromLocalStorage,
  renderCartTotal,
  upDateCartIcon,
} from "./helper.js";
import { renderCartItems, renderProducts, uiElements } from "./ui.js";

uiElements.menuIcon.addEventListener("click", () => {
  //  uiElements icerisindeki nav elemanina "open" classini ekle-cikar
  uiElements.nav.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
  // localStorage´dan sepetteki ürünleri al
  const cart = getFromLocalStorage("cart");

  // Hangi sayfadayiz?
  if (window.location.pathname.includes("cart.html")) {
    renderCartItems(cart);

    renderCartTotal(cart);
  } else {
    fetchProducts().then((products) => {
      renderProducts(products, (e) => {
        addToCart(e, products);
      });
    });
  }

  // Sepet ikonunu güncelle
  upDateCartIcon(cart);
});
