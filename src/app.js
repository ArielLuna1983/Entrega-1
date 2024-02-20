//obtener express
import express from 'express';

// Importa los archivos de rutas
import cartRoutes from './routes/cart.routes.js';
import productRoutes from './routes/products.routes.js';

//App y PORT
const app = express();
const PORT = 8080;

//Uso del JSON
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//Ruta de bienvenida, opcional!
app.get('/', async (req, res) => {
    try{
        res.send("Bienvenido a mi Proyecto")
    }catch (error) {
        res.status(418).send({error, message:"no funca"});
    }
});

//App USE
app.use("api/products", productRoutes);
app.use('api/carts', cartRoutes);

//Iniciar server
app.listen(PORT, () => {
    console.log(`Server funcionando en Puerto ${PORT}.`);
});
