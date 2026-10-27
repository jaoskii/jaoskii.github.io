import { useSnapSlider } from '../lib/useSnapSlider';

const STEPS = 5;

export default function Process() {
  const { root, track, i, go } = useSnapSlider<HTMLElement>();
  return (
    <section ref={root} id="process" className="flex flex-col gap-5 scroll-mt-8" aria-roledescription="carousel" aria-label="Process">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 className="wide font-black text-5xl sm:text-7xl uppercase">Process<span className="text-accent">.</span></h2>
        <div className="flex gap-3"><button type="button" className="btn btn-b bg-white btn-square btn-lg text-2xl" onClick={() => go(i - 1)} aria-label="Previous step">←</button><button type="button" className="btn btn-b bg-white btn-square btn-lg text-2xl" onClick={() => go(i + 1)} aria-label="Next step">→</button></div>
      </div>
      <div ref={track} className="track">
        <article className="step-card bx bg-primary rounded-box p-6 flex flex-col gap-3 min-h-60"><span className="wide font-black text-6xl">01</span><h3 className="wide font-black text-2xl uppercase">Gather</h3><p className="font-medium">Sit with product, ops, QA and the client. Rules, limits and edge cases on paper before code.</p></article>
        <article className="step-card bx bg-secondary rounded-box p-6 flex flex-col gap-3 min-h-60"><span className="wide font-black text-6xl">02</span><h3 className="wide font-black text-2xl uppercase">Plan</h3><p className="font-medium">Process flows, roadmap, sprint scope. Branching strategy set on day one.</p></article>
        <article className="step-card bx bg-accent rounded-box p-6 flex flex-col gap-3 min-h-60"><span className="wide font-black text-6xl">03</span><h3 className="wide font-black text-2xl uppercase">Design</h3><p className="font-medium">Schema from scratch, API contracts, screens that fit the existing architecture.</p></article>
        <article className="step-card bx bg-success rounded-box p-6 flex flex-col gap-3 min-h-60"><span className="wide font-black text-6xl">04</span><h3 className="wide font-black text-2xl uppercase">Build</h3><p className="font-medium">Shippable increments each sprint. Web, APIs and Flutter. Code review, AI-assisted.</p></article>
        <article className="step-card bx bg-white rounded-box p-6 flex flex-col gap-3 min-h-60"><span className="wide font-black text-6xl">05</span><h3 className="wide font-black text-2xl uppercase">Deploy</h3><p className="font-medium">Automated pipelines take every change from review to production. Web and mobile releases, then a clean handover so your team owns it.</p></article>
      </div>
      <div className="dots">
        {Array.from({ length: STEPS }, (_, n) => (
          <button key={n} type="button" className="dot" aria-label={`Go to slide ${n + 1}`} aria-current={n === i} onClick={() => go(n)} />
        ))}
      </div>
    </section>
  );
}
