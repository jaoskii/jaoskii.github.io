/* Center-focus carousel (after carousel-slider.uiinitiative.com).
   Markup: <section data-carousel="rjt" data-auto="5500" data-chip="badge">
             <div class="cz-stage"></div> [data-dots] [data-count] [data-prev] [data-next] [data-play]
             <template>…card with {{placeholders}}…</template>
           </section>
   Clicking the centre card opens work.html#<project-id>; clicking a side card brings it to the centre. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SHIFT = 62; // side card centre offset, % of card width

  function mount(root) {
    const style = root.dataset.carousel, stage = root.querySelector('.cz-stage');
    const tpl = root.querySelector('template').innerHTML, chip = root.dataset.chip || '';
    const P = window.PROJECTS, n = P.length;
    stage.innerHTML = P.map((p, i) =>
      `<a class="cz-slide" href="work.html#${p.id}" data-i="${i}" aria-roledescription="slide" aria-label="${i + 1} of ${n}: ${window.escapeHTML(p.title)}">${window.fillProject(tpl, p, i, n, chip)}</a>`
    ).join('');
    const slides = [...stage.children];
    const dots = root.querySelector('[data-dots]'), count = root.querySelector('[data-count]'), play = root.querySelector('[data-play]');
    let pos = 0, idx = 0, paused = false, hover = false;

    const mod = k => ((k % n) + n) % n;
    const wrap = o => ((((o + n / 2) % n) + n) % n) - n / 2;
    const side = () => parseFloat(getComputedStyle(root).getPropertyValue('--cz-side')) || 0.62;

    const tiltOn = 'tilt' in root.dataset && !RM;
    const tiltMax = +(root.dataset.tilt || 7);

    // data-layout="stack": upcoming cards cascade behind the centre one, the previous card is dealt off to the left
    const stack = root.dataset.layout === 'stack';
    function renderStack() {
      const cs = getComputedStyle(root);
      const step = parseFloat(cs.getPropertyValue('--stack-x')) || 8;   // % of card width per card behind
      const lift = parseFloat(cs.getPropertyValue('--stack-y')) || 10;  // px each card behind sits higher
      const depth = parseFloat(cs.getPropertyValue('--stack-n')) || 3;  // how many cards show behind
      const shift = (step * depth) / 2;                                 // keep the whole fan centred
      slides.forEach((s, k) => {
        const o = wrap(k - pos), a = Math.abs(o);
        let t, op;
        if (o >= 0) {
          const d = Math.min(o, depth + 0.5);
          t = `translate(calc(-50% - ${shift}% + ${d * step}%), ${-d * lift}px) scale(${1 - d * 0.05}) rotate(${d * 2.2}deg)`;
          op = o > depth ? Math.max(0, depth + 1 - o) : 1;
        } else {
          t = `translate(calc(-50% - ${shift}% + ${o * 95}%), ${a * 30}px) scale(${1 - a * 0.08}) rotate(${o * 9}deg)`;
          op = Math.max(0, 1 - a);
        }
        s.style.transform = t;
        s.style.zIndex = String(o < -0.01 ? 101 : 100 - Math.round(a * 10));
        s.style.opacity = op;
        s.style.pointerEvents = o < -0.5 || o > depth - 0.5 ? 'none' : '';
        s.style.setProperty('--a', Math.min(a / 2, 1).toFixed(3));
        const centre = a < 0.5;
        s.classList.toggle('is-center', centre);
        s.tabIndex = centre ? 0 : -1;
      });
    }

    function render() {
      if (stack) return renderStack();
      const s1 = side();
      slides.forEach((s, k) => {
        const o = wrap(k - pos), a = Math.abs(o);
        const scale = a <= 1 ? 1 - (1 - s1) * a : s1 - (a - 1) * 0.14;
        const x = Math.sign(o) * (a <= 1 ? a * SHIFT : SHIFT + (a - 1) * SHIFT * 0.55);
        const rot = tiltOn ? Math.sign(o) * Math.min(a, 1.4) * tiltMax : 0;
        s.style.transform = `translateX(calc(-50% + ${x}%)) scale(${scale})` + (rot ? ` rotate(${rot.toFixed(2)}deg)` : '');
        s.style.zIndex = String(100 - Math.round(a * 10));
        s.style.opacity = a > 2.2 ? 0 : 1;
        s.style.pointerEvents = a > 1.6 ? 'none' : '';
        s.style.setProperty('--a', Math.min(a, 1).toFixed(3));
        const centre = a < 0.5;
        s.classList.toggle('is-center', centre);
        s.tabIndex = centre ? 0 : -1;
      });
    }
    function mark() {
      idx = mod(Math.round(pos));
      if (dots) [...dots.children].forEach((d, k) => d.setAttribute('aria-current', k === idx));
      if (count) count.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    }
    function go(target) { pos = Math.round(target); render(); mark(); }
    const toIndex = k => go(pos + wrap(k - pos));
    function measure() { stage.style.height = Math.max(...slides.map(s => s.offsetHeight)) + 'px'; }

    if (dots) {
      dots.innerHTML = '';
      P.forEach((p, k) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'dot'; b.setAttribute('aria-label', 'Show ' + p.title);
        b.onclick = () => toIndex(k); dots.append(b);
      });
    }
    root.querySelector('[data-prev]')?.addEventListener('click', () => go(pos - 1));
    root.querySelector('[data-next]')?.addEventListener('click', () => go(pos + 1));
    root.addEventListener('keydown', e => {
      if (e.target.matches('input,textarea')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(pos - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(pos + 1); }
    });

    // drag / swipe (no pointer capture, so the centre card's link still clicks)
    let sx = 0, sp = 0, down = false, moved = 0;
    stage.addEventListener('pointerdown', e => { if (e.button !== 0) return; down = true; moved = 0; sx = e.clientX; sp = pos; });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      if (moved > 6) { stage.classList.add('dragging'); pos = sp - dx / (slides[0].offsetWidth * SHIFT / 100); render(); }
    });
    addEventListener('pointerup', () => { if (!down) return; down = false; stage.classList.remove('dragging'); if (moved > 6) go(pos); });
    stage.addEventListener('dragstart', e => e.preventDefault());
    stage.addEventListener('click', e => {
      const s = e.target.closest('.cz-slide'); if (!s) return;
      if (moved > 6) { e.preventDefault(); return; }
      const k = +s.dataset.i;
      if (k !== idx) { e.preventDefault(); toIndex(k); }
    });

    // autoplay with a pause button; hover/focus also pauses
    if (+root.dataset.auto && !RM) {
      root.addEventListener('pointerenter', () => hover = true);
      root.addEventListener('pointerleave', () => hover = false);
      root.addEventListener('focusin', () => hover = true);
      root.addEventListener('focusout', () => hover = false);
      setInterval(() => { if (!paused && !hover && !document.hidden) go(pos + 1); }, +root.dataset.auto);
      play?.addEventListener('click', () => {
        paused = !paused;
        play.textContent = paused ? '▶' : '❚❚';
        play.setAttribute('aria-label', paused ? 'Start autoplay' : 'Pause autoplay');
      });
    } else if (play) play.hidden = true;

    render(); mark(); measure();
    addEventListener('resize', () => { measure(); render(); });
    document.fonts?.ready.then(measure);
  }

  document.querySelectorAll('[data-carousel]').forEach(mount);
})();
