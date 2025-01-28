const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.json());

const productsFilePath = './src/JSON/products.json';
const cartsFilePath = './src/JSON/carts.json';

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

    addProduct(product) {
        const products = this.getAllProducts();
        product.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        writeJSONFile(this.filePath, products);
        return product;
    }

    updateProduct(id, updatedProduct) {
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

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    getAllCarts() {
        return readJSONFile(this.filePath);
    }

    getCartById(id) {
        const carts = this.getAllCarts();
        return carts.find(cart => cart.id === id);
    }

    addCart() {
        const carts = this.getAllCarts();
        const newCart = { id: carts.length ? carts[carts.length - 1].id + 1 : 1, products: [] };
        carts.push(newCart);
        writeJSONFile(this.filePath, carts);
        return newCart;
    }

    addProductToCart(cartId, productId) {
        const carts = this.getAllCarts();
        const cart = carts.find(cart => cart.id === cartId);
        if (cart) {
            const productIndex = cart.products.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ id: productId, quantity: 1 });
            }
            writeJSONFile(this.filePath, carts);
            return cart;
        }
        return null;
    }
}

const productManager = new ProductManager(productsFilePath);
const cartManager = new CartManager(cartsFilePath);

app.get('/api/products', (req, res) => {
    res.json(productManager.getAllProducts());
});

app.get('/api/products/:pid', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.post('/api/products', (req, res) => {
    const newProduct = productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

app.put('/api/products/:pid', (req, res) => {
    const updatedProduct = productManager.updateProduct(parseInt(req.params.pid), req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.delete('/api/products/:pid', (req, res) => {
    productManager.deleteProduct(parseInt(req.params.pid));
    res.status(204).send();
});

app.post('/api/carts', (req, res) => {
    const newCart = cartManager.addCart();
    res.status(201).json(newCart);
});

app.get('/api/carts/:cid', (req, res) => {
    const cart = cartManager.getCartById(parseInt(req.params.cid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
    const updatedCart = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    if (updatedCart) {
        res.json(updatedCart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor encendido en el puerto ${port} --- http://localhost:${port}`);
    console.log(`El servidor va a responder con GET -- POST -- PUT -- DELETE`);
    console.log(`Servidor listo para usarse.`);
});

