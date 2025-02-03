const fs = require('fs');

const readJSONFile = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeJSONFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

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

    deleteCart(id) {
        let carts = this.getAllCarts();
        carts = carts.filter(cart => cart.id !== id);
        writeJSONFile(this.filePath, carts);
    }
}

module.exports = CartManager;