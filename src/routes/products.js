const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const productsFilePath = './src/JSON/products.json';
const productManager = new ProductManager(productsFilePath);

router.get('/', (req, res) => {
    res.json(productManager.getAllProducts());
});

router.get('/:pid', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.post('/', (req, res) => {
    try {
        const newProduct = productManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/:pid', (req, res) => {
    try {
        const updatedProduct = productManager.updateProduct(parseInt(req.params.pid), req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:pid', (req, res) => {
    productManager.deleteProduct(parseInt(req.params.pid));
    res.status(204).send();
});

module.exports = router;