document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const sidebar   = document.querySelector(".sidebar");
    const overlay   = document.querySelector(".overlay");

    function openSidebar() {
        if (sidebar && overlay) {
            sidebar.classList.add("open");
            overlay.classList.add("show");
        }
    }

    function closeSidebar() {
        if (sidebar && overlay) {
            sidebar.classList.remove("open");
            overlay.classList.remove("show");
        }
    }

    if (hamburger) hamburger.addEventListener("click", openSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);

    // Marcar enlace activo y cerrar sidebar en móvil
    const navLinks = document.querySelectorAll(".sidebar ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("activo"));
            link.classList.add("activo");
            closeSidebar(); // en móvil se cierra al hacer clic
        });
    });

    // Si la pantalla se ensancha (>768px) y el sidebar está abierto, lo cerramos (opcional)
    window.addEventListener("resize", function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
});