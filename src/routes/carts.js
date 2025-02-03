const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

const cartsFilePath = './src/JSON/carts.json';
const cartManager = new CartManager(cartsFilePath);

router.post('/', (req, res) => {
    const newCart = cartManager.addCart();
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const cart = cartManager.getCartById(parseInt(req.params.cid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const updatedCart = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    if (updatedCart) {
        res.json(updatedCart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.delete('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cartId);
    if (cart) {
        cartManager.deleteCart(cartId);
        res.status(204).send();
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

module.exports = router;