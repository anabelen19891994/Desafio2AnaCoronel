import fs from "fs";

class ProductManager {
  #products;
  #path;
  static idProducto = 0;

  constructor() {
    this.#path = "./src/data/productos.json";
    this.#products = this.#leerProductosInFile();
  }

  #asignarIdProducto() {
    let id = 1;
    if (this.#products.length != 0)
      id = this.#products[this.#products.length - 1].id + 1;
    return id;
  }

  #leerProductosInFile() {
    try {
      if (fs.existsSync(this.#path))
        return JSON.parse(fs.readFileSync(this.#path, "utf-8"));

      return [];
    } catch (error) {
      console.log(
        `Se produjo un error al leer el archivo de productos, ${error}`
      );
    }
  }

  #guardarArchivo() {
    try {
      fs.writeFileSync(this.#path, JSON.stringify(this.#products));
    } catch (error) {
      console.log(
        `Se produjo un error al guardar el archivo de productos, ${error}`
      );
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return "Todos los parametros son requeridos [title, description, price, thumbnail, code, stock]";

    const codeRepetido = this.#products.some((p) => p.code == code);
    if (codeRepetido)
      return `El codigo ${code} está registrado en otro producto`;

    ProductManager.idProducto = ProductManager.idProducto + 1;
    const id = this.#asignarIdProducto();

    const nuevoProducto = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.#products.push(nuevoProducto);
    this.#guardarArchivo();

    return "El producto se agregó exitosamente";
  }

  getProducts(limit = 0) {
    limit = Number(limit);
    if (limit > 0) return this.#products.slice(0, limit);

    return this.#products;
  }

  getProductById(id) {
    const producto = this.#products.find((p) => p.id == id);
    if (producto) return producto;
    else return `Not found del producto con id ${id}`;
  }

  updateProduct(id, propiedadesProducto) {
    let msg = `El producto con id ${id} no existe`;

    const index = this.#products.findIndex((p) => p.id === id);

    if (index !== -1) {
      const { id, ...rest } = propiedadesProducto;
      this.#products[index] = { ...this.#products[index], ...rest };
      this.#guardarArchivo();
      msg = "Producto actualizado";
    }

    return msg;
  }

  deleteProduct(id) {
    let msg = `El producto con id ${id} no existe`;

    const index = this.#products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.#products = this.#products.filter((p) => p.id !== id);
      this.#guardarArchivo();
      msg = "El producto se eliminó";
    }

    return msg;
  }
}

export default ProductManager;
