### README

# API de Productos y Carritos

## Uso

1. Inicia el servidor:
   ```bash
   node main.js
   ```

2. El servidor estará disponible en `http://localhost:8080`.

## Endpoints

### Productos

#### Crear un Producto

- **Método**: POST
- **URL**: `http://localhost:8080/api/products`
- **Cuerpo** (JSON):
  ```json
  {
    "title": "Nombre del Producto",
    "description": "Descripción del Producto",
    "price": 100,
    "status": true,
    "stock": 50,
    "thumbnails": ["url1", "url2"]
  }
  ```

#### Obtener Todos los Productos

- **Método**: GET
- **URL**: `http://localhost:8080/api/products`

#### Obtener un Producto por ID

- **Método**: GET
- **URL**: `http://localhost:8080/api/products/{id}`

#### Actualizar un Producto

- **Método**: PUT
- **URL**: `http://localhost:8080/api/products/{id}`
- **Cuerpo** (JSON):
  ```json
  {
    "title": "Nombre Actualizado",
    "description": "Descripción Actualizada",
    "price": 150,
    "status": false,
    "stock": 30,
    "thumbnails": ["url3", "url4"]
  }
  ```

#### Eliminar un Producto

- **Método**: DELETE
- **URL**: `http://localhost:8080/api/products/{id}`

### Carritos

#### Crear un Carrito

- **Método**: POST
- **URL**: `http://localhost:8080/api/carts`

#### Obtener un Carrito por ID

- **Método**: GET
- **URL**: `http://localhost:8080/api/carts/{id}`

#### Añadir un Producto a un Carrito

- **Método**: POST
- **URL**: `http://localhost:8080/api/carts/{cid}/product/{pid}`

#### Eliminar un Carrito

- **Método**: DELETE
- **URL**: `http://localhost:8080/api/carts/{id}`

## Notas

- Asegúrate de que los archivos 

products.json

 y 

carts.json

 existan y estén inicializados como arreglos vacíos.
- Usa Postman para enviar las solicitudes HTTP a los endpoints de la API.

2025 | Franco Papeschi - My first Api