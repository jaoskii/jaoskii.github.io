/** Read once at load, like the static site did. */
export const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Replays a one-shot CSS animation class (e.g. `shake`) on an element. */
export function replay(el: HTMLElement, cls: string, onEnd?: () => void) {
  el.classList.remove(cls);
  void el.offsetWidth; // restart the animation
  if (onEnd) el.addEventListener('animationend', onEnd, { once: true });
  el.classList.add(cls);
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
