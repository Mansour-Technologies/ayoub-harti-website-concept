/**
 * ORIGINAL demonstration questions written for this concept, in the style of the Moroccan
 * 2nd-year baccalaureate (2 BAC PC/SVT). Not taken from any national exam or from Prof Harti.
 */
export type Difficulty = 'facile' | 'moyen' | 'difficile';
export type Theme = 'ondes' | 'nucleaire' | 'electricite' | 'mecanique' | 'chimie';

export const themes: { id: Theme; label: string }[] = [
  { id: 'ondes', label: 'Ondes' },
  { id: 'nucleaire', label: 'Nucléaire' },
  { id: 'electricite', label: 'Électricité' },
  { id: 'mecanique', label: 'Mécanique' },
  { id: 'chimie', label: 'Chimie' },
];

export type Question = {
  id: string;
  theme: Theme;
  difficulty: Difficulty;
  q: string;
  options: string[];
  answer: number;
  why: string;
};

export const questions: Question[] = [
  { id: 'q1', theme: 'ondes', difficulty: 'facile', q: 'Une onde périodique a une longueur d’onde λ = 0,50 m et une fréquence f = 20 Hz. Sa célérité vaut :', options: ['2,5 m/s', '10 m/s', '40 m/s', '0,025 m/s'], answer: 1, why: 'v = λ · f = 0,50 × 20 = 10 m/s.' },
  { id: 'q2', theme: 'ondes', difficulty: 'moyen', q: 'On diminue la largeur a de la fente éclairée par un laser. L’écart angulaire θ de la tache centrale :', options: ['diminue', 'reste constant', 'augmente', 's’annule'], answer: 2, why: 'θ = λ / a : si a diminue, θ augmente — la diffraction est plus marquée.' },
  { id: 'q3', theme: 'ondes', difficulty: 'difficile', q: 'Une onde se propage le long d’une corde. Un point M situé à 3,0 m de la source reproduit son mouvement avec un retard de 0,60 s. La célérité est :', options: ['1,8 m/s', '0,20 m/s', '5,0 m/s', '3,6 m/s'], answer: 2, why: 'v = d / τ = 3,0 / 0,60 = 5,0 m/s.' },
  { id: 'q4', theme: 'nucleaire', difficulty: 'facile', q: 'Après trois demi-vies, la fraction de noyaux radioactifs restants est :', options: ['1/3', '1/6', '1/8', '1/9'], answer: 2, why: 'Chaque demi-vie divise N par 2 : (1/2)³ = 1/8.' },
  { id: 'q5', theme: 'nucleaire', difficulty: 'moyen', q: 'La relation entre la constante radioactive λ et la demi-vie t½ est :', options: ['t½ = λ · ln 2', 't½ = ln 2 / λ', 't½ = 1 / λ', 't½ = λ / 2'], answer: 1, why: 'N(t½) = N₀/2 ⇒ e^(−λ t½) = 1/2 ⇒ t½ = ln 2 / λ.' },
  { id: 'q6', theme: 'nucleaire', difficulty: 'difficile', q: 'L’énergie de liaison d’un noyau est liée à son défaut de masse Δm par :', options: ['E = Δm · c', 'E = Δm / c²', 'E = Δm · c²', 'E = ½ Δm · c²'], answer: 2, why: 'Relation d’Einstein : El = Δm · c², avec c = 3,00 × 10⁸ m/s.' },
  { id: 'q7', theme: 'electricite', difficulty: 'facile', q: 'Un dipôle RC a R = 1,0 kΩ et C = 10 µF. Sa constante de temps τ vaut :', options: ['10 s', '1,0 ms', '10 ms', '0,10 s'], answer: 2, why: 'τ = R·C = 1,0 × 10³ × 10 × 10⁻⁶ = 1,0 × 10⁻² s = 10 ms.' },
  { id: 'q8', theme: 'electricite', difficulty: 'moyen', q: 'Lors de la charge d’un condensateur sous tension E, à l’instant t = τ, la tension uC vaut environ :', options: ['37 % de E', '50 % de E', '63 % de E', '100 % de E'], answer: 2, why: 'uC(τ) = E (1 − e⁻¹) ≈ 0,63 E.' },
  { id: 'q9', theme: 'electricite', difficulty: 'moyen', q: 'Pour une bobine (L = 0,10 H) en série avec R = 50 Ω, la constante de temps est :', options: ['5,0 s', '2,0 ms', '0,50 ms', '20 ms'], answer: 1, why: 'τ = L / R = 0,10 / 50 = 2,0 × 10⁻³ s.' },
  { id: 'q10', theme: 'electricite', difficulty: 'difficile', q: 'Dans un circuit LC idéal, on multiplie la capacité C par 4. La période propre T₀ est :', options: ['multipliée par 4', 'multipliée par 2', 'divisée par 2', 'inchangée'], answer: 1, why: 'T₀ = 2π√(LC) : √4 = 2, donc T₀ double.' },
  { id: 'q11', theme: 'mecanique', difficulty: 'facile', q: 'Un projectile est lancé sans frottement. Au sommet de sa trajectoire, sa vitesse est :', options: ['nulle', 'égale à v₀ cos α', 'égale à v₀ sin α', 'égale à v₀'], answer: 1, why: 'La composante verticale s’annule au sommet ; la composante horizontale reste v₀ cos α.' },
  { id: 'q12', theme: 'mecanique', difficulty: 'moyen', q: 'À vitesse initiale fixée, et pour un lancer et une arrivée à la même altitude, la portée est maximale pour α égal à :', options: ['30°', '45°', '60°', '90°'], answer: 1, why: 'R = v₀² sin 2α / g est maximale quand sin 2α = 1, soit α = 45°.' },
  { id: 'q13', theme: 'mecanique', difficulty: 'difficile', q: 'Un satellite décrit une orbite circulaire de rayon r autour de la Terre (masse M). Sa vitesse vaut :', options: ['√(G·M·r)', 'G·M / r²', '√(G·M / r)', '2π r / G'], answer: 2, why: 'La gravitation fournit l’accélération centripète : G·M/r² = v²/r ⇒ v = √(G·M / r).' },
  { id: 'q14', theme: 'mecanique', difficulty: 'moyen', q: 'Lors d’une chute verticale avec frottement, la vitesse limite est atteinte quand :', options: ['le poids s’annule', 'l’accélération devient nulle', 'la poussée d’Archimède disparaît', 'la vitesse initiale est nulle'], answer: 1, why: 'Les forces se compensent : ΣF = 0 ⇒ a = 0 ⇒ la vitesse devient constante.' },
  { id: 'q15', theme: 'chimie', difficulty: 'facile', q: 'Une solution aqueuse a un pH = 3,0. La concentration en ions oxonium [H₃O⁺] vaut :', options: ['3,0 mol/L', '1,0 × 10⁻³ mol/L', '1,0 × 10³ mol/L', '0,30 mol/L'], answer: 1, why: '[H₃O⁺] = 10^(−pH) = 10⁻³ mol/L.' },
  { id: 'q16', theme: 'chimie', difficulty: 'moyen', q: 'Pour un couple de pKa = 4,8, dans une solution de pH = 6,0, l’espèce prédominante est :', options: ['la forme acide AH', 'la forme basique A⁻', 'aucune, elles sont égales', 'H₃O⁺'], answer: 1, why: 'pH > pKa ⇒ la forme basique A⁻ prédomine.' },
  { id: 'q17', theme: 'chimie', difficulty: 'moyen', q: 'Dans une pile en fonctionnement, l’anode est l’électrode où se produit :', options: ['une réduction', 'une oxydation', 'un dépôt de métal obligatoire', 'aucune réaction'], answer: 1, why: 'Anode = oxydation (les électrons partent de l’anode vers le circuit extérieur).' },
  { id: 'q18', theme: 'chimie', difficulty: 'difficile', q: 'Un mélange équimolaire d’acide éthanoïque et d’éthanol (alcool primaire) évolue vers un rendement d’environ :', options: ['33 %', '50 %', '67 %', '100 %'], answer: 2, why: 'Estérification lente et limitée : rendement ≈ 67 % pour un alcool primaire en mélange équimolaire.' },
];

