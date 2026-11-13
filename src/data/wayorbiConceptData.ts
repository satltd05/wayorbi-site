export type TravelPace = 'economique' | 'equilibre' | 'confort';

export interface StepBudget {
  hebergement: number;
  transport: number;
  repas: number;
  activites: number;
}

export interface JourneyStep {
  id: string;
  order: number;
  city: string;
  region: string;
  duration: string;
  transport: string;
  coordinates: string;
  mapX: number; // percentage 0..100 inside SVG viewBox 800x500
  mapY: number; // percentage 0..100 inside SVG viewBox 800x500
  story: string;
  tipTitle: string;
  tipDetail: string;
  budget: StepBudget;
}

export interface ConceptJourney {
  id: string;
  title: string;
  country: string;
  summary: string;
  totalDays: number;
  season: string;
  accentFrom: string;
  accentTo: string;
  steps: JourneyStep[];
}

export interface ExplorerEntry {
  id: string;
  category: 'itineraire' | 'budget' | 'bon-plan';
  categoryLabel: string;
  destination: string;
  duration: string;
  title: string;
  excerpt: string;
  authorHandle: string;
  metricsLine: string;
  highlights: string[];
  budgetSample?: {
    total: string;
    daily: string;
    breakdown: { label: string; amount: string }[];
  };
}

