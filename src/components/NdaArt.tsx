import type { CSSProperties } from 'react';
import { PROJECTS, type Project } from '../data/projects';
import { pad2 } from '../lib/motion';
import { Redacted } from './ProjectArt';

/* NDA projects: no screenshots allowed, so the art is a redacted case file instead.

   In a project in data/projects.ts:
     nda: true,                       // turns the template on
     ndaNote: 'Short sticky note…',   // optional, defaults to NDA_NOTE below
     ndaKind: 'web' | 'mobile',       // optional, defaults to mobile when art is 'phones'
     ndaRole: 'Full stack · …',       // optional, defaults to "<Mobile|Full stack> · <stack>"
     ndaClient: 'Client name',        // optional, shown on the file sheet; omit to black it out
     ndaStatus: 'In development',     // optional, defaults to Shipped (green dot); anything else gets an amber dot
   The sheet also reads cat (sector), type (years) and the first three points (scope).
   In desc / points, wrap a word in ~~ ~~ to show it as a redaction bar.
   Only the word's length is kept, so write a placeholder (~~client~~), never the real secret. */
const NDA_NOTE = 'Screens stay with the client. Happy to walk you through it on a call.';
const ACCENTS = ['#a3ff7a', '#b69cff', '#5cc8ff', '#ffe066', '#ff8a3d', '#ff8fb1'];

const Bar = ({ w, style }: { w: number; style?: CSSProperties }) => <b className="nda-bar" style={{ width: `${w}%`, ...style }}></b>;
const inline = (extra: CSSProperties): CSSProperties => ({ position: 'relative', left: 0, top: 0, ...extra });

function Browser({ accent }: { accent: string }) {
  return (
    <div className="nda-dev nda-browser">
      <div className="nb-bar">
        <i className="dot" style={{ background: '#ff5f57' }}></i><i className="dot" style={{ background: '#febc2e' }}></i><i className="dot" style={{ background: '#28c840' }}></i>
        <span className="nb-url">https://<Bar w={34} style={inline({ display: 'inline-block', height: '1.2em', verticalAlign: 'middle' })} />.com/app</span>
      </div>
      <div className="nb-body">
        <div className="nb-side">{[60, 80, 50, 70, 55, 65].map((w, i) => <b key={i} style={{ width: `${w}%` }}></b>)}</div>
        <div className="nb-main">
          <div className="nb-kpis">{[0, 1, 2].map((i) => <div key={i} className="nb-kpi" style={{ borderTopColor: accent }}><b style={{ width: '45%' }}></b><b className="big" style={{ width: '70%' }}></b></div>)}</div>
          <div className="nb-chart"><svg viewBox="0 0 100 40" preserveAspectRatio="none"><polyline points="0,32 12,26 24,28 36,18 48,21 60,12 72,15 84,8 100,10" fill="none" stroke="#111" strokeWidth="1.6" /><polyline points="0,36 12,33 24,30 36,31 48,25 60,27 72,22 84,20 100,17" fill="none" stroke={accent} strokeWidth="1.6" /></svg></div>
          <div className="nb-rows">{[70, 55, 80, 62].map((w, i) => <div key={i} className="nb-row"><b style={{ width: '18%' }}></b><b style={{ width: `${w / 2}%` }}></b><b style={{ width: '14%' }}></b></div>)}</div>
        </div>
      </div>
    </div>
  );
}

function Phone({ cls, card }: { cls: string; card: string }) {
  return (
    <div className={`nda-dev nda-iphone ${cls}`}>
      <div className="ip-screen">
        <i className="ip-island"></i>
        <div className="ip-head"><b style={{ width: '40%' }}></b><i className="ip-avatar"></i></div>
        <div className="ip-card" style={{ background: card }}><b style={{ width: '35%' }}></b><b className="big" style={{ width: '60%' }}></b><b style={{ width: '45%' }}></b></div>
        {[70, 55, 62, 48].map((w, i) => <div key={i} className="ip-row"><i className="ip-ico"></i><span><b style={{ width: `${w}%` }}></b><b style={{ width: `${w - 20}%` }}></b></span></div>)}
        <div className="ip-btn"></div>
        <div className="ip-tabs"><i></i><i></i><i></i><i></i></div>
      </div>
    </div>
  );
}

