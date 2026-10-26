import { useRef, useState } from 'react';
import { RM, replay } from '../lib/motion';
import { PALETTES, type Look } from './look';

/** "Control panel": palette, shadow offset and marquee knobs for the whole page, plus the big button. */
export default function Lab({ look, setLook }: { look: Look; setLook: (patch: Partial<Look>) => void }) {
  const [hits, setHits] = useState(0);
  const bigCard = useRef<HTMLDivElement>(null);
  const press = () => {
    setHits((h) => h + 1);
    if (!RM && bigCard.current) replay(bigCard.current, 'shake');
  };
  return (
    <section id="lab" className="flex flex-col gap-6 scroll-mt-8">
      <h2 className="wide font-black text-5xl sm:text-7xl uppercase">Control panel<span className="text-primary">.</span></h2>
      <p className="mono font-semibold -mt-3">THESE KNOBS CHANGE THE WHOLE PAGE. GO ON.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bx bg-white rounded-box p-5 flex flex-col gap-4">
          <p className="mono font-semibold text-sm">01 / PALETTE</p>
          <div className="flex gap-2" id="pal-preview" aria-hidden="true"><span className="bx-sm bg-primary w-10 h-10 rounded"></span><span className="bx-sm bg-secondary w-10 h-10 rounded"></span><span className="bx-sm bg-accent w-10 h-10 rounded"></span></div>
          <button type="button" className="btn btn-b btn-primary mt-auto" id="shuffle" onClick={() => setLook({ palette: (look.palette + 1) % PALETTES.length })}>SHUFFLE COLORS</button>
          <p className="mono text-xs" id="pal-name" aria-live="polite">PALETTE: {PALETTES[look.palette][0]}</p>
        </div>
        <div className="bx bg-white rounded-box p-5 flex flex-col gap-4">
          <p className="mono font-semibold text-sm">02 / SHADOW</p>
          <div className="wide font-black text-5xl tabular-nums"><output id="sh-out">{look.shadow}</output><span className="text-xl">PX</span></div>
          <input type="range" min="0" max="16" value={look.shadow} onChange={(e) => setLook({ shadow: +e.target.value })} className="range range-neutral" id="sh" aria-label="Shadow offset" />
          <p className="mono text-xs">OFFSET FOR EVERY BOX ON THE PAGE.</p>
        </div>
        <div className="bx bg-white rounded-box p-5 flex flex-col gap-4">
          <p className="mono font-semibold text-sm">03 / MARQUEE</p>
          <label className="flex flex-col gap-2 mono text-xs font-semibold">SPEED<input type="range" min="4" max="60" value={look.speed} onChange={(e) => setLook({ speed: +e.target.value })} className="range range-secondary" id="mq-speed" style={{ direction: 'rtl' }} aria-label="Marquee speed" /></label>
          <button type="button" className="btn btn-b bg-white mt-auto" id="mq-dir" aria-pressed={look.reverse} onClick={() => setLook({ reverse: !look.reverse })}>⇄ REVERSE</button>
          <button type="button" className="btn btn-b bg-white" id="mq-pause" aria-pressed={look.paused} onClick={() => setLook({ paused: !look.paused })}>{look.paused ? '▶ PLAY' : '❚❚ PAUSE'}</button>
        </div>
        <div ref={bigCard} className="bx bg-secondary rounded-box p-5 flex flex-col items-center gap-4">
          <p className="mono font-semibold text-sm self-start">04 / BIG BUTTON</p>
          <button type="button" className="btn btn-b btn-neutral w-32 h-32 rounded-full wide font-black text-2xl" id="big" onClick={press}>{hits && hits % 10 === 0 ? 'WOW' : 'PRESS'}</button>
          <p className="wide font-black text-3xl tabular-nums" aria-live="polite"><span id="big-n">{hits}</span> <span className="text-base mono">HITS</span></p>
        </div>
      </div>
    </section>
  );
}
