import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Chips, ProjectArt, ProjectLinks, Redacted, projectType } from '../components/ProjectArt';
import type { Project, ShotGroup } from '../data/projects';
import { RM, pad2 } from '../lib/motion';
import ShotsCollage from './ShotsCollage';

export const CHIP = 'badge border-2 border-black font-bold bg-white';

interface Props {
  p: Project;
  i: number;
  total: number;
  active: boolean;
  /** index among the screenshot / NDA slides */
  order: number;
}

/** One full-screen case study: art (or screenshot collage), big title and the details card. */
export default function Slide({ p, i, total, active, order }: Props) {
  const big = !!(p.images || p.nda); // screenshots and NDA case files share the big-frame layout
  const title = useRef<HTMLHeadingElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const details = useRef<HTMLDivElement>(null);

  // a group's own desc / points / stack / links replace the project's while its tab is picked
  const [group, setGroup] = useState<ShotGroup>();
  const own: Partial<ShotGroup> = group && group.id !== 'all' ? group : {};
  const shownGroup = useRef(group);
  useEffect(() => {
    if (shownGroup.current === group) return;
    shownGroup.current = group;
    if (!RM) details.current?.animate([{ opacity: 0.35, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'ease-out' });
  }, [group]);

  // long titles wrap to two lines: drop the frame (and any tabs) below whatever height the title takes
  useLayoutEffect(() => {
    if (!big) return;
    const fit = () => { frame.current!.style.marginTop = innerWidth >= 768 ? title.current!.offsetHeight + 64 + 'px' : ''; };
    fit();
    addEventListener('resize', fit);
    return () => removeEventListener('resize', fit);
  }, [big]);

  return (
    <section
      className={'fx-slide' + (big ? ' has-shots' : '') + (p.nda ? ' is-nda' : '') + (active ? ' is-active' : '')}
      inert={!active}
      aria-roledescription="slide"
      aria-label={`${i + 1} of ${total}: ${p.title}`}
    >
      <div ref={frame} className="fx-frame bx bg-white p-3">
        {p.images ? <ShotsCollage p={p} order={order} active={active} group={group} onGroup={setGroup} /> : <ProjectArt p={p} />}
      </div>
      <h2 ref={title} className="fx-title " data-text={p.title}>{p.title}</h2>
      <div ref={details} className="fx-details bx bg-white rounded-box p-5">
        <p className="fx-kicker">{pad2(i + 1)} / {pad2(total)} · {p.cat}{own.label ? ' · ' + own.label : ''}</p>
        <p className="fx-desc"><Redacted text={own.desc || p.desc} on={p.nda} /></p>
        <ul className="fx-points">{(own.points || p.points).map((s) => <li key={s}><Redacted text={s} on={p.nda} /></li>)}</ul>
        <div className="fx-chips"><Chips stack={own.stack || p.stack} className={CHIP} /></div>
        <div className="fx-links"><ProjectLinks links={own.links || p.links} /></div>
        <p className="fx-type">{projectType(p)}</p>
      </div>
    </section>
  );
}
