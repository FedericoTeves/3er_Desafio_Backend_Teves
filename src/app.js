const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = process.env.PORT || 3000;

const productManager = new ProductManager("./productos.json");

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit); // Lee el valor del query param 'limit'
    const products = await productManager.getAllProducts();

    if (!isNaN(limit)) {
      res.json(products.slice(0, limit)); // Devuelve el número de productos solicitados
    } else {
      res.json(products); // Devuelve todos los productos si no se especifica un límite
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos." });
  }
});

app.get("/products/:pid", async (req, res) => {
  const productId = req.params.pid;

  try {
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto." });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
