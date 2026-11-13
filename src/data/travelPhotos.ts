// Photos de voyage libres de droits (Wikimedia Commons) qui illustrent les carnets d'exemple.
// Chaque photo garde son auteur, sa licence et sa page source : ils sont affichés sur l'image et sur la page /credits.
// Pour ajouter une photo : déposer le fichier dans public/photos/ puis ajouter une entrée ci-dessous avec son crédit.

export interface TravelPhoto {
  id: string;
  src: string;
  alt: string;
  place: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
}

export const TRAVEL_PHOTOS = [
  {
    "id": "japon-cover",
    "src": "/photos/japon-cover.jpg",
    "alt": "Pont suspendu de Kamikochi au-dessus d’une rivière claire, face aux sommets enneigés des Alpes japonaises",
    "place": "Kamikochi, Alpes japonaises",
    "author": "lumoplank",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Kamikochi_-_Kamikochi6538.jpg"
  },
  {
    "id": "tokyo-1",
    "src": "/photos/tokyo-1.jpg",
    "alt": "Carrefour de Shibuya à la tombée de la nuit, entouré d’écrans lumineux",
    "place": "Shibuya, Tokyo",
    "author": "Benh LIEU SONG",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg"
  },
  {
    "id": "tokyo-2",
    "src": "/photos/tokyo-2.jpg",
    "alt": "Maison traditionnelle en bois au coin d’une rue calme du quartier de Yanaka",
    "place": "Yanaka, Tokyo",
    "author": "Alexkom000",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_5.jpg"
  },
  {
    "id": "tokyo-3",
    "src": "/photos/tokyo-3.jpg",
    "alt": "Porte rouge illuminée du temple Senso-ji, à Asakusa, la nuit",
    "place": "Asakusa, Tokyo",
    "author": "IQRemix from Canada",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sensoji_-_Asakusa_Kannon_Temple_(17625161926).jpg"
  },
  {
    "id": "matsumoto-1",
    "src": "/photos/matsumoto-1.jpg",
    "alt": "Le château noir de Matsumoto se reflétant dans ses douves",
    "place": "Château de Matsumoto",
    "author": "663highland",
    "license": "CC BY 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Matsumoto_Castle05s5s4592.jpg"
  },
  {
    "id": "matsumoto-2",
    "src": "/photos/matsumoto-2.jpg",
    "alt": "Rue bordée de maisons en bois à Narai-juku, collines aux couleurs d’automne",
    "place": "Narai-juku, vallée de Kiso",
    "author": "Luka Peternel",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Narai-juku-facing-north-east-2019-Luka-Peternel.jpg"
  },
  {
    "id": "matsumoto-3",
    "src": "/photos/matsumoto-3.jpg",
    "alt": "Ancienne rue de relais de poste à Tsumago, entourée de montagnes boisées",
    "place": "Tsumago-juku, vallée de Kiso",
    "author": "Gryffindor",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tsumago_2009_4.JPG"
  },
  {
    "id": "takayama-1",
    "src": "/photos/takayama-1.jpg",
    "alt": "Vue d’ensemble du village de Shirakawa-go et de ses maisons aux toits de chaume",
    "place": "Shirakawa-go",
    "author": "663highland",
    "license": "CC BY 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ogi_Shirakawa-g%C5%8D,_Gifu,_Japan.jpg"
  },
  {
    "id": "takayama-2",
    "src": "/photos/takayama-2.jpg",
    "alt": "Rue de Sanmachi à Takayama, maisons marchandes en bois sombre",
    "place": "Sanmachi, Takayama",
    "author": "663highland",
    "license": "CC BY 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sanmachi_Takayama03ds3200.jpg"
  },
  {
    "id": "takayama-3",
    "src": "/photos/takayama-3.jpg",
    "alt": "Crêtes enneigées des monts Hida au-dessus d’une vallée",
    "place": "Monts Hida",
    "author": "663highland",
    "license": "CC BY 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lake_Kurobe01s4592.jpg"
  },
  {
    "id": "kyoto-1",
    "src": "/photos/kyoto-1.jpg",
    "alt": "Allée de la bambouseraie d’Arashiyama",
    "place": "Arashiyama, Kyoto",
    "author": "Basile Morin",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Bamboo_Forest,_Arashiyama,_Kyoto,_Japan.jpg"
  },
  {
    "id": "kyoto-2",
    "src": "/photos/kyoto-2.jpg",
    "alt": "Chemin sous les torii vermillon du sanctuaire Fushimi Inari",
    "place": "Fushimi Inari, Kyoto",
    "author": "Basile Morin",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Double_torii_path_at_Fushimi_Inari_Taisha_Shrine,_Kyoto,_Japan.jpg"
  },
  {
    "id": "kyoto-3",
    "src": "/photos/kyoto-3.jpg",
    "alt": "Façade de maison de thé en bois dans le quartier de Gion",
    "place": "Gion, Kyoto",
    "author": "HAGAT hOMSZE",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:JP_%E6%97%A5%E6%9C%AC_Japan_%E4%BA%AC%E9%83%BD_Kyoto_Higashiyama-ku_Gion_%E8%8A%B1%E8%A6%8B%E5%B0%8F%E8%B7%AF%E9%80%9A_Hanamikoji_Dori_10am_morning_June_2026_N13P_21.jpg"
  },
  {
    "id": "norvege-cover",
    "src": "/photos/norvege-cover.jpg",
    "alt": "Sillage d’un bateau sur le Nærøyfjord, entre de hautes parois verdoyantes",
    "place": "Nærøyfjord, Norvège",
    "author": "Cbliu",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:N%C3%A6r%C3%B8yfjord-cruise-view.jpg"
  },
  {
    "id": "oslo-1",
    "src": "/photos/oslo-1.jpg",
    "alt": "Toit en marbre blanc incliné de l’Opéra d’Oslo, au bord du fjord",
    "place": "Opéra d’Oslo",
    "author": "Christian David",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Oslo_Opera_House_(Den_Norske_Opera_%26_Ballett),_Norway.jpg"
  },
  {
    "id": "oslo-2",
    "src": "/photos/oslo-2.jpg",
    "alt": "Port de plaisance et façades modernes d’Aker Brygge, à Oslo",
    "place": "Aker Brygge, Oslo",
    "author": "Chris Nyborg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Oslo_Aker_Brygge_2005_June_19.jpg"
  },
  {
    "id": "oslo-3",
    "src": "/photos/oslo-3.jpg",
    "alt": "Voiliers amarrés sur le front de mer d’Oslo au coucher du soleil",
    "place": "Front de mer d’Oslo",
    "author": "Geir Hval (www.MacWhale.eu)",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Pipervika_Aker_brygge_Tjuvholmen_Oslo_Oslofjorden_Norway_(2024.01.10).jpg"
  },
  {
    "id": "flam-1",
    "src": "/photos/flam-1.jpg",
    "alt": "Le train de Flåm serpentant dans une vallée verdoyante",
    "place": "Ligne de Flåm",
    "author": "Stch2022",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Two_Fl%C3%A5msbana_Trains_meet_and_pass_as_the_Brekkefossen_Waterfall_cascades_above.jpg"
  },
  {
    "id": "flam-2",
    "src": "/photos/flam-2.jpg",
    "alt": "Eaux calmes de l’Aurlandsfjord entre les montagnes",
    "place": "Aurlandsfjord",
    "author": "Sergey Ashmarin",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Aurlandsfjord_-_Norway.jpg"
  },
  {
    "id": "flam-3",
    "src": "/photos/flam-3.jpg",
    "alt": "Église en bois de Flåm au pied des falaises de la vallée",
    "place": "Vallée de Flåm",
    "author": "Ximonic (Simo Räsänen)",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Fl%C3%A5m_kyrkje_in_Fl%C3%A5m,_Aurland,_Vestland,_Norway,_2025_June.jpg"
  },
  {
    "id": "geiranger-1",
    "src": "/photos/geiranger-1.jpg",
    "alt": "Le Geirangerfjord vu depuis un belvédère en altitude",
    "place": "Geirangerfjord",
    "author": "Ximonic (Simo Räsänen)",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Geirangerfjord_from_%C3%98rnesvingen,_2013_June.jpg"
  },
  {
    "id": "geiranger-2",
    "src": "/photos/geiranger-2.jpg",
    "alt": "Cascade des Sept Sœurs dévalant la paroi du Geirangerfjord",
    "place": "Cascade des Sept Sœurs",
    "author": "Diego Delso",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Fiordo_de_Geiranger,_Noruega,_2019-09-07,_DD_35.jpg"
  },
  {
    "id": "geiranger-3",
    "src": "/photos/geiranger-3.jpg",
    "alt": "Église blanche octogonale de Geiranger dominant le fjord",
    "place": "Geiranger",
    "author": "Diego Delso",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Iglesia_parroquial,_Geiranger,_Noruega,_2019-09-07,_DD_84-97_PAN.jpg"
  },
  {
    "id": "bergen-1",
    "src": "/photos/bergen-1.jpg",
    "alt": "Maisons hanséatiques colorées du quai de Bryggen, à Bergen",
    "place": "Bryggen, Bergen",
    "author": "Diego Delso",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Bryggen,_Bergen,_Noruega,_2019-09-08,_DD_118-121_PAN.jpg"
  },
  {
    "id": "bergen-2",
    "src": "/photos/bergen-2.jpg",
    "alt": "Vue sur le port et la ville de Bergen depuis le mont Fløyen",
    "place": "Mont Fløyen, Bergen",
    "author": "Diego Delso",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Vista_de_Bergen_desde_la_monta%C3%B1a_Fl%C3%B8yen,_Noruega,_2019-09-08,_DD_48.jpg"
  },
  {
    "id": "bergen-3",
    "src": "/photos/bergen-3.jpg",
    "alt": "Plateau herbeux de Vidden entre les sommets autour de Bergen",
    "place": "Plateau de Vidden",
    "author": "P. E. Dressel",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ulriken_Bergen_01.jpg"
  },
  {
    "id": "portugal-cover",
    "src": "/photos/portugal-cover.jpg",
    "alt": "Rochers dorés et eaux turquoise de Ponta da Piedade",
    "place": "Ponta da Piedade, Algarve",
    "author": "Dicklyon",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ponta_da_Piedade_pano.jpg"
  },
  {
    "id": "porto-1",
    "src": "/photos/porto-1.jpg",
    "alt": "Bateaux rabelos sur le Douro devant les façades de la Ribeira",
    "place": "Ribeira, Porto",
    "author": "Jakub Hałun",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rabelo_boats_and_Ribeira_seen_from_Cais_de_Gaia,_20250605_1623_9879.jpg"
  },
  {
    "id": "porto-2",
    "src": "/photos/porto-2.jpg",
    "alt": "Pont Dom-Luís-Ier illuminé au-dessus du Douro à l’heure bleue",
    "place": "Pont Dom-Luís-Ier, Porto",
    "author": "T meltzer",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ponte_de_D._Lu%C3%ADs_2.jpg"
  },
  {
    "id": "porto-3",
    "src": "/photos/porto-3.jpg",
    "alt": "Jetée et phare de Foz do Douro face à l’océan Atlantique",
    "place": "Foz do Douro",
    "author": "bebatut",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Foz_do_Douro_(26387458906).jpg"
  },
  {
    "id": "coimbra-1",
    "src": "/photos/coimbra-1.jpg",
    "alt": "Cour du palais royal de l’université de Coimbra",
    "place": "Université de Coimbra",
    "author": "Alvesgaspar",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Coimbra_December_2011-15a.jpg"
  },
  {
    "id": "coimbra-2",
    "src": "/photos/coimbra-2.jpg",
    "alt": "Vue plongeante sur la longue plage et la ville de Nazaré",
    "place": "Nazaré",
    "author": "Markus Bernet",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Nazare_001.jpg"
  },
  {
    "id": "coimbra-3",
    "src": "/photos/coimbra-3.jpg",
    "alt": "Toits de Coimbra et méandre du fleuve Mondego",
    "place": "Coimbra et le Mondego",
    "author": "Alvesgaspar",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Coimbra_December_2011-4.jpg"
  },
  {
    "id": "lisbonne-1",
    "src": "/photos/lisbonne-1.jpg",
    "alt": "Tramway jaune devant une façade rose dans les rues de Lisbonne",
    "place": "Tramway 28, Lisbonne",
    "author": "Ingo Mehling",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lissabon_-_Alfama_-_Largo_de_Santa_Luzia_-_Streetcar_-_2.jpg"
  },
  {
    "id": "lisbonne-2",
    "src": "/photos/lisbonne-2.jpg",
    "alt": "Tours rouges et jaunes du palais de Pena à Sintra",
    "place": "Palais de Pena, Sintra",
    "author": "Diego Delso",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Palacio_Nacional_da_Pena,_Sintra,_Portugal,_2019-05-25,_DD_128.jpg"
  },
  {
    "id": "lisbonne-3",
    "src": "/photos/lisbonne-3.jpg",
    "alt": "Toits de Lisbonne et pinèdes sur les collines du centre",
    "place": "Collines de Lisbonne",
    "author": "Diego Delso",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Vistas_de_Lisboa_desde_Miradouro_da_Gra%C3%A7a,_Portugal,_2012-05-12,_DD_14.JPG"
  },
  {
    "id": "sagres-1",
    "src": "/photos/sagres-1.jpg",
    "alt": "Falaises dorées de la Costa Vicentina plongeant dans l’Atlantique",
    "place": "Costa Vicentina",
    "author": "Serge Fenenko",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:National_Park_Sudoeste_Alentejano_e_Costa_Vicentina.jpg"
  },
  {
    "id": "sagres-2",
    "src": "/photos/sagres-2.jpg",
    "alt": "Phare du cap Saint-Vincent au sommet des falaises",
    "place": "Cap Saint-Vincent",
    "author": "Matthias Süßen",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cabo-sao-vicente-lighthouse-2019-msu-2309.jpg"
  },
  {
    "id": "sagres-3",
    "src": "/photos/sagres-3.jpg",
    "alt": "Rochers battus par les vagues sur la côte sud-ouest du Portugal",
    "place": "Côte sauvage de l’Alentejo",
    "author": "Nuno Luís",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Parque_Natural_do_Sudoeste_Alentejano_e_Costa_Vicentina_por_Nuno_Lu%C3%ADs.jpg"
  },
  {
    "id": "exp-1-a",
    "src": "/photos/exp-1-a.jpg",
    "alt": "Train à vapeur traversant les collines près du viaduc de Glenfinnan",
    "place": "Viaduc de Glenfinnan, Écosse",
    "author": "Daniel Kraft",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Jacobite_on_Glenfinnan_Viaduct_4_20211024.jpg"
  },
  {
    "id": "exp-1-b",
    "src": "/photos/exp-1-b.jpg",
    "alt": "Pitons rocheux du Storr sur l’île de Skye",
    "place": "Île de Skye",
    "author": "rboed",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Old_Man_of_Storr,_Isle_of_Skye,_Scotland.jpg"
  },
  {
    "id": "exp-2-a",
    "src": "/photos/exp-2-a.jpg",
    "alt": "Barques le long de la rivière Thu Bon à Hoi An",
    "place": "Hoi An, Vietnam",
    "author": "Supanut Arunoprayote",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hoi_An_(I).jpg"
  },
  {
    "id": "exp-2-b",
    "src": "/photos/exp-2-b.jpg",
    "alt": "Porte ornée de la cité impériale de Hué",
    "place": "Hué, Vietnam",
    "author": "Supanut Arunoprayote",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Gate_in_Imperial_City,_Hu%E1%BA%BF_(III).jpg"
  },
  {
    "id": "exp-3-a",
    "src": "/photos/exp-3-a.jpg",
    "alt": "Les trois pics des Tre Cime di Lavaredo, dans les Dolomites",
    "place": "Tre Cime di Lavaredo",
    "author": "Ximonic (Simo Räsänen)",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tre_Cime_di_Lavaredo_from_Monte_Specie,_Val_Pusteria,_Trentino-Alto_Adige,_Italy,_2025_October.jpg"
  },
  {
    "id": "exp-3-b",
    "src": "/photos/exp-3-b.jpg",
    "alt": "Aiguilles rocheuses enneigées des Dolomites",
    "place": "Dolomites",
    "author": "Wolfgang Moroder",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Odles_da_Sec%C3%ABda_Gherd%C3%ABina.jpg"
  },
  {
    "id": "exp-4-a",
    "src": "/photos/exp-4-a.jpg",
    "alt": "L’Alhambra de Grenade dans la lumière du soir",
    "place": "Alhambra, Grenade",
    "author": "Jebulon",
    "license": "Public domain",
    "licenseUrl": "",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Alhambra_in_the_evening.jpg"
  },
  {
    "id": "exp-4-b",
    "src": "/photos/exp-4-b.jpg",
    "alt": "Façade monumentale de la Plaza de España à Séville",
    "place": "Plaza de España, Séville",
    "author": "Benjamin Smith",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sevilla_-_Plaza_de_Espa%C3%B1a_-_3.jpg"
  },
  {
    "id": "exp-5-a",
    "src": "/photos/exp-5-a.jpg",
    "alt": "Pont de pierre et église Saint-Jean au bord du lac de Bohinj",
    "place": "Lac de Bohinj, Slovénie",
    "author": "Abrget47j",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rib%C4%8Dev_Laz,_Bohinj_-_cerkev_sv._Janeza_Krstnika_in_kamniti_lo%C4%8Dni_most.jpg"
  },
  {
    "id": "exp-5-b",
    "src": "/photos/exp-5-b.jpg",
    "alt": "Eaux turquoise de la Soča entre les rochers",
    "place": "Rivière Soča, Slovénie",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Soca_river_in_Kobarid_(4).jpg"
  },
  {
    "id": "exp-6-a",
    "src": "/photos/exp-6-a.jpg",
    "alt": "Piscine géothermale de Seljavallalaug nichée dans une vallée islandaise",
    "place": "Seljavallalaug, Islande",
    "author": "BiT",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Seljavallalaug_close-up.JPG"
  },
  {
    "id": "exp-6-b",
    "src": "/photos/exp-6-b.jpg",
    "alt": "Cascade de Skógafoss tombant d’une falaise verdoyante",
    "place": "Skógafoss, Islande",
    "author": "Jakub Hałun",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sk%C3%B3gafoss_Waterfall,_Iceland,_20240720_1318_2975.jpg"
  },
  {
    "id": "edimbourg",
    "src": "/photos/edimbourg.jpg",
    "alt": "Vieille ville d’Édimbourg vue depuis Calton Hill, un canon ancien au premier plan",
    "place": "Calton Hill, Édimbourg",
    "author": "Daniel Kraft",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Edinburgh_cannon_and_old_town_20211020.jpg"
  },
  {
    "id": "fortwilliam",
    "src": "/photos/fortwilliam.jpg",
    "alt": "Vallée verdoyante du Glen Nevis au pied des montagnes",
    "place": "Glen Nevis, Highlands",
    "author": "Bert Kaufmann from Roermond, Netherlands",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Glen_Nevis_(2477757595).jpg"
  },
  {
    "id": "mallaig",
    "src": "/photos/mallaig.jpg",
    "alt": "Bateaux de pêche amarrés dans le port de Mallaig",
    "place": "Port de Mallaig",
    "author": "Alan Reid",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mallaig_harbour_-_geograph.org.uk_-_2545896.jpg"
  },
  {
    "id": "portree",
    "src": "/photos/portree.jpg",
    "alt": "Maisons colorées alignées sur le port de Portree",
    "place": "Portree, île de Skye",
    "author": "DeFacto",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Portree_harbour_front_2016.jpg"
  },
  {
    "id": "eileandonan",
    "src": "/photos/eileandonan.jpg",
    "alt": "Le château d’Eilean Donan sur son îlot, devant les montagnes",
    "place": "Château d’Eilean Donan",
    "author": "Eusebius",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Eilean_Donan_castle_-_140mm.jpg"
  },
  {
    "id": "hanoi",
    "src": "/photos/hanoi.jpg",
    "alt": "Marché aux fleurs le soir dans la vieille ville de Hanoï, scooters garés devant les étals",
    "place": "Vieille ville de Hanoï",
    "author": "Jakub Hałun",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Old_Quarter_market,_Hanoi,_Vietnam,_20240204_1810_5887.jpg"
  },
  {
    "id": "hanoi-lac",
    "src": "/photos/hanoi-lac.jpg",
    "alt": "Le lac Hoàn Kiếm vu à travers les branches",
    "place": "Lac Hoàn Kiếm, Hanoï",
    "author": "Ltn12345",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hoan_Kiem_Lake_4123.jpg"
  },
  {
    "id": "ninhbinh",
    "src": "/photos/ninhbinh.jpg",
    "alt": "Rizières au pied des pitons karstiques de Tam Cốc",
    "place": "Tam Cốc, Ninh Bình",
    "author": "Andre Hospers",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tam_Coc_Ninh_Binh_(29079).jpg"
  },
  {
    "id": "hue",
    "src": "/photos/hue.jpg",
    "alt": "La pagode Thiên Mụ et sa tour octogonale",
    "place": "Pagode Thiên Mụ, Huế",
    "author": "CEphoto, Uwe Aranas",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hue_Vietnam_Thien-Mu-Temple-and-Pagoda-01.jpg"
  },
  {
    "id": "haivan",
    "src": "/photos/haivan.jpg",
    "alt": "La côte et la lagune de Lăng Cô vues depuis le col des Nuages",
    "place": "Col des Nuages (Hải Vân)",
    "author": "Steffen Schmitz",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:L%C4%83ng_C%C3%B4,_H%E1%BA%A3i_V%C3%A2n_Pass,_2020-01_CN-04.jpg"
  },
  {
    "id": "siusi",
    "src": "/photos/siusi.jpg",
    "alt": "Chemin à travers les alpages de l’Alpe di Siusi, face aux sommets des Dolomites",
    "place": "Alpe di Siusi",
    "author": "H. Zell",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Seiser_Alm_16.jpg"
  },
  {
    "id": "corvara",
    "src": "/photos/corvara.jpg",
    "alt": "Moutons dans un alpage près de Corvara, au pied des parois rocheuses",
    "place": "Corvara, Val Badia",
    "author": "H. Zell",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sheep_-_Corvara.jpg"
  },
  {
    "id": "braies",
    "src": "/photos/braies.jpg",
    "alt": "Barques en bois sur les eaux turquoise du lac de Braies",
    "place": "Lac de Braies",
    "author": "kallerna",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lago_di_Braies_South_Tyrol_6.jpg"
  },
  {
    "id": "seville",
    "src": "/photos/seville.jpg",
    "alt": "La cathédrale de Séville et la Giralda illuminées à l’heure bleue",
    "place": "Giralda, Séville",
    "author": "Diliff",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Plaza_Virgen_de_los_Reyes,_Seville,_Spain_-_Sep_2009.jpg"
  },
  {
    "id": "cordoue-mezquita",
    "src": "/photos/cordoue-mezquita.jpg",
    "alt": "Forêt d’arcs bicolores à l’intérieur de la mosquée-cathédrale de Cordoue",
    "place": "Mosquée-cathédrale de Cordoue",
    "author": "CEphoto, Uwe Aranas",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:C%C3%B3rdoba_Spain_Mezquita-Catedral-de-C%C3%B3rdoba-01.jpg"
  },
  {
    "id": "cordoue-pont",
    "src": "/photos/cordoue-pont.jpg",
    "alt": "Le pont romain sur le Guadalquivir devant la mosquée-cathédrale",
    "place": "Pont romain, Cordoue",
    "author": "Jose María Ligero Loarte",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Centro_Hist%C3%B3rico,_16.9_--_2023_--_C%C3%B3rdoba,_Espa%C3%B1a.jpg"
  },
  {
    "id": "albaicin",
    "src": "/photos/albaicin.jpg",
    "alt": "Maisons blanches de l’Albaicín et du Sacromonte à Grenade",
    "place": "Albaicín, Grenade",
    "author": "Jebulon",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Albaicin_2012_San_Nicolas_Sacromonte.jpg"
  },
  {
    "id": "ljubljana",
    "src": "/photos/ljubljana.jpg",
    "alt": "Façades se reflétant dans la rivière Ljubljanica au centre de Ljubljana",
    "place": "Ljubljanica, Ljubljana",
    "author": "Mihael Grmek",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ljubljanica_01.jpg"
  },
  {
    "id": "vrsic",
    "src": "/photos/vrsic.jpg",
    "alt": "Sommets des Alpes juliennes vus depuis le col de Vršič",
    "place": "Col de Vršič",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Julian_Alps_from_Vrsic_Pass_(3).jpg"
  },
  {
    "id": "bovec",
    "src": "/photos/bovec.jpg",
    "alt": "La Soča au fond d’une vallée boisée près de Bovec",
    "place": "La Soča près de Bovec",
    "author": "Lorenzo MICHIELLI",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:So%C4%8Da,_Bovec_-_2008-06-08.jpg"
  },
  {
    "id": "reykjavik",
    "src": "/photos/reykjavik.jpg",
    "alt": "Toits colorés de Reykjavík vus depuis la tour de Hallgrímskirkja",
    "place": "Reykjavík",
    "author": "Jakec",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:View_from_Hallgr%C3%ADmskirkja_4.JPG"
  },
  {
    "id": "reykjadalur",
    "src": "/photos/reykjadalur.jpg",
    "alt": "Rivière chaude serpentant dans la vallée de Reykjadalur",
    "place": "Vallée de Reykjadalur",
    "author": "Jakub Hałun",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Reykjadalur_Valley,_Iceland,_20230502_1406_4226.jpg"
  },
  {
    "id": "geysir",
    "src": "/photos/geysir.jpg",
    "alt": "Éruption du geyser Strokkur à contre-jour",
    "place": "Strokkur, Geysir",
    "author": "Andreas Tille",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Strokkur_geyser_eruption,_close-up_view.jpg"
  },
  {
    "id": "vik",
    "src": "/photos/vik.jpg",
    "alt": "Plage de sable noir et rocher de basalte à Reynisfjara",
    "place": "Reynisfjara, près de Vík",
    "author": "Diego Delso",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Reynisfjara,_Su%C3%B0urland,_Islandia,_2014-08-17,_DD_164.JPG"
  },
  {
    "id": "food-ramen",
    "src": "/photos/food-ramen.jpg",
    "alt": "Bol de ramen garni d’œuf, de porc et de chou",
    "place": "Ramen",
    "author": "Ocdp",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ramen_Jump_002.jpg"
  },
  {
    "id": "food-hida",
    "src": "/photos/food-hida.jpg",
    "alt": "Sushi de bœuf légèrement grillé, spécialité de la région de Hida",
    "place": "Sushi de bœuf, région de Hida",
    "author": "fullfen666",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E3%80%90%E6%97%A5%E6%9C%AC%E3%80%82%E4%B8%8B%E5%91%82%E6%95%A3%E7%AD%96%E3%80%91_(33375284736).jpg"
  },
  {
    "id": "food-nata",
    "src": "/photos/food-nata.jpg",
    "alt": "Plaque de pastéis de nata dorés et caramélisés",
    "place": "Pastéis de nata",
    "author": "Photo Claude TRUONG-NGOC",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Pastel_de_nata_septembre_2015.jpg"
  },
  {
    "id": "food-pho",
    "src": "/photos/food-pho.jpg",
    "alt": "Bol de phở au bœuf garni d’herbes fraîches",
    "place": "Phở bò",
    "author": "Andy Li",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Beef_noodle_soup_(Ph%E1%BB%9F_b%C3%B2)_-_Pho_Hanoi_Authentic_2024-12-01.jpg"
  },
  {
    "id": "food-salmorejo",
    "src": "/photos/food-salmorejo.jpg",
    "alt": "Bol de salmorejo garni de jambon et d’œuf",
    "place": "Salmorejo",
    "author": "P.Lechien",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Salmorejo_cordouan.JPG"
  }
] as const satisfies readonly TravelPhoto[];

/** Identifiant d'une photo existante : une faute de frappe est signalée dès la compilation. */
export type PhotoId = (typeof TRAVEL_PHOTOS)[number]['id'];

const BY_ID = new Map<string, TravelPhoto>(TRAVEL_PHOTOS.map((photo) => [photo.id, photo]));

export function getPhoto(id: PhotoId): TravelPhoto {
  const photo = BY_ID.get(id);
  if (!photo) throw new Error(`Photo inconnue : ${id}`);
  return photo;
}
