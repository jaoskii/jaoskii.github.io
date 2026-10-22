/* Full-screen project detail slider (after fashion-slider.uiinitiative.com).
   Each slide gets its own background colour (--fx-c1..5) and accent (--fx-a1..5) from the page theme.
   On change: frame shrinks, track slides, frame grows back. URL hash = project id; #all opens the index. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.querySelector('[data-fashion]');
  const track = root.querySelector('.fx-track');
  const slideTpl = document.querySelector('template[data-slide]').innerHTML;
  const itemTpl = document.querySelector('template[data-index-item]').innerHTML;
  const chip = root.dataset.chip || '';
  const P = window.PROJECTS, n = P.length;
  const count = root.querySelector('[data-count]'), dialog = root.querySelector('[data-index]');

  track.innerHTML = P.map((p, i) =>
    `<section class="fx-slide${p.images ? ' has-shots' : ''}" data-i="${i}" aria-roledescription="slide" aria-label="${i + 1} of ${n}: ${window.escapeHTML(p.title)}">${window.fillProject(slideTpl, p, i, n, chip)}</section>`
  ).join('');
  root.querySelector('[data-index-grid]').innerHTML = P.map((p, i) => window.fillProject(itemTpl, p, i, n, chip)).join('');
  const slides = [...track.children];
  const cs = getComputedStyle(root);
  const colour = (kind, i) => cs.getPropertyValue(`--fx-${kind}${(i % 5) + 1}`).trim();

  let idx = -1, busy = false;
  function apply() {
    track.style.transform = `translateX(${-idx * 100}%)`;
    root.style.setProperty('--fx-bg', colour('c', idx));
    root.style.setProperty('--fx-acc', colour('a', idx));
    slides.forEach((s, k) => { s.classList.toggle('is-active', k === idx); s.inert = k !== idx; });
    count.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    history.replaceState(null, '', '#' + P[idx].id);
    document.title = P[idx].title + ' · ' + root.dataset.name;
  }
  function set(i, animate = true) {
    i = ((i % n) + n) % n;
    if (i === idx || busy) return;
    idx = i;
    if (!animate || RM) {
      root.classList.add('no-anim'); apply();
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('no-anim')));
      return;
    }
    busy = true; root.classList.add('fx-out');
    setTimeout(apply, 380);
    setTimeout(() => { root.classList.remove('fx-out'); busy = false; }, 1250);
  }

  root.querySelector('[data-prev]').addEventListener('click', () => set(idx - 1));
  root.querySelector('[data-next]').addEventListener('click', () => set(idx + 1));
  addEventListener('keydown', e => {
    if (dialog.open || e.target.matches('input,textarea')) return;
    if (e.key === 'ArrowLeft') set(idx - 1);
    if (e.key === 'ArrowRight') set(idx + 1);
  });
  let sx = null;
  track.addEventListener('pointerdown', e => sx = e.clientX);
  addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 60) set(idx + (dx < 0 ? 1 : -1)); });

  // "All projects" index
  const openIndex = () => { if (!dialog.open) dialog.showModal(); };
  root.querySelector('[data-index-open]').addEventListener('click', openIndex);
  root.querySelector('[data-index-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    const a = e.target.closest('[data-go]');
    if (a) { e.preventDefault(); dialog.close(); set(+a.dataset.go, idx !== -1); }
    else if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => { if (location.hash === '#all') history.replaceState(null, '', '#' + P[idx].id); });

  function fromHash() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h === 'all') { if (idx === -1) set(0, false); openIndex(); return; }
    const k = P.findIndex(p => p.id === h);
    set(k === -1 ? 0 : k, idx !== -1);
  }
  addEventListener('hashchange', fromHash);
  fromHash();
})();
