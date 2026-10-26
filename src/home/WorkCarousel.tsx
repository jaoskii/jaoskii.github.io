import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Chips, ProjectCover, Redacted } from '../components/ProjectArt';
import { PROJECTS } from '../data/projects';
import { RM, pad2 } from '../lib/motion';

/* Center-focus carousel (after carousel-slider.uiinitiative.com).
   Clicking the centre card opens work.html#<project-id>; clicking a side card brings it to the centre. */
const SHIFT = 62; // side card centre offset, % of card width
const AUTO = 5500;
const CHIP = 'badge border-2 border-black font-bold';
const n = PROJECTS.length;
const mod = (k: number) => ((k % n) + n) % n;
const wrap = (o: number) => ((((o + n / 2) % n) + n) % n) - n / 2;

export default function WorkCarousel() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [pos, setPosState] = useState(0);
  const posRef = useRef(0);
  const setPos = (p: number) => { posRef.current = p; setPosState(p); };
  const go = useCallback((target: number) => setPos(Math.round(target)), []);
  const toIndex = (k: number) => go(posRef.current + wrap(k - posRef.current));
  const idx = mod(Math.round(pos));

  const [side, setSide] = useState(0.62);
  const [height, setHeight] = useState<number>();
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const hover = useRef(false);
  const drag = useRef({ sx: 0, sp: 0, down: false, moved: 0 });

  // the stage holds absolutely positioned cards, so it takes the tallest card's height
  useLayoutEffect(() => {
    const measure = () => {
      const slides = [...stage.current!.children] as HTMLElement[];
      setHeight(Math.max(...slides.map((s) => s.offsetHeight)));
      setSide(parseFloat(getComputedStyle(root.current!).getPropertyValue('--cz-side')) || 0.62);
    };
    measure();
    addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => removeEventListener('resize', measure);
  }, []);

  // drag / swipe (no pointer capture, so the centre card's link still clicks)
  useEffect(() => {
    const d = drag.current;
    const onMove = (e: PointerEvent) => {
      if (!d.down) return;
      const dx = e.clientX - d.sx;
      d.moved = Math.max(d.moved, Math.abs(dx));
      if (d.moved > 6) {
        setDragging(true);
        const w = (stage.current!.firstElementChild as HTMLElement).offsetWidth;
        setPos(d.sp - dx / ((w * SHIFT) / 100));
      }
    };
    const onUp = () => {
      if (!d.down) return;
      d.down = false;
      setDragging(false);
      if (d.moved > 6) go(posRef.current);
    };
    addEventListener('pointermove', onMove);
    addEventListener('pointerup', onUp);
    return () => { removeEventListener('pointermove', onMove); removeEventListener('pointerup', onUp); };
  }, [go]);

  // autoplay with a pause button; hover/focus also pauses
  useEffect(() => {
    if (RM) return;
    const t = setInterval(() => { if (!pausedRef.current && !hover.current && !document.hidden) go(posRef.current + 1); }, AUTO);
    return () => clearInterval(t);
  }, [go]);

  const onSlideClick = (e: MouseEvent, k: number) => {
    if (drag.current.moved > 6) return e.preventDefault();
    if (k !== idx) { e.preventDefault(); toIndex(k); }
  };
  const hovering = (on: boolean) => () => { hover.current = on; };

  return (
    <section
      ref={root}
      id="work"
      className="cz flex flex-col gap-4 scroll-mt-8"
      aria-roledescription="carousel"
      aria-label="Selected work"
      onPointerEnter={hovering(true)}
      onPointerLeave={hovering(false)}
      onFocus={hovering(true)}
      onBlur={hovering(false)}
      onKeyDown={(e) => {
        if ((e.target as Element).matches('input,textarea')) return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(posRef.current - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(posRef.current + 1); }
      }}
    >
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 className="wide font-black text-5xl sm:text-7xl uppercase">Work<span className="text-secondary">.</span></h2>
        <a href="work.html#all" className="btn btn-b bg-white">View all projects →</a>
      </div>
      <div
        ref={stage}
        className={'cz-stage' + (dragging ? ' dragging' : '')}
        style={{ height }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          Object.assign(drag.current, { down: true, moved: 0, sx: e.clientX, sp: posRef.current });
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {PROJECTS.map((p, k) => {
          const o = wrap(k - pos), a = Math.abs(o);
          const scale = a <= 1 ? 1 - (1 - side) * a : side - (a - 1) * 0.14;
          const x = Math.sign(o) * (a <= 1 ? a * SHIFT : SHIFT + (a - 1) * SHIFT * 0.55);
          const centre = a < 0.5;
          const style = {
            transform: `translateX(calc(-50% + ${x}%)) scale(${scale})`,
            zIndex: 100 - Math.round(a * 10),
            opacity: a > 2.2 ? 0 : 1,
            pointerEvents: a > 1.6 ? 'none' : undefined,
            '--a': Math.min(a, 1).toFixed(3),
          } as CSSProperties;
          return (
            <a key={p.id} className={'cz-slide' + (centre ? ' is-center' : '')} href={`work.html#${p.id}`} tabIndex={centre ? 0 : -1} style={style}
              aria-roledescription="slide" aria-label={`${k + 1} of ${n}: ${p.title}`} onClick={(e) => onSlideClick(e, k)}>
              <article className="bx bg-white rounded-box overflow-hidden flex flex-col">
                <div className="cz-art cz-tint border-b-3 border-black p-3"><ProjectCover p={p} /></div>
                <div className="cz-fade p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap"><span className="mono text-sm font-semibold">{pad2(k + 1)}/{pad2(n)} · {p.cat}</span><span className="flex gap-2"><Chips stack={p.stack} className={CHIP} /></span></div>
                  <h3 className="wide font-black text-2xl sm:text-3xl uppercase">{p.title}</h3>
                  <p className="font-medium line-clamp-2"><Redacted text={p.desc} on={p.nda} /></p>
                  <span className="cz-cta btn btn-b btn-neutral w-fit">OPEN CASE →</span>
                </div>
              </article>
            </a>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="dots">
          {PROJECTS.map((p, k) => <button key={p.id} type="button" className="dot" aria-label={'Show ' + p.title} aria-current={k === idx} onClick={() => toIndex(k)} />)}
        </div>
        <div className="flex items-center gap-2">
          <span className="wide font-black text-3xl tabular-nums" data-count aria-live="polite">{pad2(idx + 1)} / {pad2(n)}</span>
          <button type="button" className="btn btn-b bg-white btn-square" hidden={RM} aria-label={paused ? 'Start autoplay' : 'Pause autoplay'}
            onClick={() => { pausedRef.current = !paused; setPaused(!paused); }}>{paused ? '▶' : '❚❚'}</button>
          <button type="button" className="btn btn-b btn-primary btn-square btn-lg text-2xl" aria-label="Previous project" onClick={() => go(posRef.current - 1)}>←</button>
          <button type="button" className="btn btn-b btn-secondary btn-square btn-lg text-2xl" aria-label="Next project" onClick={() => go(posRef.current + 1)}>→</button>
        </div>
      </div>
    </section>
  );
}
