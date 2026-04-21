document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/api/productos-defectuosos")
    .then((response) => response.json())
    .then((data) => {
      const elemento = document.getElementById("table-defectuosos");
      for (let i = 0; i < data.length; i++) {
        let defecto = data[i];

        // ✅ producto puede ser null, hay que controlarlo
        let idProducto = defecto.producto ? defecto.producto.idProducto : "Sin producto";
        let nombre     = defecto.producto ? defecto.producto.nombre : "Sin producto";
        let stock      = defecto.producto ? defecto.producto.stock : "-";
        let estado     = defecto.producto ? defecto.producto.estado : "-";
        let motivo     = defecto.motivo ? defecto.motivo : "Sin motivo";

        let fila = `
          <tr>
            <td>${defecto.idDefecto}</td>
            <td>${idProducto}</td>
            <td>${nombre}</td>
            <td>${stock}</td>
            <td>${estado}</td>
            <td>${motivo}</td>
            <td>
              <button class="btn btn-outline-primary me-2 btn-editar" data-id="${defecto.idDefecto}">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-outline-danger btn-eliminar" data-id="${defecto.idDefecto}">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </td>
          </tr>
        `;
        elemento.innerHTML += fila;
      }
    });

  const btnGuardar = document.getElementById("btnGuardar");
  btnGuardar.addEventListener("click", guardarProductoDefectuoso);
});

// ✅ Eliminar
document.addEventListener("click", function (e) {
  const btnDelete = e.target.closest(".btn-eliminar");
  if (btnDelete) {
    const id = btnDelete.dataset.id;
    const confirmar = confirm("¿Seguro que deseas eliminar este producto defectuoso?");
    if (!confirmar) return;

    fetch(`http://localhost:8080/api/productos-defectuosos/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        alert("Eliminado correctamente");
        location.reload();
      } else {
        alert("Error al eliminar");
      }
    });
  }
});

// ✅ Guardar
function guardarProductoDefectuoso() {
  const nombre = document.getElementById("producto").value;
  const stock  = document.getElementById("stock").value;
  const estado = document.getElementById("estado").value;
  const motivo = document.getElementById("motivo").value;

  fetch("http://localhost:8080/api/productos-defectuosos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, stock, estado, motivo })
  }).then((response) => {
    if (response.ok) {
      location.reload();
    } else {
      alert("Error: no se pudo guardar");
    }
  });
}