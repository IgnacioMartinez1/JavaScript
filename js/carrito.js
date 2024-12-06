let carrito = [];
let total = 0;
let datosUsuario = null;

const productosCarrito = document.getElementById("productos-carrito");
const totalElement = document.getElementById("total");

export function inicializarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        actualizarCarrito();
    }
}

export function setDatosUsuario(datos) {
    datosUsuario = datos;
    generarEnlaceWhatsApp();
}

export function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    total += producto.precio;
    Toastify({
        text: `Se ha agregado un/una: ${producto.nombre} al carrito`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();

    actualizarCarrito();
}

function aumentarCantidad(index) {
    carrito[index].cantidad++;
    total += carrito[index].precio;

    Toastify({
        text: `Se ha agregado un/una: ${carrito[index].nombre} al carrito`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();

    actualizarCarrito();
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        total -= carrito[index].precio;

        Toastify({
            text: `Se ha quitado un/una: ${carrito[index].nombre} del carrito`,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #FFC107, #FF9800)",
            },
        }).showToast();
    } else {
        eliminarDelCarrito(index);
    }
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    const productoEliminado = carrito[index];
    const cantidadEliminada = productoEliminado.cantidad;

    total -= productoEliminado.precio * cantidadEliminada;
    carrito.splice(index, 1);

    Toastify({
        text: `Eliminado: ${productoEliminado.nombre} (x${cantidadEliminada})`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #FF5252, #FF1744)",
        },
    }).showToast();

    actualizarCarrito();
}

function actualizarCarrito() {
    productosCarrito.innerHTML = "";
    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.innerHTML = `
            ${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}
            <button class="boton-menos" data-index="${index}">-</button>
            <button class="boton-mas" data-index="${index}">+</button>
            <button class="boton-eliminar" data-index="${index}">X</button>
        `;
        productosCarrito.appendChild(item);
    });

    totalElement.textContent = `Total: $${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));

    document.querySelectorAll(".boton-eliminar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            eliminarDelCarrito(index);
        });
    });

    document.querySelectorAll(".boton-mas").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            aumentarCantidad(index);
        });
    });

    document.querySelectorAll(".boton-menos").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            disminuirCantidad(index);
        });
    });

    generarEnlaceWhatsApp();
}

function generarEnlaceWhatsApp() {
    const botonWhatsApp = document.getElementById("boton-whatsapp");
    const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario")) || {};
    const { nombre, direccion, metodoPago } = datosUsuario;

    if (!nombre || !direccion || !metodoPago || carrito.length === 0) {
        if (botonWhatsApp) botonWhatsApp.remove();
        return;
    }

    const mensajeProductos = carrito
        .map(producto => `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`)
        .join("\n");
    const mensajeUsuario = `Hola, soy ${nombre}.\nDirección: ${direccion}\nMétodo de Pago: ${metodoPago}`;
    const mensajeFinal = `${mensajeUsuario}\n\nQuiero realizar el siguiente pedido:\n${mensajeProductos}\n\nTotal: $${total}`;
    const numeroWhatsApp = "+5491162720950";
    const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeFinal)}`;

    if (!botonWhatsApp) {
        const nuevoBoton = document.createElement("a");
        nuevoBoton.id = "boton-whatsapp";
        nuevoBoton.href = enlace;
        nuevoBoton.target = "_blank";
        nuevoBoton.textContent = "Realizar pedido por WhatsApp";
        nuevoBoton.style.cssText = `
            display: inline-block;
            margin-top: 10px;
            padding: 10px 15px;
            background-color: #25D366;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        `;
        totalElement.parentElement.appendChild(nuevoBoton);
    } else {
        botonWhatsApp.href = enlace;
    }
}

