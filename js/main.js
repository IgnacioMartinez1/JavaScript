const menu = [
    { nombre: "Latte", precio: 5500, imagen: "./images/latte.jpg" },
    { nombre: "Mocca", precio: 4900, imagen: "./images/mocca.jpeg" },
    { nombre: "Café con leche", precio: 5000, imagen: "./images/cafe-con-leche.jpg" },
    { nombre: "Espresso", precio: 5500, imagen: "./images/espresso.jpg" },
    { nombre: "Ristretto", precio: 5500, imagen: "./images/ristretto.jpg" },
    { nombre: "Americano", precio: 5500, imagen: "./images/americano.jpg" },
    { nombre: "Cappuccino", precio: 4400, imagen: "./images/cappuccino.jpg" },
    { nombre: "Tostado", precio: 3600, imagen: "./images/tostado.jpg" },
    { nombre: "Chocotorta", precio: 7600, imagen: "./images/chocotorta.png" },
    { nombre: "Crumbl Cookie", precio: 2500, imagen: "./images/crumbl-cookie.jpg" },
    { nombre: "Chipa", precio: 600, imagen: "./images/chipa.jpg" },
    { nombre: "Dona", precio: 3500, imagen: "./images/dona.jpg" },
];

// let pedido = [];

// function mostrarMenu() {
//     let menuTexto = "Menu de la Cafeteria:\n";
//     for (let i = 0; i < menu.length; i++) {
//         menuTexto += `${i + 1}. ${menu[i].nombre} - $${menu[i].precio}\n`;
//     }
//     console.log(menuTexto);
// }

// function tomarPedido() {
//     let continuar = true;
//     while (continuar) {
//         let seleccion = prompt("Selecciona el número del ítem que deseas agregar a tu pedido (1-10) o escribe '0' para finalizar:");
//         if (seleccion === '0') {
//             continuar = false;
//         } else {
//             let indice = parseInt(seleccion) - 1;
//             if (indice >= 0 && indice < menu.length) {
//                 pedido.push(menu[indice]);
//                 alert(`Has agregado ${menu[indice].nombre} a tu pedido.`);
//             } else {
//                 alert("Selección inválida. Inténtalo de nuevo.");
//             }
//         }
//     }
// }

// function mostrarTotal() {
//     let total = 0;
//     for (let i = 0; i < pedido.length; i++) {
//         total += pedido[i].precio;
//     }
//     console.log(`Tu pedido:\n${pedido.map(item => item.nombre).join(", ")}\nTotal: $${total}`);
// }


// mostrarMenu();
// tomarPedido();
// mostrarTotal();



const lista = document.getElementById("lista");
const productosCarrito = document.getElementById("productos-carrito");
const totalElement = document.getElementById("total");

let carrito = [];
let total = 0;

document.addEventListener("DOMContentLoaded", () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
        actualizarCarrito();
    }
});

for (const producto of menu) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<h2> ${producto.nombre} </h2> <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen"> <p>Precio C/U: ${producto.precio}</p> <button class="boton-agregar"> Agregar al Carrito </button>`;
    contenedor.className = "grid-item"
    lista.appendChild(contenedor)

    const botonAgregar = contenedor.querySelector(".boton-agregar");
    botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
}


function agregarAlCarrito(producto) {
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
}
