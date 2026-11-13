// Carnets de voyage d'exemple. Ils sont FICTIFS : ils illustrent le format imaginé pour Wayorbi.
// Les lieux, transports et ordres de grandeur sont plausibles, mais les budgets ne sont ni des devis
// ni des dépenses vérifiées. Les photos d'illustration viennent de Wikimedia Commons (voir /credits).
import type { PhotoId } from './travelPhotos';

export type Region = 'Europe' | 'Asie';
export type TripType = 'Détente' | 'Nature & aventure' | 'Découverte & tourisme';
export type Pace = 'Détente' | 'Équilibré' | 'Intense';
export type Interest = 'Nature & aventure' | 'Culture & visites' | 'Gastronomie' | 'Détente';
export type Companion = 'Solo' | 'Duo' | 'Amis' | 'Famille';
export type TransportMode = 'Train' | 'Bus' | 'Voiture' | 'Avion' | 'Bateau' | 'Vélo' | 'Marche';
export type ExpenseCategory = 'hebergement' | 'transport' | 'restauration' | 'activites' | 'autres';
export type Expenses = Record<ExpenseCategory, number>;
/** 0 : en autonomie · 1 : quelques échanges · 2 : rencontres fréquentes (auberges, chez l'habitant…) */
export type MeetingLevel = 0 | 1 | 2;

export interface Place {
  kind: 'restaurant' | 'hebergement' | 'lieu';
  name: string;
  note: string;
  photo?: PhotoId;
}

export interface CarnetStep {
  id: string;
  city: string;
  area: string;
  lat: number;
  lon: number;
  days: number;
  arrival: { mode: TransportMode; detail: string };
  story: string;
  activities: string[];
  places: Place[];
  tip: { title: string; detail: string };
  /** Dépenses de l'étape pour tout le groupe, en euros. */
  budget: Expenses;
  photos: PhotoId[];
}

export interface ExampleComment {
  authorId: string;
  text: string;
}

export interface Carnet {
  id: string;
  title: string;
  country: string;
  region: Region;
  authorId: string;
  cover: PhotoId;
  summary: string;
  period: string;
  travelers: number;
  companion: Companion;
  tripType: TripType;
  pace: Pace;
  interests: Interest[];
  meetings: MeetingLevel;
  /** Moyens de rejoindre la destination (en plus des transports utilisés sur place). */
  access: TransportMode[];
  /** Destination moins fréquentée : utile au critère « À découvrir » du Travel DNA. */
  lesserKnown: boolean;
  featured: boolean;
  budgetNote: string;
  highlights: string[];
  steps: CarnetStep[];
  comments: ExampleComment[];
}

