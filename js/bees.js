/* ===================================================
   BEES.JS — Api SVG animate nel hero
   =================================================== */

(function () {
  'use strict';

  /* Ferma tutto se l'utente preferisce meno animazioni */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const contenitore = document.querySelector('.api-container');
  if (!contenitore) return;

  /* ---------- SVG di un'ape disegnata a mano ---------- */
  function creaSvgApe() {
    return `
      <svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Ali semitrasparenti -->
        <ellipse class="ala ala-sx" cx="11" cy="10" rx="10" ry="6"
          fill="rgba(200,230,255,0.55)" stroke="rgba(100,160,200,0.4)" stroke-width="0.6"
          transform-origin="18 14"/>
        <ellipse class="ala ala-dx" cx="29" cy="10" rx="10" ry="6"
          fill="rgba(200,230,255,0.55)" stroke="rgba(100,160,200,0.4)" stroke-width="0.6"
          transform-origin="22 14"/>
        <!-- Corpo: addome a strisce -->
        <ellipse cx="20" cy="22" rx="8" ry="11" fill="#F5C842"/>
        <!-- Strisce nere -->
        <rect x="12.2" y="18" width="15.6" height="3.5" rx="0.5" fill="#2a2a2a" opacity="0.85"/>
        <rect x="12.2" y="24" width="15.6" height="3.5" rx="0.5" fill="#2a2a2a" opacity="0.85"/>
        <!-- Testa -->
        <circle cx="20" cy="11" r="5.5" fill="#F5C842"/>
        <!-- Occhi -->
        <circle cx="17.5" cy="10" r="1.2" fill="#2a2a2a"/>
        <circle cx="22.5" cy="10" r="1.2" fill="#2a2a2a"/>
        <!-- Antenni -->
        <line x1="17" y1="6" x2="14" y2="2" stroke="#2a2a2a" stroke-width="0.8" stroke-linecap="round"/>
        <circle cx="14" cy="2" r="1" fill="#2a2a2a"/>
        <line x1="23" y1="6" x2="26" y2="2" stroke="#2a2a2a" stroke-width="0.8" stroke-linecap="round"/>
        <circle cx="26" cy="2" r="1" fill="#2a2a2a"/>
      </svg>
    `;
  }

  /* ---------- Configurazioni delle 4 api ---------- */
  const configApi = [
    {
      // Ape 1 – in alto a sinistra
      startX: 15, startY: 20,
      animazione: 'vola-1',
      durata: '9s',
      ritardo: '0s',
      dimensione: '38px',
    },
    {
      // Ape 2 – in alto a destra
      startX: 70, startY: 25,
      animazione: 'vola-2',
      durata: '12s',
      ritardo: '-3s',
      dimensione: '32px',
    },
    {
      // Ape 3 – centro-basso
      startX: 45, startY: 55,
      animazione: 'vola-3',
      durata: '10s',
      ritardo: '-6s',
      dimensione: '36px',
    },
    {
      // Ape 4 – destra centrale
      startX: 80, startY: 45,
      animazione: 'vola-4',
      durata: '14s',
      ritardo: '-2s',
      dimensione: '30px',
    },
  ];

  /* ---------- Creazione delle api nel DOM ---------- */
  configApi.forEach((cfg) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'ape';
    wrapper.innerHTML = creaSvgApe();

    /* Posizione di partenza (percentuale rispetto al contenitore) */
    wrapper.style.left = `${cfg.startX}%`;
    wrapper.style.top  = `${cfg.startY}%`;
    wrapper.style.width = cfg.dimensione;

    /* Animazione volo */
    wrapper.style.animation =
      `${cfg.animazione} ${cfg.durata} ${cfg.ritardo} ease-in-out infinite`;

    /* Animazione sbattito ali sulle ellissi */
    const ali = wrapper.querySelectorAll('.ala');
    ali.forEach((ala, i) => {
      const ritardoAla = i === 0 ? '0s' : '0.05s';
      ala.style.animation = `sbatti-ali 0.18s ${ritardoAla} linear infinite`;
      ala.style.transformOrigin = i === 0 ? '18px 14px' : '22px 14px';
    });

    contenitore.appendChild(wrapper);
  });

})();