export default function NdaArt({ p }: { p: Project }) {
  const no = pad2(Math.max(0, PROJECTS.indexOf(p)) + 1);
  const mobile = (p.ndaKind || (p.art === 'phones' ? 'mobile' : 'web')) === 'mobile';
  const accent = ACCENTS[[...p.id].reduce((h, c) => h + c.charCodeAt(0), 0) % ACCENTS.length];
  const parts = String(p.cat || '').split('·').map((s) => s.trim()).filter(Boolean);
  const sector = parts[parts.length - 1] || 'Client work';
  const years = (String(p.type || '').match(/\d{4}(?:\s*[–-]\s*\d{4})?/) || [''])[0];
  const role = p.ndaRole || `${mobile ? 'Mobile' : 'Full stack'} · ${p.stack.slice(0, 2).join(' + ')}`;
  const barcode = Array.from({ length: 34 }, (_, i) => [1, 2, 1, 3, 1, 2][(i * 7 + p.id.length) % 6]);

  return (
    <div className="nda" role="img" aria-label={`${p.title}: screenshots withheld under NDA`} style={{ '--nda-accent': accent } as CSSProperties}>
      <div className="nda-folder">
        <div className="nda-tab">CASE {no} · {sector.toUpperCase()}</div>
        <div className="nda-folder-in">
          {mobile ? <><Phone cls="ip-a" card={accent} /><Phone cls="ip-b" card="#111" /></> : <Browser accent={accent} />}
          <div className="nda-tape" aria-hidden="true"><span>CONFIDENTIAL · DO NOT DISTRIBUTE · CONFIDENTIAL · DO NOT DISTRIBUTE · CONFIDENTIAL · DO NOT DISTRIBUTE</span></div>
        </div>
      </div>
      <div className="nda-file" aria-hidden="true">
        <svg className="nda-clip" viewBox="0 0 24 60"><path d="M7 52V12a5 5 0 0 1 10 0v38a8 8 0 0 1-16 0V16" fill="none" stroke="#6b6b75" strokeWidth="2.4" strokeLinecap="round" /></svg>
        <div className="nf-head"><strong>PROJECT FILE</strong><span>REF NDA-{(years.match(/\d{4}/) || ['0000'])[0]}-{no}</span></div>
        <dl className="nf-meta">
          <dt>CLIENT</dt><dd>{p.ndaClient ? p.ndaClient : <Bar w={92} style={inline({ display: 'block', height: '1em' })} />}</dd>
          <dt>SECTOR</dt><dd>{sector}</dd>
          <dt>ROLE</dt><dd>{role}</dd>
          <dt>PERIOD</dt><dd>{years || '-'}</dd>
          <dt>STATUS</dt><dd><span className="nf-live" style={p.ndaStatus ? { color: '#e8a100' } : undefined}>●</span> {p.ndaStatus || 'Shipped'}</dd>
        </dl>
        <div className="nf-label">SCOPE</div>
        <ul className="nf-scope">{(p.points || []).slice(0, 3).map((s, i) => <li key={i}><Redacted text={s} on /></li>)}</ul>
        <div className="nf-chips">{p.stack.slice(0, 4).map((s) => <span key={s}>{s}</span>)}</div>
        <div className="nf-label">ACTIVITY</div>
        <div className="nf-log">{['merged', 'reviewed', 'deployed', 'merged', 'released'].map((v, i) => <div key={i}><span>{v}</span><Bar w={[62, 48, 70, 40, 56][i]} style={inline({ display: 'block', height: '.8em', flex: 1 })} /></div>)}</div>
        <div className="nf-foot"><div className="nf-barcode">{barcode.map((w, i) => <i key={i} style={{ width: `${w}px` }}></i>)}</div><svg className="nf-sign" viewBox="0 0 80 20"><path d="M2 14c6-10 9 6 14-2s6-8 9 0 5 6 9-3 7 9 12 2 6-6 10 1 8 3 22-4" fill="none" stroke="#1d3fbf" strokeWidth="1.4" strokeLinecap="round" /></svg></div>
      </div>
      <div className="nda-stamp" aria-hidden="true">UNDER NDA</div>
      <div className="nda-seal" aria-hidden="true"><span>CLASSIFIED</span></div>
      <p className="nda-note">{p.ndaNote || NDA_NOTE}</p>
    </div>
  );
}
