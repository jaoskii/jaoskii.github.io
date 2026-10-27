import type { Layout } from '../data/projects';

/** [left %, top %, width %, tilt deg] for print j of n (j = 0 is the lead). */
export type Pos = [x: number, y: number, w: number, r: number];
type Place = (j: number, n: number) => Pos;

// Layouts return [left %, top %, width %, tilt deg] for print j of n (j = 0 is the lead).
// The frame is 16:9 and prints 16:10, so a print's height % ≈ width % × 1.1.
const TILT = [-6, 5, -3, 7, -5, 4, -7, 3, -4, 6, -2, 5];
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
export const LAYOUTS: Record<Layout, Place> = {
  // lead in the middle, the rest in a ring around it
  desk(j, n) {
    if (j === 0) return n <= 3 ? [15, 2, 70, -2] : n <= 7 ? [22, 6, 58, -2] : [26, 16, 48, -1];
    const k = n - 1, i = j - 1, w = k <= 3 ? 30 : k <= 6 ? 27 : 21, a = -0.8 * Math.PI + i * 2 * Math.PI / k;
    return [clamp(50 + 44 * Math.cos(a) - w / 2, -2, 102 - w), clamp(48 + 42 * Math.sin(a) - w * 0.55, -6, 104 - w * 1.1), w, TILT[i % TILT.length]];
  },
  // lead on the right, the rest stacked down the left like index cards
  cascade(j, n) {
    if (j === 0) return n <= 3 ? [34, 2, 64, 2] : [40, 8, 58, 2];
    const k = n - 1, i = j - 1, w = k <= 3 ? 36 : 31, step = k > 1 ? (100 - w * 1.1) / (k - 1) : 0;
    return [i % 2 ? 7 : 0, k > 1 ? i * step : 20, w, i % 2 ? 3 : -3];
  },
  // lead low and centred, the rest fanned across the top
  fan(j, n) {
    if (j === 0) return n <= 3 ? [18, 22, 64, -1] : [22, 34, 56, -1];
    const k = n - 1, i = j - 1, w = k <= 3 ? 32 : 26, x = k > 1 ? i * (100 - w) / (k - 1) : 50 - w / 2, t = (x + w / 2 - 50) / 50;
    return [x, 2 + 12 * t * t, w, Math.round(12 * t)];
  },
  // lead centred over a pinboard grid of the rest
  wall(j, n) {
    if (j === 0) return n <= 4 ? [20, 14, 60, 1] : [25, 22, 50, 1];
    const k = n - 1, i = j - 1, cols = Math.max(2, Math.ceil(Math.sqrt(k * 1.8))), rows = Math.ceil(k / cols), w = Math.min(34, 104 / cols);
    const x = (i % cols) * (100 - w) / Math.max(1, cols - 1), y = rows > 1 ? Math.floor(i / cols) * (100 - w * 1.1) / (rows - 1) : 30;
    return [x, y, w, TILT[i % TILT.length] / 2];
  },
  // lead on the right, the rest dropped in a loose pile on the left
  pile(j, n) {
    if (j === 0) return [42, 4, 56, 3];
    const k = n - 1, i = j - 1, s = k > 1 ? i / (k - 1) : 0.5;
    return [1 + 10 * s, 8 + 46 * s, 38, Math.round(-9 + 14 * s)];
  },
};

/** Projects without a layout cycle through these. */
export const ORDER: Layout[] = ['desk', 'cascade', 'fan'];
