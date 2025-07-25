document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado');
    
    // Elementos del menú hamburguesa
    const menuToggle = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Elementos del modal - Aseguramos que se seleccionen correctamente
    const modal = document.getElementById('contactModal');
    const modalContent = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contactForm');
    
    // Debug: Verificar que los elementos se estén seleccionando correctamente
    console.log('Modal:', modal);
    console.log('Botones para abrir modal:', document.querySelectorAll('.btn-open-modal, .btn-contact, [data-modal="contact"]'));    console.log('Botón para cerrar:', closeButton);
    
    // Función para alternar el menú móvil
    function toggleMenu() {
        if (menuToggle && mainNav) {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open');
        }
    }
    
    // Función para abrir el modal
    function openModal(e) {
        console.log('Abriendo modal...');
        if (e) e.preventDefault();
        if (modal) {
            modal.classList.add('active'); // Usar clase active
            document.body.style.overflow = 'hidden';
            // Enfocar el primer campo del formulario
            const firstInput = modal.querySelector('input, textarea');
            if (firstInput) firstInput.focus();
        } else {
            console.error('No se encontró el elemento del modal');
        }
    }
    
    // Función para cerrar el modal
    function closeModal() {
        console.log('Cerrando modal...');
        if (modal) {
            modal.classList.remove('active'); // Usar clase active
            document.body.style.overflow = '';
        }
    }
    
    // Asignar eventos a los botones de abrir
    document.addEventListener('click', function(e) {
        // Verificar si se hizo clic en un botón de abrir modal
        if (e.target.closest('.btn-open-modal, .btn-contact, [data-modal="contact"]')) {
            e.preventDefault();
            openModal(e);
        }
    });
    
    // Asignar evento al botón de cerrar
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Cerrar al hacer clic fuera del contenido del modal
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
// Manejar envío del formulario
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Validación básica
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name || !email || !phone || !message) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }
        if (!isValidEmail(email)) {
            alert('Por favor ingresa un correo electrónico válido.');
            return;
        }

        // Construir los datos del formulario
        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
                closeModal();
            } else {
                alert('Ocurrió un error al enviar el mensaje. Intenta de nuevo más tarde.');
            }
        })
        .catch(error => {
            alert('Ocurrió un error al enviar el mensaje. Intenta de nuevo más tarde.');
        });
    });
}
    
    // Función para validar email
    function isValidEmail(email) {
        if (!email) return false;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Evento para el botón del menú hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                toggleMenu();
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (mainNav && !mainNav.contains(e.target) && menuToggle && !menuToggle.contains(e.target) && mainNav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Manejar el cambio de tamaño de la ventana
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            document.body.classList.remove('resize-animation-stopper');
            
            // Cerrar menú si se cambia a vista de escritorio
            if (window.innerWidth > 992) {
                if (menuToggle) menuToggle.classList.remove('active');
                if (mainNav) mainNav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }, 250);
    });
    
    // Efecto de scroll en el header
    let lastScroll = 0;
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Mostrar/ocultar header al hacer scroll
            if (currentScroll <= 0) {
                header.classList.remove('scrolled');
                return;
            } else if (currentScroll > 100) {
                header.classList.add('scrolled');
            }
            
            lastScroll = currentScroll;
        });
        
        // Inicializar el header según la posición del scroll
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        }
    }

    const btnSolicitarInfo = document.getElementById('btnSolicitarInfo');
    if (btnSolicitarInfo) {
        btnSolicitarInfo.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(e);
        });
    }
});