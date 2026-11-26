/** Ideal projectile (no air resistance, uniform g, launch and landing at the same height). */
export type Params = { v0: number; angleDeg: number; g: number };
export const rad = (d: number) => (d * Math.PI) / 180;

export function results({ v0, angleDeg, g }: Params) {
  const a = rad(angleDeg);
  const T = (2 * v0 * Math.sin(a)) / g;
  const H = (v0 * v0 * Math.sin(a) ** 2) / (2 * g);
  const R = (v0 * v0 * Math.sin(2 * a)) / g;
  return { T, H, R };
}

export function stateAt({ v0, angleDeg, g }: Params, t: number) {
  const a = rad(angleDeg);
  const vx = v0 * Math.cos(a);
  const vy = v0 * Math.sin(a) - g * t;
  return { x: vx * t, y: v0 * Math.sin(a) * t - 0.5 * g * t * t, vx, vy, v: Math.hypot(vx, vy) };
}

export const fmt = (n: number, d = 2) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
