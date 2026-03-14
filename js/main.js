document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initRevealOnScroll();
    initProgramsModal();
    initYoutubePlaylists();
    initCardNavigation();
});

window.addEventListener('load', () => {
    initAutoLoops();
});

/* =========================
   NAVBAR
========================= */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

/* =========================
   FADE IN
========================= */
function initRevealOnScroll() {
    const faders = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    faders.forEach((item) => observer.observe(item));
}

/* =========================
   AUTO LOOP HORIZONTAL
========================= */
function initAutoLoops() {
    const loops = document.querySelectorAll('.auto-loop');

    loops.forEach((loop) => {
        const track = loop.querySelector('.program-track, .tiktok-track');
        if (!track) return;

        if (!track.dataset.cloned) {
            track.innerHTML += track.innerHTML;
            track.dataset.cloned = 'true';
        }

        let speed = parseFloat(loop.dataset.speed) || 0.3;
        let position = 0;
        let paused = false;

        const getResetPoint = () => track.scrollWidth / 2;

        const animate = () => {
            if (!paused) {
                position -= speed;

                const resetPoint = getResetPoint();
                if (Math.abs(position) >= resetPoint) {
                    position = 0;
                }

                track.style.transform = `translateX(${position}px)`;
            }

            requestAnimationFrame(animate);
        };

        loop.addEventListener('mouseenter', () => paused = true);
        loop.addEventListener('mouseleave', () => paused = false);
        loop.addEventListener('touchstart', () => paused = true, { passive: true });
        loop.addEventListener('touchend', () => paused = false);

        animate();
    });
}

/* =========================
   MODAL DE PROGRAMAS
========================= */
function initProgramsModal() {
    const modal = document.getElementById('programsModal');
    const openBtn = document.getElementById('openProgramsModal');
    const closeBtn = document.getElementById('closeProgramsModal');
    const modalGrid = document.getElementById('modalProgramsGrid');

    if (!modal || !openBtn || !closeBtn || !modalGrid) return;

    const originalCards = document.querySelectorAll('.program-card');

    originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.remove('program-card');
        clone.classList.add('modal-program-card');
        modalGrid.appendChild(clone);
    });

    const openModal = () => {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* =========================
   CARDS NAVEGABLES
========================= */
function initCardNavigation() {
    const clickableSelector = '.program-card[data-link], .modal-program-card[data-link], .tiktok-card[data-link]';

    document.addEventListener('click', (e) => {
        const card = e.target.closest(clickableSelector);
        if (!card) return;

        const url = card.dataset.link;
        if (url && url !== '#') {
            window.open(url, '_blank', 'noopener');
        }
    });

    document.querySelectorAll(clickableSelector).forEach((card) => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const url = card.dataset.link;
                if (url && url !== '#') {
                    window.open(url, '_blank', 'noopener');
                }
            }
        });
    });
}

/* =========================
   YOUTUBE PLAYLISTS
========================= */
function initYoutubePlaylists() {
    const playlistBlocks = document.querySelectorAll('.youtube-playlist');

    playlistBlocks.forEach((block) => {
        const playlistUrl = block.dataset.playlistUrl;
        const playerContainer = block.querySelector('.youtube-player');
        const openLink = block.querySelector('.youtube-open-link');

        if (!playlistUrl || !playerContainer) return;

        const playlistId = getYoutubePlaylistId(playlistUrl);
        if (!playlistId) return;

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
        iframe.title = 'YouTube playlist';
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;

        playerContainer.appendChild(iframe);

        if (openLink) {
            openLink.href = playlistUrl;
        }
    });
}

function getYoutubePlaylistId(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.searchParams.get('list');
    } catch (error) {
        console.error('URL de playlist inválida:', url);
        return null;
    }
}

        });
    });

});
