import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Project, ShotGroup } from '../data/projects';
import { RM, pad2 } from '../lib/motion';
import { LAYOUTS, ORDER, type Pos } from './layouts';

/* Screenshot slides: a scrapbook collage. The hero print sits in the middle, the rest pin around it.
   Click a print to make it the hero; tabs (from p.shotGroups) filter prints by group; the hero rotates on its own. */

interface Props {
  p: Project;
  /** index among the screenshot / NDA slides, picks a layout for projects without one */
  order: number;
  active: boolean;
  group: ShotGroup | undefined;
  onGroup: (g: ShotGroup) => void;
}

export default function ShotsCollage({ p, order, active, group, onGroup }: Props) {
  const images = p.images!;
  const groups = p.shotGroups;
  const place = LAYOUTS[p.layout!] || LAYOUTS[ORDER[order % ORDER.length]];
  const inGroup = (g: string) => images.map((_, k) => k).filter((k) => g === 'all' || images[k][2] === g);

  // shown = prints in the current group, lead first; base = the same prints in their original order (for the rotation)
  const [shown, setShown] = useState(() => images.map((_, k) => k));
  const base = useRef(shown);
  const cur = useRef(0);
  const hover = useRef(false);
  const box = useRef<HTMLDivElement>(null);
  const note = useRef<HTMLDivElement>(null);
  const prints = useRef<(HTMLElement | null)[]>([]);

  const hero = (k: number) => setShown((s) => {
    const at = s.indexOf(k);
    if (at <= 0) return s;
    const next = s.slice();
    [next[0], next[at]] = [next[at], next[0]];
    cur.current = base.current.indexOf(k);
    return next;
  });
  const filter = (g: ShotGroup) => {
    const s = inGroup(g.id);
    base.current = s; cur.current = 0;
    setShown(s);
    onGroup(g);
  };

  // move a print [x, y, w] (in % of the frame) out of the note card's box, or shrink it when there is no room
  function clearNote(pos: Pos): Pos {
    const nt = note.current, bx = box.current!;
    if (!nt || !nt.offsetParent) return pos;
    const B = bx.getBoundingClientRect(), R = nt.getBoundingClientRect();
    if (!B.width) return pos;
    const gap = 18, W = B.width, H = B.height;
    const n = { l: R.left - B.left - gap, t: R.top - B.top - gap, r: R.right - B.left + gap, b: R.bottom - B.top + gap };
    const [x, y, w, r] = pos, px = (x / 100) * W, py = (y / 100) * H, pw = (w / 100) * W;
    const ph = (v: number) => v * 0.625 + 46; // 16:10 shot + padding, caption and borders
    if (px >= n.r || px + pw <= n.l || py >= n.b || py + ph(pw) <= n.t) return pos;
    const minY = -0.06 * H, minX = -0.02 * W, maxX = W * 1.02, onLeft = n.l < W / 2;
    const moves: [cost: number, x: number, y: number, w: number][] = [];
    if (n.t - ph(pw) >= minY) moves.push([Math.abs(py - (n.t - ph(pw))), px, n.t - ph(pw), pw]);
    if (onLeft && n.r + pw <= maxX) moves.push([Math.abs(n.r - px), n.r, py, pw]);
    if (!onLeft && n.l - pw >= minX) moves.push([Math.abs(px - (n.l - pw)), n.l - pw, py, pw]);
    if (!moves.length) { // no room: shrink to whichever side leaves the bigger print
      const wUp = Math.max(0, (n.t - Math.max(py, minY) - 46) / 0.625), wSide = onLeft ? maxX - n.r : n.l - minX;
      moves.push(wUp >= wSide ? [0, px, n.t - ph(wUp), wUp] : [0, onLeft ? n.r : n.l - wSide, py, wSide]);
    }
    const [, nx, ny, nw] = moves.sort((a, b) => a[0] - b[0])[0];
    return [(nx / W) * 100, (ny / H) * 100, (nw / W) * 100, r];
  }

  // positions depend on the note card's measured box, so they are written straight to the prints after render
  const layout = () => {
    shown.forEach((k, j) => {
      const f = prints.current[k];
      if (!f) return;
      const [x, y, w, r] = clearNote(shown.length === 1 ? [9, 2, 82, -1] : place(j, shown.length)); // a lone shot gets the whole frame
      Object.assign(f.style, { left: x + '%', top: y + '%', width: w + '%', zIndex: String(j === 0 ? 30 : 10 + j) });
      f.style.setProperty('--r', r + 'deg');
    });
  };
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  useLayoutEffect(layout, [shown]);
  useEffect(() => { if (active) requestAnimationFrame(() => layoutRef.current()); }, [active]);
  useEffect(() => {
    let t = 0;
    const onResize = () => { clearTimeout(t); t = window.setTimeout(() => layoutRef.current(), 150); };
    addEventListener('resize', onResize);
    return () => { clearTimeout(t); removeEventListener('resize', onResize); };
  }, []);

  // the hero rotates through the group while the slide is showing and nobody is looking at a print
  const activeRef = useRef(active);
  activeRef.current = active;
  useEffect(() => {
    if (RM) return;
    const t = setInterval(() => {
      if (hover.current || document.hidden || base.current.length < 2 || !activeRef.current) return;
      cur.current = (cur.current + 1) % base.current.length;
      hero(base.current[cur.current]);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const picked = group?.id ?? 'all';
  return (
    <>
      {groups && (
        <div className="shot-tabs" role="group" aria-label="Filter screenshots">
          {groups.map((g) => (
            <button key={g.id} type="button" className="btn btn-sm btn-b bg-white" aria-pressed={g.id === picked} onClick={() => filter(g)}>
              {g.label} <span className="n">{pad2(inGroup(g.id).length)}</span>
            </button>
          ))}
        </div>
      )}
      <div ref={box} className="art-shots shots-stack" onPointerEnter={() => (hover.current = true)} onPointerLeave={() => (hover.current = false)}>
        {images.map(([src, alt, , label], k) => (
          <figure
            key={src}
            ref={(el) => { prints.current[k] = el; }}
            className={'print' + (k % 3 === 1 ? ' tape' : '') + (shown.includes(k) ? '' : ' off') + (shown[0] === k ? ' lead' : '')}
            tabIndex={0}
            onClick={() => hero(k)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); hero(k); } }}
          >
            <img src={src} alt={alt} draggable="false" />
            {label && <figcaption>{label}</figcaption>}
          </figure>
        ))}
        {groups && (
          <div ref={note} className={'shot-note' + (p.layout === 'cascade' ? ' at-right' : '')}>
            <h3>{(group ?? groups[0]).label}</h3>
            <p>{(group ?? groups[0]).note}</p>
            <small>{pad2(shown.length)} SHOTS · CLICK ONE ↗</small>
          </div>
        )}
      </div>
    </>
  );
}
