const fs = require("fs").promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllProducts() {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getAllProducts();
      const product = products.find((p) => p.id === productId);
      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductManager;
