// EVO — Concept 3: Human & Editorial
// Mobile nav toggle, scroll-reveal animation, and pricing period toggle.

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Pricing monthly/annual toggle
  var priceToggleBtns = document.querySelectorAll('.pricing-toggle button');
  var priceAmounts = document.querySelectorAll('[data-monthly][data-annual]');

  if (priceToggleBtns.length && priceAmounts.length) {
    priceToggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        priceToggleBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var period = btn.getAttribute('data-period');

        priceAmounts.forEach(function (el) {
          el.textContent = period === 'annual' ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
        });

        document.querySelectorAll('.price-annual-note').forEach(function (note) {
          note.style.display = period === 'annual' ? 'block' : 'none';
        });
      });
    });
  }
});
