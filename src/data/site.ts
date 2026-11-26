/**
 * Central configuration for the showcase.
 * Every identity fact and every quoted line is taken from the teacher's official public channels
 * (YouTube @ProfHarti, Instagram @prof_harti), consulted 2026-11-26. See README "Sources".
 */
export const identity = {
  name: 'Ayoub Harti',
  brand: 'Prof Harti',
  nameAr: 'أيوب حارتي',
  subject: 'Physique-Chimie',
  subjectAr: 'الفيزياء والكيمياء',
} as const;

/** His own published words — each with its source. Displayed as quotes, never altered. */
export const quotes = {
  banner: { ar: 'مع أيوب حارتي… ما تخافش من الفيزياء', fr: 'Avec Ayoub Harti… n’aie pas peur de la physique.', src: 'Bannière de la chaîne YouTube officielle' },
  promise: { ar: 'دروس مبسطة و شرح واضح', fr: 'Des cours simplifiés, une explication claire.', src: 'Bannière de la chaîne YouTube officielle' },
  bio: { ar: 'أنا هنا باش نساعدك ونبسط ليك الفيزياء', fr: 'Je suis là pour t’aider et te simplifier la physique.', src: 'Bio Instagram @prof_harti' },
  stepByStep: { ar: 'غادي نمشي معك دقة دقة حتى تفهم جميع الدروس', fr: 'Je vais avancer avec toi pas à pas, jusqu’à ce que tu comprennes toutes les leçons.', src: 'Description de la vidéo officielle « للتسجيل في عرض التفوق »' },
  since2017: { ar: 'منذ سنة 2017 بديت رحلتي فالتعليم عن بعد وكان الهدف ديالي بسيط نوصل العلم لأكبر عدد من التلاميذ ونكون سبب فنجاحهم', fr: 'Depuis 2017, j’enseigne à distance. Mon objectif est simple : transmettre au plus grand nombre d’élèves et être une raison de leur réussite.', src: 'Instagram @prof_harti, novembre 2026' },
  exercises: { ar: 'غادي تفهم الدروس بطريقة مبسطة، وتتعلم كيفاش تحل التمارين من السهل للصعب', fr: 'Tu comprendras les leçons simplement, et tu apprendras à résoudre les exercices du plus facile au plus difficile.', src: 'Instagram @prof_harti, 20 novembre 2026' },
  signOff: { ar: 'أستاذكم الحارتي', fr: 'Votre prof, El Harti — sa signature', src: 'Signature de ses publications Instagram' },
} as const;

/** Levels as listed in the official YouTube channel description (1ère année collège → 2ème Bac). */
export const levels = [
  { short: '1AC', label: '1ère année collège', ar: 'الأولى إعدادي' },
  { short: '2AC', label: '2ème année collège', ar: 'الثانية إعدادي' },
  { short: '3AC', label: '3ème année collège', ar: 'الثالثة إعدادي' },
  { short: 'TC', label: 'Tronc commun', ar: 'الجذع المشترك' },
  { short: '1BAC', label: '1ère année Bac', ar: 'الأولى باك' },
  { short: '2BAC', label: '2ème année Bac', ar: 'الثانية باك' },
] as const;

/** Programme as publicly announced (official video description + Instagram). No price is published. */
export const programme = {
  nameAr: 'عرض التفوق',
  nameFr: 'Offre Excellence',
  open: { ar: 'التسجيل مفتوح لجميع المستويات', fr: 'Inscriptions ouvertes à tous les niveaux', src: 'Instagram @prof_harti, 2026' },
  includes: [
    { ar: 'شرح جميع الفقرات', fr: 'L’explication de tous les paragraphes du cours' },
    { ar: 'تمارين متنوعة', fr: 'Des exercices variés' },
    { ar: 'كيفاش تعامل مع الامتحانات الوطنية', fr: 'Les méthodes pour aborder les examens nationaux' },
  ],
} as const;

/** In-person classes as announced on Instagram, 20 Nov 2026 (post Df8npeYNGfW). To be confirmed by the teacher. */
export const inPerson = {
  place: 'Centre Yanis El Fath',
  area: 'Bernoussi',
  areaAr: 'البرنوصي',
  daysAr: 'كل اثنين وجمعة',
  daysFr: 'Lundi et vendredi',
  time: '19:00',
  announced: '20 novembre 2026',
} as const;

