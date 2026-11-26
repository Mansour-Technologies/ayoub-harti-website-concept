/**
 * Central configuration for the showcase.
 * Every identity fact is sourced from the teacher's official public channels (see README "Sources").
 */
export const identity = {
  name: 'Ayoub Harti',
  brand: 'Prof Harti',
  nameAr: 'أيوب حارتي',
  subject: 'Physique-Chimie',
  subjectAr: 'الفيزياء والكيمياء',
} as const;

/** Levels as listed in the official YouTube channel description (1ère année collège → 2ème Bac). */
export const levels = [
  { cycle: 'Collège', label: '1ère année collège', short: '1AC', ar: 'الأولى إعدادي' },
  { cycle: 'Collège', label: '2ème année collège', short: '2AC', ar: 'الثانية إعدادي' },
  { cycle: 'Collège', label: '3ème année collège', short: '3AC', ar: 'الثالثة إعدادي' },
  { cycle: 'Lycée', label: 'Tronc commun', short: 'TC', ar: 'الجذع المشترك' },
  { cycle: 'Lycée', label: '1ère année Bac', short: '1BAC', ar: 'الأولى باك' },
  { cycle: 'Lycée', label: '2ème année Bac', short: '2BAC', ar: 'الثانية باك' },
] as const;

/** Programme as publicly announced in the official video description (no price published). */
export const programme = {
  nameAr: 'عرض التفوق',
  nameFr: 'Offre Excellence',
  includes: [
    { fr: 'L’explication de tous les paragraphes du cours', ar: 'شرح جميع الفقرات' },
    { fr: 'Des exercices variés', ar: 'تمارين اخرين متنوعة' },
    { fr: 'Les méthodes pour aborder les examens nationaux', ar: 'كيفاش تعامل مع الامتحانات الوطنية' },
  ],
} as const;

/** The one public, embeddable video on the official channel (verified via oEmbed, 2026-11-26). */
export const officialVideo = { id: 'bQRpHAGhIXw', titleAr: 'للتسجيل في عرض التفوق', title: 'Présentation de l’Offre Excellence', duration: '0:59' } as const;

export const officialLinks = {
  instagram: { label: 'Instagram', handle: '@prof_harti', url: 'https://www.instagram.com/prof_harti/', dm: 'https://ig.me/m/prof_harti' },
  youtube: { label: 'YouTube', handle: '@ProfHarti', url: 'https://www.youtube.com/@ProfHarti' },
  facebook: { label: 'Facebook', handle: 'Prof.harti', url: 'https://www.facebook.com/Prof.harti' },
} as const;

/**
 * WhatsApp number — to be inserted on the teacher's approval.
 * Format when provided: international digits only, e.g. '2126XXXXXXXX'. While null, no WhatsApp button is rendered.
 */
export const contact: { whatsapp: string | null } = { whatsapp: null };

export const notice = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
export const studio = { name: 'Mansour Technologies', url: 'https://mansourtechnologies.com/' };

export const nav = [
  { href: '#professeur', label: 'Le professeur', num: '01' },
  { href: '#niveaux', label: 'Niveaux', num: '02' },
  { href: '#offre', label: 'عرض التفوق', num: '03', ar: true },
  { href: '#video', label: 'Vidéo', num: '04' },
  { href: '#inscription', label: 'S’inscrire', num: '05' },
  { href: '#contact', label: 'Contact', num: '06' },
] as const;
