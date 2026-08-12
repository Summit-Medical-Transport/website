/* Summit Medical Transport — site behaviour
   Everything here is progressive enhancement. With JS off the page still
   reads, navigates and submits. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── current year ─────────────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── UTC clock on the viability board ─────────────────────────── */
  var utc = document.getElementById('utc');
  if (utc) {
    var tick = function () {
      var d = new Date();
      var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
      utc.textContent = pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ── mobile navigation ────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    burger.addEventListener('click', function () {
      setNav(burger.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        burger.focus();
      }
    });

    // Drop the panel state when we cross back to the desktop layout,
    // otherwise the nav stays hidden by the mobile rules.
    window.matchMedia('(min-width: 961px)').addEventListener('change', function (e) {
      if (e.matches) setNav(false);
    });
  }

  /* ── scroll reveals ───────────────────────────────────────────── */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.sechead, .card, .step, .strip__item, .fleet__copy, .fleet__shot, ' +
      '.portal__copy, .portal__list, .about__body, .job, .contact__copy, .cform'
    );

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 5, 4) * 60) + 'ms';
      io.observe(el);
    });
  }

  /* ── form feedback ────────────────────────────────────────────────
     Neither form is wired to a backend yet. While `data-demo` is on the
     contact form, and while the portal form has no action, both confirm
     locally instead of navigating. See PLACEHOLDERS.md to hook them up. */

  var flag = function (form) {
    var bad = null;
    Array.prototype.forEach.call(form.querySelectorAll('input, textarea, select'), function (el) {
      var ok = el.checkValidity();
      el.setAttribute('aria-invalid', String(!ok));
      if (!ok && !bad) bad = el;
    });
    if (bad) bad.focus();
    return !bad;
  };

  var contact = document.getElementById('contact-form');
  var contactMsg = document.getElementById('cform-msg');
  if (contact) {
    contact.addEventListener('submit', function (e) {
      if (!flag(contact)) {
        e.preventDefault();
        if (contactMsg) contactMsg.textContent = 'Check the highlighted fields.';
        return;
      }
      if (contact.hasAttribute('data-demo') || !contact.getAttribute('action')) {
        e.preventDefault();
        if (contactMsg) contactMsg.textContent = 'Form not connected yet — add an action URL to send this.';
      }
    });
  }

  var portal = document.getElementById('portal-form');
  var portalMsg = document.getElementById('portal-msg');
  if (portal) {
    portal.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!flag(portal)) {
        if (portalMsg) portalMsg.textContent = 'Enter a valid email address.';
        return;
      }
      if (portalMsg) portalMsg.textContent = 'Not connected yet — add a signup endpoint to collect this.';
    });
  }
})();
