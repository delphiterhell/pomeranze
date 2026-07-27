/* ===================================================
   MAIN.JS — Menu mobile, scroll header, reveal on scroll
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menu hamburger mobile ---------- */
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const aperto = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!aperto));
      nav.classList.toggle('aperto', !aperto);
      document.body.style.overflow = aperto ? '' : 'hidden';
    });

    // Chiude il menu con il pulsante ✕
    const navChiudi = nav.querySelector('.nav-chiudi');
    if (navChiudi) {
      navChiudi.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('aperto');
        document.body.style.overflow = '';
      });
    }

    // Chiude il menu al click su un link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('aperto');
        document.body.style.overflow = '';
      });
    });

    // Chiude con Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('aperto')) {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('aperto');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  /* ---------- Header home: diventa fisso + opaco dopo lo scroll ---------- */
  const header = document.querySelector('.site-header');

  // Solo sulla home l'header è position:absolute e diventa fixed allo scroll
  if (header && !header.classList.contains('fisso')) {
    const soglia = 80;

    const aggiornaHeader = () => {
      if (window.scrollY > soglia) {
        header.classList.add('solido');
        header.style.position = 'fixed';
      } else {
        header.classList.remove('solido');
        header.style.position = 'absolute';
      }
    };

    aggiornaHeader();
    window.addEventListener('scroll', aggiornaHeader, { passive: true });
  }

  /* ---------- Evidenzia link attivo nella nav ---------- */
  const paginaCorrente = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === paginaCorrente || (paginaCorrente === '' && href === 'index.html')) {
      link.classList.add('attivo');
    }
  });

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  // Non applica se l'utente preferisce meno animazioni
  const preferisceRiduzione = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!preferisceRiduzione) {
    const elementiRivela = document.querySelectorAll('.rivela');

    const osservatore = new IntersectionObserver((voci) => {
      voci.forEach(voce => {
        if (voce.isIntersecting) {
          voce.target.classList.add('visibile');
          // Smette di osservare dopo la prima apparizione
          osservatore.unobserve(voce.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elementiRivela.forEach(el => osservatore.observe(el));
  } else {
    // Con prefers-reduced-motion mostra tutto subito
    document.querySelectorAll('.rivela').forEach(el => el.classList.add('visibile'));
  }

  /* ---------- Smooth scroll per ancore interne ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.addEventListener('click', e => {
      const target = document.querySelector(ancora.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
