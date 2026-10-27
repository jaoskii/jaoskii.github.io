export default function SideProjects() {
  return (
    <section id="side" className="flex flex-col gap-6 scroll-mt-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 className="wide font-black text-5xl sm:text-7xl uppercase">Side projects<span className="text-accent">.</span></h2>
        <a href="https://github.com/jaoskii" target="_blank" rel="noopener" className="btn btn-b bg-white">All on GitHub →</a>
      </div>
      <p className="mono font-semibold -mt-3">THINGS I BUILD AFTER HOURS.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article className="bx bg-white rounded-box overflow-hidden flex flex-col lift sm:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1.6fr_1fr]">
          <div className="bg-accent border-b-3 border-black px-5 py-3 flex items-center justify-between gap-2 lg:col-span-2"><span className="mono text-xs font-semibold">★ FEATURED · SAAS</span><span className="badge border-2 border-black font-bold bg-white">TypeScript</span></div>
          <a href="work.html#inventee" className="block border-b-3 lg:border-b-0 lg:border-r-3 border-black aspect-[16/10] overflow-hidden" aria-label="Open the inventee.io case study"><img src="assets/img/inventee/tenant-dashboard.jpg" alt="inventee.io tenant dashboard" loading="lazy" className="w-full h-full object-cover object-left-top" /></a>
          <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
            <h3 className="wide font-black text-3xl uppercase break-words">inventee.io</h3>
            <p className="font-medium">Multi-tenant inventory and accounting SaaS. A marketing site, a workspace per company and an operator console that provisions them, each company on its own Postgres database.</p>
            <ul className="flex flex-wrap gap-2"><li className="bx-sm bg-white px-2 py-1 mono text-sm font-semibold">NestJS</li><li className="bx-sm bg-white px-2 py-1 mono text-sm font-semibold">GraphQL</li><li className="bx-sm bg-white px-2 py-1 mono text-sm font-semibold">PostgreSQL</li><li className="bx-sm bg-white px-2 py-1 mono text-sm font-semibold">React</li></ul>
            <div className="flex flex-wrap gap-2 mt-auto"><a href="work.html#inventee" className="btn btn-sm btn-b btn-neutral">Case study →</a><a href="https://www.inventee.io" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">inventee.io ↗</a></div>
          </div>
        </article>
        <article className="bx bg-white rounded-box overflow-hidden flex flex-col lift">
          <div className="bg-secondary border-b-3 border-black px-5 py-3 flex items-center justify-between gap-2"><span className="mono text-xs font-semibold">MOBILE</span><span className="badge border-2 border-black font-bold bg-white">Dart · Flutter</span></div>
          <div className="border-b-3 border-black aspect-[16/10] overflow-hidden bg-black"><img src="assets/img/side/snipr-studio.jpg" alt="Snipr studio home, video upload and the screenshot annotator" loading="lazy" className="w-full h-full object-cover object-center" /></div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="wide font-black text-2xl uppercase break-words">snipr</h3>
            <p className="font-medium">Flutter app for gaming clips: trim and compress highlights to fit Discord with a two-pass encode, then mark up screenshots with arrows, boxes, spotlight, redaction and meme captions.</p>
            <div className="flex flex-wrap gap-2 mt-auto"><a href="https://github.com/jaoskii/snipr" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">snipr ↗</a></div>
          </div>
        </article>
        <article className="bx bg-white rounded-box overflow-hidden flex flex-col lift">
          <div className="bg-primary border-b-3 border-black px-5 py-3 flex items-center justify-between gap-2"><span className="mono text-xs font-semibold">TOOLING</span><span className="badge border-2 border-black font-bold bg-white">Python</span></div>
          <div className="border-b-3 border-black aspect-[16/10] overflow-hidden bg-black"><img src="assets/img/side/githappens-session.jpg" alt="githappens terminal session: profiles, repo create and collaborator invite" loading="lazy" className="w-full h-full object-cover object-top" /></div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="wide font-black text-2xl uppercase break-words">githappens</h3>
            <p className="font-medium">GitHub from the terminal: switch between accounts, create repos, set up SSH keys and invite collaborators, plus AI repo analysis through Antigravity and the GitHub MCP server.</p>
            <div className="flex flex-wrap gap-2 mt-auto"><a href="https://github.com/jaoskii/githappens" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">githappens ↗</a></div>
          </div>
        </article>
        <article className="bx bg-white rounded-box overflow-hidden flex flex-col lift">
          <div className="bg-accent border-b-3 border-black px-5 py-3 flex items-center justify-between gap-2"><span className="mono text-xs font-semibold">GAME</span><span className="badge border-2 border-black font-bold bg-white">three.js</span></div>
          <div className="border-b-3 border-black aspect-[16/10] overflow-hidden bg-black"><img src="assets/img/side/flappy-mobile.jpg" alt="Flappy Bro on a phone: twin sticks, rise button and the block city" loading="lazy" className="w-full h-full object-cover object-center" /></div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="wide font-black text-2xl uppercase break-words">flappy-bro</h3>
            <p className="font-medium">Flappy Bird as a 3D flyer: weave through a block city and reach each ring in time. Keyboard on desktop, twin sticks and a rise button on phones.</p>
            <div className="flex flex-wrap gap-2 mt-auto"><a href="https://flappy-bro-production.up.railway.app" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">Play ↗</a><a href="https://github.com/jaoskii/flappy-bro" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">flappy-bro ↗</a></div>
          </div>
        </article>
        <article className="bx bg-white rounded-box overflow-hidden flex flex-col lift">
          <div className="bg-success border-b-3 border-black px-5 py-3 flex items-center justify-between gap-2"><span className="mono text-xs font-semibold">DEV TOOL</span><span className="badge border-2 border-black font-bold bg-white">Python · FastAPI</span></div>
          <div className="border-b-3 border-black aspect-[16/10] overflow-hidden bg-black"><img src="assets/img/side/mitm-1.jpg" alt="Mitmproxy dashboard with interception rules and the live traffic feed" loading="lazy" className="w-full h-full object-cover object-top" /></div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="wide font-black text-2xl uppercase break-words">mitmproxy-fastapi</h3>
            <p className="font-medium">mitmproxy with a live FastAPI dashboard: mock responses, rewrite headers and bodies, add latency per rule, and inspect every flow as it happens.</p>
            <div className="flex flex-wrap gap-2 mt-auto"><a href="https://github.com/jaoskii/mitm-intercept-fast-api" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">mitm-intercept-fast-api ↗</a></div>
          </div>
        </article>
        <article className="bx bg-white rounded-box overflow-hidden flex flex-col lift">
          <div className="bg-white border-b-3 border-black px-5 py-3 flex items-center justify-between gap-2"><span className="mono text-xs font-semibold">BROWSER EXTENSION</span><span className="badge border-2 border-black font-bold bg-white">JavaScript</span></div>
          <div className="border-b-3 border-black aspect-[16/10] overflow-hidden bg-black"><img src="assets/img/side/untangled-themes.jpg" alt="Untangled side panel in dark and light themes" loading="lazy" className="w-full h-full object-cover object-top" /></div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="wide font-black text-2xl uppercase break-words">untangled</h3>
            <p className="font-medium">Chrome side panel that spots raw JSON responses and turns them into a searchable, collapsible tree, with key counts, copy and light or dark themes.</p>
            <div className="flex flex-wrap gap-2 mt-auto"><a href="https://github.com/jaoskii/untangled" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">untangled ↗</a></div>
          </div>
        </article>
        <article className="bx bg-white rounded-box overflow-hidden flex flex-col lift">
          <div className="bg-primary border-b-3 border-black px-5 py-3 flex items-center justify-between gap-2"><span className="mono text-xs font-semibold">APP + API</span><span className="badge border-2 border-black font-bold bg-white">TypeScript</span></div>
          <div className="border-b-3 border-black aspect-[16/10] overflow-hidden bg-black"><img src="assets/img/side/atelier-1.jpg" alt="Atelier Forge canvas with a moodboard section and a copy and palette section" loading="lazy" className="w-full h-full object-cover object-left-top" /></div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="wide font-black text-2xl uppercase break-words">atelier-forge</h3>
            <p className="font-medium">Spatial canvas editor: images, text, audio and ink on an infinite board, grouped into sections and linked with connectors. Runs local-only, or with its Hono + Prisma API for accounts and AI.</p>
            <div className="flex flex-wrap gap-2 mt-auto"><a href="https://github.com/jaoskii/atelier-forge" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">atelier-forge ↗</a><a href="https://github.com/jaoskii/atelier-forge-api" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">atelier-forge-api ↗</a></div>
          </div>
        </article>
        <article className="bx bg-white rounded-box overflow-hidden flex flex-col lift sm:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1.6fr_1fr]">
          <div className="bg-success border-b-3 border-black px-5 py-3 flex items-center justify-between gap-2 lg:col-span-2"><span className="mono text-xs font-semibold">CLI</span><span className="badge border-2 border-black font-bold bg-white">Go</span></div>
          <div className="border-b-3 lg:border-b-0 lg:border-r-3 border-black aspect-[16/10] overflow-hidden bg-black"><img src="assets/img/side/yoink-session.jpg" alt="yoink sharing a folder: QR code, link and live download progress" loading="lazy" className="w-full h-full object-cover object-top" /></div>
          <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
            <h3 className="wide font-black text-3xl uppercase break-words">yoink</h3>
            <p className="font-medium">Share files across your Wi-Fi with a QR code. Run it on a file or folder, scan with your phone, tap Download. No app on the phone, no cloud, no account; folders zip on the fly and interrupted downloads resume.</p>
            <ul className="flex flex-wrap gap-2"><li className="bx-sm bg-white px-2 py-1 mono text-sm font-semibold">Go</li><li className="bx-sm bg-white px-2 py-1 mono text-sm font-semibold">Cobra</li><li className="bx-sm bg-white px-2 py-1 mono text-sm font-semibold">GoReleaser</li></ul>
            <div className="flex flex-wrap gap-2 mt-auto"><a href="work.html#yoink-cli" className="btn btn-sm btn-b btn-neutral">Case study →</a><a href="https://github.com/jaoskii/yoink-cli" target="_blank" rel="noopener" className="btn btn-sm btn-b bg-white">yoink-cli ↗</a></div>
          </div>
        </article>
      </div>
    </section>
  );
}
