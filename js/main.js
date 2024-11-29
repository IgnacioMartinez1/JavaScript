import { agregarAlCarrito, inicializarCarrito } from './carrito.js';

const lista = document.getElementById("lista");

async function cargarMenu() {
    if (!lista) {
        console.error("El contenedor con id 'lista' no existe en el HTML.");
        return;
    }

    try {
  
        const response = await fetch('./data/menu.json');
        if (!response.ok) {
            throw new Error(`No se pudo cargar el menú. Código de error: ${response.status}`);
        }

        const menu = await response.json();

  
        menu.forEach(producto => {
            const contenedor = document.createElement("div");
            contenedor.className = "col-md-4 d-flex flex-column align-items-center p-3";

            contenedor.innerHTML = `
                <h2 class="text-center">${producto.nombre}</h2>
                <p class="text-center">Precio: $${producto.precio}</p>
                <button class="boton-agregar">Agregar al Carrito</button>
            `;

            lista.appendChild(contenedor);

            const botonAgregar = contenedor.querySelector(".boton-agregar");
            botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
        });
    } catch (error) {
        console.error("Error al cargar el menú:", error);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    cargarMenu();
    inicializarCarrito();
});
