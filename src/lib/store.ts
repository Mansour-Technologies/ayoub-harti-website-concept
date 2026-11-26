/**
 * Demo state stored in localStorage only. Every read is defensive: invalid JSON,
 * wrong shapes or blocked storage fall back to defaults. No personal data is stored.
 */
const PREFIX = 'harti-demo:';

export type DemoState = {
  bookmarks: string[];
  history: { id: string; at: number }[];
  progress: Record<string, number>; // video slot id -> 0..100
  checklist: Record<string, boolean>; // "theme:index" -> done
  quiz: { at: number; theme: string; score: number; total: number }[];
  goals: Record<string, boolean>;
  courses: string[]; // chapter ids marked as studied
};

export const defaults: DemoState = {
  bookmarks: [],
  history: [],
  progress: {},
  checklist: {},
  quiz: [],
  goals: {},
  courses: [],
};

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

const validators: { [K in keyof DemoState]: (v: unknown) => DemoState[K] } = {
  bookmarks: (v) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, 200) : []),
  courses: (v) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, 200) : []),
  history: (v) =>
    Array.isArray(v)
      ? v.filter((x) => isObj(x) && typeof x.id === 'string' && typeof x.at === 'number' && Number.isFinite(x.at)).map((x) => ({ id: String((x as any).id), at: Number((x as any).at) })).slice(0, 50)
      : [],
  progress: (v) => {
    const out: Record<string, number> = {};
    if (isObj(v)) for (const [k, n] of Object.entries(v)) if (typeof n === 'number' && Number.isFinite(n)) out[k] = Math.max(0, Math.min(100, n));
    return out;
  },
  checklist: (v) => {
    const out: Record<string, boolean> = {};
    if (isObj(v)) for (const [k, b] of Object.entries(v)) if (typeof b === 'boolean') out[k] = b;
    return out;
  },
  goals: (v) => {
    const out: Record<string, boolean> = {};
    if (isObj(v)) for (const [k, b] of Object.entries(v)) if (typeof b === 'boolean') out[k] = b;
    return out;
  },
  quiz: (v) =>
    Array.isArray(v)
      ? v
          .filter((x) => isObj(x) && typeof x.score === 'number' && typeof x.total === 'number' && x.total > 0 && typeof x.at === 'number')
          .map((x: any) => ({ at: x.at, theme: typeof x.theme === 'string' ? x.theme : 'mix', score: Math.max(0, Math.min(x.total, x.score)), total: x.total }))
          .slice(-30)
      : [],
};

export function read<K extends keyof DemoState>(key: K): DemoState[K] {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw == null) return structuredClone(defaults[key]);
    return validators[key](JSON.parse(raw));
  } catch {
    return structuredClone(defaults[key]);
  }
}

export function write<K extends keyof DemoState>(key: K, value: DemoState[K]): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage unavailable: demo keeps working for this page view */
  }
  document.dispatchEvent(new CustomEvent('harti:state', { detail: { key } }));
}

export function resetAll(): void {
  try {
    Object.keys(localStorage).filter((k) => k.startsWith(PREFIX)).forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
  document.dispatchEvent(new CustomEvent('harti:state', { detail: { key: '*' } }));
}

export function toggleIn(key: 'bookmarks' | 'courses', id: string): boolean {
  const list = read(key);
  const i = list.indexOf(id);
  if (i >= 0) list.splice(i, 1);
  else list.unshift(id);
  write(key, list);
  return i < 0;
}

export function pushHistory(id: string): void {
  const h = read('history').filter((x) => x.id !== id);
  h.unshift({ id, at: Date.now() });
  write('history', h.slice(0, 20));
}

export function announce(msg: string): void {
  const el = document.getElementById('live-region');
  if (!el) return;
  el.textContent = '';
  window.setTimeout(() => (el.textContent = msg), 30);
}
