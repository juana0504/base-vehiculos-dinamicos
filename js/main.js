const input = document.getElementsByClassName("form-control");
const contCard = document.getElementById("cont-cards");
const form = document.getElementById("vehiculo-form");
const contProductos = document.getElementById("cont-productos");

let totalCarrito = 0;

// Función para crear tarjeta de vehículo
function createCard(url, nombreA, marcaA, modeloA, kilometrajeA, precioA) {
    const fotoFinal = url || "https://tse1.mm.bing.net/th/id/OIP.4JudGN8ibtldepPW253_7AHaFW?pid=Api&P=0&h=180";

    const cardPrincipal = document.createElement("div");
    cardPrincipal.classList.add("item-vehiculo", "col-md-6");

    const cardSecundaria = document.createElement("div");
    cardSecundaria.classList.add("card", "h-100");

    const img = document.createElement("img")
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

    eliminar.addEventListener("click", () => {
        cardPrincipal.remove();

        // Quitar del localStorage
        let vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos")) || [];
        vehiculosGuardados = vehiculosGuardados.filter(v => !(v.nombre === nombreA && v.marca === marcaA));
        localStorage.setItem("vehiculos", JSON.stringify(vehiculosGuardados));
    });

    comprar.addEventListener("click", () => {
        alert(`Has comprado el vehículo ${nombreA} - ${marcaA} (${modeloA}) por $${precioA}`);

        const newProducto = createProductos(fotoFinal, nombreA, marcaA, precioA);
        contProductos.appendChild(newProducto);

        totalCarrito += parseFloat(precioA);
        actualizarTotal();
    });

    cardPrincipal.appendChild(cardSecundaria);
    cardSecundaria.appendChild(img);
    cardSecundaria.appendChild(contInfo);
    contInfo.appendChild(nombre);
    contInfo.appendChild(marca);
    contInfo.appendChild(modelo)
    contInfo.appendChild(kilometraje);
    contInfo.appendChild(precio);
    contInfo.appendChild(acciones);
    acciones.appendChild(comprar);
    acciones.appendChild(eliminar);

    return cardPrincipal;
}

// Registro de vehículo
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
    } else {
        const newCard = createCard(url, nombreA, marcaA, modeloA, kilometrajeA, precioA);
        contCard.appendChild(newCard);

        // Guardar en localStorage
        const vehiculo = { url, nombre: nombreA, marca: marcaA, modelo: modeloA, kilometraje: kilometrajeA, precio: precioA };
        let vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos")) || [];
        vehiculosGuardados.push(vehiculo);
        localStorage.setItem("vehiculos", JSON.stringify(vehiculosGuardados));

        form.reset();
    }
});

// Panel carrito
function modalProductos() {
    let selector = document.getElementById("panel-carrito")
    selector.classList.toggle("active");
}

document.getElementById('carrito').addEventListener('click', modalProductos);

// Crear productos en carrito
function createProductos(url, nombre, marca, precio) {
    const fotoFinal = url || "https://tse1.mm.bing.net/th/id/OIP.4JudGN8ibtldepPW253_7AHaFW?pid=Api&P=0&h=180";

    const producto = { url: fotoFinal, nombre, marca, precio };

    // Guardar en localStorage
    let carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoGuardado.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoGuardado));

    const carritoPrincipal = document.createElement("div");
    carritoPrincipal.classList.add("productos-card", "col-12");

    const carritoFila = document.createElement("div");
    carritoFila.classList.add("row");

    const colCarrito1 = document.createElement("div");
    colCarrito1.classList.add("col-lg-4", "col-md-4", "col-carrito1");
    const imgCarrito = document.createElement("img");
    imgCarrito.classList.add("w-100");
    imgCarrito.setAttribute("src", fotoFinal);
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

    btnDelete.addEventListener("click", () => {
        carritoPrincipal.remove();
        totalCarrito -= parseFloat(precio);
        actualizarTotal();

        // Actualizar localStorage
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito = carrito.filter(item => !(item.nombre === nombre && item.marca === marca && item.precio === precio));
        localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    colCarrito3.appendChild(btnDelete);

    carritoFila.appendChild(colCarrito1);
    carritoFila.appendChild(colCarrito2);
    carritoFila.appendChild(colCarrito3);

    carritoPrincipal.appendChild(carritoFila);

    return carritoPrincipal;
}

// Actualizar total carrito
function actualizarTotal() {
    const totalDiv = document.getElementById("total-carrito");
    totalDiv.innerHTML = `
        <h2>Total: $ ${ totalCarrito}</h2>
        <a href="carrito.html">Ver Carrito</a>
    `;
}

// Recuperar datos guardados al cargar
document.addEventListener("DOMContentLoaded", () => {
    // Vehículos guardados
    const vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos")) || [];
    vehiculosGuardados.forEach(v => {
        const card = createCard(v.url, v.nombre, v.marca, v.modelo, v.kilometraje, v.precio);
        contCard.appendChild(card);
    });

    // Carrito guardado
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoGuardado.forEach(item => {
        const producto = createProductos(item.url, item.nombre, item.marca, item.precio);
        contProductos.appendChild(producto);
        totalCarrito += parseFloat(item.precio);
    });

    actualizarTotal();
});
