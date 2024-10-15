const menu = [
    { nombre: "Latte", precio: 5500},
    { nombre: "Mocca", precio: 4900},
    { nombre: "Café con leche", precio: 5000},
    { nombre: "Espresso", precio: 5500},
    { nombre: "Ristretto", precio: 5500},
    { nombre: "Americano", precio: 5500},
    { nombre: "Cappuccino", precio: 4400},
    { nombre: "Tostado", precio: 3600},
    { nombre: "Chocotorta", precio: 7600},
    { nombre: "Crumble Cookie", precio: 2500},
];

let pedido = [];

function mostrarMenu() {
    let menuTexto = "Menu de la Cafeteria:\n";
    for (let i = 0; i < menu.length; i++) {
        menuTexto += `${i + 1}. ${menu[i].nombre} - $${menu[i].precio}\n`;
    }
    console.log(menuTexto);
}

function tomarPedido() {
    let continuar = true;
    while (continuar) {
        let seleccion = prompt("Selecciona el número del ítem que deseas agregar a tu pedido (1-10) o escribe '0' para finalizar:");
        if (seleccion === '0') {
            continuar = false;
        } else {
            let indice = parseInt(seleccion) - 1;
            if (indice >= 0 && indice < menu.length) {
                pedido.push(menu[indice]);
                alert(`Has agregado ${menu[indice].nombre} a tu pedido.`);
            } else {
                alert("Selección inválida. Inténtalo de nuevo.");
            }
        }
    }
}

function mostrarTotal() {
    let total = 0;
    for (let i = 0; i < pedido.length; i++) {
        total += pedido[i].precio;
    }
    console.log(`Tu pedido:\n${pedido.map(item => item.nombre).join(", ")}\nTotal: $${total}`);
}


mostrarMenu();
tomarPedido();
mostrarTotal();