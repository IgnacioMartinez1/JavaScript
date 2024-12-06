import { agregarAlCarrito, inicializarCarrito, setDatosUsuario } from './carrito.js';

const lista = document.getElementById("lista");

async function cargarMenu() {
    if (!lista) {
        console.error("El contenedor con id 'lista' no existe en el HTML.");
        return;
    }

    try {
        const response = await fetch('./data/menu.json');
        const menu = await response.json();

        menu.forEach(producto => {
            const contenedor = document.createElement("div");
            contenedor.className = "col-md-4 d-flex flex-column align-items-center p-3";

            contenedor.innerHTML = `
                <h2 class="text-center">${producto.nombre}</h2>
                <p class="text-center">Precio: $${producto.precio}</p>
                <button id="botones" class="boton-agregar">Agregar al Carrito</button>
            `;

            lista.appendChild(contenedor);

            const botonAgregar = contenedor.querySelector(".boton-agregar");
            botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
        });
    } catch (error) {
        console.error("Error al cargar el menú:", error);
    }
}

function mostrarFormularioUsuario() {
    const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario")) || {};

    Swal.fire({
        title: "Escribí tus datos (Obligatorio para comprar)",
        html: `
          <label for='nombre'>Nombre:</label>
          <input id='nombre' class='swal2-input' placeholder='Nombre completo' value="${datosGuardados.nombre || ''}">
      
          <label for='telefono'>Teléfono:</label>
          <input id='telefono' type='tel' class='swal2-input' placeholder='Número de teléfono' value="${datosGuardados.telefono || ''}">
      
          <label for='direccion'>Dirección:</label>
          <input id='direccion' class='swal2-input' placeholder='Dirección completa' value="${datosGuardados.direccion || ''}">
      
          <label for='metodo-pago'>Método de pago:</label>
          <select id='metodo-pago' class='swal2-select'>
            <option value='' ${!datosGuardados.metodoPago ? 'selected' : ''}>Seleccionar</option>
            <option value='efectivo' ${datosGuardados.metodoPago === 'efectivo' ? 'selected' : ''}>Efectivo</option>
            <option value='tarjeta' ${datosGuardados.metodoPago === 'tarjeta' ? 'selected' : ''}>Tarjeta</option>
            <option value='transferencia' ${datosGuardados.metodoPago === 'transferencia' ? 'selected' : ''}>Transferencia</option>
          </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        preConfirm: () => {
            const nombre = document.getElementById("nombre").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const direccion = document.getElementById("direccion").value.trim();
            const metodoPago = document.getElementById("metodo-pago").value;

            if (!nombre) {
                Swal.showValidationMessage("Por favor, ingresa tu nombre.");
                return;
            }
            if (!telefono || !/^[0-9]{10,15}$/.test(telefono)) {
                Swal.showValidationMessage("Por favor, ingresa un número de teléfono válido (10-15 dígitos).");
                return;
            }
            if (!direccion) {
                Swal.showValidationMessage("Por favor, ingresa tu dirección.");
                return;
            }
            if (!metodoPago) {
                Swal.showValidationMessage("Por favor, selecciona un método de pago.");
                return;
            }

            const datosUsuario = { nombre, telefono, direccion, metodoPago };
            localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario)); // Guardar datos en localStorage
            return datosUsuario;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
            Swal.fire({
                title: "Datos guardados exitosamente",
                text: `Hola, ${datosUsuario.nombre}. Tus datos han sido guardados para futuras compras.`,
                icon: "success",
            });
            generarEnlaceWhatsApp();
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarFormularioUsuario();
});


document.addEventListener("DOMContentLoaded", () => {
    cargarMenu();
    inicializarCarrito();
    solicitarDatosUsuario(); 
});