export const CONCEPT_JOURNEYS: ConceptJourney[] = [
  {
    id: 'japon',
    title: 'De Tokyo aux Alpes Japonaises',
    country: 'Japon',
    summary:
      'Exemple de carnet structuré mêlant trains express, étapes rurales et suivi transparent des dépenses.',
    totalDays: 12,
    season: 'Printemps',
    accentFrom: '#22D3EE',
    accentTo: '#7C3AED',
    steps: [
      {
        id: 'tokyo',
        order: 1,
        city: 'Tokyo',
        region: 'Kanto',
        duration: '4 jours',
        transport: 'Arrivée aérienne + métro local',
        coordinates: '35.6762° N, 139.6503° E',
        mapX: 78,
        mapY: 48,
        story:
          'Premiers repères entre Yanaka et Shibuya. Le carnet regroupe les trajets quotidiens, les cartes de quartier et les dépenses illustratives dès la sortie de l’aéroport.',
        tipTitle: 'Carte Suica dématérialisée',
        tipDetail:
          'Activer la carte transport directement dans le portefeuille mobile évite les files aux bornes et simplifie les correspondances.',
        budget: { hebergement: 260, transport: 45, repas: 130, activites: 65 },
      },
      {
        id: 'matsumoto',
        order: 2,
        city: 'Matsumoto',
        region: 'Nagano',
        duration: '2 jours',
        transport: 'Train Azusa Limited Express',
        coordinates: '36.2380° N, 137.9720° E',
        mapX: 58,
        mapY: 42,
        story:
          'Transition vers les vallées alpines en moins de trois heures. Étape idéale pour comparer le coût des hébergements traditionnels hors des grandes métropoles.',
        tipTitle: 'Départ matinal vers la vallée de Kiso',
        tipDetail:
          'Les bus locaux vers Narai-juku partent tôt ; réserver la veille à la gare garantit une place assise.',
        budget: { hebergement: 140, transport: 58, repas: 68, activites: 28 },
      },
      {
        id: 'takayama',
        order: 3,
        city: 'Takayama & Shirakawa-go',
        region: 'Gifu',
        duration: '3 jours',
        transport: 'Bus panoramique alpin',
        coordinates: '36.1461° N, 137.2522° E',
        mapX: 43,
        mapY: 47,
        story:
          'Traversée des cols de montagne et nuit en minshuku. Chaque étape conserve les horaires exacts des bus et les adresses testées sur place.',
        tipTitle: 'Réservation du bus Nohi',
        tipDetail:
          'Le tronçon entre Takayama et Kanazawa via Shirakawa-go demande une réservation anticipée de quelques jours en haute saison.',
        budget: { hebergement: 210, transport: 52, repas: 95, activites: 35 },
      },
      {
        id: 'kyoto',
        order: 4,
        city: 'Kyoto',
        region: 'Kansai',
        duration: '3 jours',
        transport: 'Train express Thunderbird',
        coordinates: '35.0116° N, 135.7681° E',
        mapX: 25,
        mapY: 62,
        story:
          'Clôture de la boucle entre sentiers boisés d’Arashiyama et quartiers calmes à vélo. Le récapitulatif final compile automatiquement le budget global du voyage.',
        tipTitle: 'Visites à l’aube avant 7h30',
        tipDetail:
          'Privilégier la marche entre Higashiyama et Nanzen-ji tôt le matin permet d’éviter la saturation des axes touristiques.',
        budget: { hebergement: 225, transport: 48, repas: 110, activites: 50 },
      },
    ],
  },
  {
    id: 'norvege',
    title: 'Traversée des Fjords de l’Ouest',
    country: 'Norvège',
    summary:
      'Exemple d’itinéraire panoramique combinant ferry, train de montagne et gestion d’un budget nordique.',
    totalDays: 9,
    season: 'Été',
    accentFrom: '#38BDF8',
    accentTo: '#3B82F6',
    steps: [
      {
        id: 'oslo',
        order: 1,
        city: 'Oslo',
        region: 'Østlandet',
        duration: '2 jours',
        transport: 'Train aéroport Flytoget',
        coordinates: '59.9139° N, 10.7522° E',
        mapX: 74,
        mapY: 68,
        story:
          'Découverte du front de mer et préparation de l’équipement de randonnée. Les frais fixes de départ sont enregistrés dès le premier jour.',
        tipTitle: 'Pass ferry urbain inclus',
        tipDetail:
          'Le ticket de transport en commun standard inclut les bateaux vers les îles du fjord d’Oslo.',
        budget: { hebergement: 210, transport: 34, repas: 98, activites: 30 },
      },
      {
        id: 'flam',
        order: 2,
        city: 'Myrdal & Flåm',
        region: 'Vestland',
        duration: '2 jours',
        transport: 'Ligne ferroviaire de Bergen + Flåmsbana',
        coordinates: '60.8608° N, 7.1119° E',
        mapX: 49,
        mapY: 54,
        story:
          'Descente vertigineuse depuis les plateaux enneigés jusqu’au bras du Sognefjord, avec arrêt photo et trace GPX archivée dans le carnet.',
        tipTitle: 'Descente à vélo de Myrdal',
        tipDetail:
          'Louer un vélo à Myrdal pour descendre la piste Rallarvegen permet d’économiser tout en profitant des cascades.',
        budget: { hebergement: 195, transport: 92, repas: 76, activites: 45 },
      },
      {
        id: 'geiranger',
        order: 3,
        city: 'Geiranger',
        region: 'Møre og Romsdal',
        duration: '3 jours',
        transport: 'Ferry express sur les fjords',
        coordinates: '62.1008° N, 7.2059° E',
        mapX: 38,
        mapY: 32,
        story:
          'Navigation entre parois abruptes et randonnée vers les points de vue en altitude. Comparatif concret entre cabine et refuge partagé.',
        tipTitle: 'Sentier de Skageflå',
        tipDetail:
          'Prendre la navette bateau jusqu’à l’embarcadère de départ réduit la durée de marche et offre la plus belle vue sur les cascades.',
        budget: { hebergement: 240, transport: 78, repas: 110, activites: 40 },
      },
      {
        id: 'bergen',
        order: 4,
        city: 'Bergen',
        region: 'Vestland',
        duration: '2 jours',
        transport: 'Bateau côtier',
        coordinates: '60.3913° N, 5.3221° E',
        mapX: 22,
        mapY: 61,
        story:
          'Arrivée par la mer dans le port hanséatique. Le carnet archive les meilleurs abris en cas de pluie et le bilan total par poste.',
        tipTitle: 'Traversée Vidden entre deux sommets',
        tipDetail:
          'Monter en funiculaire à Fløyen puis marcher jusqu’à Ulriken offre une traversée panoramique gratuite hormis les remontées.',
        budget: { hebergement: 185, transport: 64, repas: 88, activites: 32 },
      },
    ],
  },
  {
    id: 'portugal',
    title: 'Boucle Atlantique du Nord au Sud',
    country: 'Portugal',
    summary:
      'Exemple d’itinéraire accessible en train et bus régional avec un budget maîtrisé jour par jour.',
    totalDays: 10,
    season: 'Automne',
    accentFrom: '#06B6D4',
    accentTo: '#6366F1',
    steps: [
      {
        id: 'porto',
        order: 1,
        city: 'Porto',
        region: 'Norte',
        duration: '3 jours',
        transport: 'Métro & marche urbaine',
        coordinates: '41.1579° N, 8.6291° W',
        mapX: 38,
        mapY: 22,
        story:
          'Balades entre le Douro et l’océan à Foz. Le carnet recense les petites adresses de quartier et les coûts réels des repas.',
        tipTitle: 'Coucher de soleil à Jardim do Morro',
        tipDetail:
          'Traverser le tablier supérieur du pont Dom-Luís à pied offre une vue dégagée sur toute la vieille ville.',
        budget: { hebergement: 165, transport: 22, repas: 84, activites: 25 },
      },
      {
        id: 'coimbra',
        order: 2,
        city: 'Coimbra & Nazaré',
        region: 'Centro',
        duration: '2 jours',
        transport: 'Train régional Alfa Pendular',
        coordinates: '40.2033° N, 8.4103° W',
        mapX: 46,
        mapY: 44,
        story:
          'Pause universitaire puis halte face aux falaises atlantiques. Les horaires de train et les tarifs réduits anticipés sont consignés dans l’étape.',
        tipTitle: 'Billets achetés 8 jours avant',
        tipDetail:
          'La compagnie ferroviaire propose jusqu’à 40 % de réduction sur les trajets réservés au moins une semaine à l’avance.',
        budget: { hebergement: 105, transport: 32, repas: 54, activites: 18 },
      },
      {
        id: 'lisbonne',
        order: 3,
        city: 'Lisbonne & Sintra',
        region: 'Lisboa',
        duration: '3 jours',
        transport: 'Train de banlieue + ferry Tage',
        coordinates: '38.7223° N, 9.1393° W',
        mapX: 34,
        mapY: 64,
        story:
          'Exploration des collines et traversée du Tage vers Almada. Chaque fiche inclut l’itinéraire piéton et le coût exact des visites.',
        tipTitle: 'Arriver à Sintra par le train de 8h',
        tipDetail:
          'Commencer la montée par le chemin forestier de Vila Sassetti évite l’attente des navettes surchargées.',
        budget: { hebergement: 180, transport: 28, repas: 92, activites: 44 },
      },
      {
        id: 'sagres',
        order: 4,
        city: 'Costa Vicentina',
        region: 'Algarve',
        duration: '2 jours',
        transport: 'Bus côtier Rede Expressos',
        coordinates: '37.0086° N, 8.9431° W',
        mapX: 58,
        mapY: 82,
        story:
          'Sentier côtier sur les falaises du sud-ouest loin des grands complexes. Bilan final clair pour répliquer l’itinéraire facilement.',
        tipTitle: 'Sentier des Pêcheurs à pied',
        tipDetail:
          'La portion entre Arrifana et Carrapateira reste accessible à la journée avec un retour en bus local.',
        budget: { hebergement: 112, transport: 36, repas: 58, activites: 15 },
      },
    ],
  },
];

