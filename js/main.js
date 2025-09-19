const input = document.getElementsByClassName("form-control");
const contCard = document.getElementById("cont-cards");
const form = document.getElementById("vehiculo-form");


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
    });

    comprar.addEventListener("click", () => {
        alert(`Has comprado el vehículo ${nombreA} - ${marcaA} (${modeloA}) por $${precioA}`);
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
    else {
        const newCard = createCard(url, nombreA, marcaA, modeloA, kilometrajeA, precioA);
        contCard.appendChild(newCard);
        form.reset();
    }

});