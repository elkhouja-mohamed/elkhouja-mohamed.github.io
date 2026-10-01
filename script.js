/* ==========================================================
   Elkhouja Mohamed — Portfolio
   Scripts partagés : menu mobile, nav active, révélations.
   ========================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Menu mobile ---------- */
    var btn = document.getElementById('menu-btn');
    var menu = document.getElementById('menu');

    function setButton(open) {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        btn.innerHTML = open ? '&#10005;' : '&#9776;';
    }

    function closeMenu() {
        if (!menu || !btn) return;
        menu.classList.remove('show');
        setButton(false);
    }

    if (btn && menu) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            setButton(menu.classList.toggle('show'));
        });

        // Fermeture au clic sur un lien du menu
        menu.addEventListener('click', function (e) {
            if (e.target.closest('.nav-link')) closeMenu();
        });

        // Fermeture au clic extérieur
        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
        });

        // Fermeture à la touche Échap
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('show')) {
                closeMenu();
                btn.focus();
            }
        });

        // Réinitialisation si l'on repasse en affichage large
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    /* ---------- Ombre de la barre de navigation au défilement ---------- */
    var navbar = document.querySelector('.navbar');

    if (navbar) {
        var onScroll = function () {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Révélation progressive des éléments ---------- */
    var revealables = document.querySelectorAll(
        '.section-header, .stat-card, .highlight-item, .skills-category, ' +
        '.timeline-item, .project-card, .contact-item, .contact-form'
    );

    if (revealables.length && 'IntersectionObserver' in window && !reduceMotion) {
        revealables.forEach(function (el) {
            el.classList.add('reveal');
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealables.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ---------- Année courante dans le pied de page ---------- */
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();