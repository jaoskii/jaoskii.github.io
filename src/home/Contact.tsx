import { useRef, useState, type FormEvent, type ReactNode } from 'react';

/* Contact form → the portfolio endpoint on the inventee.io API (a local API when the page runs on localhost).
   The key comes from VITE_JAO_CONTACT_KEY at build (the JAO_CONTACT_KEY repo secret, see .github/workflows); the API checks it.
   Without it (local dev) the placeholder is sent, which a local API can accept by setting JAO_CONTACT_KEY to the same text. */
const ENDPOINT = ['localhost', '127.0.0.1'].includes(location.hostname) ? 'http://localhost:4000/jao-api/contact' : 'https://api.inventee.io/jao-api/contact';
const KEY = import.meta.env.VITE_JAO_CONTACT_KEY || '__JAO_CONTACT_KEY__';
const MAILTO = <a className="underline" href="mailto:dev.rtabora@gmail.com">email me directly</a>;

type Status = { ok: boolean; body: ReactNode } | null;

/** The API's error, always ending with a way to email me instead. */
function failure(message: string): ReactNode {
  let msg = message;
  if (!/[.!?]$/.test(msg)) msg += '.';
  if (/directly/.test(msg)) {
    const at = msg.indexOf('email me directly');
    return at < 0 ? msg : <>{msg.slice(0, at)}{MAILTO}{msg.slice(at + 'email me directly'.length)}</>;
  }
  return /try again/i.test(msg) ? <>{msg} Or {MAILTO}.</> : <>{msg} Try again, or {MAILTO}.</>;
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = form.current!;
    const bad = [...f.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]')].find((el) => !el.checkValidity());
    if (bad) {
      setStatus({ ok: false, body: bad.name === 'email' ? 'Enter a valid email address.' : bad.name === 'name' ? 'Enter your name.' : 'Tell me a bit about your project.' });
      bad.focus();
      return;
    }
    setSending(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Jao-Key': KEY },
        body: JSON.stringify(Object.fromEntries(new FormData(f))),
        signal: AbortSignal.timeout(25000),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Your message could not be sent.');
      f.reset();
      setStatus({ ok: true, body: 'Sent! I’ll get back to you soon. A copy is on its way to your inbox.' });
    } catch (err) {
      const { name, message } = err as Error;
      setStatus({ ok: false, body: failure(name === 'TimeoutError' || name === 'TypeError' ? 'Your message could not be sent.' : message) });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="bx bg-accent rounded-box p-6 sm:p-10 grid md:grid-cols-2 gap-8 scroll-mt-8">
      <div className="flex flex-col gap-3">
        <h2 className="wide font-black text-4xl sm:text-5xl uppercase">Got a project?</h2>
        <p className="font-medium">Web, mobile, APIs, or a team workflow that needs fixing. Tell me what you need.</p>
        <p className="mono bg-white bx-sm rounded px-3 py-2 w-fit select-all">dev.rtabora@gmail.com</p>
        <p className="mono text-sm font-semibold">REMOTE · OVERLAPS EST / CST / PST</p>
      </div>
      <form ref={form} id="contact-form" className="flex flex-col gap-4" noValidate onSubmit={submit}>
        <input id="b-name" name="name" required maxLength={120} autoComplete="name" className="input bx-sm w-full bg-white" placeholder="NAME" aria-label="Name" />
        <input id="b-email" name="email" type="email" required maxLength={254} autoComplete="email" className="input bx-sm w-full bg-white" placeholder="EMAIL" aria-label="Email" />
        <textarea id="b-msg" name="message" required maxLength={3000} className="textarea bx-sm w-full bg-white" rows={3} placeholder="PROJECT" aria-label="Project"></textarea>
        {/* honeypot: people never see or fill this; bots that do are dropped by the API */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] w-px h-px opacity-0" />
        <button className="btn btn-b btn-primary btn-lg" disabled={sending}>{sending ? 'SENDING…' : 'SEND →'}</button>
        <div hidden={!status} role="status" aria-live="polite" className={'alert bx-sm rounded font-bold ' + (status?.ok ? 'bg-success' : 'bg-white')}>
          {/* one child, so the alert's grid keeps the sentence together */}
          <span>{status?.body}</span>
        </div>
      </form>
    </section>
  );
}
