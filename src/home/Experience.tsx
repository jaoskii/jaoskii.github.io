import { useRef, useState } from 'react';

export default function Experience() {
  const list = useRef<HTMLOListElement>(null);
  const [allOpen, setAllOpen] = useState(false);
  const items = () => [...list.current!.querySelectorAll('details')];
  const sync = () => setAllOpen(items().every((d) => d.open));
  // expand / collapse all; each <details> reports back through onToggle
  const toggleAll = () => {
    const open = !items().every((d) => d.open);
    items().forEach((d) => (d.open = open));
    sync();
  };
  return (
    <section id="experience" className="flex flex-col gap-6 scroll-mt-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 className="wide font-black text-4xl sm:text-7xl uppercase">Experience<span className="text-accent">.</span></h2>
        <button type="button" className="btn btn-b bg-white" id="xp-toggle" aria-pressed={allOpen} onClick={toggleAll}>{allOpen ? 'COLLAPSE ALL ↑' : 'EXPAND ALL ↓'}</button>
      </div>
      <ol ref={list} className="tl" id="xp">
        <li className="tl-item">
          <p className="tl-when wide font-black"><span className="tl-y">NOW</span><span className="mono text-xs font-semibold">FROM 2026</span></p>
          <span className="tl-node bg-secondary tl-now" aria-hidden="true"></span>
          <details onToggle={sync} className="xp bx bg-white rounded-box" open>
            <summary className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer">
              <span className="wide font-black text-3xl sm:text-4xl tabular-nums hidden sm:inline">01</span>
              <span className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="wide font-black text-lg sm:text-2xl uppercase leading-tight">Senior Backend & API Integrations Developer</span>
                <span className="font-semibold">Vault Outsourcing · Client: My Money House</span>
                <span className="mono text-xs font-semibold flex flex-wrap gap-2"><span className="bg-neutral text-neutral-content px-1">05/2026 - Present</span><span>Remote</span><span className="badge bg-secondary border-2 border-black badge-sm font-bold">APIs / DevOps</span></span>
              </span>
              <span className="xp-ico bx-sm bg-secondary w-10 h-10 grid place-items-center wide font-black text-2xl shrink-0" aria-hidden="true"><span className="xp-plus">+</span></span>
            </summary>
            <div className="border-t-3 border-black p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-lg">Brought in to modernize an offshore team's entire delivery workflow while building the APIs, web front ends and mobile app behind the client's product suite.</p>
                <ul className="list-[square] pl-5 flex flex-col gap-2 font-medium"><li>Built backend APIs for Megarewards, plus APIs and front ends for My Money House and the Somersoft Investment Analysis System.</li><li>Modernized megarewards.au and built reporting dashboards for it and for Somersoft.</li><li>Integrated the iGO Direct discount offers API and wired new integrations into the existing CRM.</li><li>Built n8n automation workflows connecting GoHighLevel, WordPress and Asana to replace manual hand-offs.</li><li>Planned process flows and delivery roadmaps; ran knowledge-transfer sessions to upskill the team.</li></ul>
              </div>
              <div className="bg-secondary bx-sm p-4 flex flex-col gap-3">
                <p className="mono text-xs font-semibold bg-neutral text-neutral-content w-fit px-2">MILESTONES</p>
                <ul className="flex flex-col gap-2"><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Introduced version control for the first time: moved every project onto GitHub</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Built multi-layer GitHub → cPanel autodeploy pipelines</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Centralized dashboard consolidating GoHighLevel + WordPress</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Currently shipping the Megarewards app to the App Store and Google Play</span></li></ul>
              </div>
            </div>
          </details>
        </li>
        <li className="tl-item">
          <p className="tl-when wide font-black"><span className="tl-y">2026</span><span className="mono text-xs font-semibold">FROM 2025</span></p>
          <span className="tl-node bg-accent" aria-hidden="true"></span>
          <details onToggle={sync} className="xp bx bg-white rounded-box">
            <summary className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer">
              <span className="wide font-black text-3xl sm:text-4xl tabular-nums hidden sm:inline">02</span>
              <span className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="wide font-black text-lg sm:text-2xl uppercase leading-tight">Software Engineer (Full Stack & Mobile)</span>
                <span className="font-semibold">Ascendion · Project staff at Maya Philippines</span>
                <span className="mono text-xs font-semibold flex flex-wrap gap-2"><span className="bg-neutral text-neutral-content px-1">01/2025 - 04/2026</span><span>Metro Manila</span><span className="badge bg-accent border-2 border-black badge-sm font-bold">React / Flutter</span></span>
              </span>
              <span className="xp-ico bx-sm bg-accent w-10 h-10 grid place-items-center wide font-black text-2xl shrink-0" aria-hidden="true"><span className="xp-plus">+</span></span>
            </summary>
            <div className="border-t-3 border-black p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-lg">Regulated fintech. Online Acceptance & Merchant squad (React / Node) for the full stint, plus the E-Commerce squad (Flutter) from 07/2025 to 01/2026.</p>
                <ul className="list-[square] pl-5 flex flex-col gap-2 font-medium"><li>Integrated internal service APIs and extended a large legacy codebase within the established front-end architecture.</li><li>Coordinated each sprint with product, backend, QA and business teams to scope and deliver shippable increments.</li><li>Migrated and maintained features from MBM Native to MBM 3.0 on the in-house Flutter framework (FAF).</li></ul>
              </div>
              <div className="bg-accent bx-sm p-4 flex flex-col gap-3">
                <p className="mono text-xs font-semibold bg-neutral text-neutral-content w-fit px-2">MILESTONES</p>
                <ul className="flex flex-col gap-2"><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>End-to-end Installments feature for the PayMaya web portal</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Eligibility rules + transaction limits to compliance spec</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Bills payment shipped in Maya Business App (MBM 3.0)</span></li></ul>
              </div>
            </div>
          </details>
        </li>
        <li className="tl-item">
          <p className="tl-when wide font-black"><span className="tl-y">2025</span><span className="mono text-xs font-semibold">FROM 2024</span></p>
          <span className="tl-node bg-primary" aria-hidden="true"></span>
          <details onToggle={sync} className="xp bx bg-white rounded-box">
            <summary className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer">
              <span className="wide font-black text-3xl sm:text-4xl tabular-nums hidden sm:inline">03</span>
              <span className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="wide font-black text-lg sm:text-2xl uppercase leading-tight">Senior Software Developer</span>
                <span className="font-semibold">Diversified Robotics · US-based company</span>
                <span className="mono text-xs font-semibold flex flex-wrap gap-2"><span className="bg-neutral text-neutral-content px-1">05/2024 - 04/2025</span><span>Remote</span><span className="badge bg-primary border-2 border-black badge-sm font-bold">Mobile / API</span></span>
              </span>
              <span className="xp-ico bx-sm bg-primary w-10 h-10 grid place-items-center wide font-black text-2xl shrink-0" aria-hidden="true"><span className="xp-plus">+</span></span>
            </summary>
            <div className="border-t-3 border-black p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-lg">Cross-platform transit product for Washington, DC's WMATA system, mobile and backend.</p>
                <ul className="list-[square] pl-5 flex flex-col gap-2 font-medium"><li>Built and maintained the backend REST APIs: data models, endpoints and transit data source integration.</li><li>Implemented authentication and authorization flows across the mobile apps and companion web app.</li></ul>
              </div>
              <div className="bg-primary bx-sm p-4 flex flex-col gap-3">
                <p className="mono text-xs font-semibold bg-neutral text-neutral-content w-fit px-2">MILESTONES</p>
                <ul className="flex flex-col gap-2"><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>iOS + Android app with live WMATA train and bus status</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Station and bus-stop detail for the whole network</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>One auth layer shared by mobile and web</span></li></ul>
              </div>
            </div>
          </details>
        </li>
        <li className="tl-item">
          <p className="tl-when wide font-black"><span className="tl-y">2024</span><span className="mono text-xs font-semibold">FROM 2021</span></p>
          <span className="tl-node bg-success" aria-hidden="true"></span>
          <details onToggle={sync} className="xp bx bg-white rounded-box">
            <summary className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer">
              <span className="wide font-black text-3xl sm:text-4xl tabular-nums hidden sm:inline">04</span>
              <span className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="wide font-black text-lg sm:text-2xl uppercase leading-tight">Mobile Applications Development Lead</span>
                <span className="font-semibold">Rebisco Biscuit Corporation</span>
                <span className="mono text-xs font-semibold flex flex-wrap gap-2"><span className="bg-neutral text-neutral-content px-1">08/2021 - 09/2024</span><span>Quezon City</span><span className="badge bg-success border-2 border-black badge-sm font-bold">Flutter / Laravel</span></span>
              </span>
              <span className="xp-ico bx-sm bg-success w-10 h-10 grid place-items-center wide font-black text-2xl shrink-0" aria-hidden="true"><span className="xp-plus">+</span></span>
            </summary>
            <div className="border-t-3 border-black p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-lg">Led mobile and API development for RDMS, the distribution management platform used by field sales teams nationwide.</p>
                <ul className="list-[square] pl-5 flex flex-col gap-2 font-medium"><li>Developed and maintained the Laravel backend for RDMS Mobile v2, optimizing endpoints that return large datasets.</li><li>Delivered new Flutter modules each sprint and maintained existing features with the team.</li></ul>
              </div>
              <div className="bg-success bx-sm p-4 flex flex-col gap-3">
                <p className="mono text-xs font-semibold bg-neutral text-neutral-content w-fit px-2">MILESTONES</p>
                <ul className="flex flex-col gap-2"><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Restructured mobile + API branching; CI/CD builds for each branch</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Built Appbox v3, an in-house enterprise App Store</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>RDMS in use by field sales across the country</span></li></ul>
              </div>
            </div>
          </details>
        </li>
        <li className="tl-item">
          <p className="tl-when wide font-black"><span className="tl-y">2021</span><span className="mono text-xs font-semibold">FROM 2020</span></p>
          <span className="tl-node bg-secondary" aria-hidden="true"></span>
          <details onToggle={sync} className="xp bx bg-white rounded-box">
            <summary className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer">
              <span className="wide font-black text-3xl sm:text-4xl tabular-nums hidden sm:inline">05</span>
              <span className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="wide font-black text-lg sm:text-2xl uppercase leading-tight">Lead Web Developer (Full Stack)</span>
                <span className="font-semibold">Cushyfy Solutions Inc.</span>
                <span className="mono text-xs font-semibold flex flex-wrap gap-2"><span className="bg-neutral text-neutral-content px-1">04/2020 - 08/2021</span><span>Remote · BGC</span><span className="badge bg-secondary border-2 border-black badge-sm font-bold">Angular / Laravel</span></span>
              </span>
              <span className="xp-ico bx-sm bg-secondary w-10 h-10 grid place-items-center wide font-black text-2xl shrink-0" aria-hidden="true"><span className="xp-plus">+</span></span>
            </summary>
            <div className="border-t-3 border-black p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-lg">Led delivery across four client platforms in e-learning, messaging, government payments and loyalty.</p>
                <ul className="list-[square] pl-5 flex flex-col gap-2 font-medium"><li>Syngenta e-learning: Angular front end, Django backend, learner progress reporting module.</li><li>Taguig property tax portal: Angular customer front end, Vue admin dashboard, shared CodeIgniter backend.</li><li>TRAQS loyalty: Vue dashboard and Laravel loyalty APIs with email/SMS notifications.</li></ul>
              </div>
              <div className="bg-secondary bx-sm p-4 flex flex-col gap-3">
                <p className="mono text-xs font-semibold bg-neutral text-neutral-content w-fit px-2">MILESTONES</p>
                <ul className="flex flex-col gap-2"><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Architected Chattee, a multi-tenant Messenger + Viber bot</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Schema designed from scratch for per-tenant process flows</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>4 platforms delivered in 16 months</span></li></ul>
              </div>
            </div>
          </details>
        </li>
        <li className="tl-item">
          <p className="tl-when wide font-black"><span className="tl-y">2020</span><span className="mono text-xs font-semibold">FROM 2015</span></p>
          <span className="tl-node bg-accent" aria-hidden="true"></span>
          <details onToggle={sync} className="xp bx bg-white rounded-box">
            <summary className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer">
              <span className="wide font-black text-3xl sm:text-4xl tabular-nums hidden sm:inline">06</span>
              <span className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="wide font-black text-lg sm:text-2xl uppercase leading-tight">Lead Web Developer (Full Stack)</span>
                <span className="font-semibold">Solutionbase Corporation</span>
                <span className="mono text-xs font-semibold flex flex-wrap gap-2"><span className="bg-neutral text-neutral-content px-1">07/2015 - 04/2020</span><span>Quezon City</span><span className="badge bg-accent border-2 border-black badge-sm font-bold">Yii2 / Laravel / Vue</span></span>
              </span>
              <span className="xp-ico bx-sm bg-accent w-10 h-10 grid place-items-center wide font-black text-2xl shrink-0" aria-hidden="true"><span className="xp-plus">+</span></span>
            </summary>
            <div className="border-t-3 border-black p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-lg">Owned design, development and maintenance of every company web app and client solution; led the team and scoped directly with clients.</p>
                <ul className="list-[square] pl-5 flex flex-col gap-2 font-medium"><li>Built a Laravel POS data extraction service pulling legacy VB.NET data into AIMS via MySQL.</li><li>Delivered e-commerce sites in Vue and Laravel and integrated payment gateways for client storefronts. Scoped requirements directly with clients.</li></ul>
              </div>
              <div className="bg-accent bx-sm p-4 flex flex-col gap-3">
                <p className="mono text-xs font-semibold bg-neutral text-neutral-content w-fit px-2">MILESTONES</p>
                <ul className="flex flex-col gap-2"><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Rolled out Git company-wide: branching + release workflow</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Built AIMS from scratch: Yii2, jQuery/Bootstrap, MySQL</span></li><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>Moved AIMS to Laravel + Vue/Quasar</span></li></ul>
              </div>
            </div>
          </details>
        </li>
        <li className="tl-item">
          <p className="tl-when wide font-black"><span className="tl-y">2014</span><span className="mono text-xs font-semibold">FROM 2013</span></p>
          <span className="tl-node bg-primary" aria-hidden="true"></span>
          <details onToggle={sync} className="xp bx bg-white rounded-box">
            <summary className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer">
              <span className="wide font-black text-3xl sm:text-4xl tabular-nums hidden sm:inline">07</span>
              <span className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="wide font-black text-lg sm:text-2xl uppercase leading-tight">Freelance Software Developer</span>
                <span className="font-semibold">Komisyon ng Wikang Filipino · Commission on Audit</span>
                <span className="mono text-xs font-semibold flex flex-wrap gap-2"><span className="bg-neutral text-neutral-content px-1">04/2013 - 09/2014</span><span>Manila / QC</span><span className="badge bg-primary border-2 border-black badge-sm font-bold">VB.NET / MySQL</span></span>
              </span>
              <span className="xp-ico bx-sm bg-primary w-10 h-10 grid place-items-center wide font-black text-2xl shrink-0" aria-hidden="true"><span className="xp-plus">+</span></span>
            </summary>
            <div className="border-t-3 border-black p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-lg">Government systems built in VB.NET with MySQL over shared network storage.</p>
                <ul className="list-[square] pl-5 flex flex-col gap-2 font-medium"><li>Records database and budget tracking system for KWF.</li></ul>
              </div>
              <div className="bg-primary bx-sm p-4 flex flex-col gap-3">
                <p className="mono text-xs font-semibold bg-neutral text-neutral-content w-fit px-2">MILESTONES</p>
                <ul className="flex flex-col gap-2"><li className="bx-sm bg-white px-3 py-2 font-bold flex gap-2"><span aria-hidden="true">★</span><span>RCPPE inventory reconciliation system for COA</span></li></ul>
              </div>
            </div>
          </details>
        </li>
        <li className="tl-item tl-end" aria-hidden="true"><p className="tl-when wide font-black"><span className="tl-y">2013</span></p><span className="tl-node bg-neutral"></span><p className="mono text-sm font-semibold bx-sm bg-white w-fit px-2 py-1 self-center">STILL STUDYING THE ART OF CODING, AND NEVER DONE</p></li>
      </ol>
    </section>
  );
}
