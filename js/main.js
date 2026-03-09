document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto Sticky Navbar con efecto "Vidrio" (Glassmorphism)
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Animaciones de revelación (Intersection Observer Moderno)
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15, // Activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Retardo escalonado opcional si hay varios en pantalla (Stagger effect)
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3. Pequeña interacción para la sección de TikTok
    // (Opcional: hacer que las tarjetas se centren al hacer clic)
    const tiktokCards = document.querySelectorAll('.tiktok-card');
    tiktokCards.forEach(card => {
        card.addEventListener('click', () => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

});