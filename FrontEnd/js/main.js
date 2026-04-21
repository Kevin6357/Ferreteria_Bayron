document.addEventListener("DOMContentLoaded", () => {
  // ✅ Cargar productos
  fetch("http://localhost:8080/api/productos")
    .then((response) => response.json())
    .then((data) => {
      const elemento = document.getElementById("table-cliente");
      for (let i = 0; i < data.length; i++) {
        let producto = data[i];
        let fila = `
          <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.stock}</td>
            <td>${producto.estado}</td>
            <td>
              <button class="btn btn-outline-primary me-2 btn-editar" data-id="${producto.id}">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-outline-danger btn-eliminar" data-id="${producto.id}">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </td>
          </tr>
        `;
        elemento.innerHTML += fila;
      }
    });

  // ✅ Botón guardar
  const btnGuardar = document.getElementById("btnGuardar");
  btnGuardar.addEventListener("click", guardarProducto);
});

// ✅ Eliminar producto
document.addEventListener("click", function (e) {
  const btnDelete = e.target.closest(".btn-eliminar"); // ✅ clase en lugar de ID
  if (btnDelete) {
    const id = btnDelete.dataset.id;

    const confirmar = confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    fetch(`http://localhost:8080/api/productos/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        alert("Producto eliminado correctamente");
        location.reload();
      } else {
        alert("Error al eliminar el producto");
      }
    });
  }
});

// ✅ Guardar producto
function guardarProducto() {
  const nombre = document.getElementById("producto").value;
  const stock  = document.getElementById("stock").value;
  const estado = document.getElementById("estado").value;

  fetch("http://localhost:8080/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, stock, estado })
  }).then((response) => {
    if (response.ok) {
      location.reload();
    } else {
      alert("Error: no se pudo guardar");
    }
  });
}