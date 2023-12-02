class ProductsManager {
    constructor() {
        this.products = [];
    }

    // Método para mostrar la lista de productos
    getProducts() {
        return this.products;
    }

    // Método para agregar un producto al array
    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log(`Todos los campos del artículo con nombre "${product.title}" deben contener datos`);
            return `Todos los campos deben contener datos`
        }

        const newProduct = this.products.find(prod => prod.code === product.code);
        if (newProduct) {
            console.log(`El código del artículo con nombre "${product.title}" no puede estar repetido`);
            return "No es posible cargar más de un producto con el mismo código"
        }

        if (this.products.length === 0) {
            product.id = 1;
            this.products.push(product);
            console.log(`Se agregó el artículo con nombre "${product.title}" al arreglo`)
        }else{
            this.products.push({ ...product, id: this.products.length + 1 })
            console.log(`Se agregó el artículo con nombre "${product.title}" al arreglo`)
        }

        return `${product.title} agregado`

    }

    getProductById(pid){
        const otroProducto = this.products.find(prod => prod.id === pid)
        if (!otroProducto) {
            return `El producto seleccionado no existe`
        }
        return otroProducto
    }

}

// Crear una instancia de la clase ProductsManager
const productos = new ProductsManager();
// Mostrar la lista inicial de productos
console.log(productos.getProducts());

const producto1 = { title: "producto 1", description: "Este es el primer producto de prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }

const producto2 = { title: "producto 2", description: "Este es otro producto de prueba", price: 200, thumbnail: "Sin imagen", code: "abc1234", stock: 18 }

const producto3 = { title: "producto 3", description: "Este es otro producto más de prueba", price: 400, thumbnail: "Sin imagen", code: "abc1234", stock: 20 }

// Agregar algunos productos
console.log(productos.addProduct(producto1));
console.log(productos.addProduct(producto2));
console.log(productos.addProduct(producto3));
// Mostrar la lista de productos ya agregados
if(!productos) {
    console.log(productos.getProducts());
}else{
    console.log(productos.getProducts());
}
console.log(productos.getProductById(2))