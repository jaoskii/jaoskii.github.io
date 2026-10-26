import { useRef, useState } from 'react';
import { RM, replay } from '../lib/motion';

/** Profile card + bio. `onCvOpened` shows the page's "CV opened" toast. */
export default function Profile({ onCvOpened }: { onCvOpened: () => void }) {
  const [photo, setPhoto] = useState(true);
  const cvCard = useRef<HTMLDivElement>(null);
  // the link opens the PDF in a new tab; shake the card, then toast
  const cvClick = () => {
    if (RM || !cvCard.current) return onCvOpened();
    replay(cvCard.current, 'shake', onCvOpened);
  };
  return (
    <section id="profile" className="grid lg:grid-cols-[20rem_1fr] gap-6 scroll-mt-8">
      <div className="bx bg-secondary rounded-box p-6 flex flex-col items-center gap-5 overflow-visible">
        <div className="relative -rotate-3">
          <div className="bx bg-primary w-56 h-64 overflow-hidden relative">
            <span className="absolute inset-0 grid place-items-center wide font-black text-7xl">RT</span>
            {photo && <img src="assets/img/profile.jpg" alt="Portrait of Rajhi John Tabora at his desk" className="absolute inset-0 w-full h-full object-cover object-[50%_42%] grayscale contrast-110" onError={() => setPhoto(false)} />}
          </div>
          <span className="bx-sm bg-accent mono text-xs font-semibold px-2 py-1 absolute -bottom-3 -left-3 rotate-6">EST. 2015</span>
          <span className="bx-sm bg-success mono text-xs font-semibold px-2 py-1 absolute -top-3 -right-3 -rotate-6">★ FULL STACK</span>
        </div>
        <p className="mono font-semibold bg-white bx-sm px-2 mt-2">FULL STACK + MOBILE</p>
        <p className="bx-sm bg-white rounded px-3 py-2 text-sm font-semibold text-center leading-relaxed">💻 Fullstack Dev<br />📸 Photographer<br />🎮 Gamer<br />Debugging like it's a boss fight ⚔️</p>
        <div className="flex gap-2 flex-wrap justify-center w-full"><a href="https://github.com/jaoskii" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">GITHUB</a><a href="https://linkedin.com/in/jaoski" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">LINKEDIN</a></div>
        <div ref={cvCard} id="cv-card" className="bx bg-accent rounded-box p-5 flex flex-col items-center gap-4 w-[calc(100%+2.5rem)] -mx-5 mt-auto mb-6 rotate-6 relative z-10">
          <p className="wide font-black text-lg uppercase self-start">Download CV</p>
          <a href="assets/Rajhi-John-Tabora-CV.pdf?v=20261026" target="_blank" rel="noopener" id="cv-dl" onClick={cvClick} aria-label="Open CV (PDF) in a new tab" className="btn btn-b w-32 h-32 rounded-full bg-[#ff2d2d] text-base-100 border-black hover:bg-[#e02424] grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /><line x1="8" y1="9" x2="10" y2="9" /></svg>
          </a>
        </div>
      </div>
      <div className="bx bg-white rounded-box p-6 sm:p-8 flex flex-col gap-5">
        <div>
          <h2 className="wide font-black text-4xl sm:text-6xl uppercase">Who dis<span className="text-secondary">?</span></h2>
          <p className="wide font-black text-xl uppercase bg-primary w-fit px-2 mt-2">Built to ship. Built to own.</p>
        </div>
        <p className="text-lg font-medium">I'm a senior full stack and mobile developer from Caloocan, Philippines, at home on every layer. Front ends in TypeScript with React, Next.js, Vue / Nuxt and Angular, plus WordPress. Back ends and APIs in Node (NestJS, Express), Laravel and Django: REST and GraphQL design, JWT / OAuth auth, payment gateway integrations. Underneath it all, MySQL, PostgreSQL and SQL Server, with schemas designed from scratch, multi-tenant data models and queries tuned for production load. Flutter on mobile, Docker and AWS to ship it. Plus the business tools around the code: GoHighLevel CRM, Asana and n8n workflow automation.</p>
        <p className="text-lg font-medium">Since 2015 I've led web teams at Solutionbase and Cushyfy, led mobile development at <strong className="bg-primary px-1">Rebisco, one of the Philippines' FMCG giants</strong>, where I fixed the deployment pipelines and introduced automated deployments for the mobile development team, built a WMATA transit app and its backend for Diversified Robotics, a foreign company based in the US, and shipped Installments and Bills payment for <strong className="bg-primary px-1">Maya, one of the Philippines' fintech giants</strong>, through Ascendion. Right now I'm at Vault Outsourcing, modernizing an offshore team's process with AI-assisted development, continuous integration and automated deployments, while building the APIs, web apps and mobile app behind My Money House and Megarewards.</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bx-sm bg-accent p-3"><p className="wide font-black text-3xl">10+</p><p className="mono text-xs">YEARS</p></div>
          <div className="bx-sm bg-primary p-3"><p className="wide font-black text-3xl">3</p><p className="mono text-xs">TEAM WORKFLOWS MODERNIZED</p></div>
          <div className="bx-sm bg-success p-3"><p className="wide font-black text-3xl">4</p><p className="mono text-xs">INDUSTRIES</p></div>
        </div>
        <dl className="grid sm:grid-cols-2 border-3 border-black">
          <div className="p-3 border-b-3 sm:border-r-3 border-black"><dt className="mono text-xs font-semibold">BASED IN</dt><dd className="font-black">Caloocan, PH · UTC+8</dd></div>
          <div className="p-3 border-b-3 border-black"><dt className="mono text-xs font-semibold">AVAILABLE</dt><dd className="font-black">Remote · EST / CST / PST overlap</dd></div>
          <div className="p-3 border-b-3 sm:border-r-3 border-black"><dt className="mono text-xs font-semibold">CURRENTLY</dt><dd className="font-black">Vault Outsourcing → My Money House</dd></div>
          <div className="p-3 border-b-3 border-black"><dt className="mono text-xs font-semibold">I DO</dt><dd className="font-black">Frontend · Backend · APIs · Deployments · CI/CD · Web · Mobile&nbsp;Apps</dd></div>
          <div className="p-3 border-b-3 sm:border-b-0 sm:border-r-3 border-black"><dt className="mono text-xs font-semibold">EDUCATION</dt><dd className="font-black">BS Computer Science, UCC · 2015</dd></div>
          <div className="p-3 border-black"><dt className="mono text-xs font-semibold">LANGUAGES</dt><dd className="font-black">Filipino · English (B2)</dd></div>
        </dl>
      </div>
    </section>
  );
}
