import type { LevelId } from './courses';

/**
 * Vidéothèque entries.
 * - kind 'official': a real public video from the official channel @ProfHarti, verified via YouTube oEmbed
 *   on 2026-11-26 (author_name "Prof Harti", playableInEmbed true). Embedded with youtube-nocookie, click-to-load.
 * - kind 'slot': a lesson slot of this concept. No video ID — the slot shows an original revision sheet
 *   and is clearly labelled as a placeholder to be connected to Prof Harti's own lessons on approval.
 */
export type Video = {
  id: string;
  kind: 'official' | 'slot';
  youtubeId?: string;
  title: string;
  titleAr?: string;
  level: LevelId | 'all';
  chapter?: string;
  unit: string;
  duration?: string;
  summary: string;
  points: string[];
};

export const videos: Video[] = [
  {
    id: 'offre-excellence',
    kind: 'official',
    youtubeId: 'bQRpHAGhIXw',
    title: 'Présentation de l’Offre Excellence',
    titleAr: 'للتسجيل في عرض التفوق',
    level: 'all',
    unit: 'Programme',
    duration: '0:59',
    summary: 'Vidéo officielle publiée sur la chaîne YouTube @ProfHarti : présentation du programme « عرض التفوق ».',
    points: [
      'Vidéo publique de la chaîne officielle, intégrée sans être hébergée sur ce site.',
      'Lecture uniquement après clic (youtube-nocookie), aucun son automatique.',
      'Inscription au programme : uniquement via les canaux officiels du professeur.',
    ],
  },
  { id: 'v-ondes', kind: 'slot', title: 'Onde progressive : retard et célérité', level: '2bac', chapter: '2bac-ondes', unit: 'Ondes', summary: 'Lire un retard sur un oscillogramme et en déduire la célérité.', points: ['Le retard τ est le décalage temporel entre deux points du milieu.', 'v = d / τ, avec d la distance entre les deux points.', 'Piège classique : convertir les divisions de l’oscillogramme avec la bonne sensibilité horizontale.'] },
  { id: 'v-diffraction', kind: 'slot', title: 'Diffraction : l’écart angulaire θ = λ / a', level: '2bac', chapter: '2bac-periodiques', unit: 'Ondes', summary: 'Pourquoi une fente plus fine élargit la tache centrale.', points: ['θ = λ / a (en radians, petits angles).', 'Largeur de la tache centrale : L = 2 D λ / a.', 'Plus a diminue, plus la diffraction est marquée.'] },
  { id: 'v-radio', kind: 'slot', title: 'Demi-vie : la méthode en trois lignes', level: '2bac', chapter: '2bac-nucleaire', unit: 'Nucléaire', summary: 'Relier λ, t½ et le nombre de noyaux restants.', points: ['t½ = ln 2 / λ.', 'Après n demi-vies, il reste N₀ / 2ⁿ noyaux.', 'L’activité suit la même loi : a(t) = a₀ · e^(−λt).'] },
  { id: 'v-rc', kind: 'slot', title: 'Dipôle RC : lire τ sur une courbe', level: '2bac', chapter: '2bac-rc', unit: 'Électricité', summary: 'Deux méthodes graphiques pour trouver la constante de temps.', points: ['À t = τ, uC atteint 63 % de E lors de la charge.', 'La tangente à l’origine coupe l’asymptote uC = E en t = τ.', 'Régime permanent atteint vers 5τ.'] },
  { id: 'v-rlc', kind: 'slot', title: 'RLC libre : énergie qui oscille', level: '2bac', chapter: '2bac-rlc', unit: 'Électricité', summary: 'Pseudo-période, amortissement et échanges d’énergie.', points: ['T₀ = 2π√(LC) pour le circuit LC idéal.', 'La résistance dissipe l’énergie par effet Joule.', 'Régimes : pseudo-périodique, critique, apériodique.'] },
  { id: 'v-newton', kind: 'slot', title: 'Deuxième loi de Newton : la méthode', level: '2bac', chapter: '2bac-newton', unit: 'Mécanique', summary: 'Système, référentiel, bilan des forces, projection.', points: ['Toujours préciser le système et le référentiel galiléen.', 'Bilan des forces, puis ΣF = m·a.', 'Projeter sur des axes adaptés au mouvement.'] },
  { id: 'v-projectile', kind: 'slot', title: 'Projectile : équation de la trajectoire', level: '2bac', chapter: '2bac-plan', unit: 'Mécanique', summary: 'De ΣF = m·g à la parabole y(x).', points: ['ax = 0 et ay = −g : deux mouvements indépendants.', 'y(x) = −g x² / (2 v₀² cos²α) + x tan α.', 'Au sommet, la vitesse verticale s’annule.'] },
  { id: 'v-satellites', kind: 'slot', title: 'Satellite géostationnaire', level: '2bac', chapter: '2bac-satellites', unit: 'Mécanique', summary: 'Vitesse, période et troisième loi de Kepler.', points: ['v = √(G·M / r) sur une orbite circulaire.', 'T² / r³ = 4π² / (G·M).', 'Géostationnaire : même période que la rotation de la Terre, dans le plan équatorial.'] },
  { id: 'v-acide', kind: 'slot', title: 'Diagramme de prédominance', level: '2bac', chapter: '2bac-acidobase', unit: 'Chimie', summary: 'Comparer pH et pKa en une seconde.', points: ['pH < pKa : la forme acide AH prédomine.', 'pH > pKa : la forme basique A⁻ prédomine.', 'À la demi-équivalence d’un dosage : pH = pKa.'] },
  { id: 'v-ester', kind: 'slot', title: 'Estérification : rendement et contrôle', level: '2bac', chapter: '2bac-ester', unit: 'Chimie', summary: 'Pourquoi 67 % et comment faire mieux.', points: ['Mélange équimolaire acide + alcool primaire : rendement ≈ 67 %.', 'Excès d’un réactif ou élimination de l’eau : rendement augmenté.', 'Un catalyseur accélère sans modifier l’état final.'] },
  { id: 'v-energie', kind: 'slot', title: 'Théorème de l’énergie cinétique', level: '1bac', chapter: '1bac-ec', unit: 'Mécanique', summary: 'ΔEc = ΣW en exercice type.', points: ['ΔEc = Ec(B) − Ec(A) = Σ W(F).', 'Le travail du poids ne dépend que de la dénivellation.', 'Une force perpendiculaire au déplacement ne travaille pas.'] },
  { id: 'v-redox', kind: 'slot', title: 'Équilibrer une demi-équation', level: '1bac', chapter: '1bac-redox', unit: 'Chimie', summary: 'Méthode pas à pas en milieu acide.', points: ['Équilibrer l’élément principal, puis O avec H₂O.', 'Équilibrer H avec H⁺, puis les charges avec e⁻.', 'Combiner pour éliminer les électrons.'] },
  { id: 'v-gravitation', kind: 'slot', title: 'Gravitation universelle : calcul guidé', level: 'tc', chapter: 'tc-gravitation', unit: 'Mécanique', summary: 'Unités, puissances de dix et ordre de grandeur.', points: ['G = 6,67 × 10⁻¹¹ N·m²·kg⁻².', 'Distances en mètres, entre les centres.', 'Vérifier l’ordre de grandeur à la fin.'] },
  { id: 'v-ohm', kind: 'slot', title: 'Loi d’Ohm : exploiter une caractéristique', level: '3ac', chapter: '3ac-ohm', unit: 'Électricité', summary: 'Lire R comme le coefficient directeur.', points: ['Graphique U = f(I) : une droite passant par l’origine.', 'R = U / I, en ohms (Ω).', 'Attention aux mA : convertir en ampères.'] },
];