export const CARNETS: Carnet[] = [
  {
    id: 'japon',
    title: 'De Tokyo aux Alpes japonaises',
    country: 'Japon',
    region: 'Asie',
    authorId: 'hugo',
    cover: 'japon-cover',
    summary:
      'Douze jours en train et en bus entre la capitale, les villes-châteaux des Alpes japonaises et Kyoto, avec une nuit dans une ferme au toit de chaume.',
    period: 'Automne (fin octobre)',
    travelers: 2,
    companion: 'Duo',
    tripType: 'Découverte & tourisme',
    pace: 'Équilibré',
    interests: ['Culture & visites', 'Nature & aventure', 'Gastronomie'],
    meetings: 1,
    access: ['Avion'],
    lesserKnown: false,
    featured: true,
    budgetNote: 'Pour deux voyageurs, hors vols internationaux.',
    highlights: ['Aucune voiture : trains express et bus de montagne', 'Une nuit en minshuku à Shirakawa-gō', 'Dépenses notées à chaque étape'],
    steps: [
      {
        id: 'tokyo',
        city: 'Tokyo',
        area: 'Kantō',
        lat: 35.6762,
        lon: 139.6503,
        days: 4,
        arrival: { mode: 'Train', detail: 'Aéroport de Narita → Tokyo en train express (environ 1 h)' },
        story:
          'Nous avons commencé par Yanaka, l’un des rares quartiers épargnés par les bombardements, avant de plonger dans l’agitation de Shibuya. Quatre jours pour prendre nos repères, entre ruelles calmes et carrefours géants.',
        activities: ['Ruelles et temples de Yanaka', 'Temple Sensō-ji à Asakusa, tôt le matin', 'Carrefour de Shibuya à la tombée de la nuit'],
        places: [
          { kind: 'hebergement', name: 'Hôtel d’affaires près de la gare d’Ueno', note: 'Chambre compacte mais pratique pour rayonner en métro.' },
          { kind: 'restaurant', name: 'Comptoir de ramen près de Shinjuku', note: 'On commande au distributeur de tickets à l’entrée.', photo: 'food-ramen' },
          { kind: 'restaurant', name: 'Izakaya de quartier à Yanaka', note: 'Petites assiettes à partager, ambiance locale.' },
        ],
        tip: { title: 'Carte Suica sur le téléphone', detail: 'Sur iPhone, la carte de transport Suica s’ajoute au portefeuille du téléphone : elle évite les files aux bornes et fonctionne dans les trains, les métros et les supérettes.' },
        budget: { hebergement: 260, transport: 45, restauration: 130, activites: 65, autres: 20 },
        photos: ['tokyo-1', 'tokyo-2', 'tokyo-3'],
      },
      {
        id: 'matsumoto',
        city: 'Matsumoto',
        area: 'Nagano',
        lat: 36.2381,
        lon: 137.972,
        days: 2,
        arrival: { mode: 'Train', detail: 'Tokyo (Shinjuku) → Matsumoto en express Azusa (environ 2 h 40)' },
        story:
          'Le château noir de Matsumoto se reflète dans ses douves au pied des montagnes. Le lendemain, nous avons marché sur l’ancienne route Nakasendō, d’un village-relais à l’autre.',
        activities: ['Château de Matsumoto et ses douves', 'Rue Nakamachi et ses entrepôts blancs', 'Marche entre Magome et Tsumago sur la route Nakasendō', 'Village-relais de Narai-juku'],
        places: [
          { kind: 'hebergement', name: 'Ryokan familial près du château', note: 'Bain commun et petit-déjeuner japonais inclus.' },
          { kind: 'restaurant', name: 'Comptoir de soba', note: 'Nouilles de sarrasin, la spécialité de la région de Shinshū.' },
        ],
        tip: { title: 'Partir tôt vers la vallée de Kiso', detail: 'Prendre un train avant 8 h pour marcher entre Magome et Tsumago avant l’arrivée des groupes, puis rentrer en fin d’après-midi.' },
        budget: { hebergement: 190, transport: 110, restauration: 70, activites: 25, autres: 0 },
        photos: ['matsumoto-1', 'matsumoto-2', 'matsumoto-3'],
      },
      {
        id: 'takayama',
        city: 'Takayama & Shirakawa-gō',
        area: 'Gifu',
        lat: 36.1461,
        lon: 137.252,
        days: 3,
        arrival: { mode: 'Bus', detail: 'Bus Matsumoto → Kamikochi, puis Kamikochi → Takayama via Hirayu Onsen' },
        story:
          'Pause marche à Kamikochi, au pied des monts Hotaka, puis deux jours dans la vieille ville de Takayama. La nuit dans une ferme au toit de chaume de Shirakawa-gō reste le souvenir le plus fort du voyage.',
        activities: ['Marche au bord de la rivière Azusa à Kamikochi (ouvert d’avril à novembre)', 'Vieille ville de Sanmachi et ses brasseries de saké', 'Marché du matin au bord de la Miyagawa', 'Nuit dans une ferme gasshō-zukuri à Shirakawa-gō'],
        places: [
          { kind: 'hebergement', name: 'Minshuku dans une ferme au toit de chaume', note: 'Dîner et petit-déjeuner servis autour du foyer.' },
          { kind: 'restaurant', name: 'Stand de bœuf de Hida', note: 'Brochettes et sushis de bœuf grillé dans la vieille ville.', photo: 'food-hida' },
        ],
        tip: { title: 'Réserver le bus pour Shirakawa-gō', detail: 'Les places Takayama – Shirakawa-gō partent vite en automne, pendant les couleurs : réserver dès que les dates sont fixées.' },
        budget: { hebergement: 240, transport: 85, restauration: 95, activites: 30, autres: 10 },
        photos: ['takayama-1', 'japon-cover', 'takayama-2', 'takayama-3'],
      },
      {
        id: 'kyoto',
        city: 'Kyoto',
        area: 'Kansai',
        lat: 35.0116,
        lon: 135.7681,
        days: 3,
        arrival: { mode: 'Train', detail: 'Takayama → Nagoya en express Hida, puis Shinkansen jusqu’à Kyoto (environ 3 h 30)' },
        story:
          'Pour finir, Kyoto à vélo : la bambouseraie d’Arashiyama au lever du jour, les torii de Fushimi Inari et les maisons de thé de Gion. Le carnet compile ici le budget complet du voyage.',
        activities: ['Fushimi Inari et ses milliers de torii', 'Bambouseraie d’Arashiyama au lever du jour', 'Gion et ses maisons de thé en bois', 'Marché de Nishiki'],
        places: [
          { kind: 'hebergement', name: 'Maison de ville (machiya) louée à deux', note: 'Cuisine équipée et vélos prêtés par l’hôte.' },
          { kind: 'restaurant', name: 'Table de tofu près d’Arashiyama', note: 'Cuisine végétarienne bouddhiste (shōjin ryōri).' },
          { kind: 'lieu', name: 'Marché de Nishiki', note: 'Dégustations au fil des étals ; à éviter à l’heure de pointe.' },
        ],
        tip: { title: 'Visiter à l’aube', detail: 'Fushimi Inari est accessible jour et nuit et la bambouseraie reste calme avant 7 h 30 : y aller tôt change complètement l’expérience.' },
        budget: { hebergement: 300, transport: 140, restauration: 120, activites: 40, autres: 15 },
        photos: ['kyoto-1', 'kyoto-2', 'kyoto-3'],
      },
    ],
    comments: [
      { authorId: 'emma', text: 'Le marché du matin à Takayama me donne très envie. Le minshuku se réserve combien de temps à l’avance ?' },
      { authorId: 'hugo', text: 'Nous avions réservé environ deux mois avant : en automne, les places partent vite.' },
    ],
  },
  {
    id: 'norvege',
    title: 'Traversée des fjords de l’Ouest',
    country: 'Norvège',
    region: 'Europe',
    authorId: 'noa',
    cover: 'norvege-cover',
    summary:
      'Neuf jours d’Oslo à Bergen en train, en bateau et à pied : la ligne de Flåm, le Nærøyfjord, les sentiers au-dessus de Geiranger et une arrivée par la mer.',
    period: 'Été (juillet)',
    travelers: 2,
    companion: 'Duo',
    tripType: 'Nature & aventure',
    pace: 'Intense',
    interests: ['Nature & aventure'],
    meetings: 1,
    access: ['Avion', 'Train'],
    lesserKnown: false,
    featured: true,
    budgetNote: 'Pour deux voyageurs, hors vols aller-retour.',
    highlights: ['Train de Flåm et croisière sur le Nærøyfjord', 'Randonnée jusqu’à la ferme de Skageflå', 'Arrivée à Bergen par la mer'],
    steps: [
      {
        id: 'oslo',
        city: 'Oslo',
        area: 'Østlandet',
        lat: 59.9139,
        lon: 10.7522,
        days: 2,
        arrival: { mode: 'Train', detail: 'Aéroport d’Oslo-Gardermoen → centre-ville en train (environ 20 min)' },
        story:
          'Deux jours sur le front de mer, du toit de l’Opéra aux quais d’Aker Brygge, le temps de compléter l’équipement de randonnée et de goûter au ferry urbain.',
        activities: ['Marcher sur le toit de l’Opéra', 'Ferry urbain vers les îles du fjord d’Oslo', 'Quais d’Aker Brygge'],
        places: [
          { kind: 'hebergement', name: 'Auberge de jeunesse près de la gare centrale', note: 'Chambre double privée et cuisine partagée.' },
          { kind: 'restaurant', name: 'Halle gourmande Mathallen', note: 'Plusieurs comptoirs sous un même toit, pratique le soir.' },
        ],
        tip: { title: 'Le ferry urbain est inclus', detail: 'Les ferries vers les îles du fjord d’Oslo acceptent les billets de transport urbain : une sortie en mer à petit prix.' },
        budget: { hebergement: 210, transport: 60, restauration: 120, activites: 20, autres: 15 },
        photos: ['oslo-1', 'oslo-2', 'oslo-3'],
      },
      {
        id: 'flam',
        city: 'Myrdal & Flåm',
        area: 'Vestland',
        lat: 60.8628,
        lon: 7.1137,
        days: 2,
        arrival: { mode: 'Train', detail: 'Ligne Oslo – Bergen jusqu’à Myrdal, puis train de Flåm jusqu’au fjord' },
        story:
          'Le train de Flåm descend des plateaux de Myrdal jusqu’au bras du Sognefjord, avec un arrêt face à la cascade de Kjosfossen. Le lendemain, croisière sur le Nærøyfjord, inscrit au patrimoine mondial.',
        activities: ['Train de Flåm et arrêt à la cascade de Kjosfossen', 'Descente à vélo sur l’ancienne route des ouvriers (Rallarvegen)', 'Croisière sur le Nærøyfjord'],
        places: [
          { kind: 'hebergement', name: 'Chalet de camping au bord du fjord', note: 'Simple, pour deux, sanitaires partagés.' },
          { kind: 'restaurant', name: 'Brasserie du village', note: 'Bières locales et plats nordiques.' },
        ],
        tip: { title: 'Descendre de Myrdal à vélo', detail: 'Louer un vélo et descendre la vallée par la Rallarvegen : environ 20 km, surtout en descente. Les premiers lacets sont raides, vérifier les freins avant de partir.' },
        budget: { hebergement: 180, transport: 190, restauration: 110, activites: 160, autres: 0 },
        photos: ['flam-1', 'norvege-cover', 'flam-2', 'flam-3'],
      },
      {
        id: 'geiranger',
        city: 'Geiranger',
        area: 'Møre og Romsdal',
        lat: 62.1008,
        lon: 7.2059,
        days: 3,
        arrival: { mode: 'Bateau', detail: 'Bus jusqu’à Hellesylt, puis ferry Hellesylt – Geiranger sur le fjord (environ 1 h)' },
        story:
          'Le ferry passe au pied de la cascade des Sept Sœurs avant d’atteindre le village. Trois jours de marche vers les fermes accrochées au-dessus du fjord, avec une comparaison concrète entre chalet et refuge partagé.',
        activities: ['Ferry au pied de la cascade des Sept Sœurs', 'Randonnée vers la ferme de Skageflå', 'Belvédère de Flydalsjuvet'],
        places: [
          { kind: 'hebergement', name: 'Chalet (hytte) au-dessus du village', note: 'Plus cher qu’un refuge partagé, mais plus calme.' },
          { kind: 'restaurant', name: 'Café du port', note: 'Soupe de poisson et gaufres norvégiennes.' },
        ],
        tip: { title: 'Rejoindre Skageflå par le fjord', detail: 'Un bateau-taxi dépose au pied du sentier : la montée est raide, mais la vue sur les Sept Sœurs récompense l’effort.' },
        budget: { hebergement: 330, transport: 170, restauration: 140, activites: 120, autres: 20 },
        photos: ['geiranger-1', 'geiranger-2', 'geiranger-3'],
      },
      {
        id: 'bergen',
        city: 'Bergen',
        area: 'Vestland',
        lat: 60.3913,
        lon: 5.3221,
        days: 2,
        arrival: { mode: 'Bateau', detail: 'Bus jusqu’à Ålesund, puis navire côtier jusqu’à Bergen : arrivée par la mer' },
        story:
          'Arriver par la mer dans l’ancien port hanséatique, c’est la plus belle façon de découvrir Bergen. Le carnet garde les bons abris en cas de pluie et le bilan complet du voyage.',
        activities: ['Quai de Bryggen et ses maisons hanséatiques', 'Funiculaire du mont Fløyen', 'Randonnée de Vidden entre Ulriken et Fløyen'],
        places: [
          { kind: 'hebergement', name: 'Appartement dans le quartier de Nordnes', note: 'Calme, à dix minutes à pied du port.' },
          { kind: 'lieu', name: 'Marché aux poissons', note: 'Produits de la mer à goûter face au port.' },
        ],
        tip: { title: 'La traversée de Vidden', detail: 'Monter à Ulriken en téléphérique puis rejoindre Fløyen à pied : compter 5 à 6 heures sur le plateau, à réserver aux jours sans brouillard.' },
        budget: { hebergement: 260, transport: 150, restauration: 140, activites: 70, autres: 15 },
        photos: ['bergen-1', 'bergen-2', 'bergen-3'],
      },
    ],
    comments: [
      { authorId: 'ines', text: 'La descente à vélo depuis Myrdal, c’est faisable sans être très sportive ?' },
      { authorId: 'noa', text: 'Oui, c’est surtout de la descente, mais les premiers lacets sont raides : nous avons marché à côté du vélo sur quelques passages.' },
    ],
  },
  {
    id: 'portugal',
    title: 'Boucle atlantique du nord au sud',
    country: 'Portugal',
    region: 'Europe',
    authorId: 'lena',
    cover: 'portugal-cover',
    summary:
      'Dix jours en train et en bus de Porto aux falaises du sud-ouest : quais du Douro, ville universitaire, collines de Lisbonne et sentier côtier.',
    period: 'Automne (octobre)',
    travelers: 2,
    companion: 'Duo',
    tripType: 'Découverte & tourisme',
    pace: 'Équilibré',
    interests: ['Culture & visites', 'Gastronomie', 'Détente'],
    meetings: 1,
    access: ['Avion', 'Train'],
    lesserKnown: false,
    featured: true,
    budgetNote: 'Pour deux voyageurs, hors trajet aller-retour.',
    highlights: ['Uniquement en train et en bus', 'Des quais de Porto au sentier des pêcheurs', 'Budget détaillé pour deux'],
    steps: [
      {
        id: 'porto',
        city: 'Porto',
        area: 'Norte',
        lat: 41.1579,
        lon: -8.6291,
        days: 3,
        arrival: { mode: 'Train', detail: 'Métro léger depuis l’aéroport jusqu’au centre (environ 30 min)' },
        story:
          'Trois jours à arpenter les quais de la Ribeira et à marcher jusqu’à l’océan à Foz. Le carnet garde les petites adresses de quartier et le prix réel de nos repas.',
        activities: ['Quais de la Ribeira et bateaux rabelos', 'Traversée du pont Dom-Luís-Ier à pied', 'Coucher de soleil au Jardim do Morro', 'Promenade jusqu’à Foz do Douro'],
        places: [
          { kind: 'hebergement', name: 'Chambre d’hôtes dans le quartier de Bonfim', note: 'Petit-déjeuner maison, quartier résidentiel.' },
          { kind: 'restaurant', name: 'Tasca familiale près du marché du Bolhão', note: 'Plat du jour simple et peu cher le midi.' },
          { kind: 'restaurant', name: 'Pâtisserie de quartier', note: 'Pastéis de nata encore tièdes le matin.', photo: 'food-nata' },
        ],
        tip: { title: 'Le coucher de soleil au Jardim do Morro', detail: 'Traverser le pont par le tablier supérieur en fin de journée : le jardin, côté Gaia, offre la meilleure vue sur la Ribeira.' },
        budget: { hebergement: 255, transport: 35, restauration: 140, activites: 45, autres: 10 },
        photos: ['porto-1', 'porto-2', 'porto-3'],
      },
      {
        id: 'coimbra',
        city: 'Coimbra & Nazaré',
        area: 'Centro',
        lat: 40.2033,
        lon: -8.4103,
        days: 2,
        arrival: { mode: 'Train', detail: 'Porto → Coimbra en train Alfa Pendular (environ 1 h)' },
        story:
          'Une pause dans la ville universitaire, puis une journée face aux falaises et aux grandes vagues de Nazaré.',
        activities: ['Université de Coimbra et bibliothèque Joanina', 'Ruelles de la haute ville', 'Belvédère du Sítio à Nazaré'],
        places: [
          { kind: 'hebergement', name: 'Auberge de jeunesse près de la gare', note: 'Chambre double privée et terrasse sur les toits.' },
          { kind: 'restaurant', name: 'Grill de poisson à Nazaré', note: 'Poisson du jour grillé au charbon, face à la plage.' },
        ],
        tip: { title: 'Nazaré en aller-retour', detail: 'Depuis Coimbra, Nazaré se rejoint en bus : vérifier les horaires la veille, les liaisons sont moins nombreuses le week-end.' },
        budget: { hebergement: 120, transport: 60, restauration: 90, activites: 30, autres: 0 },
        photos: ['coimbra-1', 'coimbra-2', 'coimbra-3'],
      },
      {
        id: 'lisbonne',
        city: 'Lisbonne & Sintra',
        area: 'Lisboa',
        lat: 38.7223,
        lon: -9.1393,
        days: 3,
        arrival: { mode: 'Bus', detail: 'Nazaré → Lisbonne en bus (environ 2 h)' },
        story:
          'Les collines à pied et en tramway, la traversée du Tage jusqu’à Cacilhas pour voir la ville depuis l’autre rive, et une journée au palais de Pena.',
        activities: ['Tramway 28 entre Graça et Estrela', 'Belvédères de l’Alfama', 'Ferry jusqu’à Cacilhas', 'Palais de Pena à Sintra'],
        places: [
          { kind: 'hebergement', name: 'Appartement dans le quartier de Graça', note: 'Escaliers raides, mais vue sur les toits.' },
          { kind: 'restaurant', name: 'Cantine de quartier dans l’Alfama', note: 'Sardines grillées en saison et soupe du jour.' },
        ],
        tip: { title: 'Arriver tôt à Sintra', detail: 'Prendre l’un des premiers trains depuis la gare du Rossio et réserver en ligne le créneau de visite du palais de Pena.' },
        budget: { hebergement: 300, transport: 45, restauration: 150, activites: 70, autres: 10 },
        photos: ['lisbonne-1', 'lisbonne-2', 'lisbonne-3'],
      },
      {
        id: 'sagres',
        city: 'Costa Vicentina',
        area: 'Algarve',
        lat: 37.319,
        lon: -8.803,
        days: 2,
        arrival: { mode: 'Bus', detail: 'Lisbonne → Aljezur en bus (environ 4 h)' },
        story:
          'Les falaises du sud-ouest, loin des grands complexes hôteliers, avec un détour par les arches de la Ponta da Piedade. Le bilan final permet de refaire l’itinéraire facilement.',
        activities: ['Une section du sentier des pêcheurs (Rota Vicentina)', 'Plages d’Amoreira et d’Arrifana', 'Cap Saint-Vincent au coucher du soleil', 'Détour par la Ponta da Piedade, près de Lagos'],
        places: [
          { kind: 'hebergement', name: 'Maison d’hôtes à Aljezur', note: 'Base calme pour rejoindre les sentiers.' },
          { kind: 'restaurant', name: 'Grill de village', note: 'Poulpe grillé et patate douce d’Aljezur.' },
        ],
        tip: { title: 'Le sentier des pêcheurs', detail: 'Le chemin longe les falaises sur du sable meuble : prévoir des chaussures fermées, de l’eau, et éviter les heures les plus chaudes.' },
        budget: { hebergement: 140, transport: 70, restauration: 90, activites: 0, autres: 20 },
        photos: ['sagres-1', 'portugal-cover', 'sagres-2', 'sagres-3'],
      },
    ],
    comments: [{ authorId: 'hugo', text: 'Le ferry jusqu’à Cacilhas, excellente idée pour voir Lisbonne depuis l’autre rive.' }],
  },
  {
    id: 'ecosse',
    title: 'Highlands et île de Skye sans voiture',
    country: 'Écosse',
    region: 'Europe',
    authorId: 'hugo',
    cover: 'exp-1-a',
    summary:
      'Huit jours en solo d’Édimbourg à l’île de Skye en train, en ferry et en car, avec un retour en train de nuit.',
    period: 'Fin de printemps (mai)',
    travelers: 1,
    companion: 'Solo',
    tripType: 'Nature & aventure',
    pace: 'Équilibré',
    interests: ['Nature & aventure', 'Culture & visites'],
    meetings: 2,
    access: ['Avion', 'Train'],
    lesserKnown: false,
    featured: false,
    budgetNote: 'Pour une personne, hors trajet jusqu’à Édimbourg.',
    highlights: ['Ligne des Highlands et viaduc de Glenfinnan', 'Ferry jusqu’à l’île de Skye', 'Retour en train de nuit'],
    steps: [
      {
        id: 'edimbourg',
        city: 'Édimbourg',
        area: 'Lothian',
        lat: 55.9533,
        lon: -3.1883,
        days: 2,
        arrival: { mode: 'Bus', detail: 'Tram ou bus depuis l’aéroport jusqu’au centre (environ 30 min)' },
        story:
          'Point de départ dans la vieille ville, le temps de comparer les pass ferroviaires et de préparer les correspondances vers les Highlands.',
        activities: ['Royal Mile et ruelles de la vieille ville', 'Montée à Arthur’s Seat', 'Vue depuis Calton Hill'],
        places: [
          { kind: 'hebergement', name: 'Auberge de jeunesse dans la vieille ville', note: 'Dortoir de quatre lits : idéal pour rencontrer d’autres voyageurs.' },
          { kind: 'restaurant', name: 'Pub du Grassmarket', note: 'Plat du soir copieux, musique certains soirs.' },
        ],
        tip: { title: 'Comparer avec un pass ferroviaire', detail: 'Pour une boucle de plusieurs jours dans les Highlands, un pass ferroviaire régional devient vite plus avantageux que les billets à l’unité.' },
        budget: { hebergement: 70, transport: 15, restauration: 60, activites: 0, autres: 5 },
        photos: ['edimbourg'],
      },
      {
        id: 'fort-william',
        city: 'Fort William',
        area: 'Highlands',
        lat: 56.8198,
        lon: -5.1052,
        days: 2,
        arrival: { mode: 'Train', detail: 'Glasgow → Fort William par la ligne des West Highlands, à travers la lande de Rannoch' },
        story:
          'La ligne traverse la lande de Rannoch avant d’arriver au pied du Ben Nevis. Deux jours de marche dans le Glen Nevis, sous un ciel qui change toutes les heures.',
        activities: ['Gorges et cascade de Steall dans le Glen Nevis', 'Vue sur le Ben Nevis', 'Écluses du canal calédonien (Neptune’s Staircase)'],
        places: [
          { kind: 'hebergement', name: 'Auberge au pied du Glen Nevis', note: 'Séchoir à vêtements bienvenu après la pluie.' },
          { kind: 'restaurant', name: 'Fish and chips du bord du loch', note: 'À emporter face au loch Linnhe.' },
        ],
        tip: { title: 'Prévoir quatre saisons', detail: 'Dans les Highlands, le temps change vite : veste imperméable obligatoire, et répulsif contre les moucherons (midges) dès la fin du printemps.' },
        budget: { hebergement: 60, transport: 35, restauration: 45, activites: 0, autres: 10 },
        photos: ['fortwilliam'],
      },
      {
        id: 'mallaig',
        city: 'Glenfinnan & Mallaig',
        area: 'Highlands',
        lat: 57.0047,
        lon: -5.8301,
        days: 1,
        arrival: { mode: 'Train', detail: 'Fort William → Mallaig en train régulier, par le viaduc de Glenfinnan' },
        story:
          'Le train régulier franchit le viaduc de Glenfinnan, le même que le train à vapeur touristique, pour bien moins cher. Mallaig sent le poisson fumé et le départ.',
        activities: ['Passage sur le viaduc de Glenfinnan', 'Port de pêche de Mallaig', 'Plages de sable blanc de Morar'],
        places: [
          { kind: 'restaurant', name: 'Cabane à fruits de mer du port', note: 'Langoustines et poisson fumé selon la pêche du jour.' },
          { kind: 'hebergement', name: 'Chambre d’hôtes face au port', note: 'Une nuit avant le ferry du matin.' },
        ],
        tip: { title: 'Le viaduc en train régulier', detail: 'Le train régulier emprunte le même viaduc que le train à vapeur : une fraction du prix, et des places plus faciles à trouver.' },
        budget: { hebergement: 55, transport: 15, restauration: 35, activites: 0, autres: 0 },
        photos: ['exp-1-a', 'mallaig'],
      },
      {
        id: 'skye',
        city: 'Île de Skye',
        area: 'Hébrides intérieures',
        lat: 57.4125,
        lon: -6.1964,
        days: 2,
        arrival: { mode: 'Bateau', detail: 'Ferry Mallaig – Armadale (environ 45 min), puis bus jusqu’à Portree' },
        story:
          'Ferry du matin, puis bus jusqu’à Portree. Deux jours entre les pitons du Storr et les falaises du Quiraing, avec des rencontres à l’auberge pour partager les trajets.',
        activities: ['Randonnée au Old Man of Storr', 'Paysages du Quiraing', 'Port coloré de Portree'],
        places: [
          { kind: 'hebergement', name: 'Auberge de jeunesse à Portree', note: 'Réserver tôt : il y a peu de lits sur l’île en été.' },
          { kind: 'restaurant', name: 'Café du port', note: 'Soupe et scones pour les jours de pluie.' },
        ],
        tip: { title: 'Le bus du nord de Skye', detail: 'Le bus qui fait le tour de la péninsule de Trotternish dessert le départ du sentier du Storr : vérifier les horaires réduits du dimanche.' },
        budget: { hebergement: 65, transport: 30, restauration: 45, activites: 0, autres: 5 },
        photos: ['exp-1-b', 'portree'],
      },
      {
        id: 'inverness',
        city: 'Inverness',
        area: 'Highlands',
        lat: 57.4778,
        lon: -4.2247,
        days: 1,
        arrival: { mode: 'Bus', detail: 'Portree → Inverness en car, via le château d’Eilean Donan et les rives du Loch Ness (environ 3 h 15)' },
        story:
          'Retour vers l’est en car, avec un dernier regard sur le Loch Ness, puis le train de nuit qui évite à la fois une nuit d’hôtel et un vol.',
        activities: ['Château d’Eilean Donan aperçu depuis la route', 'Berges de la rivière Ness', 'Train de nuit vers Londres'],
        places: [{ kind: 'hebergement', name: 'Train de nuit en couchette', note: 'La nuit de transport fait office d’hébergement.' }],
        tip: { title: 'Finir en train de nuit', detail: 'Le train de nuit au départ d’Inverness évite une nuit d’hôtel et un vol retour : réserver la couchette tôt.' },
        budget: { hebergement: 0, transport: 160, restauration: 30, activites: 0, autres: 0 },
        photos: ['eileandonan'],
      },
    ],
    comments: [{ authorId: 'noa', text: 'Les midges, on a appris à nos dépens. Merci pour le conseil !' }],
  },
  {
    id: 'vietnam',
    title: 'Du nord au centre en train de nuit',
    country: 'Vietnam',
    region: 'Asie',
    authorId: 'emma',
    cover: 'exp-2-a',
    summary:
      'Quatorze jours entre amis de Hanoï à Hội An : cuisines de rue, barques dans les rizières, une nuit en couchette et un cours de cuisine.',
    period: 'Printemps (mars)',
    travelers: 2,
    companion: 'Amis',
    tripType: 'Découverte & tourisme',
    pace: 'Équilibré',
    interests: ['Gastronomie', 'Culture & visites'],
    meetings: 2,
    access: ['Avion'],
    lesserKnown: false,
    featured: false,
    budgetNote: 'Pour deux voyageurs, hors vols internationaux.',
    highlights: ['Cuisines de rue à chaque étape', 'Une nuit en train-couchette', 'Hébergements chez l’habitant'],
    steps: [
      {
        id: 'hanoi',
        city: 'Hanoï',
        area: 'Nord',
        lat: 21.0278,
        lon: 105.8342,
        days: 4,
        arrival: { mode: 'Bus', detail: 'Bus depuis l’aéroport de Nội Bài jusqu’à la vieille ville (environ 1 h)' },
        story:
          'Quatre jours pour apprivoiser la vieille ville, ses scooters et ses cuisines de rue. Le phở du matin est devenu un rituel.',
        activities: ['Lac Hoàn Kiếm au petit matin', 'Rues de la vieille ville et café aux œufs', 'Temple de la Littérature'],
        places: [
          { kind: 'hebergement', name: 'Maison d’hôtes dans la vieille ville', note: 'Accueil familial et conseils de quartier.' },
          { kind: 'restaurant', name: 'Comptoir de phở au petit matin', note: 'Soupe de nouilles au bœuf, le petit-déjeuner local.', photo: 'food-pho' },
          { kind: 'restaurant', name: 'Café sur les toits', note: 'Café aux œufs avec vue sur le lac.' },
        ],
        tip: { title: 'Traverser au rythme des scooters', detail: 'Traverser à allure constante, sans courir ni s’arrêter brusquement : les deux-roues anticipent la trajectoire.' },
        budget: { hebergement: 120, transport: 15, restauration: 70, activites: 20, autres: 15 },
        photos: ['hanoi', 'hanoi-lac'],
      },
      {
        id: 'ninh-binh',
        city: 'Ninh Bình',
        area: 'Nord',
        lat: 20.2155,
        lon: 105.937,
        days: 2,
        arrival: { mode: 'Train', detail: 'Hanoï → Ninh Bình en train (environ 2 h 30)' },
        story:
          'Barque à rames entre les pitons karstiques et vélo au milieu des rizières. Le soir, dîner partagé avec la famille qui nous loge.',
        activities: ['Balade en barque à Tam Cốc', 'Vélo dans les rizières', 'Belvédère de Hang Múa'],
        places: [
          { kind: 'hebergement', name: 'Bungalow chez l’habitant au bord des rizières', note: 'Vélos prêtés, dîner partagé avec la famille.' },
          { kind: 'restaurant', name: 'Table familiale de chèvre de montagne', note: 'Spécialité de Ninh Bình, à commander pour deux.' },
        ],
        tip: { title: 'Partir tôt sur l’eau', detail: 'Les balades en barque commencent le matin : partir avant 8 h évite la chaleur et l’affluence.' },
        budget: { hebergement: 50, transport: 15, restauration: 40, activites: 40, autres: 0 },
        photos: ['ninhbinh'],
      },
      {
        id: 'hue',
        city: 'Huế',
        area: 'Centre',
        lat: 16.4637,
        lon: 107.5909,
        days: 3,
        arrival: { mode: 'Train', detail: 'Train de nuit Ninh Bình → Huế en couchette (environ 12 h)' },
        story:
          'Une nuit en couchette, puis la cité impériale et les tombeaux le long de la rivière des Parfums, à vélo.',
        activities: ['Cité impériale', 'Tombeaux impériaux à vélo', 'Pagode Thiên Mụ au bord de la rivière des Parfums'],
        places: [
          { kind: 'hebergement', name: 'Compartiment de quatre couchettes', note: 'Draps fournis ; prévoir des bouchons d’oreilles.' },
          { kind: 'hebergement', name: 'Hôtel familial près de la rivière', note: 'Location de vélos sur place.' },
          { kind: 'restaurant', name: 'Échoppe de bún bò Huế', note: 'Soupe de nouilles épicée, spécialité de la ville.' },
        ],
        tip: { title: 'Réserver la couchette', detail: 'Les compartiments de quatre couchettes partent vite : réserver quelques jours avant et préférer la couchette du bas pour ranger les sacs.' },
        budget: { hebergement: 90, transport: 70, restauration: 50, activites: 40, autres: 10 },
        photos: ['exp-2-b', 'hue'],
      },
      {
        id: 'hoi-an',
        city: 'Col des Nuages & Hội An',
        area: 'Centre',
        lat: 15.8801,
        lon: 108.338,
        days: 5,
        arrival: { mode: 'Bus', detail: 'Huế → Hội An en minibus par le col des Nuages (Hải Vân)' },
        story:
          'Passage par le col des Nuages, puis cinq jours lents dans la vieille ville aux lanternes, avec un cours de cuisine qui commence au marché du matin.',
        activities: ['Col des Nuages (Hải Vân)', 'Vieille ville de Hội An et ses lanternes', 'Cours de cuisine avec marché du matin', 'Plage d’An Bàng à vélo'],
        places: [
          { kind: 'hebergement', name: 'Maison d’hôtes au milieu des jardins maraîchers', note: 'À dix minutes à vélo de la vieille ville.' },
          { kind: 'restaurant', name: 'Stand de bánh mì', note: 'Le sandwich vietnamien, à toute heure.' },
          { kind: 'restaurant', name: 'Échoppe de cao lầu', note: 'Les nouilles épaisses typiques de Hội An.' },
        ],
        tip: { title: 'Payer en monnaie locale', detail: 'Payer en dongs plutôt qu’en dollars dans les petites échoppes : les prix sont plus justes et le rendu de monnaie plus simple.' },
        budget: { hebergement: 130, transport: 40, restauration: 110, activites: 60, autres: 15 },
        photos: ['haivan', 'exp-2-a'],
      },
    ],
    comments: [
      { authorId: 'lena', text: 'Le train de nuit, c’était confortable ? J’hésite avec le bus.' },
      { authorId: 'emma', text: 'Plutôt oui, en compartiment de quatre. On a bien dormi après la première heure !' },
    ],
  },
  {
    id: 'dolomites',
    title: 'Trois vallées des Dolomites en bus',
    country: 'Italie',
    region: 'Europe',
    authorId: 'noa',
    cover: 'exp-3-a',
    summary:
      'Cinq jours de randonnée sans voiture : Val Gardena, Val Badia et Tre Cime, reliés par les bus de col et la carte de mobilité locale.',
    period: 'Été (fin juin)',
    travelers: 2,
    companion: 'Duo',
    tripType: 'Nature & aventure',
    pace: 'Intense',
    interests: ['Nature & aventure'],
    meetings: 1,
    access: ['Train'],
    lesserKnown: false,
    featured: false,
    budgetNote: 'Pour deux voyageurs, hors trajet jusqu’à Bolzano.',
    highlights: ['Tout en bus de col', 'Tour des Tre Cime di Lavaredo', 'Lever du jour au lac de Braies'],
    steps: [
      {
        id: 'val-gardena',
        city: 'Val Gardena',
        area: 'Haut-Adige',
        lat: 46.5747,
        lon: 11.6717,
        days: 2,
        arrival: { mode: 'Bus', detail: 'Bolzano → Ortisei en bus régional (environ 1 h)' },
        story:
          'Base à Ortisei pour monter à Seceda et marcher sous les aiguilles des Odle, puis une journée plus douce sur les alpages de l’Alpe di Siusi.',
        activities: ['Crêtes de Seceda face aux Odle', 'Plateau de l’Alpe di Siusi', 'Village d’Ortisei et ses sculpteurs sur bois'],
        places: [
          { kind: 'hebergement', name: 'Pension familiale à Ortisei', note: 'Carte de mobilité locale remise à l’arrivée.' },
          { kind: 'restaurant', name: 'Refuge d’altitude', note: 'Knödel et strudel en terrasse.' },
        ],
        tip: { title: 'La carte de mobilité', detail: 'Beaucoup d’hébergements du Haut-Adige remettent une carte qui donne accès aux bus et trains régionaux : la demander à la réservation.' },
        budget: { hebergement: 220, transport: 0, restauration: 110, activites: 90, autres: 0 },
        photos: ['exp-3-b', 'siusi'],
      },
      {
        id: 'val-badia',
        city: 'Val Badia',
        area: 'Haut-Adige',
        lat: 46.5497,
        lon: 11.8736,
        days: 1,
        arrival: { mode: 'Bus', detail: 'Ortisei → Corvara en bus par le col de Gardena' },
        story: 'Passage du col de Gardena en bus et randonnée au pied du Sassongher, dans une vallée de langue ladine.',
        activities: ['Col de Gardena', 'Sentier au pied du Sassongher', 'Cuisine ladine au village'],
        places: [
          { kind: 'hebergement', name: 'Chambre dans une ferme (agritourisme)', note: 'Produits de la ferme au petit-déjeuner.' },
          { kind: 'restaurant', name: 'Auberge de cuisine ladine', note: 'Spécialités de la vallée, comme les chaussons frits.' },
        ],
        tip: { title: 'Les bus de col', detail: 'En été, les bus de col relient les vallées plusieurs fois par jour : noter le dernier départ, souvent en fin d’après-midi.' },
        budget: { hebergement: 120, transport: 0, restauration: 70, activites: 0, autres: 0 },
        photos: ['corvara'],
      },
      {
        id: 'tre-cime',
        city: 'Tre Cime & lac de Braies',
        area: 'Haut-Pustertal',
        lat: 46.7347,
        lon: 12.2203,
        days: 2,
        arrival: { mode: 'Bus', detail: 'Corvara → Dobbiaco en bus via Brunico, puis bus jusqu’au départ des Tre Cime' },
        story: 'Le tour des Tre Cime di Lavaredo à pied, puis un lever de soleil sur le lac de Braies avant l’arrivée des visiteurs.',
        activities: ['Tour des Tre Cime di Lavaredo (environ 10 km)', 'Lac de Braies au lever du jour', 'Pause au refuge Locatelli face aux trois pics'],
        places: [
          { kind: 'hebergement', name: 'Hôtel familial à Dobbiaco', note: 'À deux pas de l’arrêt de bus.' },
          { kind: 'lieu', name: 'Refuges Auronzo et Locatelli', note: 'Pauses déjeuner sur le tour.' },
        ],
        tip: { title: 'Venir en bus', detail: 'La route du refuge Auronzo est à péage pour les voitures : le bus depuis Dobbiaco évite le péage et le stationnement.' },
        budget: { hebergement: 200, transport: 40, restauration: 100, activites: 0, autres: 10 },
        photos: ['exp-3-a', 'braies'],
      },
    ],
    comments: [{ authorId: 'hugo', text: 'Tout en bus dans les Dolomites, je pensais la voiture indispensable. Bonne surprise.' }],
  },
  {
    id: 'andalousie',
    title: 'Séville, Cordoue et Grenade en train',
    country: 'Espagne',
    region: 'Europe',
    authorId: 'lena',
    cover: 'exp-4-a',
    summary:
      'Une semaine au rythme des trains andalous, en visitant aux heures fraîches : cathédrale et Alcazar, mosquée-cathédrale, Alhambra et Albaicín.',
    period: 'Printemps (avril)',
    travelers: 2,
    companion: 'Duo',
    tripType: 'Découverte & tourisme',
    pace: 'Équilibré',
    interests: ['Culture & visites', 'Gastronomie'],
    meetings: 1,
    access: ['Train', 'Avion'],
    lesserKnown: false,
    featured: false,
    budgetNote: 'Pour deux voyageurs, hors trajet aller-retour.',
    highlights: ['Trois villes, trois trains directs', 'Visites programmées aux heures fraîches', 'Tapas et salmorejo'],
    steps: [
      {
        id: 'seville',
        city: 'Séville',
        area: 'Andalousie',
        lat: 37.3891,
        lon: -5.9845,
        days: 3,
        arrival: { mode: 'Train', detail: 'Arrivée en train à grande vitesse à la gare de Santa Justa' },
        story: 'Trois jours entre la cathédrale, l’Alcazar et le quartier de Triana, en visitant le matin et en gardant l’après-midi pour l’ombre des patios.',
        activities: ['Cathédrale et Giralda', 'Alcazar royal (réserver un créneau)', 'Plaza de España', 'Quartier de Triana'],
        places: [
          { kind: 'hebergement', name: 'Appartement dans le quartier de Santa Cruz', note: 'Patio intérieur frais en journée.' },
          { kind: 'restaurant', name: 'Bar à tapas de Triana', note: 'Tapas au comptoir, tard le soir comme les Sévillans.' },
        ],
        tip: { title: 'Visiter aux heures fraîches', detail: 'Réserver les monuments en début de matinée et garder l’après-midi pour la sieste ou les patios ombragés.' },
        budget: { hebergement: 270, transport: 20, restauration: 130, activites: 60, autres: 0 },
        photos: ['exp-4-b', 'seville'],
      },
      {
        id: 'cordoue',
        city: 'Cordoue',
        area: 'Andalousie',
        lat: 37.8882,
        lon: -4.7794,
        days: 1,
        arrival: { mode: 'Train', detail: 'Séville → Cordoue en train (environ 45 min)' },
        story: 'Une journée pour la mosquée-cathédrale, le pont romain et les patios fleuris du quartier juif.',
        activities: ['Mosquée-cathédrale', 'Pont romain sur le Guadalquivir', 'Ruelles et patios de la Judería'],
        places: [
          { kind: 'restaurant', name: 'Taverne de salmorejo', note: 'Soupe froide de tomate, spécialité de Cordoue.', photo: 'food-salmorejo' },
          { kind: 'hebergement', name: 'Petit hôtel près de la mosquée-cathédrale', note: 'Une nuit pour profiter du calme du soir.' },
        ],
        tip: { title: 'Entrer tôt à la mosquée-cathédrale', detail: 'Les premiers créneaux du matin permettent de voir la forêt de colonnes presque sans visiteurs : vérifier les horaires la veille.' },
        budget: { hebergement: 90, transport: 50, restauration: 50, activites: 26, autres: 0 },
        photos: ['cordoue-mezquita', 'cordoue-pont'],
      },
      {
        id: 'grenade',
        city: 'Grenade',
        area: 'Andalousie',
        lat: 37.1773,
        lon: -3.5986,
        days: 3,
        arrival: { mode: 'Train', detail: 'Cordoue → Grenade en train (environ 1 h 30)' },
        story: 'L’Alhambra, réservée des semaines à l’avance, puis les ruelles de l’Albaicín au coucher du soleil.',
        activities: ['Alhambra et jardins du Generalife', 'Belvédère de San Nicolás au coucher du soleil', 'Quartier de l’Albaicín'],
        places: [
          { kind: 'hebergement', name: 'Chambre dans une maison à patio de l’Albaicín', note: 'Vue sur l’Alhambra depuis la terrasse.' },
          { kind: 'restaurant', name: 'Bar à tapas du centre', note: 'À Grenade, une tapa est souvent servie avec chaque boisson.' },
        ],
        tip: { title: 'Réserver l’Alhambra tôt', detail: 'Les billets sont nominatifs et partent des semaines à l’avance au printemps : réserver sur le site officiel dès que les dates sont fixées.' },
        budget: { hebergement: 240, transport: 60, restauration: 110, activites: 40, autres: 0 },
        photos: ['exp-4-a', 'albaicin'],
      },
    ],
    comments: [{ authorId: 'emma', text: 'La tapa servie avec chaque boisson à Grenade : je confirme, c’est un bonheur.' }],
  },
  {
    id: 'slovenie',
    title: 'Lacs et rivières des Alpes juliennes en famille',
    country: 'Slovénie',
    region: 'Europe',
    authorId: 'noa',
    cover: 'exp-5-a',
    summary:
      'Six jours à quatre entre Ljubljana, le lac de Bohinj, le col de Vršič et la vallée de la Soča, avec un budget partagé par voyageur.',
    period: 'Été (août)',
    travelers: 4,
    companion: 'Famille',
    tripType: 'Nature & aventure',
    pace: 'Détente',
    interests: ['Nature & aventure', 'Détente'],
    meetings: 0,
    access: ['Voiture'],
    lesserKnown: true,
    featured: false,
    budgetNote: 'Pour quatre voyageurs (deux adultes, deux enfants), hors trajet aller-retour.',
    highlights: ['Baignade au lac de Bohinj', 'Les 50 lacets du col de Vršič', 'Rafting familial sur la Soča'],
    steps: [
      {
        id: 'ljubljana',
        city: 'Ljubljana',
        area: 'Slovénie centrale',
        lat: 46.0569,
        lon: 14.5058,
        days: 1,
        arrival: { mode: 'Voiture', detail: 'Arrivée en voiture, stationnement en périphérie puis bus jusqu’au centre piéton' },
        story: 'Une journée dans le centre piéton, entre les ponts, les terrasses au bord de la rivière et le château.',
        activities: ['Triple pont et berges de la Ljubljanica', 'Funiculaire du château', 'Marché central'],
        places: [
          { kind: 'hebergement', name: 'Appartement familial près du centre', note: 'Deux chambres et une cuisine.' },
          { kind: 'lieu', name: 'Marché central', note: 'Fruits, fromages et petits stands le midi.' },
        ],
        tip: { title: 'Parking relais', detail: 'Le centre est piéton : se garer dans un parking relais en périphérie et terminer en bus urbain.' },
        budget: { hebergement: 120, transport: 15, restauration: 80, activites: 30, autres: 0 },
        photos: ['ljubljana'],
      },
      {
        id: 'bohinj',
        city: 'Lac de Bohinj',
        area: 'Haute-Carniole',
        lat: 46.2786,
        lon: 13.8889,
        days: 2,
        arrival: { mode: 'Voiture', detail: 'Ljubljana → Bohinj en voiture (environ 1 h 15)' },
        story: 'Le lac le plus calme des Alpes juliennes : baignade, cascade de Savica et téléphérique du Vogel pour voir le Triglav.',
        activities: ['Baignade et pédalo sur le lac', 'Cascade de Savica', 'Téléphérique du Vogel et vue sur le Triglav'],
        places: [
          { kind: 'hebergement', name: 'Chalet loué à quatre près du lac', note: 'Le plus gros poste du budget, partagé à quatre.' },
          { kind: 'restaurant', name: 'Fromagerie d’alpage', note: 'Le fromage de Bohinj (mohant) à goûter sur place.' },
        ],
        tip: { title: 'Venir tôt au lac', detail: 'Les parkings au bord du lac se remplissent vite en été : arriver avant 9 h ou utiliser les navettes d’été de la vallée.' },
        budget: { hebergement: 260, transport: 25, restauration: 120, activites: 110, autres: 10 },
        photos: ['exp-5-a'],
      },
      {
        id: 'vrsic',
        city: 'Col de Vršič',
        area: 'Parc du Triglav',
        lat: 46.4333,
        lon: 13.7444,
        days: 1,
        arrival: { mode: 'Voiture', detail: 'Bohinj → Kranjska Gora, puis la route du col et ses 50 lacets pavés' },
        story: 'Traversée du col le plus haut du pays, avec un arrêt à la chapelle russe et un pique-nique au sommet.',
        activities: ['Chapelle russe en bois', 'Pique-nique au sommet du col', 'Source de la Soča'],
        places: [{ kind: 'restaurant', name: 'Refuge au sommet du col', note: 'Soupe d’orge (ričet) pour se réchauffer.' }],
        tip: { title: 'Franchir le col tôt', detail: 'La route est étroite et très fréquentée l’été : partir tôt le matin et ménager les freins dans la descente.' },
        budget: { hebergement: 0, transport: 30, restauration: 40, activites: 0, autres: 0 },
        photos: ['vrsic'],
      },
      {
        id: 'bovec',
        city: 'Bovec & la Soča',
        area: 'Littoral slovène',
        lat: 46.3378,
        lon: 13.5525,
        days: 2,
        arrival: { mode: 'Voiture', detail: 'Descente de la vallée de la Trenta jusqu’à Bovec' },
        story: 'Une rivière émeraude, des gorges étroites et un parcours de rafting adapté aux enfants.',
        activities: ['Gorges de la Soča (Velika korita)', 'Rafting familial encadré', 'Cascade de Boka'],
        places: [
          { kind: 'hebergement', name: 'Gîte à Bovec', note: 'Jardin et local pour faire sécher les combinaisons.' },
          { kind: 'restaurant', name: 'Restaurant de truite de la Soča', note: 'La spécialité de la vallée, grillée au beurre.' },
        ],
        tip: { title: 'Rafting en famille', detail: 'Choisir un parcours famille avec un âge minimum indiqué et des combinaisons fournies : l’eau de la Soča reste froide même en août.' },
        budget: { hebergement: 200, transport: 20, restauration: 120, activites: 180, autres: 10 },
        photos: ['exp-5-b', 'bovec'],
      },
    ],
    comments: [{ authorId: 'lena', text: 'Merci pour le conseil sur les parkings du lac, on y va cet été avec les enfants.' }],
  },
  {
    id: 'islande',
    title: 'Bains chauds de la côte sud',
    country: 'Islande',
    region: 'Europe',
    authorId: 'ines',
    cover: 'exp-6-a',
    summary:
      'Six jours entre amis à la recherche des bains où vont les habitants : piscines de quartier, rivière chaude, plus vieille piscine du pays et plage de sable noir.',
    period: 'Automne (septembre)',
    travelers: 3,
    companion: 'Amis',
    tripType: 'Détente',
    pace: 'Détente',
    interests: ['Détente', 'Nature & aventure'],
    meetings: 2,
    access: ['Avion'],
    lesserKnown: true,
    featured: false,
    budgetNote: 'Pour trois voyageurs, hors vols aller-retour. Location de voiture incluse.',
    highlights: ['Bains publics plutôt que lagons touristiques', 'Rivière chaude de Reykjadalur', 'Plage de Reynisfjara'],
    steps: [
      {
        id: 'reykjavik',
        city: 'Reykjavík',
        area: 'Capitale',
        lat: 64.1466,
        lon: -21.9426,
        days: 1,
        arrival: { mode: 'Avion', detail: 'Vol jusqu’à Keflavík, puis navette jusqu’à la ville (environ 45 min)' },
        story: 'Premier bain dans une piscine de quartier, comme les habitants, avant de récupérer la voiture le lendemain.',
        activities: ['Piscine municipale de quartier', 'Église Hallgrímskirkja et vue sur les toits', 'Vieux port'],
        places: [
          { kind: 'hebergement', name: 'Maison d’hôtes à Reykjavík', note: 'Chambre triple et cuisine partagée.' },
          { kind: 'restaurant', name: 'Stand de hot-dogs du centre', note: 'L’en-cas islandais le plus abordable.' },
        ],
        tip: { title: 'Les piscines de quartier', detail: 'Elles coûtent bien moins cher que les lagons touristiques. Se doucher entièrement avant d’entrer dans l’eau : c’est la règle.' },
        budget: { hebergement: 180, transport: 90, restauration: 90, activites: 40, autres: 0 },
        photos: ['reykjavik'],
      },
      {
        id: 'reykjadalur',
        city: 'Hveragerði & Reykjadalur',
        area: 'Sud',
        lat: 64.0003,
        lon: -21.1867,
        days: 1,
        arrival: { mode: 'Voiture', detail: 'Location de voiture, route 1 vers l’est (environ 45 min)' },
        story: 'Une marche dans une vallée fumante jusqu’à la rivière chaude où l’on se baigne en pleine nature.',
        activities: ['Randonnée de Reykjadalur (environ 3 km)', 'Bain dans la rivière chaude', 'Serres chauffées par la géothermie'],
        places: [
          { kind: 'hebergement', name: 'Chalet à Hveragerði', note: 'Bain chaud privatif sur la terrasse.' },
          { kind: 'restaurant', name: 'Café du village', note: 'Soupe à l’agneau après la marche.' },
        ],
        tip: { title: 'Rester sur les passerelles', detail: 'Le sol est chaud et parfois fragile autour des sources : ne jamais quitter les passerelles et sentiers balisés.' },
        budget: { hebergement: 210, transport: 120, restauration: 80, activites: 0, autres: 0 },
        photos: ['reykjadalur'],
      },
      {
        id: 'fludir',
        city: 'Flúðir',
        area: 'Sud',
        lat: 64.135,
        lon: -20.308,
        days: 1,
        arrival: { mode: 'Voiture', detail: 'Hveragerði → Flúðir (environ 50 min)' },
        story: 'La plus ancienne piscine du pays, entourée de petites sources, après une matinée à Geysir et Gullfoss.',
        activities: ['Bain à la Gamla Laugin (Secret Lagoon)', 'Éruptions du geyser Strokkur', 'Cascade de Gullfoss'],
        places: [
          { kind: 'hebergement', name: 'Ferme-auberge près de Flúðir', note: 'Dîner avec les produits de la ferme.' },
          { kind: 'restaurant', name: 'Serre-restaurant de tomates', note: 'Soupe de tomate servie au milieu des plants.' },
        ],
        tip: { title: 'Se baigner en fin de journée', detail: 'Les bains se vident en fin d’après-midi, quand les excursions repartent : le meilleur moment pour profiter du calme.' },
        budget: { hebergement: 240, transport: 60, restauration: 110, activites: 105, autres: 0 },
        photos: ['geysir'],
      },
      {
        id: 'seljavallalaug',
        city: 'Seljavallalaug & Skógafoss',
        area: 'Sud',
        lat: 63.5653,
        lon: -19.6086,
        days: 1,
        arrival: { mode: 'Voiture', detail: 'Route 1 vers le sud-est (environ 1 h 45)' },
        story: 'Une petite marche jusqu’à une piscine historique nichée dans la montagne, puis la cascade de Skógafoss.',
        activities: ['Piscine de Seljavallalaug', 'Cascade de Skógafoss', 'Cascade de Seljalandsfoss'],
        places: [{ kind: 'hebergement', name: 'Maison d’hôtes près de Skógar', note: 'Vue sur les falaises.' }],
        tip: { title: 'Une piscine sans gardien', detail: 'Seljavallalaug n’est pas surveillée et les vestiaires sont rudimentaires : laisser le lieu propre et ne rien y abandonner.' },
        budget: { hebergement: 210, transport: 60, restauration: 90, activites: 0, autres: 10 },
        photos: ['exp-6-a', 'exp-6-b'],
      },
      {
        id: 'vik',
        city: 'Vík',
        area: 'Sud',
        lat: 63.4186,
        lon: -19.006,
        days: 2,
        arrival: { mode: 'Voiture', detail: 'Skógar → Vík (environ 30 min)' },
        story: 'Plage de sable noir, falaises de basalte et dernier bain à la piscine du village avant de rentrer.',
        activities: ['Plage de Reynisfjara (attention aux vagues)', 'Falaises de Dyrhólaey', 'Piscine municipale de Vík'],
        places: [
          { kind: 'hebergement', name: 'Chalets de Vík', note: 'Cuisine équipée pour cuisiner à trois.' },
          { kind: 'lieu', name: 'Supermarché du village', note: 'Le poste repas le plus économique de l’itinéraire.' },
        ],
        tip: { title: 'Les vagues de Reynisfjara', detail: 'Ne jamais tourner le dos à l’océan et rester loin du bord : des vagues soudaines emportent régulièrement des visiteurs.' },
        budget: { hebergement: 300, transport: 140, restauration: 110, activites: 15, autres: 0 },
        photos: ['vik'],
      },
    ],
    comments: [{ authorId: 'noa', text: 'La règle de la douche avant le bain : bon rappel pour une première fois.' }],
  },
];
