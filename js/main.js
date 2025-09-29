//  VARIABLES GLOBALES 
// Selección de contenedores principales
const contCard = document.getElementById("cont-cards");
const form = document.getElementById("vehiculo-form");
const contProductos = document.getElementById("cont-productos");

//  CAMBIO 1 
// Antes: no se usaba localStorage correctamente.
// Ahora: se cargan los vehículos y el carrito desde localStorage si existen, 
// o se inicializan como arrays vacíos para evitar errores.
let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalCarrito = carrito.reduce((acc, prod) => acc + parseFloat(prod.precio), 0);

//  CREAR CARD 
function createCard(url, nombreA, marcaA, modeloA, kilometrajeA, precioA) {
    // Imagen por defecto (esto se mantuvo igual, solo se dejó más claro).
    const fotoFinal = url || "https://tse1.mm.bing.net/th/id/OIP.4JudGN8ibtldepPW253_7AHaFW?pid=Api&P=0&h=180";

    // Estructura de la card (esto no cambió, solo se limpió la sintaxis).
    const cardPrincipal = document.createElement("div");
    cardPrincipal.classList.add("item-vehiculo", "col-md-6");

    const cardSecundaria = document.createElement("div");
    cardSecundaria.classList.add("card", "h-100");

    const img = document.createElement("img");
    img.classList.add("card-img-top", "w-100");
    img.setAttribute("src", fotoFinal);

    const contInfo = document.createElement("div");
    contInfo.classList.add("card-body");

    const nombre = document.createElement("h3");
    nombre.classList.add("card-title");
    nombre.textContent = nombreA;

    const marca = document.createElement("h4");
    marca.classList.add("card-subtitle", "text-muted");
    marca.textContent = marcaA;

    const modelo = document.createElement("h4");
    modelo.classList.add("card-text");
    modelo.textContent = "Modelo: " + modeloA;

    const kilometraje = document.createElement("h4");
    kilometraje.classList.add("card-text");
    kilometraje.textContent = "Kilometraje: " + kilometrajeA;

    const precio = document.createElement("h2");
    precio.classList.add("text-success");
    precio.textContent = "$" + precioA;

    const acciones = document.createElement("div");
    acciones.classList.add("d-flex", "justify-content-between", "mt-3");

    const comprar = document.createElement("button");
    comprar.classList.add("btn", "btn-success");
    comprar.textContent = "Comprar";

    const eliminar = document.createElement("button");
    eliminar.classList.add("btn", "btn-danger");
    eliminar.textContent = "Eliminar";

    //  CAMBIO 2 
    // Antes: se usaba localStorage.removeItem("vehiculos"), lo que borraba TODO.
    // Ahora: se elimina SOLO el vehículo seleccionado usando filter().
    eliminar.addEventListener("click", () => {
        cardPrincipal.remove();
        vehiculos = vehiculos.filter(v => v.nombre !== nombreA);
        localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    });

    //  CAMBIO 3 
    // Antes: el carrito no se guardaba, solo existía en el DOM.
    // Ahora: se guarda en localStorage para persistir después del refresh.
    comprar.addEventListener("click", () => {
        alert(`Has comprado el vehículo ${nombreA} - ${marcaA} (${modeloA}) por $${precioA}`);

        const newProducto = { foto: fotoFinal, nombre: nombreA, marca: marcaA, precio: precioA };
        carrito.push(newProducto);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        contProductos.appendChild(createProductos(newProducto));
        totalCarrito += parseFloat(precioA);
        actualizarTotal();
    });

    // Armado de la card
    cardPrincipal.appendChild(cardSecundaria);
    cardSecundaria.appendChild(img);
    cardSecundaria.appendChild(contInfo);
    contInfo.appendChild(nombre);
    contInfo.appendChild(marca);
    contInfo.appendChild(modelo);
    contInfo.appendChild(kilometraje);
    contInfo.appendChild(precio);
    contInfo.appendChild(acciones);
    acciones.appendChild(comprar);
    acciones.appendChild(eliminar);

    return cardPrincipal;
}

