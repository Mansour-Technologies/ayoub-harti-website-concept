/**
 * Central configuration for the concept site.
 * Every identity fact below is sourced from the prospect's official public channels
 * (see README "Sources & assets"). Anything illustrative is flagged as demo content in the UI.
 */
export const identity = {
  name: 'Ayoub Harti',
  brand: 'Prof Harti',
  nameAr: 'أيوب حارتي',
  subject: 'Physique-Chimie',
  subjectAr: 'الفيزياء والكيمياء',
  // Levels as listed in the official YouTube channel description.
  levels: ['1ère année collège', '2ème année collège', '3ème année collège', 'Tronc commun', '1ère Bac', '2ème Bac'],
  // Programme name as published on his official channels (عرض التفوق).
  programmeAr: 'عرض التفوق',
  programmeFr: 'Offre Excellence',
} as const;

export const officialLinks = {
  youtube: { label: 'YouTube', handle: '@ProfHarti', url: 'https://www.youtube.com/@ProfHarti', channelId: 'UCblvxsFoS21ZOJjCAID68UA' },
  instagram: { label: 'Instagram', handle: '@prof_harti', url: 'https://www.instagram.com/prof_harti/' },
  facebook: { label: 'Facebook', handle: 'Prof.harti', url: 'https://www.facebook.com/Prof.harti' },
} as const;

export const notice = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
export const studio = { name: 'Mansour Technologies', url: 'https://mansourtechnologies.com/' };

export type NavItem = { href: string; label: string; short?: string; num: string };
export const nav: NavItem[] = [
  { href: '', label: 'Accueil', num: '00' },
  { href: 'professeur/', label: 'Le professeur', num: '01' },
  { href: 'cours/', label: 'Cours & programmes', short: 'Cours', num: '02' },
  { href: 'videotheque/', label: 'Vidéothèque', num: '03' },
  { href: 'examens/', label: 'Préparation BAC', short: 'Examens', num: '04' },
  { href: 'laboratoire/', label: 'Laboratoire', num: '05' },
  { href: 'espace-etudiant/', label: 'Espace étudiant', short: 'Espace', num: '06' },
  { href: 'contact/', label: 'Contact', num: '07' },
];

export const theme = {
  ink: '#0E0B0A',
  signal: '#F7C51E',
  bordeaux: '#6B1A2B',
  chalk: '#EDE6DA',
};
