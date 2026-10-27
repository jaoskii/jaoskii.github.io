import type { ReactNode } from 'react';
import { COVERS_V, type ArtKind, type Link, type Project } from '../data/projects';
import NdaArt from './NdaArt';

/* Mock artwork per project. Colours, stroke, radius and shadow come from --art-* custom properties,
   so each page themes the same drawing differently. */
const R = ({ x, y, w, h, c }: { x: number; y: number; w: number; h: number; c: string }) => <rect className={c} x={x} y={y} width={w} height={h} />;

const SHAPES: Record<ArtKind, () => ReactNode> = {
  tiles: () => <><R x={20} y={20} w={120} h={95} c="a0" /><R x={155} y={20} w={225} h={95} c="a1" /><R x={20} y={130} w={225} h={100} c="a2" /><R x={260} y={130} w={120} h={100} c="a3" /></>,
  form: () => <><R x={40} y={28} w={320} h={194} c="a0" /><R x={70} y={58} w={190} h={14} c="a2" /><R x={70} y={86} w={130} h={14} c="a3" /><R x={70} y={150} w={120} h={40} c="a1" /><circle className="a2" cx="318" cy="72" r="22" /></>,
  bars: () => <>{[60, 120, 90, 170, 130].map((h, i) => <R key={i} x={40 + i * 66} y={220 - h} w={46} h={h} c={i === 3 ? 'a1' : i === 1 ? 'a2' : 'a0'} />)}<R x={30} y={224} w={340} h={4} c="a3" /></>,
  phones: () => <><R x={105} y={22} w={84} h={206} c="a0" /><R x={118} y={44} w={58} h={34} c="a1" /><R x={118} y={88} w={58} h={10} c="a2" /><R x={118} y={106} w={40} h={10} c="a2" /><R x={212} y={12} w={84} h={206} c="a1" /><R x={225} y={34} w={58} h={120} c="a0" /></>,
  kit: () => <><R x={40} y={70} w={110} h={110} c="a0" /><R x={110} y={45} w={110} h={110} c="a1" /><R x={180} y={80} w={110} h={110} c="a2" /><R x={250} y={55} w={110} h={110} c="a3" /><circle className="a1" cx="340" cy="200" r="22" /></>,
};

export function MockArt({ kind }: { kind: ArtKind }) {
  return (
    <svg className="art-svg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <R x={0} y={0} w={400} h={250} c="bg" />
      {(SHAPES[kind] ?? SHAPES.tiles)()}
    </svg>
  );
}

/** Slide art: real screenshots, the NDA case file, or the mock drawing. */
export function ProjectArt({ p }: { p: Project }) {
  if (p.images) return null; // screenshot slides render their own collage (see work/ShotsCollage)
  return p.nda ? <NdaArt p={p} /> : <MockArt kind={p.art} />;
}

/** Card art: a static designed cover (assets/img/covers/<id>.jpg, rendered from the screenshots), else the slide art. */
export function ProjectCover({ p }: { p: Project }) {
  if (p.images && !p.nda) {
    return <img className="art-cover" src={`assets/img/covers/${p.id}.jpg?v=${COVERS_V}`} alt={`${p.title}: ${p.images[0][1]}`} loading="lazy" draggable="false" />;
  }
  return p.nda ? <NdaArt p={p} /> : <MockArt kind={p.art} />;
}

/** Official links → buttons that open in a new tab */
export function ProjectLinks({ links }: { links?: Link[] }) {
  return <>{(links ?? []).map(([label, url]) => <a key={url} className="btn btn-sm btn-b bg-white" href={url} target="_blank" rel="noopener">{label} ↗</a>)}</>;
}

export function Chips({ stack, className }: { stack: string[]; className: string }) {
  return <>{stack.map((s) => <span key={s} className={className}>{s}</span>)}</>;
}

/** `~~word~~` → a redaction bar of the same length (NDA projects only). */
export function Redacted({ text, on }: { text: string; on?: boolean }) {
  if (!on) return <>{text}</>;
  return <>{text.split(/~~(.+?)~~/).map((part, i) => (i % 2 ? <span key={i} className="redact" aria-label="redacted">{'█'.repeat(part.length)}</span> : part))}</>;
}

/** The kicker / type line suffix and two-digit counters used on both pages. */
export const projectType = (p: Project) => p.type + (p.nda ? ' · under NDA' : '');