/** Exam-style multi-part exercise (original). */
export const sampleExercise = {
  title: 'Exercice type — Mouvement d’un ballon',
  context:
    'Un ballon est lancé depuis le sol avec une vitesse v₀ = 12 m/s faisant un angle α = 40° avec l’horizontale. On néglige l’action de l’air et on prend g = 9,8 m/s². Le point de lancement et le point de chute sont à la même altitude.',
  parts: [
    { q: '1. Appliquer la deuxième loi de Newton et donner les composantes du vecteur accélération.', a: 'Système : ballon ; référentiel terrestre supposé galiléen. Seule force : le poids. ΣF = m·a ⇒ a = g : ax = 0, ay = −g.' },
    { q: '2. Établir l’équation de la trajectoire y(x).', a: 'x(t) = v₀ cos α · t ; y(t) = −½ g t² + v₀ sin α · t. En éliminant t : y = −g x² / (2 v₀² cos² α) + x tan α.' },
    { q: '3. Calculer la hauteur maximale H atteinte.', a: 'H = v₀² sin² α / (2g) = 144 × (0,643)² / 19,6 ≈ 3,0 m.' },
    { q: '4. Calculer la portée R.', a: 'R = v₀² sin 2α / g = 144 × sin 80° / 9,8 ≈ 14,5 m.' },
  ],
};

export const checklists: { theme: Theme; items: string[] }[] = [
  { theme: 'ondes', items: ['Je distingue onde transversale et longitudinale', 'Je calcule v = d / τ à partir d’un retard', 'J’utilise λ = v · T', 'J’explique la diffraction et θ = λ / a', 'Je connais le phénomène de dispersion'] },
  { theme: 'nucleaire', items: ['J’écris une équation de désintégration (lois de Soddy)', 'J’utilise N(t) = N₀ e^(−λt)', 'Je relie t½ et λ', 'Je calcule une énergie de liaison par nucléon', 'Je calcule l’énergie libérée par une réaction'] },
  { theme: 'electricite', items: ['J’établis l’équation différentielle du dipôle RC', 'Je détermine τ graphiquement', 'J’établis l’équation du dipôle RL', 'Je calcule T₀ = 2π√(LC)', 'J’explique l’amortissement par la résistance'] },
  { theme: 'mecanique', items: ['J’applique la 2ème loi de Newton avec méthode', 'J’établis y(x) pour un projectile', 'Je calcule H et R', 'J’exploite la vitesse limite d’une chute', 'J’applique la 3ème loi de Kepler'] },
  { theme: 'chimie', items: ['Je trace un tableau d’avancement', 'Je détermine t½ d’une réaction', 'Je compare pH et pKa', 'J’exploite l’équivalence d’un dosage', 'Je calcule un rendement d’estérification'] },
];
