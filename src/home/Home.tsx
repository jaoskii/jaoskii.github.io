import { useRef, useState } from 'react';
import Contact from './Contact';
import Experience from './Experience';
import Hero from './Hero';
import Lab from './Lab';
import { INITIAL_LOOK, lookStyle, type Look } from './look';
import Process from './Process';
import Profile from './Profile';
import SideProjects from './SideProjects';
import Stack from './Stack';
import WorkCarousel from './WorkCarousel';

export default function Home() {
  const [look, setLookState] = useState<Look>(INITIAL_LOOK);
  const setLook = (patch: Partial<Look>) => setLookState((l) => ({ ...l, ...patch }));

  const [toast, setToast] = useState(false);
  const toastTimer = useRef(0);
  const showCvToast = () => {
    clearTimeout(toastTimer.current);
    setToast(true);
    toastTimer.current = window.setTimeout(() => setToast(false), 2800);
  };

  return (
    <div data-theme="rjt" className="page min-h-screen bg-base-100 text-base-content grid-bg overflow-x-clip" style={lookStyle(look)}>
      <Hero reverse={look.reverse} paused={look.paused} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-8 flex flex-col gap-20">
        <Profile onCvOpened={showCvToast} />
        <WorkCarousel />
        <Process />
        <Lab look={look} setLook={setLook} />
        <Experience />
        <Stack />
        <SideProjects />
        <Contact />
        <footer className="mono text-sm text-center">© 2026 RAJHI JOHN TABORA · SENIOR FULL STACK DEVELOPER</footer>
      </div>
      <div id="cv-toast" hidden={!toast} role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 alert bx bg-success rounded-box font-bold shadow-none w-fit max-w-[min(92vw,24rem)]">CV opened in a new tab.</div>
    </div>
  );
}
