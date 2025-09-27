const tabla = document.querySelector("#tabla-carrito tbody");

document.addEventListener("DOMContentLoaded", () => {
    // 1. Traemos los productos guardados en localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    // 3. Recorremos cada producto y creamos una fila
    carritoGuardado.forEach((producto) => {
        const fila = document.createElement("tr");

        // Columna 1: Imagen
        const tdImagen = document.createElement("td");
        const img = document.createElement("img");
        img.src = producto.url;
        img.width = 100;
        tdImagen.appendChild(img);

        // Columna 2: Nombre
        const tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;

        // Columna 3: Marca
        const tdMarca = document.createElement("td");
        tdMarca.textContent = producto.marca;

        // Columna 4: Precio
        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = "$" + producto.precio;

        total += parseFloat(producto.precio);

        // Agregar celdas a la fila
        fila.appendChild(tdImagen);
        fila.appendChild(tdNombre);
        fila.appendChild(tdMarca);
        fila.appendChild(tdPrecio);

        // Agregar fila a la tabla
        tabla.appendChild(fila);
    });

    // 4. Mostrar el total en algún div
    const totalDiv = document.getElementById("total");
    totalDiv.innerHTML = `
    <a href="index.html">Registrar Vehiculos</a>
    <h3>Total: $${total}</h3>
    `;
});
