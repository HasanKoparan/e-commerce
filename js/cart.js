import {
  getFromLocalStorage,
  renderCartTotal,
  saveToLocaleStorage,
  upDateCartIcon,
} from "./helper.js";
import { renderCartItems } from "./ui.js";

// localeStorage´dan cart elemanlarini al
let cart = getFromLocalStorage("cart");

// Sepete ürün ekleyen fonksiyon
const addToCart = (e, products) => {
  // Tiklanilan elemana ait id´ye eris
  const productId = Number(e.target.dataset.id);

  //  Id´si bilinen elemani products icerisinde bul
  const product = products.find((product) => product.id === productId);

  // Sepete eklenecek eleman öncesinde eklendi mi?
  const exitingItem = cart.find((item) => item.id === productId);

  // Eger ürün sepete eklendiyse
  if (exitingItem) {
    // Ûrün miktarini güncelle
    exitingItem.quantity++;
  } else {
    // Ûrünü sepete ekle
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    // Sepet dizisine ürün ekle
    cart.push(cartItem);
  }
  //  Sepet güncelle
  saveToLocaleStorage("cart", cart);

  // Add To Card butonunun icerigini güncelle
  e.target.textContent = "Added";

  // 2 saniye sonra Add To Cart butonunun icerigini eski haline cevir
  setTimeout(() => {
    e.target.textContent = "Add to cart";
  }, 2000);

  // Sepet ikonunu güncelle
  upDateCartIcon(cart);
};

// Sepetten Ûrün kaldiran fonksiyon
const removeFromCart = (e) => {
  // Kullanicidan silme islemi icin onay al
  const response = confirm(
    "Are you sure you want to remove this item from your cart?",
  );
  // Eger kullanici silme islemini onayladiysa
  if (response) {
    // Tiklaninlan ürünün id´sine eris
    const productId = parseInt(e.target.dataset.id);

    // Sepetten tiklanan elemani kaldir

    // Sepetteki ürünlerden id´si pruductId ile eslesmeyenleri yeni diziye aktar
    cart = cart.filter((item) => item.id != productId);

    // localStorage´i güncelle
    saveToLocaleStorage("cart", cart);

    // Arayüzü renderla
    renderCartItems(cart);

    // Sepet ikonunu güncelle
    upDateCartIcon(cart);

    // Toplam fiyati renderla
    renderCartTotal(cart);
  }
};

// Sepetteki ürün miktarini güncelleyen fonksiyon
const onQuantityChange = (e) => {
  // Güncellenecek elemanin id´sine eris
  const productId = +e.target.dataset.id;

  // Yeni ürün miktarina eris
  const newQuantity = e.target.value;

  // Yeni miktar 0´dan büyükse
  if (newQuantity > 0) {
    // Güncellenecek elemani dizi icerisinde bul
    const updateItem = cart.find((item) => item.id === productId);
    // Ûrün miktarini güncelle
    updateItem.quantity = newQuantity;

    // localStorage´i güncelle
    saveToLocaleStorage("cart", cart);
  } else {
    removeFromCart(e);
  }

  // Sepet ikonunu güncelle
  upDateCartIcon(cart);

  // Toplam fiyati renderla
  renderCartTotal(cart);
};

export { addToCart, removeFromCart, onQuantityChange };
