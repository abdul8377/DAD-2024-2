export class Product {
    id?: number;              // ID único del producto
    name?: string;            // Nombre del producto
    description?: string;     // Descripción del producto
    code?: string;            // Código único del producto
    stock?: number;           // Stock disponible (debería ser un número, no una cadena)
    price?: number;           // Precio del producto
    category?: Category;      // Categoría a la que pertenece el producto
}

export class Category {
    id?: number;              // ID único de la categoría
    name?: string;            // Nombre de la categoría
    description?: string;     // Descripción de la categoría
    code?: string;            // Código único de la categoría
}
