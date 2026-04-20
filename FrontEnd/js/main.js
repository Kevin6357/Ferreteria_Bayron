document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:8080/api/productos')
        .then(response => response.json())
        .then(data => {
            const elemento = document.getElementById("table-cliente");
            elemento.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                let producto = data[i];
                let stockBadgeClass = "bg-success";
                if (producto.stock < 5) stockBadgeClass = "bg-danger";
                else if (producto.stock < 15) stockBadgeClass = "bg-warning text-dark";
                let estadoBadgeClass = producto.estado === "disponible" ? "bg-success" : "bg-secondary";
                let fila = `
                    <tr class="align-middle">
                        <td data-label="ID" class="fw-bold">${producto.idProducto}</td>
                        <td data-label="Producto">${producto.nombre}</td>
                        <td data-label="Stock"><span class="badge ${stockBadgeClass} px-3 py-2">${producto.stock} unidades</span></td>
                        <td data-label="Estado"><span class="badge ${estadoBadgeClass} px-3 py-2">${producto.estado}</span></td>
                        <td data-label="Opciones" class="text-center">
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary" title="Editar">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" id="btnEliminar" data-idproducto="${producto.idProducto}" title="Eliminar">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
                elemento.innerHTML += fila;
            }
        })
        .catch(error => console.error('Error al cargar productos:', error));
});

document.addEventListener("click", function (e) {
    const btnDelete = e.target.closest("#btnEliminar");
    if (btnDelete) {
        const id = btnDelete.dataset.idproducto;
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            fetch(`http://localhost:8080/api/productos/${id}`, { method: "DELETE" })
                .then(response => {
                    if (response.ok) {
                        alert("Producto eliminado correctamente");
                        location.reload();
                    } else {
                        alert("Error al eliminar producto");
                    }
                });
        }
    }
});