//  FORM SUBMIT 
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const url = document.getElementById("foto-v").value.trim();
    const nombreA = document.getElementById("nombre-v").value.trim();
    const marcaA = document.getElementById("marca-v").value.trim();
    const modeloA = document.getElementById("modelo-v").value.trim();
    const kilometrajeA = document.getElementById("kilometraje-v").value.trim();
    const precioA = document.getElementById("precio-v").value.trim();

    if (!nombreA || !marcaA || !modeloA || !kilometrajeA || !precioA) {
        alert("Complete todos los campos para el registro del vehículo por favor");
        return;
    }

    //  CAMBIO 4 
    // Antes: se creaba la card pero no se guardaba en localStorage.
    // Ahora: también se guarda en el array vehiculos y en localStorage.
    const newVehiculo = { url, nombre: nombreA, marca: marcaA, modelo: modeloA, kilometraje: kilometrajeA, precio: precioA };
    vehiculos.push(newVehiculo);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

    const newCard = createCard(url, nombreA, marcaA, modeloA, kilometrajeA, precioA);
    contCard.appendChild(newCard);

    form.reset();
});

//  CREAR PRODUCTOS EN CARRITO 
function createProductos(producto) {
    const { foto, nombre, marca, precio } = producto;

    const carritoPrincipal = document.createElement("div");
    carritoPrincipal.classList.add("productos-card", "col-12");

    const carritoFila = document.createElement("div");
    carritoFila.classList.add("row");

    const colCarrito1 = document.createElement("div");
    colCarrito1.classList.add("col-lg-4", "col-md-4", "col-carrito1");
    const imgCarrito = document.createElement("img");
    imgCarrito.classList.add("w-100");
    imgCarrito.setAttribute("src", foto);
    colCarrito1.appendChild(imgCarrito);

    const colCarrito2 = document.createElement("div");
    colCarrito2.classList.add("col-lg-6", "col-md-6", "col-carrito2");

    const h3Nombre = document.createElement("h3");
    h3Nombre.classList.add("card-title");
    h3Nombre.textContent = nombre;

    const h4Marca = document.createElement("h4");
    h4Marca.classList.add("card-subtitle", "text-muted");
    h4Marca.textContent = marca;

    const h3Precio = document.createElement("h3");
    h3Precio.classList.add("text-success");
    h3Precio.textContent = "$" + precio;

    colCarrito2.appendChild(h3Nombre);
    colCarrito2.appendChild(h4Marca);
    colCarrito2.appendChild(h3Precio);

    const colCarrito3 = document.createElement("div");
    colCarrito3.classList.add("col-lg-2", "col-md-2", "col-carrito3", "boton");

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-danger");
    btnDelete.textContent = "X";

    //  CAMBIO 5 
    // Antes: se borraba todo el carrito con removeItem.
    // Ahora: solo elimina el producto seleccionado usando filter() y actualiza localStorage.
    btnDelete.addEventListener("click", () => {
        carritoPrincipal.remove();
        carrito = carrito.filter(p => p.nombre !== nombre);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        totalCarrito -= parseFloat(precio);
        actualizarTotal();
    });

    colCarrito3.appendChild(btnDelete);

    carritoFila.appendChild(colCarrito1);
    carritoFila.appendChild(colCarrito2);
    carritoFila.appendChild(colCarrito3);
    carritoPrincipal.appendChild(carritoFila);

    return carritoPrincipal;
}

//  ACTUALIZAR TOTAL 
function actualizarTotal() {
    const totalDiv = document.getElementById("total-carrito");
    totalDiv.innerHTML = `
        <a href="carrito.html">Ver Carrito</a>
        <h2>Total: $${totalCarrito}</h2>
    `;
}

//  CARGAR AL INICIO 
document.addEventListener("DOMContentLoaded", () => {
    //  CAMBIO 6 
    // Antes: no se reconstruía nada al refrescar.
    // Ahora: se recorren los arrays guardados en localStorage
    // y se reconstruyen las cards y el carrito en el DOM.
    vehiculos.forEach(v => contCard.appendChild(createCard(v.url, v.nombre, v.marca, v.modelo, v.kilometraje, v.precio)));
    carrito.forEach(p => contProductos.appendChild(createProductos(p)));
    actualizarTotal();

    document.getElementById('carrito').addEventListener('click', modalProductos);
});

//  PANEL CARRITO 
function modalProductos() {
    let selector = document.getElementById("panel-carrito");
    selector.classList.toggle("active");
}