/** Formats observed on his official accounts (2023–2026). Archive, not a current schedule. */
export const formats = [
  { time: '23:00', ar: 'ملخصات ليلية', fr: 'Les résumés de nuit', note: 'Story à la une Instagram · fiches publiées sur YouTube' },
  { time: '23:00', ar: 'لايف فالموجات', fr: 'Live « Les Ondes » — un samedi soir', note: 'Annonce YouTube' },
  { time: '22:00', ar: 'النووي كامل فلايف واحد', fr: 'Tout le nucléaire en un seul live — un dimanche', note: 'Annonce Instagram' },
  { time: '23:00 → 03:00', ar: 'من العشاء الى السحور', fr: 'Live marathon du Ramadan — révision de chimie', note: 'Annonce YouTube' },
  { time: '—', ar: 'سول و انا غادي نجاوبك', fr: 'Pose ta question, je te réponds — reels questions-réponses', note: 'Reels Instagram' },
  { time: 'BAC', ar: 'نقط باك', fr: 'Les notes du Bac de ses élèves, chaque session', note: 'Stories à la une 2019 → 2026' },
] as const;

/** The one public, embeddable video on the official channel (verified 2026-11-26: channel tabs, RSS, uploads playlist, oEmbed). */
export const officialVideo = {
  id: 'bQRpHAGhIXw',
  titleAr: 'للتسجيل في عرض التفوق',
  duration: '0:59',
  /** Poster chosen in the asset dossier: YouTube's own 1920×1080 frame of this video, then the 1280×720 default. */
  poster: 'https://i.ytimg.com/vi/bQRpHAGhIXw/oar1.jpg',
  posterFallback: 'https://i.ytimg.com/vi/bQRpHAGhIXw/maxresdefault.jpg',
} as const;

/** Public Instagram reels (official embeds, loaded only after a click). */
export const reels = [
  { code: 'DfsoLePN-qy', titleAr: 'النواة · Le noyau', title: 'Au tableau : le noyau et les nucléons', chapter: 'Nucléaire' },
  { code: 'DfxRHKFBlsc', titleAr: 'Nucléaire 2', title: 'Au tableau : désintégrations α, β⁻, β⁺, γ', chapter: 'Nucléaire 2' },
] as const;

export const officialLinks = {
  instagram: { label: 'Instagram', handle: '@prof_harti', url: 'https://www.instagram.com/prof_harti/', dm: 'https://ig.me/m/prof_harti' },
  youtube: { label: 'YouTube', handle: '@ProfHarti', url: 'https://www.youtube.com/@ProfHarti' },
  facebook: { label: 'Facebook', handle: 'Prof.harti', url: 'https://www.facebook.com/Prof.harti' },
} as const;

/**
 * WhatsApp number — to be inserted on the teacher's approval.
 * Format when provided: international digits only, e.g. '2126XXXXXXXX'. While null, no WhatsApp button is rendered.
 * His public registration instruction is to send the word « عرض »; the button pre-fills it.
 */
export const contact: { whatsapp: string | null } = { whatsapp: null };
export const whatsappHref = (n: string) => `https://wa.me/${n}?text=${encodeURIComponent('عرض')}`;

export const notice = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
export const studio = { name: 'Mansour Technologies', url: 'https://mansourtechnologies.com/' };

export const nav = [
  { href: '#prof', ar: 'الأستاذ', fr: 'Le prof', num: '01' },
  { href: '#sbora', ar: 'السبورة', fr: 'Au tableau', num: '02' },
  { href: '#lives', ar: 'لايفات الليل', fr: 'Les lives de nuit', num: '03' },
  { href: '#offre', ar: 'عرض التفوق', fr: 'Offre Excellence', num: '04' },
  { href: '#inscription', ar: 'التسجيل', fr: 'S’inscrire', num: '05' },
  { href: '#contact', ar: 'تواصل', fr: 'Contact', num: '06' },
] as const;
