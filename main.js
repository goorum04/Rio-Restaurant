/* El Rio — main interactions: i18n, menu tabs, form, mobile nav */

(function () {
  /* ============== LANGUAGE SWITCHING ============== */
  const supported = ['ca', 'es', 'fr', 'en', 'ar'];
  const saved = localStorage.getItem('elrio_lang');
  const initial = supported.includes(saved) ? saved : 'ca';

  function translate(caSource, lang) {
    if (lang === 'ca') return caSource;
    // Native attribute (es/fr live on the element)
    return undefined;
  }

  function applyLang(lang) {
    const isRTL = (lang === 'ar');
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', isRTL);
    document.body.classList.toggle('lang-ar', lang === 'ar');

    const dict = (window.ELRIO_I18N && window.ELRIO_I18N[lang]) || null;

    document.querySelectorAll('[data-ca]').forEach(el => {
      const src = el.dataset.ca;
      let v;
      if (lang === 'ca') {
        v = src;
      } else if (lang === 'es' || lang === 'fr') {
        v = el.dataset[lang];
      } else if (dict) {
        v = dict[src];
      }
      if (v === undefined || v === null) v = el.dataset.es || el.dataset.fr || src; // fallback
      if (typeof v === 'string') {
        if (v.includes('<')) el.innerHTML = v;
        else el.textContent = v;
      }
    });

    document.querySelectorAll('[data-placeholder-ca]').forEach(el => {
      const src = el.getAttribute('data-placeholder-ca');
      let v;
      if (lang === 'ca') v = src;
      else if (lang === 'es' || lang === 'fr') v = el.getAttribute('data-placeholder-' + lang);
      else if (dict) v = dict[src];
      if (v) el.setAttribute('placeholder', v);
    });

    document.querySelectorAll('.lang-switcher button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    localStorage.setItem('elrio_lang', lang);
  }

  window.elrioApplyLang = applyLang;

  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
  applyLang(initial);

  /* ============== MENU TABS ============== */
  const tabs = document.querySelectorAll('.menu-tabs .tab');
  const panels = document.querySelectorAll('.menu-panels .panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    });
  });

  /* ============== RESERVATION FORM ============== */
  /* Reservations are stored in Supabase (table `reservations`, RLS grants
     the anon role INSERT only). */
  const RESERVATIONS_URL = 'https://qnuzcmdjpafbqnofpzfp.supabase.co/rest/v1/reservations';
  const RESERVATIONS_KEY = 'sb_publishable_kIsUEkhtxqL8Ye1DkkBHhQ_kpKjx1Rp';

  const form = document.getElementById('reservation-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const success = document.getElementById('form-success');
      const error = document.getElementById('form-error');
      if (success) success.classList.remove('show');
      if (error) error.classList.remove('show');

      const fd = new FormData(form);
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      try {
        const res = await fetch(RESERVATIONS_URL, {
          method: 'POST',
          headers: {
            apikey: RESERVATIONS_KEY,
            Authorization: 'Bearer ' + RESERVATIONS_KEY,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({
            name: (fd.get('name') || '').toString().trim(),
            phone: (fd.get('phone') || '').toString().trim(),
            date: (fd.get('date') || '').toString(),
            time: (fd.get('time') || '').toString(),
            guests: (fd.get('guests') || '').toString(),
            email: (fd.get('email') || '').toString().trim() || null,
            notes: (fd.get('notes') || '').toString().trim() || null,
            lang: localStorage.getItem('elrio_lang') || 'ca'
          })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        if (success) {
          success.classList.add('show');
          setTimeout(() => success.classList.remove('show'), 8000);
        }
        form.reset();
      } catch (err) {
        console.error('Reservation submit failed', err);
        if (error) error.classList.add('show');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
    // Set min date = today
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const t = new Date();
      const iso = t.toISOString().slice(0, 10);
      dateInput.min = iso;
      dateInput.value = iso;
    }
  }

  /* ============== MOBILE NAV ============== */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
    }));
  }

  /* ============== CURRENT PAGE IN NAV ============== */
  const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav a[data-nav]').forEach(a => {
    const target = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (target === path) a.setAttribute('aria-current', 'page');
  });

  /* ============== UPDATE "TODAY" IN HOURS ============== */
  const dayIdx = new Date().getDay(); // 0=Sun..6=Sat
  const map = [6, 0, 1, 2, 3, 4, 5]; // map JS sun..sat to data-day index where Monday=0
  const todayDataIdx = map[dayIdx];
  document.querySelectorAll('[data-day]').forEach(el => {
    if (parseInt(el.dataset.day, 10) === todayDataIdx) el.classList.add('today');
  });
})();
