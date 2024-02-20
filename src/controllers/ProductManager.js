// Llamar al FS
import { promises as fs } from 'fs';

// Generar Clase
export default class ProductManager {
    constructor() {
      this.products = [];
      this.id = 1;
      this.path = "../data/products.json";
    }

// Agrega el producto
    addProduct = async (title, description, price, code, stock, thumbnail = "") => {
// Validar que todos los campos sean obligatorios
        const required = [title, description, price, thumbnail, code, stock];
            if (!required.every(field => field)) {
                console.log(" Todos los campos son obligatorios excepto thumbnail");
                return;
            }
// Validar que no se repita el campo "code"
            if (this.products.some(product => product.code === code)) {
                console.log("Ya existe un producto con el mismo código");
                return;
            }
  
// Agregar el producto con id 
        const newProduct = {
            id: this.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
        this.id++;
        console.log("Producto agregado correctamente:", newProduct);
//Guarda el archivo
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        }catch (error) {
            console.error("Error al guardar el archivo:", error);
            throw error;
        }        
    };

// Lee el Archivo
    getProducts = async () => {
        try{
            const items = await fs.readFile(this.path, "utf-8");
            console.log(items);
            return JSON.parse(items);
        }catch{
            console.error(error);
            throw error;
        }
    };

// Busca por ID
    getProductById = async (id) => {
        try{
            const products = await this.getProducts()
        const product = products.find(product => product.id === id);
        if (product) {
            return product;
        };
        }catch (error) {
            console.error(error);
            throw error;
        }
    };

//Actualiza el archivo
    updateProduct = async (productId, updatedFields) => {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex === -1) {
                return;
            }
            products[productIndex] = { ...products[productIndex], ...updatedFields };
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            throw error;
        }  
    };

// Elimina un producto por su ID
    deleteId = async (id) => {
        try {
            let found = false;
            const items = await this.getProducts();
            const deleteId = items.filter(i => {
            if (i.id === id) found = true;
                return (i.id != id);
            });
            if (found) {
                await fs.writeFile(this.path, JSON.stringify(deleteId, null, 2));
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw error;
        }
    };
};
