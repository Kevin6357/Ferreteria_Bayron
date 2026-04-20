document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:8080/api/productos-defectuosos')
        .then(response => response.json())
        .then(data => {
            const elemento = document.getElementById("table-defectuosos");
            elemento.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                let defectuoso = data[i];
                let idProducto = defectuoso.producto?.idProducto || 'N/A';
                let nombreProducto = defectuoso.producto?.nombre || 'Producto eliminado';
                let motivoBadge = "bg-secondary";
                if (defectuoso.motivo?.toLowerCase().includes("roto")) motivoBadge = "bg-danger";
                else if (defectuoso.motivo?.toLowerCase().includes("fuga")) motivoBadge = "bg-warning text-dark";
                let fila = `
                    <tr class="align-middle">
                        <td data-label="ID Defecto" class="fw-bold">${defectuoso.idDefecto}</td>
                        <td data-label="ID Producto">${idProducto}</td>
                        <td data-label="Herramienta">${nombreProducto}</td>
                        <td data-label="Motivo"><span class="badge ${motivoBadge} px-3 py-2">${defectuoso.motivo}</span></td>
                        <td data-label="Opciones" class="text-center">
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary" title="Editar">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" id="btnEliminar" data-iddefecto="${defectuoso.idDefecto}" title="Eliminar">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
                elemento.innerHTML += fila;
            }
        })
        .catch(error => console.error('Error al cargar productos defectuosos:', error));
});

document.addEventListener("click", function (e) {
    const btnDelete = e.target.closest("#btnEliminar");
    if (btnDelete) {
        const id = btnDelete.dataset.iddefecto;
        if (confirm("¿Estás seguro de eliminar este producto defectuoso?")) {
            fetch(`http://localhost:8080/api/productos-defectuosos/${id}`, { method: "DELETE" })
                .then(response => {
                    if (response.ok) {
                        alert("Producto defectuoso eliminado correctamente");
                        location.reload();
                    } else {
                        alert("Error al eliminar producto defectuoso");
                    }
                });
        }
    }
});