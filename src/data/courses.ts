/**
 * Course map — chapter titles follow the public Moroccan secondary physics-chemistry curriculum.
 * Organisation, summaries and formulas are ORIGINAL demonstration content written for this concept;
 * they are not Prof Harti's material and would be replaced by his own on approval.
 */
export type LevelId = '3ac' | 'tc' | '1bac' | '2bac';
export type Domain = 'physique' | 'chimie';

export const levels: { id: LevelId; label: string; labelAr: string; long: string }[] = [
  { id: '3ac', label: '3ème AC', labelAr: 'الثالثة إعدادي', long: '3ème année collège' },
  { id: 'tc', label: 'Tronc commun', labelAr: 'الجذع المشترك', long: 'Tronc commun scientifique' },
  { id: '1bac', label: '1ère Bac', labelAr: 'الأولى باك', long: '1ère année du baccalauréat' },
  { id: '2bac', label: '2ème Bac', labelAr: 'الثانية باك', long: '2ème année du baccalauréat (PC / SVT)' },
];

export type Chapter = {
  id: string;
  level: LevelId;
  domain: Domain;
  unit: string;
  title: string;
  titleAr: string;
  idea: string;
  formula?: string;
};

export const chapters: Chapter[] = [
  // 3AC
  { id: '3ac-mouvement', level: '3ac', domain: 'physique', unit: 'Mécanique', title: 'Mouvement et repos', titleAr: 'الحركة والسكون', idea: 'Un mouvement n’existe que par rapport à un référentiel choisi.', formula: 'v = d / t' },
  { id: '3ac-actions', level: '3ac', domain: 'physique', unit: 'Mécanique', title: 'Actions mécaniques et forces', titleAr: 'التأثيرات الميكانيكية', idea: 'Une force se décrit par quatre caractéristiques : point d’application, droite d’action, sens, intensité.' },
  { id: '3ac-poids', level: '3ac', domain: 'physique', unit: 'Mécanique', title: 'Poids et masse', titleAr: 'الوزن والكتلة', idea: 'La masse ne change pas d’un astre à l’autre ; le poids, si.', formula: 'P = m · g' },
  { id: '3ac-ohm', level: '3ac', domain: 'physique', unit: 'Électricité', title: 'Loi d’Ohm', titleAr: 'قانون أوم', idea: 'Pour un conducteur ohmique, la tension est proportionnelle à l’intensité.', formula: 'U = R · I' },
  { id: '3ac-puissance', level: '3ac', domain: 'physique', unit: 'Électricité', title: 'Puissance et énergie électriques', titleAr: 'القدرة والطاقة الكهربائية', idea: 'L’énergie consommée dépend de la puissance et de la durée.', formula: 'E = P · t' },
  { id: '3ac-ph', level: '3ac', domain: 'chimie', unit: 'Chimie', title: 'Solutions acides et basiques — pH', titleAr: 'المحاليل الحمضية والقاعدية', idea: 'pH < 7 acide, pH = 7 neutre, pH > 7 basique (à 25 °C).' },
  { id: '3ac-metaux', level: '3ac', domain: 'chimie', unit: 'Chimie', title: 'Réactions des métaux avec l’air', titleAr: 'تفاعل الفلزات مع الهواء', idea: 'Le fer rouille, l’aluminium se protège par une couche d’alumine.' },
  // TC
  { id: 'tc-gravitation', level: 'tc', domain: 'physique', unit: 'Mécanique', title: 'Gravitation universelle', titleAr: 'التجاذب الكوني', idea: 'Deux corps s’attirent proportionnellement à leurs masses, inversement au carré de la distance.', formula: 'F = G · mA · mB / d²' },
  { id: 'tc-inertie', level: 'tc', domain: 'physique', unit: 'Mécanique', title: 'Principe d’inertie', titleAr: 'مبدأ القصور', idea: 'Sans force (ou forces compensées), un corps reste au repos ou en mouvement rectiligne uniforme.' },
  { id: 'tc-equilibre', level: 'tc', domain: 'physique', unit: 'Mécanique', title: 'Équilibre d’un solide', titleAr: 'توازن جسم صلب', idea: 'À l’équilibre, la somme vectorielle des forces est nulle.', formula: 'ΣF = 0' },
  { id: 'tc-courant', level: 'tc', domain: 'physique', unit: 'Électricité', title: 'Courant et tension continus', titleAr: 'التيار والتوتر المستمران', idea: 'Loi des nœuds et loi des mailles : la base de tout circuit.' },
  { id: 'tc-atome', level: 'tc', domain: 'chimie', unit: 'Chimie', title: 'Modèle de l’atome', titleAr: 'نموذج الذرة', idea: 'Un atome ZAX contient Z protons, A − Z neutrons et Z électrons.' },
  { id: 'tc-mole', level: 'tc', domain: 'chimie', unit: 'Chimie', title: 'La mole', titleAr: 'المول', idea: 'La quantité de matière relie l’échelle atomique à l’échelle du laboratoire.', formula: 'n = m / M' },
  // 1BAC
  { id: '1bac-travail', level: '1bac', domain: 'physique', unit: 'Mécanique', title: 'Travail et puissance d’une force', titleAr: 'شغل وقدرة قوة', idea: 'Une force travaille quand son point d’application se déplace.', formula: 'W = F · AB · cos α' },
  { id: '1bac-ec', level: '1bac', domain: 'physique', unit: 'Mécanique', title: 'Énergie cinétique', titleAr: 'الطاقة الحركية', idea: 'La variation d’énergie cinétique égale la somme des travaux des forces.', formula: 'Ec = ½ m v²' },
  { id: '1bac-em', level: '1bac', domain: 'physique', unit: 'Mécanique', title: 'Énergie mécanique', titleAr: 'الطاقة الميكانيكية', idea: 'Sans frottement, l’énergie mécanique se conserve.', formula: 'Em = Ec + Epp' },
  { id: '1bac-champ', level: '1bac', domain: 'physique', unit: 'Électromagnétisme', title: 'Champ magnétique', titleAr: 'المجال المغناطيسي', idea: 'Un courant crée un champ magnétique ; un champ agit sur un courant (force de Laplace).' },
  { id: '1bac-conductance', level: '1bac', domain: 'chimie', unit: 'Chimie', title: 'Conductance et conductivité', titleAr: 'المواصلة والموصلية', idea: 'Les ions transportent le courant dans une solution.', formula: 'G = σ · S / L' },
  { id: '1bac-redox', level: '1bac', domain: 'chimie', unit: 'Chimie', title: 'Réactions d’oxydo-réduction', titleAr: 'تفاعلات الأكسدة والاختزال', idea: 'Un oxydant capte des électrons, un réducteur en cède.' },
  // 2BAC
  { id: '2bac-ondes', level: '2bac', domain: 'physique', unit: 'Ondes', title: 'Ondes mécaniques progressives', titleAr: 'الموجات الميكانيكية المتوالية', idea: 'Une onde transporte de l’énergie sans transport de matière.', formula: 'v = d / Δt' },
  { id: '2bac-periodiques', level: '2bac', domain: 'physique', unit: 'Ondes', title: 'Ondes périodiques et diffraction', titleAr: 'الموجات المتوالية الدورية', idea: 'La longueur d’onde est la distance parcourue pendant une période.', formula: 'λ = v · T' },
  { id: '2bac-nucleaire', level: '2bac', domain: 'physique', unit: 'Transformations nucléaires', title: 'Décroissance radioactive', titleAr: 'التناقص الإشعاعي', idea: 'Le nombre de noyaux décroît exponentiellement.', formula: 'N(t) = N₀ · e^(−λt)' },
  { id: '2bac-energie-noyau', level: '2bac', domain: 'physique', unit: 'Transformations nucléaires', title: 'Noyaux, masse et énergie', titleAr: 'النوى والكتلة والطاقة', idea: 'Le défaut de masse se convertit en énergie de liaison.', formula: 'E = Δm · c²' },
  { id: '2bac-rc', level: '2bac', domain: 'physique', unit: 'Électricité', title: 'Dipôle RC', titleAr: 'ثنائي القطب RC', idea: 'Le condensateur se charge avec une constante de temps τ.', formula: 'τ = R · C' },
  { id: '2bac-rl', level: '2bac', domain: 'physique', unit: 'Électricité', title: 'Dipôle RL', titleAr: 'ثنائي القطب RL', idea: 'La bobine s’oppose aux variations du courant.', formula: 'τ = L / R' },
  { id: '2bac-rlc', level: '2bac', domain: 'physique', unit: 'Électricité', title: 'Oscillations libres RLC', titleAr: 'التذبذبات الحرة في دارة RLC', idea: 'L’énergie s’échange entre condensateur et bobine.', formula: 'T₀ = 2π √(L·C)' },
  { id: '2bac-newton', level: '2bac', domain: 'physique', unit: 'Mécanique', title: 'Lois de Newton', titleAr: 'قوانين نيوتن', idea: 'La somme des forces impose l’accélération du centre d’inertie.', formula: 'ΣF = m · a' },
  { id: '2bac-plan', level: '2bac', domain: 'physique', unit: 'Mécanique', title: 'Mouvements plans — projectile', titleAr: 'الحركات المستوية', idea: 'Une chute libre se décompose en un mouvement uniforme et un mouvement uniformément varié.', formula: 'R = v₀² sin 2α / g' },
  { id: '2bac-satellites', level: '2bac', domain: 'physique', unit: 'Mécanique', title: 'Satellites et planètes', titleAr: 'الأقمار الاصطناعية والكواكب', idea: 'Sur une orbite circulaire, la gravitation fournit l’accélération centripète.', formula: 'v = √(G·M / r)' },
  { id: '2bac-cinetique', level: '2bac', domain: 'chimie', unit: 'Chimie', title: 'Suivi temporel d’une transformation', titleAr: 'التتبع الزمني لتحول كيميائي', idea: 'Le temps de demi-réaction t½ correspond à x = xmax / 2.' },
  { id: '2bac-acidobase', level: '2bac', domain: 'chimie', unit: 'Chimie', title: 'Réactions acido-basiques', titleAr: 'التفاعلات حمض-قاعدة', idea: 'pKa et pH décident de l’espèce prédominante.', formula: 'pH = pKa + log([A⁻]/[AH])' },
  { id: '2bac-piles', level: '2bac', domain: 'chimie', unit: 'Chimie', title: 'Piles et électrolyse', titleAr: 'الأعمدة والتحليل الكهربائي', idea: 'À l’anode : oxydation. À la cathode : réduction.' },
  { id: '2bac-ester', level: '2bac', domain: 'chimie', unit: 'Chimie', title: 'Estérification et hydrolyse', titleAr: 'الأسترة والحلمأة', idea: 'Transformation lente et limitée ; on la contrôle par excès de réactif ou élimination d’un produit.' },
];

export const chapterById = (id: string) => chapters.find((c) => c.id === id);
