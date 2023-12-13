const fs = require('node:fs')

class ProductsManager {
    constructor(filePath = 'productos.json') {
        this.products = [];
        this.path = filePath;
        this.loadFromFile('productos.json');
    }

    // Método para mostrar la lista de productos
    getProducts() {
        return this.products;
    }

    // Método para agregar un producto al array
    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock)
            return `Todos los campos del artículo con nombre "${product.title}" deben contener datos`

        const newProduct = this.products.find(prod => prod.code === product.code);
        if (newProduct) {
            console.log(`El código del artículo con nombre "${product.title}" no puede estar repetido`);
            return "No es posible cargar más de un producto con el mismo código"
        }

        product.id = this.products.length + 1
        this.products.push(product);
        console.log(`Se agregó el artículo con nombre "${product.title}" al arreglo`)

        this.saveToFile()

        return `${product.title} agregado`

    }

    getProductById(pid) {
        const otroProducto = this.products.find(prod => prod.id === pid)
        if (!otroProducto)
            return `El articulo seleccionado con ID "${pid}" no existe`

        return otroProducto
    }

    updateProduct(pid, updatedFields) {
        const productIndex = this.products.findIndex(prod => prod.id === pid);
        if (productIndex === -1) {
            throw new Error(`El artículo con ID "${pid}" no existe`);
        }

        // Validar que al menos un campo sea proporcionado
        if (!Object.keys(updatedFields).length) {
            throw new Error(`Debe proporcionar al menos un campo para actualizar`);
        }

        // Actualizar solo los campos proporcionados
        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };

        this.saveToFile()

        return `El artículo con ID "${pid}" ha sido actualizado`;
    }

    deleteProduct(pid) {
        const eliminarProducto = this.products.filter(prod => prod.id !== pid)
        if (eliminarProducto) {
            console.log(`Se eliminó el artículo con ID "${pid}" del arreglo`)
            this.products = eliminarProducto
            this.saveToFile()
            return this.products//eliminarProducto
        }
    }

    saveToFile() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
        console.log('Datos guardados en el archivo:', this.path);
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            console.log('Datos cargados desde el archivo:', this.path);
        } catch (error) {
            console.error('Error al cargar datos desde el archivo:', error.mensaje);
            // Si hay un error al cargar desde el archivo, iniciar con un array vacío
            this.products = [];
        }
    }

}

// Crear una instancia de la clase ProductsManager
const productos = new ProductsManager();
// Mostrar la lista inicial de productos
console.log(productos.getProducts());

const producto1 = { title: "producto 1", description: "Este es el primer producto de prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }

const producto2 = { title: "producto 2", description: "Este es otro producto de prueba", price: 200, thumbnail: "Sin imagen", code: "abc1234", stock: 18 }

const producto3 = { title: "producto 3", description: "Este es otro producto más de prueba", price: 400, thumbnail: "Sin imagen", code: "abc12345", stock: 20 }

// Agregar algunos productos
console.log(productos.addProduct(producto1));
console.log(productos.addProduct(producto2));
console.log(productos.addProduct(producto3));
// Mostrar la lista de productos ya agregados

console.log(productos.getProducts());
console.log(productos.deleteProduct(3));
//console.log(productos.getProducts());
console.log(productos.getProductById(4))
console.log(productos.updateProduct(1, {price:3250, stock:160}))
console.log(productos.updateProduct(2, {price:305, stock:13}))
console.log(productos.getProductById(3))