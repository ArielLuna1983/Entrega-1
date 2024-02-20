import express from 'express';
const router = express.Router();
import ProductManager from '../controllers/ProductManager.js'

router.use(express.json());
router.use(express.urlencoded({ extended:true }));

const pm = new ProductManager();

//Rutas GET
//Ruta para obtener todos los productos con un límite opcional.
router.get('/', async (req, res) => {
    try{
        let { limit } = req.query;
        let products = await pm.getProducts();
        if (limit) {
            let prodLimit = products.slice(0, parseInt(limit));
            res.send(prodLimit);
        }else {
            res.send(products);
        }
    }catch (error) {
        res.status(418).send({error, message:"no funca"});
    }
});

//Ruta para obtener un producto especifico por su id
router.get('/:pid', async (req, res) => {
    try{
        let { pid } = req.params.pid;
        const product = await pm.getProductById(Number(pid));
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({status: "error", message: "No se encuentra el ID"});
        };
    } catch (error) {
        res.status(418).send({error, message:"no funca"})
    }
});

// Ruta POST para agregar un nuevo producto
router.post('/', async (req, res) => {
    const { title, description, price, code, stock, thumbnail } = req.body;
    try {
        await pm.addProduct(title, description, price, code, stock, thumbnail);
        res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

// Ruta PUT para actualizar un producto existente
router.put('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const { title, description, price, code, stock, thumbnail } = req.body;
    try {
        await pm.updateProduct(productId, {
            title,
            description,
            price,
            code,
            stock,
            thumbnail
        });
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Ruta DELETE para eliminar un producto existente
router.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
// Elimina el producto utilizando el método deleteId() de ProductManager
        await pm.deleteId(productId);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;