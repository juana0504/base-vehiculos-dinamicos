const tabla = document.querySelector("#tabla-carrito tbody");

document.addEventListener("DOMContentLoaded", () => {
    // 1. Traemos los productos guardados en localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    // 2. Recorremos cada producto guardado en el carrito
    carritoGuardado.forEach((producto) => {
        const fila = document.createElement("tr");

        // Columna 1: Imagen del vehículo
        const tdImagen = document.createElement("td");
        const img = document.createElement("img");
        // ⚠️ Ojo: en el carrito los guardamos como "foto", no como "url"
        img.src = producto.foto || producto.url; // soporte para ambas claves
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

        // Acumular el total
        total += parseFloat(producto.precio);

        // Agregar celdas a la fila
        fila.appendChild(tdImagen);
        fila.appendChild(tdNombre);
        fila.appendChild(tdMarca);
        fila.appendChild(tdPrecio);

        // Insertar fila en la tabla
        tabla.appendChild(fila);
    });

    // 3. Mostrar el total y un link para volver
    const totalDiv = document.getElementById("total");
    totalDiv.innerHTML = `
        <a href="index.html">Registrar Vehículos</a>
        <h3>Total: $${total}</h3>
    `;
});