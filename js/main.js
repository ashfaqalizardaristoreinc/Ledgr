(function () {
  'use strict';

  // Set current year everywhere
  document.querySelectorAll('#year, .year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Theme toggle with localStorage
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('ledgr-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);
  if (themeToggle) {
    themeToggle.textContent = initial === 'dark' ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('ledgr-theme', next);
      themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  // Smooth reveal on scroll
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll(
    '.f-card, .s-card, .sv-card, .v-card, .contact-card, .g-item, .feature-block'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    if (io) io.observe(el); else { el.style.opacity = 1; el.style.transform = 'none'; }
  });

  // FAQ — close others when one opens
  document.querySelectorAll('.faq details').forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        document.querySelectorAll('.faq details').forEach(o => {
          if (o !== d) o.open = false;
        });
      }
    });
  });
})();
