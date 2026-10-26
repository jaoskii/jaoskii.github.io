import type { PointerEvent } from 'react';

/* Draggable stickers: one pointer at a time, captured by the sticker it grabbed */
const grab = { on: false, ox: 0, oy: 0 };
const sticker = {
  onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    grab.on = true; grab.ox = e.clientX - r.left; grab.oy = e.clientY - r.top;
    el.setPointerCapture(e.pointerId); el.classList.add('grabbed');
  },
  onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!grab.on) return;
    const el = e.currentTarget, p = (el.offsetParent as HTMLElement).getBoundingClientRect();
    el.style.left = e.clientX - p.left - grab.ox + 'px'; el.style.top = e.clientY - p.top - grab.oy + 'px'; el.style.right = 'auto';
  },
  onPointerUp(e: PointerEvent<HTMLDivElement>) {
    grab.on = false; e.currentTarget.classList.remove('grabbed');
  },
};

/** Hero with draggable stickers and the stack marquee (direction and pause come from the control panel). */
export default function Hero({ reverse, paused }: { reverse: boolean; paused: boolean }) {
  return (
    <header id="top" className="min-h-[100svh] flex flex-col">
      <div className="hero-nav mx-auto w-full max-w-6xl px-4 sm:px-6 pt-8">
        <nav className="bx bg-white rounded-box px-4 py-3 flex items-center gap-3 flex-wrap">
          <a href="#top" className="jlogo" aria-label="jaoski.dev, back to top"><span className="jl-mark" aria-hidden="true">j</span><span className="jl-word">aoski</span><span className="jl-dev">.dev</span></a>
          <div className="flex-1"></div>
          <div className="hidden md:flex gap-4 mono text-sm font-semibold"><a href="#work" className="hover:bg-primary px-1">work</a><a href="#experience" className="hover:bg-secondary px-1">experience</a><a href="#stack" className="hover:bg-accent px-1">stack</a><a href="#process" className="hover:bg-secondary px-1">process</a><a href="#contact" className="hover:bg-primary px-1">contact</a></div>
          <a href="#contact" className="btn btn-sm btn-b btn-secondary">HIRE ME</a>
        </nav>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 flex-1 flex flex-col justify-center gap-8 py-12" id="sticker-zone">
        <span className="mono text-sm font-semibold bg-white bx-sm rounded w-fit px-2 py-1">SENIOR FULL STACK + MOBILE · CALOOCAN, PH · REMOTE</span>
        <h1 className="wide font-black uppercase hero-title">
          <span className="mega-lead">I ship</span>
          <span className="mega">Full stack.<br /><span className="hl whitespace-nowrap">Full speed.</span><br />For real.</span>
        </h1>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 items-end">
          <p className="hero-bio text-xl sm:text-2xl font-medium max-w-2xl">Rajhi John Tabora. 10+ years shipping production web, APIs and mobile apps across fintech, FMCG, e-learning and e-commerce. Photographer and gamer off the clock, so every bug gets treated like a boss fight.</p>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a href="#work" className="btn btn-lg btn-b btn-neutral">SEE WORK →</a>
            <a href="#contact" className="btn btn-lg btn-b bg-white">CONTACT</a>
          </div>
        </div>
        {/* draggable stickers */}
        <div {...sticker} className="sticker bx bg-accent rounded-full w-28 h-28 hidden sm:grid place-items-center text-center wide font-black leading-none rotate-[10deg]" style={{top: '8%', right: '4%'}} aria-hidden="true"><span>10+<br /><span className="text-xs mono">YEARS</span></span></div>
        <div {...sticker} className="sticker bx bg-primary rounded px-3 py-2 mono font-semibold -rotate-6 hidden lg:block" style={{top: '40%', right: '8%'}} aria-hidden="true">★ FLUTTER</div>
        <div {...sticker} className="sticker bx bg-success rounded px-3 py-2 mono font-semibold rotate-3 hidden lg:flex items-center gap-2" style={{top: '24%', right: '22%'}} aria-hidden="true"><span className="status status-neutral"></span>OPEN TO REMOTE · US HOURS</div>
        <div {...sticker} className="sticker bx-sm bg-secondary rounded px-3 py-2 mono font-semibold rotate-[5deg] hidden lg:block" style={{top: '3%', right: '36%'}} aria-hidden="true">◎ WEB</div>
        <div {...sticker} className="sticker bx-sm bg-white rounded px-3 py-2 mono font-semibold -rotate-[4deg] hidden lg:block" style={{top: '12%', right: '56%'}} aria-hidden="true">▶ FRONTEND</div>
        <div {...sticker} className="sticker bx-sm bg-accent rounded px-3 py-2 mono font-semibold -rotate-[3deg] hidden lg:block" style={{top: '58%', right: '30%'}} aria-hidden="true">{'{'} {'}'} BACKEND / APIS</div>
        <div {...sticker} className="sticker bx-sm bg-white rounded px-3 py-2 mono font-semibold rotate-[6deg] hidden lg:block" style={{top: '52%', right: '1%'}} aria-hidden="true">⇄ PIPELINES</div>
        <div {...sticker} className="sticker bx-sm bg-primary rounded px-3 py-2 mono font-semibold rotate-[-7deg] hidden lg:block" style={{top: '66%', right: '12%'}} aria-hidden="true">↑ DEPLOYMENT</div>
        <p className="mono text-xs font-semibold absolute bottom-3 right-6 hidden lg:block">↑ DRAG THE STICKERS</p>
      </div>

      <div className="hero-marquee bx bg-neutral text-neutral-content py-3 overflow-hidden border-x-0 rotate-[-1deg] mb-10 mx-[-1rem]" aria-hidden="true">
        <div className={`marquee wide font-black text-3xl uppercase${reverse ? ' rev' : ''}`} style={paused ? { animationPlayState: 'paused' } : undefined}>
          <span>TypeScript ✦ React ✦ Next.js ✦ Vue 3 ✦ Nuxt ✦ Angular ✦ Laravel ✦ NestJS ✦ Node ✦ MySQL ✦ PostgreSQL ✦ Flutter ✦ Docker ✦ AWS ✦ n8n ✦ GoHighLevel ✦ WordPress ✦</span><span>TypeScript ✦ React ✦ Next.js ✦ Vue 3 ✦ Nuxt ✦ Angular ✦ Laravel ✦ NestJS ✦ Node ✦ MySQL ✦ PostgreSQL ✦ Flutter ✦ Docker ✦ AWS ✦ n8n ✦ GoHighLevel ✦ WordPress ✦</span>
        </div>
      </div>
    </header>
  );
}
