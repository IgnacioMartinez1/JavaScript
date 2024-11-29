let carrito = [];
let total = 0;

const productosCarrito = document.getElementById("productos-carrito");
const totalElement = document.getElementById("total");


export function inicializarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
        actualizarCarrito();
    }
}

export function agregarAlCarrito(producto) {
    carrito.push(producto);
    total += producto.precio;
    actualizarCarrito();
}


function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}


function actualizarCarrito() {
    productosCarrito.innerHTML = "";
    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.innerHTML = `
            ${producto.nombre} - $${producto.precio}
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

    generarEnlaceWhatsApp();
}


function generarEnlaceWhatsApp() {
    const botonWhatsApp = document.getElementById("boton-whatsapp");

    if (carrito.length === 0) {
        if (botonWhatsApp) botonWhatsApp.remove();
        return;
    }

    const mensaje = carrito.map(producto => `${producto.nombre} - $${producto.precio}`).join("\n");
    const mensajeFinal = `Hola, quiero realizar el siguiente pedido:\n${mensaje}\nTotal: $${total}`;
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