export const EXPLORER_ENTRIES: ExplorerEntry[] = [
  {
    id: 'exp-1',
    category: 'itineraire',
    categoryLabel: 'Itinéraire',
    destination: 'Écosse · Highlands & Skye',
    duration: '8 jours',
    title: 'Boucle en train et bus sans voiture depuis Édimbourg',
    excerpt:
      'Un tracé pensé pour rejoindre Fort William, Mallaig et l’île de Skye uniquement en transports publics, avec correspondances présentées à titre indicatif.',
    authorHandle: 'Carnet type · Voyage lent',
    metricsLine: '5 étapes · Rail & Ferry · Niveau accessible',
    highlights: [
      'Ligne West Highland entre Glasgow et Mallaig',
      'Traversée en ferry vers Armadale en 30 minutes',
      'Étapes regroupées pour limiter les changements d’hébergement',
    ],
    budgetSample: {
      total: '940 €',
      daily: '117 € / jour',
      breakdown: [
        { label: 'Hébergements', amount: '460 €' },
        { label: 'Trains & ferrys', amount: '210 €' },
        { label: 'Repas & ravitaillement', amount: '200 €' },
        { label: 'Visites', amount: '70 €' },
      ],
    },
  },
  {
    id: 'exp-2',
    category: 'budget',
    categoryLabel: 'Budget exemple',
    destination: 'Vietnam · Du Nord au Centre',
    duration: '14 jours',
    title: 'Ventilation complète d’un trajet Hanoï – Hué – Hoi An',
    excerpt:
      'Comparatif transparent entre trains de nuit, hébergements chez l’habitant et repas locaux, pour anticiper le coût réel sur place.',
    authorHandle: 'Carnet type · Budget détaillé',
    metricsLine: '6 étapes · Trains de nuit · Monnaie locale convertie',
    highlights: [
      'Part hébergement : 34 % du budget sur place',
      'Trajets ferroviaires réservés directement en gare ou en ligne',
      'Marge imprévus intégrée de 10 % dans le modèle',
    ],
    budgetSample: {
      total: '720 €',
      daily: '51 € / jour',
      breakdown: [
        { label: 'Hébergements', amount: '245 €' },
        { label: 'Transports internes', amount: '155 €' },
        { label: 'Repas & cafés', amount: '210 €' },
        { label: 'Excursions & entrées', amount: '110 €' },
      ],
    },
  },
  {
    id: 'exp-3',
    category: 'bon-plan',
    categoryLabel: 'Bons plans',
    destination: 'Dolomites · Italie',
    duration: '5 jours',
    title: 'Utiliser les lignes de bus de col plutôt que la voiture',
    excerpt:
      'Notes de terrain sur les cartes régionales de mobilité dans le Haut-Adige pour accéder aux départs de randonnées sans frais de parking.',
    authorHandle: 'Carnet type · Conseil terrain',
    metricsLine: '3 vallées · Mobilité locale · Saison estivale',
    highlights: [
      'Mobilcard incluse parfois via l’hébergeur local',
      'Accès direct au Passo Gardena et Val di Funes',
      'Horaires d’altitude synchronisés dès 7h00',
    ],
  },
  {
    id: 'exp-4',
    category: 'itineraire',
    categoryLabel: 'Itinéraire',
    destination: 'Andalousie · Espagne',
    duration: '7 jours',
    title: 'Séville, Cordoue et Grenade par le réseau ferroviaire',
    excerpt:
      'Une semaine rythmée par les trains à moyenne et grande vitesse, avec estimation des créneaux de visite pour éviter la chaleur.',
    authorHandle: 'Carnet type · Urbain & patrimoine',
    metricsLine: '3 villes · Trains directs · Rythme modéré',
    highlights: [
      'Liaisons directes inférieures à 1h45 entre chaque ville',
      'Hébergements situés à moins de 15 min à pied des gares',
      'Alternance visites matinales et pauses ombragées',
    ],
    budgetSample: {
      total: '685 €',
      daily: '98 € / jour',
      breakdown: [
        { label: 'Hébergements', amount: '330 €' },
        { label: 'Billets de train', amount: '105 €' },
        { label: 'Restauration', amount: '175 €' },
        { label: 'Monuments', amount: '75 €' },
      ],
    },
  },
  {
    id: 'exp-5',
    category: 'budget',
    categoryLabel: 'Budget exemple',
    destination: 'Slovénie · Alpes juliennes',
    duration: '6 jours',
    title: 'Budget à deux autour du lac de Bohinj et de la Soča',
    excerpt:
      'Répartition précise entre refuges de montagne, location partagée et activités de plein air au cœur du parc du Triglav.',
    authorHandle: 'Carnet type · Plein air',
    metricsLine: '4 étapes · Base partagée par voyageur',
    highlights: [
      'Coût réduit grâce aux navettes estivales gratuites autour de Bohinj',
      'Pique-niques locaux plutôt que restauration systématique',
      'Suivi poste par poste exportable pour préparer son propre départ',
    ],
    budgetSample: {
      total: '590 €',
      daily: '98 € / jour',
      breakdown: [
        { label: 'Hébergements', amount: '290 €' },
        { label: 'Mobilité locale', amount: '95 €' },
        { label: 'Alimentation', amount: '145 €' },
        { label: 'Accès parc & kayak', amount: '60 €' },
      ],
    },
  },
  {
    id: 'exp-6',
    category: 'bon-plan',
    categoryLabel: 'Bons plans',
    destination: 'Islande · Côte Sud',
    duration: '6 jours',
    title: 'Repérer les bains géothermiques locaux hors circuits classiques',
    excerpt:
      'Carnet d’adresses communales accessibles à tarif modeste le long de la route 1, avec consignes pratiques et horaires calmes.',
    authorHandle: 'Carnet type · Astuces locales',
    metricsLine: '4 étapes · Bains municipaux · Tarif réduit',
    highlights: [
      'Entrée moyenne 4 fois inférieure aux lagons privés',
      'Serviette personnelle recommandée pour éviter les suppléments',
      'Créneaux de soirée plus calmes après 19h',
    ],
  },
];

export const ECOSYSTEM_PILLARS = [
  {
    number: '01',
    title: 'Carnets de voyage interactifs',
    description:
      'Rassemblez vos photos, récits d’étapes et trajets sur une carte dynamique qui raconte votre voyage dans l’ordre où vous l’avez vécu.',
  },
  {
    number: '02',
    title: 'Itinéraires & budgets réels',
    description:
      'Consultez des parcours complets accompagnés de budgets transparents par catégorie — transport, logement, repas, activités — sans estimations floues.',
  },
  {
    number: '03',
    title: 'Conseils et bons plans de terrain',
    description:
      'Accédez aux astuces concrètes laissées directement sur les étapes : horaires utiles, arrêts méconnus, alternatives économiques.',
  },
  {
    number: '04',
    title: 'Communauté de voyageurs',
    description:
      'Suivez des explorateurs qui partagent votre façon de voyager, échangez des recommandations et enregistrez leurs étapes pour votre prochain départ.',
  },
];
