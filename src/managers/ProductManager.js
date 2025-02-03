const fs = require('fs');

const readJSONFile = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeJSONFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    getAllProducts() {
        return readJSONFile(this.filePath);
    }

    getProductById(id) {
        const products = this.getAllProducts();
        return products.find(product => product.id === id);
    }

    validateProduct(product) {
        const { title, description, price, status, stock, thumbnails } = product;
        if (typeof title !== 'string' || typeof description !== 'string' || typeof price !== 'number' || typeof status !== 'boolean' || typeof stock !== 'number' || !Array.isArray(thumbnails) || !thumbnails.every(thumbnail => typeof thumbnail === 'string')) {
            throw new Error('Producto invalido');
        }
    }

    addProduct(product) {
        this.validateProduct(product);
        const products = this.getAllProducts();
        product.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        writeJSONFile(this.filePath, products);
        return product;
    }

    updateProduct(id, updatedProduct) {
        this.validateProduct(updatedProduct);
        const products = this.getAllProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct, id };
            writeJSONFile(this.filePath, products);
            return products[index];
        }
        return null;
    }

    deleteProduct(id) {
        let products = this.getAllProducts();
        products = products.filter(product => product.id !== id);
        writeJSONFile(this.filePath, products);
    }
}

module.exports = ProductManager;