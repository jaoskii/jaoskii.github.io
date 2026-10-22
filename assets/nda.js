/* NDA projects: no screenshots allowed, so the art is a redacted case file instead.
   Load after projects.js, before carousel.js / fashion.js.

   In a project in projects.js:
     nda: true,                       // turns the template on
     ndaNote: 'Short sticky note…',   // optional, defaults to NDA_NOTE below
     ndaKind: 'web' | 'mobile',       // optional, defaults to mobile when art is 'phones'
     ndaRole: 'Full stack · …',       // optional, defaults to "<Mobile|Full stack> · <stack>"
     ndaClient: 'Client name',        // optional, shown on the file sheet; omit to black it out
     ndaStatus: 'In development',     // optional, defaults to Shipped (green dot); anything else gets an amber dot
   The sheet also reads cat (sector), type (years) and the first three points (scope).
   In desc / points, wrap a word in ~~ ~~ to show it as a redaction bar.
   Only the word's length is kept, so write a placeholder (~~client~~), never the real secret. */
(function () {
  const NDA_NOTE = 'Screens stay with the client. Happy to walk you through it on a call.';
  const ACCENTS = ['#a3ff7a', '#b69cff', '#5cc8ff', '#ffe066', '#ff8a3d', '#ff8fb1'];

  window.ndaArt = function (p) {
    const esc = window.escapeHTML;
    const all = window.PROJECTS || [];
    const no = String(Math.max(0, all.indexOf(p)) + 1).padStart(2, '0');
    const mobile = (p.ndaKind || (p.art === 'phones' ? 'mobile' : 'web')) === 'mobile';
    const accent = ACCENTS[[...p.id].reduce((h, c) => h + c.charCodeAt(0), 0) % ACCENTS.length];
    const parts = String(p.cat || '').split('·').map(s => s.trim()).filter(Boolean);
    const sector = parts[parts.length - 1] || 'Client work';
    const years = (String(p.type || '').match(/\d{4}(?:\s*[–-]\s*\d{4})?/) || [''])[0];
    const role = p.ndaRole || `${mobile ? 'Mobile' : 'Full stack'} · ${p.stack.slice(0, 2).join(' + ')}`;
    const bar = (w, extra = '') => `<b class="nda-bar" style="width:${w}%;${extra}"></b>`;
    const red = s => (window.ndaRedact ? window.ndaRedact(esc(s)) : esc(s));

    const web = `<div class="nda-dev nda-browser">
        <div class="nb-bar"><i class="dot" style="background:#ff5f57"></i><i class="dot" style="background:#febc2e"></i><i class="dot" style="background:#28c840"></i>
          <span class="nb-url">https://${bar(34, 'position:relative;display:inline-block;height:1.2em;vertical-align:middle;left:0;top:0')}.com/app</span></div>
        <div class="nb-body">
          <div class="nb-side">${[60, 80, 50, 70, 55, 65].map(w => `<b style="width:${w}%"></b>`).join('')}</div>
          <div class="nb-main">
            <div class="nb-kpis">${[0, 1, 2].map(() => `<div class="nb-kpi" style="border-top-color:${accent}"><b style="width:45%"></b><b class="big" style="width:70%"></b></div>`).join('')}</div>
            <div class="nb-chart"><svg viewBox="0 0 100 40" preserveAspectRatio="none"><polyline points="0,32 12,26 24,28 36,18 48,21 60,12 72,15 84,8 100,10" fill="none" stroke="#111" stroke-width="1.6"/><polyline points="0,36 12,33 24,30 36,31 48,25 60,27 72,22 84,20 100,17" fill="none" stroke="${accent}" stroke-width="1.6"/></svg></div>
            <div class="nb-rows">${[70, 55, 80, 62].map(w => `<div class="nb-row"><b style="width:18%"></b><b style="width:${w / 2}%"></b><b style="width:14%"></b></div>`).join('')}</div>
          </div>
        </div>
      </div>`;
    const phone = (cls, card) => `<div class="nda-dev nda-iphone ${cls}">
        <div class="ip-screen">
          <i class="ip-island"></i>
          <div class="ip-head"><b style="width:40%"></b><i class="ip-avatar"></i></div>
          <div class="ip-card" style="background:${card}"><b style="width:35%"></b><b class="big" style="width:60%"></b><b style="width:45%"></b></div>
          ${[70, 55, 62, 48].map(w => `<div class="ip-row"><i class="ip-ico"></i><span><b style="width:${w}%"></b><b style="width:${w - 20}%"></b></span></div>`).join('')}
          <div class="ip-btn"></div>
          <div class="ip-tabs"><i></i><i></i><i></i><i></i></div>
        </div>
      </div>`;

    const scope = (p.points || []).slice(0, 3).map(s => `<li>${red(s)}</li>`).join('');
    const chips = p.stack.slice(0, 4).map(s => `<span>${esc(s)}</span>`).join('');
    const barcode = Array.from({ length: 34 }, (_, i) => `<i style="width:${[1, 2, 1, 3, 1, 2][(i * 7 + p.id.length) % 6]}px"></i>`).join('');

    return `<div class="nda" role="img" aria-label="${esc(p.title)}: screenshots withheld under NDA" style="--nda-accent:${accent}">
      <div class="nda-folder">
        <div class="nda-tab">CASE ${no} · ${esc(sector.toUpperCase())}</div>
        <div class="nda-folder-in">
          ${mobile ? phone('ip-a', accent) + phone('ip-b', '#111') : web}
          <div class="nda-tape" aria-hidden="true"><span>CONFIDENTIAL · DO NOT DISTRIBUTE · CONFIDENTIAL · DO NOT DISTRIBUTE · CONFIDENTIAL · DO NOT DISTRIBUTE</span></div>
        </div>
      </div>
      <div class="nda-file" aria-hidden="true">
        <svg class="nda-clip" viewBox="0 0 24 60"><path d="M7 52V12a5 5 0 0 1 10 0v38a8 8 0 0 1-16 0V16" fill="none" stroke="#6b6b75" stroke-width="2.4" stroke-linecap="round"/></svg>
        <div class="nf-head"><strong>PROJECT FILE</strong><span>REF NDA-${esc((years.match(/\d{4}/) || ['0000'])[0])}-${no}</span></div>
        <dl class="nf-meta">
          <dt>CLIENT</dt><dd>${p.ndaClient ? esc(p.ndaClient) : bar(92, 'position:relative;display:block;height:1em;left:0;top:0')}</dd>
          <dt>SECTOR</dt><dd>${esc(sector)}</dd>
          <dt>ROLE</dt><dd>${esc(role)}</dd>
          <dt>PERIOD</dt><dd>${esc(years || '-')}</dd>
          <dt>STATUS</dt><dd><span class="nf-live" style="${p.ndaStatus ? 'color:#e8a100' : ''}">●</span> ${esc(p.ndaStatus || 'Shipped')}</dd>
        </dl>
        <div class="nf-label">SCOPE</div>
        <ul class="nf-scope">${scope}</ul>
        <div class="nf-chips">${chips}</div>
        <div class="nf-label">ACTIVITY</div>
        <div class="nf-log">${['merged', 'reviewed', 'deployed', 'merged', 'released'].map((v, i) => `<div><span>${v}</span>${bar([62, 48, 70, 40, 56][i], 'position:relative;display:block;height:.8em;left:0;top:0;flex:1')}</div>`).join('')}</div>
        <div class="nf-foot"><div class="nf-barcode">${barcode}</div><svg class="nf-sign" viewBox="0 0 80 20"><path d="M2 14c6-10 9 6 14-2s6-8 9 0 5 6 9-3 7 9 12 2 6-6 10 1 8 3 22-4" fill="none" stroke="#1d3fbf" stroke-width="1.4" stroke-linecap="round"/></svg></div>
      </div>
      <div class="nda-stamp" aria-hidden="true">UNDER NDA</div>
      <div class="nda-seal" aria-hidden="true"><span>CLASSIFIED</span></div>
      <p class="nda-note">${esc(p.ndaNote || NDA_NOTE)}</p>
    </div>`;
  };

  // ~~word~~ → redaction bar, after escaping (fillProject calls this for nda projects)
  window.ndaRedact = s => s.replace(/~~(.+?)~~/g, (_, w) => `<span class="redact" aria-label="redacted">${'█'.repeat(w.length)}</span>`);

  const css = `
.nda{position:relative;width:100%;height:100%;container-type:size;overflow:hidden;background:#efe9dc;
  background-image:radial-gradient(#11111114 1px,transparent 1.2px);background-size:2.2cqw 2.2cqw;font-family:"IBM Plex Mono",monospace;color:#111}
.nda b{display:block;height:.9cqh;min-height:3px;background:#111;border-radius:2px}
.nda .nda-bar{position:absolute;left:8%;top:30%;height:40%;background:#111;display:block}
/* folder */
.nda-folder{position:absolute;left:3%;top:12%;width:60%;height:83%;transform:rotate(-1.5deg)}
.nda-tab{position:absolute;left:0;top:-6.2cqh;height:6.6cqh;padding:0 1.8cqw;display:flex;align-items:center;background:#e8c46f;border:.35cqw solid #111;border-bottom:0;border-radius:1cqw 1cqw 0 0;
  font-weight:700;font-size:1.45cqw;letter-spacing:.06em;white-space:nowrap}
.nda-folder-in{position:absolute;inset:0;overflow:hidden;background:#e8c46f;border:.35cqw solid #111;border-radius:0 1cqw 1cqw 1cqw;box-shadow:1cqw 1cqw 0 #111;
  background-image:linear-gradient(#0000 96%,#11111112 96%);background-size:100% 3cqh}
/* browser mock */
.nda-browser{position:absolute;left:5%;top:7%;width:90%;height:84%;background:#fff;border:.35cqw solid #111;border-radius:1cqw;overflow:hidden;box-shadow:.7cqw .7cqw 0 #111}
.nb-bar{height:11%;display:flex;align-items:center;gap:.8cqw;padding:0 1.4cqw;background:#ecebf3;border-bottom:.3cqw solid #111}
.nb-bar .dot{width:1.1cqw;height:1.1cqw;border-radius:50%;display:block}
.nb-url{flex:1;margin-left:1cqw;height:60%;display:flex;align-items:center;gap:.3cqw;padding:0 1.2cqw;background:#fff;border:.2cqw solid #c9c6d6;border-radius:2cqw;font-size:1.25cqw;color:#55536a;white-space:nowrap;overflow:hidden}
.nb-body{position:absolute;top:11%;left:0;right:0;bottom:0;display:flex;filter:blur(.12cqw)}
.nb-side{width:19%;background:#17161d;padding:2cqh 1.2cqw;display:flex;flex-direction:column;gap:2.2cqh}
.nb-side b{background:#5d5a70}
.nb-side b:first-child{background:var(--nda-accent);height:1.4cqh}
.nb-main{flex:1;padding:2cqh 1.6cqw;display:flex;flex-direction:column;gap:2cqh}
.nb-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2cqw}
.nb-kpi{border:.25cqw solid #111;border-top-width:.8cqh;border-radius:.6cqw;padding:1.2cqh .9cqw;display:flex;flex-direction:column;gap:1cqh}
.nb-kpi b{background:#9a97ab}.nb-kpi b.big{height:2.2cqh;background:#111}
.nb-chart{height:26%;border:.25cqw solid #111;border-radius:.6cqw;padding:.6cqh .6cqw;background:repeating-linear-gradient(#0000 0 24%,#1111110f 24% 25%)}
.nb-chart svg{width:100%;height:100%;display:block}
.nb-rows{display:flex;flex-direction:column;gap:1.3cqh}
.nb-row{display:flex;gap:1.4cqw;align-items:center;padding-bottom:1.1cqh;border-bottom:.2cqw solid #1111111f}
.nb-row b:nth-child(2){background:#9a97ab}
/* phones */
.nda-iphone{position:absolute;top:6%;width:30%;height:88%;background:#0d0d0f;border-radius:3.2cqw;padding:.8cqw;box-shadow:.8cqw .8cqw 0 #111;box-sizing:border-box}
.nda-iphone.ip-a{left:12%;transform:rotate(-4deg)}
.nda-iphone.ip-b{left:52%;top:9%;transform:rotate(3deg)}
.ip-screen{position:relative;width:100%;height:100%;background:#fff;border-radius:2.5cqw;overflow:hidden;display:flex;flex-direction:column;gap:1.6cqh;padding:5.5cqh 1.3cqw 0;box-sizing:border-box;filter:blur(.1cqw)}
.ip-island{position:absolute;left:35%;top:1.4cqh;width:30%;height:2.6cqh;background:#000;border-radius:2cqw;filter:none}
.ip-head{display:flex;align-items:center;justify-content:space-between}
.ip-avatar{display:block;width:2.4cqw;height:2.4cqw;border-radius:50%;background:#d9d6e6;border:.2cqw solid #111}
.ip-card{border-radius:1.2cqw;padding:1.6cqh 1.2cqw;display:flex;flex-direction:column;gap:1cqh;border:.25cqw solid #111}
.ip-card b{background:#111}.ip-card b.big{height:2.6cqh}
.ip-b .ip-card b{background:#fff}
.ip-row{display:flex;gap:1cqw;align-items:center}
.ip-row span{flex:1;display:flex;flex-direction:column;gap:.8cqh}
.ip-row span b:last-child{background:#a8a5b8}
.ip-ico{display:block;width:2.6cqw;height:2.6cqw;border-radius:.6cqw;background:var(--nda-accent);border:.2cqw solid #111;flex:none}
.ip-btn{height:4cqh;border-radius:1cqw;background:#111;margin-top:auto}
.ip-tabs{display:flex;justify-content:space-around;padding:1.4cqh 0 2cqh;border-top:.2cqw solid #11111122;margin:0 -1.3cqw}
.ip-tabs i{display:block;width:1.6cqw;height:1.6cqw;border-radius:.4cqw;background:#c9c6d6}
.ip-tabs i:first-child{background:var(--nda-accent)}
/* tape */
.nda-tape{position:absolute;left:-10%;top:58%;width:120%;padding:.9cqh 0;background:#ffd60a;border-block:.35cqw solid #111;transform:rotate(-9deg);overflow:hidden;white-space:nowrap;
  box-shadow:0 .5cqw 0 #11111133}
.nda-tape span{display:block;font-family:Archivo,sans-serif;font-stretch:125%;font-weight:900;font-size:1.9cqw;letter-spacing:.12em}
/* file sheet */
.nda-file{position:absolute;right:3.5%;top:6%;width:31%;height:88%;background:#fff;border:.35cqw solid #111;box-shadow:1cqw 1cqw 0 #111;transform:rotate(2deg);
  padding:3.4cqh 1.8cqw 2cqh;box-sizing:border-box;display:flex;flex-direction:column;gap:1.5cqh;font-size:1.3cqw;line-height:1.3;
  background-image:linear-gradient(90deg,#0000 1.2cqw,#ff5c5c55 1.2cqw,#ff5c5c55 calc(1.2cqw + 1px),#0000 0)}
.nda-clip{position:absolute;left:12%;top:-4.2cqh;width:2.2cqw;height:10cqh}
.nf-head{display:flex;flex-direction:column;gap:.4cqh;padding-bottom:1.2cqh;border-bottom:.25cqw dashed #111}
.nf-head strong{font-family:Archivo,sans-serif;font-stretch:125%;font-weight:900;font-size:2.1cqw;letter-spacing:.02em}
.nf-head span{font-size:1.15cqw;color:#55536a}
.nf-meta{display:grid;grid-template-columns:auto 1fr;gap:.9cqh 1.2cqw;margin:0;align-items:center}
.nf-meta dt{font-size:1.05cqw;font-weight:700;color:#6b6880;letter-spacing:.08em}
.nf-meta dd{margin:0;font-weight:600;position:relative}
.nf-live{color:#1aa34a}
.nf-label{font-size:1.05cqw;font-weight:700;color:#6b6880;letter-spacing:.08em;margin-top:.4cqh}
.nf-scope{margin:-.6cqh 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:.7cqh}
.nf-scope li{position:relative;padding-left:1.8cqw;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.nf-scope li::before{content:"✓";position:absolute;left:0;font-weight:700;color:#1aa34a}
.nf-chips{display:flex;flex-wrap:wrap;gap:.6cqw}
.nf-chips span{border:.2cqw solid #111;border-radius:.5cqw;padding:.2cqh .7cqw;font-size:1.1cqw;font-weight:700;background:var(--nda-accent)}
.nf-log{display:flex;flex-direction:column;gap:.7cqh;margin-top:-.6cqh}
.nf-log div{display:flex;align-items:center;gap:1cqw;font-size:1.05cqw;color:#55536a}
.nf-log span{width:6cqw;flex:none}
.nf-log .nda-bar{max-width:60%;background:#c9c6d6}
.nf-foot{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;gap:1cqw}
.nf-barcode{display:flex;gap:2px;height:4.6cqh;align-items:stretch}
.nf-barcode i{display:block;background:#111}
.nf-sign{width:9cqw;height:4cqh}
/* stamps + note */
.nda-stamp{position:absolute;left:24%;top:30%;transform:rotate(-8deg);padding:.9cqh 1.8cqw;border:.8cqw double #e01e1e;color:#e01e1e;
  font-family:Archivo,sans-serif;font-stretch:125%;font-weight:900;font-size:4.2cqw;letter-spacing:.05em;line-height:1;background:#ffffffcc;mix-blend-mode:multiply;z-index:3}
.nda-seal{position:absolute;left:3%;bottom:4%;z-index:3;width:9.5cqw;height:9.5cqw;border-radius:50%;border:.5cqw double #1d3fbf;color:#1d3fbf;display:grid;place-items:center;
  transform:rotate(12deg);mix-blend-mode:multiply;opacity:.85}
.nda-seal span{font-weight:700;font-size:1.25cqw;letter-spacing:.12em}
.nda-note{position:absolute;left:33%;bottom:2.5%;width:26%;z-index:3;margin:0;padding:1.4cqw;background:#ffe066;border:.35cqw solid #111;box-shadow:.7cqw .7cqw 0 #111;
  transform:rotate(-3deg);font-size:1.35cqw;font-weight:600;line-height:1.35}
.redact{background:#111;color:transparent;border-radius:2px;letter-spacing:-.1em;user-select:none}`;
  const tag = document.createElement('style');
  tag.textContent = css;
  document.head.append(tag);
})();
