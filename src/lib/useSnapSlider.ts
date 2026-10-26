import { useCallback, useEffect, useRef, useState } from 'react';
import { RM } from './motion';

/** Scroll-snap slider: arrows, dots, mouse drag and arrow keys. Put `root` on the section and `track` on the scroller. */
export function useSnapSlider<R extends HTMLElement = HTMLElement>() {
  const root = useRef<R>(null);
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const iRef = useRef(0);

  const slides = () => [...(track.current?.children ?? [])].filter((s) => !(s as HTMLElement).hidden) as HTMLElement[];
  const pad = () => parseFloat(getComputedStyle(track.current!).paddingLeft) || 0;
  const mark = (n: number) => {
    iRef.current = n;
    setI(n);
  };

  const go = useCallback((n: number, smooth = true) => {
    const t = track.current, s = slides();
    if (!t || !s.length) return;
    const k = (n + s.length) % s.length;
    t.scrollTo({ left: s[k].offsetLeft - pad(), behavior: smooth && !RM ? 'smooth' : 'auto' });
    mark(k);
  }, []);

  useEffect(() => {
    const t = track.current!, r = root.current!;
    const nearest = () => {
      const s = slides(), x = t.scrollLeft + pad();
      if (t.scrollLeft >= t.scrollWidth - t.clientWidth - 2) return s.length - 1;
      let best = 0, d = Infinity;
      s.forEach((el, n) => {
        const dd = Math.abs(el.offsetLeft - x);
        if (dd < d) { d = dd; best = n; }
      });
      return best;
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { const n = nearest(); if (n !== iRef.current) mark(n); });
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as Element).matches('input,textarea')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(iRef.current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(iRef.current + 1); }
    };
    // mouse drag (touch scrolls natively)
    let sx = 0, sl = 0, down = false, moved = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0; sx = e.clientX; sl = t.scrollLeft;
      t.style.scrollSnapType = 'none'; t.classList.add('dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      moved = Math.abs(e.clientX - sx);
      t.scrollLeft = sl - (e.clientX - sx);
    };
    const onUp = () => {
      if (!down) return;
      down = false; t.classList.remove('dragging'); t.style.scrollSnapType = '';
      go(nearest());
    };
    const onClick = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
    const noDrag = (e: DragEvent) => e.preventDefault();
    const onResize = () => go(iRef.current, false);

    t.addEventListener('scroll', onScroll);
    r.addEventListener('keydown', onKey);
    t.addEventListener('pointerdown', onDown);
    addEventListener('pointermove', onMove);
    addEventListener('pointerup', onUp);
    t.addEventListener('click', onClick, true);
    t.addEventListener('dragstart', noDrag);
    addEventListener('resize', onResize);
    t.scrollLeft = 0;
    return () => {
      cancelAnimationFrame(raf);
      t.removeEventListener('scroll', onScroll);
      r.removeEventListener('keydown', onKey);
      t.removeEventListener('pointerdown', onDown);
      removeEventListener('pointermove', onMove);
      removeEventListener('pointerup', onUp);
      t.removeEventListener('click', onClick, true);
      t.removeEventListener('dragstart', noDrag);
      removeEventListener('resize', onResize);
    };
  }, [go]);

  return { root, track, i, go };
}
