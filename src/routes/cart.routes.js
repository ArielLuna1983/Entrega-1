import express from 'express';
const router = express.Router();
import CartManager from '../controllers/CartManager.js';
import ProductManager from '../controllers/ProductManager.js';

router.use(express.json());
router.use(express.urlencoded({ extended:true }));

const cm = new CartManager();
const pm = new ProductManager();

// Ruta GET para obtener el contenido del carrito
router.get('/:cid', async (req, res) => {
    try {
        let { cid } = req.params;
        let contenido = await cm.readCart(cid);
        res.json(contenido)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el contenido del carrito', error: error.message});
    }
});

// Ruta POST para agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        let { cid, pid } = req.params;
        let quantity = req.body.quantity || 1;
        const product = await pm.getProductById(pid);
        if (!product) {
            return res.status(404).json({ message: 'producto no encontrado' });
        }
        let newCartId = await cm.addCart(product, quantity, cid);
        res.json({message: 'Producto agregado al carrito', newCartId });
    } catch (error) {
        res.status(500).json({ mesage: 'error al agregar el producto al carrito', error: error.message });
    }
});

export default router;