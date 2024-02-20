import { promises as fs, readFile } from 'fs';

export default class CartManager{
    constructor () {
        this.cart = '../data/carrito.json';
        this.contadorId = 0;
    }

//Lee el carro y lo crea si no existe
    async readCart() {
        try {
            let carrito = await fs.readFile(this.cart, 'utf-8');
            return JSON.parse(carrito);
        }catch (error) {
                throw new Error('Error el crear el archivo del carrito')
            }
    };

// Agrega los productos
async addCart(product, quantity = 1, cid) {
    try {
        let carrito = await this.readCart();
        let cid = this.contadorId++;
        carrito.push({
            id: cid,
            product,
            quantity
        });
        await fs.writeFile(this.cart, JSON.stringify(carrito, null, 2));
        return cid;
    } catch (error) {
        throw new Error('Error al agregar el producto al carrito');
    }
};

//Busca por ID
async getCartById(cid) {
    try {
        const cartList = await this.readCart();
        return cartList.find(cart => cart.id === cid);
    } catch (error) {
        throw new Error('Error al obtener el carrito por su ID: ' + error.message);
    }
};

};
