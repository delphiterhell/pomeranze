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

  /* ---------- Configurazioni api ----------
     Mobile (<768px): 3 api distanziate; Desktop: 4 api          */
  const mobile = window.innerWidth < 768;

  const configApi = mobile
    ? [
        // Alto a sinistra — zona cielo
        { startX: 25, startY: 12, animazione: 'vola-1', durata: '9s',  ritardo: '0s',  dimensione: '34px' },
        // Centro-destra — campo aperto, più in alto
        { startX: 65, startY: 28, animazione: 'vola-3', durata: '11s', ritardo: '-5s', dimensione: '30px' },
        // Basso a sinistra — ben separato, più a sinistra e più in basso
        { startX: 12, startY: 80, animazione: 'vola-2', durata: '13s', ritardo: '-8s', dimensione: '28px' },
      ]
    : [
        // Desktop: 4 api
        { startX: 12, startY: 18, animazione: 'vola-1', durata: '9s',  ritardo: '0s',  dimensione: '38px' },
        { startX: 30, startY: 55, animazione: 'vola-2', durata: '12s', ritardo: '-3s', dimensione: '32px' },
        { startX: 48, startY: 30, animazione: 'vola-3', durata: '10s', ritardo: '-6s', dimensione: '36px' },
        { startX: 18, startY: 68, animazione: 'vola-4', durata: '14s', ritardo: '-2s', dimensione: '30px' },
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
