import { uiElements } from "./ui.js";

// localStorage´a kayit yapacak fonksiyon
const saveToLocaleStorage = (key, cart) => {
  // Disaridan verilen key degeri ve  cart dizisi ile  locale ekle
  localStorage.setItem(key, JSON.stringify(cart));
};

// localStorage´dan elemanlari alacak fonksiyon
const getFromLocalStorage = (key) => {
  // localStorage´dan belirtilen key´e sahip elemanlari al ve js objesine cevirip return et
  const strData = localStorage.getItem(key);

  // Eger srtData varsa bunu js nesnesine cevirip return et ama yoksa [] bos bir dizi döndür return et yani.

  return strData ? JSON.parse(strData) : [];
};

// Sepetteki ürün miktarini hesaplayarak sepet ikonu yanindaki miktari güncelleyen fonksiyon
const upDateCartIcon = (cart) => {
  //  Reduce metodu ile dizideki elemanlari toplam miktarini hesapla
  const totalQuantity = cart.reduce(
    (total, item) => total + parseInt(item.quantity),
    0,
  );

  // Elde edilen ürün miktarini sepet ikonu kisminda yazdir
  uiElements.cartIcon.setAttribute("data-quantity", totalQuantity);
};

// Sepetteki toplam ürün fiyatini hesapla
const calculateCartTotal = (cart) =>
  cart.reduce((total, product) => total + product.price * product.quantity, 0);

// Toplam ürün fiyatini render eden fonksiyon
const renderCartTotal = (cart) => {
  // Toplam fiyata eris
  const totalPrice = calculateCartTotal(cart);

  const cargoFee = 50.0;

  // Sepetteki toplam ürünlerin fiyatini render et

  // totalPrice 100´den kücükse kargo üceri ekle degilse ekleme
  uiElements.cartTotal.textContent =
    totalPrice > 0 && totalPrice < 100
      ? (cargoFee + Number(totalPrice)).toFixed(2)
      : Number(totalPrice.toFixed(2));
};

export {
  saveToLocaleStorage,
  getFromLocalStorage,
  upDateCartIcon,
  calculateCartTotal,
  renderCartTotal,
};
