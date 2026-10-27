import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ProjectCover } from '../components/ProjectArt';
import { PROJECTS } from '../data/projects';
import { RM, pad2 } from '../lib/motion';
import Slide from './Slide';

/* Full-screen project detail slider (after fashion-slider.uiinitiative.com).
   Each slide gets its own background colour (--fx-c1..5) and accent (--fx-a1..5) from the page theme.
   On change: frame shrinks, track slides, frame grows back. URL hash = project id; #all opens the index. */
const NAME = 'Rajhi John Tabora';
const n = PROJECTS.length;
const wrap = (i: number) => ((i % n) + n) % n;

// index among the screenshot / NDA slides, which picks a collage layout for projects without one
const ORDER = (() => {
  let k = 0;
  return PROJECTS.map((p) => (p.images || p.nda ? k++ : -1));
})();

export default function WorkPage() {
  const [idx, setIdx] = useState(-1);
  const [out, setOut] = useState(false);
  const [noAnim, setNoAnim] = useState(false);
  const idxRef = useRef(-1);
  const busy = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);

  const set = useCallback((target: number, animate = true) => {
    const i = wrap(target);
    if (i === idxRef.current || busy.current) return;
    idxRef.current = i;
    if (!animate || RM) {
      setNoAnim(true);
      setIdx(i);
      requestAnimationFrame(() => requestAnimationFrame(() => setNoAnim(false)));
      return;
    }
    busy.current = true;
    setOut(true);
    setTimeout(() => setIdx(i), 380);
    setTimeout(() => { setOut(false); busy.current = false; }, 1250);
  }, []);

  useEffect(() => {
    if (idx < 0) return;
    history.replaceState(null, '', '#' + PROJECTS[idx].id);
    document.title = PROJECTS[idx].title + ' · ' + NAME;
  }, [idx]);

  // "All projects" index
  const openIndex = () => { if (!dialog.current!.open) dialog.current!.showModal(); };

  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (h === 'all') { if (idxRef.current === -1) set(0, false); openIndex(); return; }
      const k = PROJECTS.findIndex((p) => p.id === h);
      set(k === -1 ? 0 : k, idxRef.current !== -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (dialog.current!.open || (e.target as Element).matches('input,textarea')) return;
      if (e.key === 'ArrowLeft') set(idxRef.current - 1);
      if (e.key === 'ArrowRight') set(idxRef.current + 1);
    };
    let sx: number | null = null;
    const onUp = (e: PointerEvent) => {
      if (sx === null) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 60) set(idxRef.current + (dx < 0 ? 1 : -1));
    };
    const track = document.querySelector<HTMLElement>('.fx-track')!;
    const onDown = (e: PointerEvent) => { sx = e.clientX; };
    addEventListener('hashchange', fromHash);
    addEventListener('keydown', onKey);
    addEventListener('pointerup', onUp);
    track.addEventListener('pointerdown', onDown);
    fromHash();
    return () => {
      removeEventListener('hashchange', fromHash);
      removeEventListener('keydown', onKey);
      removeEventListener('pointerup', onUp);
      track.removeEventListener('pointerdown', onDown);
    };
  }, [set]);

  const shown = Math.max(idx, 0);
  const rootStyle = { '--fx-bg': `var(--fx-c${(shown % 5) + 1})`, '--fx-acc': `var(--fx-a${(shown % 5) + 1})` } as CSSProperties;

  return (
    <div data-theme="rjt" className={'fx' + (out ? ' fx-out' : '') + (noAnim ? ' no-anim' : '')} style={rootStyle}>
      <div className="fx-decor" aria-hidden="true"></div>
      <header className="fx-top">
        <a href="index.html#work" className="btn btn-sm btn-b bg-white">← Portfolio</a>
        <h1 className="sr-only">Rajhi John Tabora · project details</h1>
        <button type="button" className="btn btn-sm btn-b bg-white" aria-haspopup="dialog" onClick={openIndex}>All projects ▦</button>
      </header>
      <div className="fx-track" style={{ transform: `translateX(${-shown * 100}%)` }}>
        {PROJECTS.map((p, i) => <Slide key={p.id} p={p} i={i} total={n} active={i === idx} order={ORDER[i]} />)}
      </div>
      <nav className="fx-nav" aria-label="Project navigation">
        <button type="button" className="btn btn-b bg-white btn-square btn-lg text-2xl" aria-label="Previous project" onClick={() => set(idxRef.current - 1)}>←</button>
        <span className="bx-sm bg-white px-2 font-black" data-count aria-live="polite">{idx < 0 ? '' : `${pad2(idx + 1)} / ${pad2(n)}`}</span>
        <button type="button" className="btn btn-b bg-white btn-square btn-lg text-2xl" aria-label="Next project" onClick={() => set(idxRef.current + 1)}>→</button>
      </nav>
      <dialog
        ref={dialog}
        className="fx-index bx bg-[#f1eefb] rounded-box"
        aria-label="All projects"
        onClick={(e) => { if (e.target === dialog.current) dialog.current!.close(); }}
        onClose={() => { if (location.hash === '#all') history.replaceState(null, '', '#' + PROJECTS[idxRef.current].id); }}
      >
        <div className="fx-index-head"><p className="font-black text-3xl uppercase">All projects</p><button type="button" className="btn btn-sm btn-b bg-white" onClick={() => dialog.current!.close()}>Close ✕</button></div>
        <div className="fx-index-grid">
          {PROJECTS.map((p, i) => (
            <a key={p.id} href={'#' + p.id} className="fx-index-item bx-sm bg-white"
              onClick={(e) => { e.preventDefault(); dialog.current!.close(); set(i, idxRef.current !== -1); }}>
              <div className="fx-index-art border-b-3 border-black"><ProjectCover p={p} /></div>
              <p className="fx-kicker">{pad2(i + 1)} · {p.cat}</p>
              <p className="fx-index-title">{p.title}</p>
            </a>
          ))}
        </div>
      </dialog>
    </div>
  );
}
