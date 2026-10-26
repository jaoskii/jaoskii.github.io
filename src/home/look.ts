import type { CSSProperties } from 'react';

/** What the control panel changes across the whole page. */
export interface Look {
  palette: number;
  shadow: number;
  speed: number;
  reverse: boolean;
  paused: boolean;
}

export const INITIAL_LOOK: Look = { palette: 0, shadow: 6, speed: 24, reverse: false, paused: false };

export const PALETTES: [name: string, primary: string, secondary: string, accent: string][] = [
  ['MINT RIOT', '#a3ff7a', '#ff8a3d', '#b69cff'],
  ['CLASSIC', '#ffd23f', '#ff6b9a', '#3ec6ff'],
  ['HOT SAUCE', '#ff5a36', '#ffe45c', '#2ee6c5'],
  ['GRAPE SODA', '#c79bff', '#ffcf3f', '#ff6fb5'],
  ['POOL PARTY', '#5ce1ff', '#ffb3e6', '#fff05c'],
];

/** Theme variables for the page root. The first palette and default shadow/speed are already the theme's, so they are left out. */
export function lookStyle(l: Look): CSSProperties {
  const style: Record<string, string> = {};
  if (l.palette) {
    const [, p, s, a] = PALETTES[l.palette];
    Object.assign(style, { '--color-primary': p, '--color-secondary': s, '--color-accent': a });
  }
  if (l.shadow !== INITIAL_LOOK.shadow) style['--sh'] = l.shadow + 'px';
  if (l.speed !== INITIAL_LOOK.speed) style['--speed'] = l.speed + 's';
  return style;
}
