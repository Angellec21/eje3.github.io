// Menú móvil: toggle, ARIA, bloqueo de scroll y cierre con Escape/click fuera
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if(navToggle && navMenu){
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function openMenu(){
        navMenu.classList.add('mobile','active');
        navMenu.setAttribute('aria-hidden','false');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded','true');
        document.body.classList.add('no-scroll');
        const first = navMenu.querySelector(focusableSelector);
        if(first) first.focus();
    }

    function closeMenu(){
        navMenu.classList.remove('active');
        navMenu.setAttribute('aria-hidden','true');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded','false');
        document.body.classList.remove('no-scroll');
        navToggle.focus();
    }

    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        if(expanded) closeMenu(); else openMenu();
    });

    // Cerrar al hacer click en enlace
    navLinks.forEach(link => link.addEventListener('click', () => closeMenu()));

    // Cerrar al hacer click fuera del menú
    document.addEventListener('click', (e) => {
        if(navMenu.classList.contains('active')){
            if(!navMenu.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
        }
    });

    // Escape y trap de foco simple
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
        if(e.key === 'Tab' && navMenu.classList.contains('active')){
            const focusables = Array.from(navMenu.querySelectorAll(focusableSelector));
            if(focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length-1];
            if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
            else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
        }
    });

}

// Marcar enlace activo según scroll (opcional): añade clase .active a links que coincidan con sección
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main section[id], main article[id]');
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop;
        if(pageYOffset >= (top - 200)) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if(current && link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

console.log('3.js cargado — menú móvil mejorado');
