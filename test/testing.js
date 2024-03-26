// const ProductManager = require("./main");
import ProductManager from "../main.js";

const producto = new ProductManager();

// console.log(producto.addProduct('televisión','samsung',1200000,'img1','abc123',10));
// console.log(producto.addProduct('heladera','samsung',1365000,'img2','def123',5));
// console.log(producto.addProduct('heladera','samsung',1365000,'img2','ghi123',5));

console.log(producto.getProducts());
// console.log(producto.getProductById(1));

// console.log(producto.deleteProduct(3));

const productoActualizar = {
  id: 30,
  title: "heladera 1",
  description: "samsung 2",
  price: 136500,
  thumbnail: "img20",
};

console.log(producto.updateProduct(3, productoActualizar));
