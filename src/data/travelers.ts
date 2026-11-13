// Profils de voyageurs FICTIFS, créés pour la démonstration. Ils ne représentent aucune personne réelle.
// Les avatars sont des initiales sur un dégradé : aucune photo de visage n'est utilisée.
import type { Companion, Interest, MeetingLevel, Pace } from './carnets';
import type { PhotoId } from './travelPhotos';

export type BudgetLevel = 'Petit budget' | 'Équilibré' | 'Confort';

export interface StorySlide {
  photo: PhotoId;
  caption: string;
}

export interface Traveler {
  id: string;
  name: string;
  handle: string;
  label: string;
  /** Ville ou pays, seulement si le voyageur choisit de le partager. */
  home?: string;
  bio: string;
  interests: Interest[];
  companions: Companion[];
  pace: Pace;
  budget: BudgetLevel;
  meetings: MeetingLevel;
  banner: PhotoId;
  gradient: [string, string];
  /** Story du moment (24 h dans l'application). */
  story: StorySlide[];
  /** Stories mises à la une sur le profil. */
  highlights: { title: string; slides: StorySlide[] }[];
}

export const TRAVELERS: Traveler[] = [
  {
    id: 'lena',
    name: 'Léna',
    handle: '@lentementailleurs',
    label: 'Voyages lents, en train de préférence',
    home: 'Lyon, France',
    bio: 'Prendre le temps, marcher et photographier les petits détails. Je note tout : horaires, adresses et ce que je referais autrement.',
    interests: ['Culture & visites', 'Gastronomie', 'Détente'],
    companions: ['Duo', 'Solo'],
    pace: 'Équilibré',
    budget: 'Équilibré',
    meetings: 1,
    banner: 'porto-1',
    gradient: ['#1fb8de', '#5868ee'],
    story: [
      { photo: 'lisbonne-1', caption: 'Le tramway 28 avant 8 h, presque vide.' },
      { photo: 'coimbra-1', caption: 'La cour de l’université de Coimbra.' },
      { photo: 'albaicin', caption: 'Fin de journée sur l’Albaicín, à Grenade.' },
    ],
    highlights: [
      { title: 'Portugal', slides: [{ photo: 'porto-2', caption: 'Le pont Dom-Luís-Ier à l’heure bleue.' }, { photo: 'lisbonne-2', caption: 'Le palais de Pena, réservé en ligne.' }, { photo: 'sagres-1', caption: 'Sur le sentier des pêcheurs.' }] },
      { title: 'Andalousie', slides: [{ photo: 'seville', caption: 'La Giralda, un soir de printemps.' }, { photo: 'cordoue-mezquita', caption: 'La forêt de colonnes de Cordoue.' }, { photo: 'exp-4-a', caption: 'L’Alhambra depuis San Nicolás.' }] },
    ],
  },
  {
    id: 'noa',
    name: 'Noa',
    handle: '@escapadenature',
    label: 'Randonnées et grands espaces',
    bio: 'Des itinéraires simples, beaucoup de marche et des nuits en refuge. Je teste les transports publics jusqu’aux départs de sentiers.',
    interests: ['Nature & aventure'],
    companions: ['Duo', 'Amis', 'Famille'],
    pace: 'Intense',
    budget: 'Équilibré',
    meetings: 1,
    banner: 'geiranger-1',
    gradient: ['#14a99a', '#3d7bf2'],
    story: [
      { photo: 'flam-1', caption: 'Le train de Flåm descend vers le fjord.' },
      { photo: 'exp-3-a', caption: 'Tour des Tre Cime, au lever du jour.' },
      { photo: 'exp-5-b', caption: 'La Soča, aussi verte qu’annoncé.' },
    ],
    highlights: [
      { title: 'Norvège', slides: [{ photo: 'norvege-cover', caption: 'Croisière sur le Nærøyfjord.' }, { photo: 'geiranger-2', caption: 'Les Sept Sœurs depuis le ferry.' }, { photo: 'bergen-1', caption: 'Arrivée à Bryggen.' }] },
      { title: 'Dolomites', slides: [{ photo: 'siusi', caption: 'Alpages de l’Alpe di Siusi.' }, { photo: 'braies', caption: 'Lac de Braies avant la foule.' }] },
      { title: 'Slovénie', slides: [{ photo: 'exp-5-a', caption: 'Le lac de Bohinj en famille.' }, { photo: 'vrsic', caption: 'Pause au col de Vršič.' }] },
    ],
  },
  {
    id: 'emma',
    name: 'Emma',
    handle: '@gourmandeenvoyage',
    label: 'Cuisines de rue et marchés',
    home: 'Bordeaux, France',
    bio: 'Je découvre une ville par ses marchés, ses recettes et les gens qui les préparent. Mes carnets parlent surtout de ce qu’on mange, et de combien ça coûte.',
    interests: ['Gastronomie', 'Culture & visites'],
    companions: ['Amis', 'Duo'],
    pace: 'Équilibré',
    budget: 'Petit budget',
    meetings: 2,
    banner: 'exp-2-a',
    gradient: ['#8c6fe6', '#e5486f'],
    story: [
      { photo: 'food-pho', caption: 'Le phở du matin, devenu un rituel.' },
      { photo: 'hanoi', caption: 'Le marché aux fleurs de la vieille ville.' },
      { photo: 'ninhbinh', caption: 'Tam Cốc, à vélo dans les rizières.' },
    ],
    highlights: [{ title: 'Vietnam', slides: [{ photo: 'hue', caption: 'La pagode Thiên Mụ.' }, { photo: 'haivan', caption: 'Le col des Nuages.' }, { photo: 'exp-2-a', caption: 'Hội An, le soir.' }] }],
  },
  {
    id: 'hugo',
    name: 'Hugo',
    handle: '@railsetrecits',
    label: 'Train et itinérance',
    home: 'Lille, France',
    bio: 'Je voyage en train dès que c’est possible et je documente chaque correspondance, pour que d’autres puissent refaire le trajet.',
    interests: ['Culture & visites', 'Nature & aventure'],
    companions: ['Solo', 'Duo'],
    pace: 'Équilibré',
    budget: 'Équilibré',
    meetings: 2,
    banner: 'exp-1-a',
    gradient: ['#3d7bf2', '#1fb8de'],
    story: [
      { photo: 'kyoto-2', caption: 'Fushimi Inari à 7 h : personne.' },
      { photo: 'takayama-1', caption: 'Shirakawa-gō depuis le belvédère.' },
      { photo: 'portree', caption: 'Portree, entre deux averses.' },
    ],
    highlights: [
      { title: 'Japon', slides: [{ photo: 'tokyo-1', caption: 'Shibuya, premier soir.' }, { photo: 'matsumoto-1', caption: 'Le château de Matsumoto.' }, { photo: 'kyoto-1', caption: 'Arashiyama au lever du jour.' }] },
      { title: 'Écosse', slides: [{ photo: 'fortwilliam', caption: 'Le Glen Nevis.' }, { photo: 'exp-1-b', caption: 'Le Storr, sur l’île de Skye.' }] },
    ],
  },
  {
    id: 'ines',
    name: 'Inès',
    handle: '@vapeursdunord',
    label: 'Bains chauds et voyages lents dans le Nord',
    bio: 'Je cherche les bains, sources et piscines où vont les habitants, loin des lieux les plus fréquentés.',
    interests: ['Détente', 'Nature & aventure'],
    companions: ['Amis', 'Duo'],
    pace: 'Détente',
    budget: 'Confort',
    meetings: 2,
    banner: 'vik',
    gradient: ['#1fb8de', '#8c6fe6'],
    story: [
      { photo: 'reykjadalur', caption: 'La rivière chaude de Reykjadalur.' },
      { photo: 'geysir', caption: 'Strokkur, toutes les dix minutes environ.' },
      { photo: 'exp-6-a', caption: 'Seljavallalaug, nichée dans la montagne.' },
    ],
    highlights: [{ title: 'Islande', slides: [{ photo: 'reykjavik', caption: 'Reykjavík depuis Hallgrímskirkja.' }, { photo: 'exp-6-b', caption: 'Skógafoss.' }, { photo: 'vik', caption: 'Reynisfjara, à bonne distance des vagues.' }] }],
  },
];
