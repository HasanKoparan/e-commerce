const fetchProducts = async () => {
  try {
    // Api´a istek at
    const response = await fetch("./db.json");

    //  Api´dan gelen veriyi js nesnesine cevir
    const data = await response.json();
    //  Products verisini return et
    return data.products;
  } catch (error) {
    console.log(`Hataaa: ${error}`);

    // Hata varsa consola cikti ver ve geriye bos bir dizi dönder
    return [];
  }
};

export default fetchProducts;
