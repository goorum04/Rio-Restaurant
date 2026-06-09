/* El Rio — dynamic menu + theme loader from Supabase */
(async function () {
  'use strict';

  const SUPABASE_URL = 'https://gvbcfjgxrgnvjfuedtfs.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YmNmamd4cmdudmpmdWVkdGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTA2NTMsImV4cCI6MjA5NDA4NjY1M30.fsregKbRRXmgG-k_Ylny8QkoNI7lLJGMUuSIJqODiMA';

  if (!window.supabase) return;
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    const [themeRes, catRes, itemRes] = await Promise.all([
      sb.from('site_settings').select('value').eq('key', 'theme').single(),
      sb.from('menu_categories').select('*').order('sort_order'),
      sb.from('menu_items').select('*').eq('active', true).order('sort_order')
    ]);

    // Apply theme and cache it for instant load next visit
    const theme = themeRes.data?.value;
    if (theme && ['royal', 'desert', 'mountain'].includes(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('elrio_theme', theme);
    }

    const categories = catRes.data || [];
    const items      = itemRes.data || [];
    if (!categories.length || !items.length) return;

    // Group items by category slug
    const byCategory = {};
    items.forEach(item => {
      (byCategory[item.category_slug] = byCategory[item.category_slug] || []).push(item);
    });

    categories.forEach(cat => {
      // Update tab button translations
      const tab = document.querySelector(`[data-tab="${cat.slug}"]`);
      if (tab) {
        if (cat.name_ca) tab.setAttribute('data-ca', cat.name_ca);
        if (cat.name_es) tab.setAttribute('data-es', cat.name_es);
        if (cat.name_fr) tab.setAttribute('data-fr', cat.name_fr);
      }

      // Replace panel content
      const panel = document.querySelector(`[data-panel="${cat.slug}"]`);
      if (!panel) return;
      const catItems = byCategory[cat.slug];
      if (!catItems || !catItems.length) return;
      panel.innerHTML = catItems.map(renderItem).join('\n');
    });

    // Re-apply i18n after DOM update
    const lang = localStorage.getItem('elrio_lang') || 'ca';
    if (typeof window.elrioApplyLang === 'function') {
      window.elrioApplyLang(lang);
    }

  } catch (err) {
    // Silently fall back to the static HTML content
    console.warn('[El Rio] Supabase unavailable, using static menu.', err);
  }

  function renderItem(item) {
    const tags = (item.tags || '').split(',').filter(Boolean).map(t => {
      const tag = t.trim();
      if (tag === 'VEGGIE') return '<span class="tag veg">VEGGIE</span>';
      if (tag === 'PICANT') return '<span class="tag hot">PICANT</span>';
      if (tag === 'CASA')   return '<span class="tag hot">★ CASA</span>';
      return '';
    }).join('');

    const price = Number(item.price).toFixed(2).replace('.', ',');
    const nCA = a(item.name_ca),
          nES = a(item.name_es || item.name_ca),
          nFR = a(item.name_fr || item.name_ca),
          dCA = a(item.desc_ca),
          dES = a(item.desc_es || item.desc_ca),
          dFR = a(item.desc_fr || item.desc_ca);

    return `<article class="dish">
  <div class="dish-head">
    <h3 data-ca="${nCA}" data-es="${nES}" data-fr="${nFR}">${t(item.name_ca)}</h3>
    ${tags}<span class="dots"></span><span class="price">${price} €</span>
  </div>
  ${item.desc_ca ? `<p data-ca="${dCA}" data-es="${dES}" data-fr="${dFR}">${t(item.desc_ca)}</p>` : ''}
</article>`;
  }

  function a(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function t(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
})();
