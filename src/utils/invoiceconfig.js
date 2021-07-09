//Cooperatives
export const cooperatives = [
  {
    id: "coop01",
    name: "Smart",
    countries: ["de", "at", "be", "es", "fr", "nl", "it", "se"],
  },
];

//Countries
export const countries = [
  { id: "de", name: "Deutschland" },
  { id: "at", name: "Österreich" },
  { id: "be", name: "Belgique" },
  { id: "es", name: "España" },
  { id: "fr", name: "France" },
  { id: "nl", name: "Holland" },
  { id: "it", name: "Italia" },
  { id: "se", name: "Sverige" },
  { id: "gb", name: "United Kingdom" },
];

//Offices
export const offices = [
  { id: "de01", name: "Berlin", country: "de", cooperative: "coop01" },
  { id: "at01", name: "Wien", country: "at", cooperative: "coop01" },
  { id: "be01", name: "Antwerpen", country: "be", cooperative: "coop01" },
  { id: "be02", name: "Bruxelles", country: "be", cooperative: "coop01" },
  { id: "be03", name: "Charleroi", country: "be", cooperative: "coop01" },
  { id: "be04", name: "Eupen", country: "be", cooperative: "coop01" },
  { id: "be05", name: "Gent", country: "be", cooperative: "coop01" },
  { id: "be06", name: "Liège", country: "be", cooperative: "coop01" },
  {
    id: "be07",
    name: "Louvain-La-Neuve",
    country: "be",
    cooperative: "coop01",
  },
  { id: "be08", name: "Mons", country: "be", cooperative: "coop01" },
  { id: "be09", name: "Namur", country: "be", cooperative: "coop01" },
  { id: "be10", name: "Tournai", country: "be", cooperative: "coop01" },
  { id: "es01", name: "Barcelona", country: "es", cooperative: "coop01" },
  { id: "es02", name: "Madrid", country: "es", cooperative: "coop01" },
  { id: "es03", name: "Sevilla", country: "es", cooperative: "coop01" },
  { id: "fr01", name: "Amiens", country: "fr", cooperative: "coop01" },
  { id: "fr02", name: "Arras", country: "fr", cooperative: "coop01" },
  { id: "fr03", name: "Bethune", country: "fr", cooperative: "coop01" },
  { id: "fr04", name: "Bordeaux", country: "fr", cooperative: "coop01" },
  {
    id: "fr05",
    name: "Clermont-Ferrand",
    country: "fr",
    cooperative: "coop01",
  },
  { id: "fr06", name: "Grenoble", country: "fr", cooperative: "coop01" },
  { id: "fr07", name: "Lille", country: "fr", cooperative: "coop01" },
  { id: "fr08", name: "Lyon", country: "fr", cooperative: "coop01" },
  { id: "fr09", name: "Marseille", country: "fr", cooperative: "coop01" },
  { id: "fr10", name: "Montpellier", country: "fr", cooperative: "coop01" },
  { id: "fr11", name: "Nantes", country: "fr", cooperative: "coop01" },
  { id: "fr12", name: "Paris", country: "fr", cooperative: "coop01" },
  { id: "fr13", name: "Rennes", country: "fr", cooperative: "coop01" },
  { id: "fr14", name: "Siège social", country: "fr", cooperative: "coop01" },
  { id: "fr15", name: "Strasbourg", country: "fr", cooperative: "coop01" },
  { id: "fr16", name: "Toulouse", country: "fr", cooperative: "coop01" },
  { id: "nl01", name: "Rotterdam", country: "nl", cooperative: "coop01" },
  { id: "it01", name: "Milano", country: "it", cooperative: "coop01" },
  { id: "it02", name: "Roma", country: "it", cooperative: "coop01" },
  { id: "se01", name: "Stockholm", country: "se", cooperative: "coop01" },
];

//Categories
export const occupationCategories = [
  { id: "cat01", name: "Artes escénicas" },
  { id: "cat02", name: "Artes plásticas" },
  { id: "cat03", name: "Artesanía, costura y manufactura" },
  { id: "cat04", name: "Audiovisuales y media" },
  { id: "cat05", name: "Diseño y arquitectura" },
  { id: "cat06", name: "Educación, formación y servicios personales" },
  { id: "cat07", name: "Fotografía" },
  { id: "cat08", name: "Managing, gestión, dirección, producción" },
  { id: "cat09", name: "Traducción, escritura y comunicación" },
  { id: "cat10", name: "Otros" },
];

//Occupations
export const occupations = [
  {
    id: "occ01001",
    name: "Actor/Actriz",
    category: "cat01",
  },
  {
    id: "occ01002",
    name: "Artista escénico",
    category: "cat01",
  },
  {
    id: "occ01003",
    name: "Artista de circo",
    category: "cat01",
  },
  {
    id: "occ01004",
    name: "Bailarín/a",
    category: "cat01",
  },
  {
    id: "occ01005",
    name: "Clown / Payaso",
    category: "cat01",
  },
  {
    id: "occ01006",
    name: "Cómico/a",
    category: "cat01",
  },
  {
    id: "occ01007",
    name: "Coreógrafo/a",
    category: "cat01",
  },
  {
    id: "occ01008",
    name: "Cuentacuentos",
    category: "cat01",
  },
  {
    id: "occ01009",
    name: "Danza",
    category: "cat01",
  },
  {
    id: "occ01010",
    name: "Escenografía",
    category: "cat01",
  },
  {
    id: "occ01011",
    name: "Especialización teatro físico",
    category: "cat01",
  },
  {
    id: "occ01012",
    name: "Humorista",
    category: "cat01",
  },
  {
    id: "occ01013",
    name: "Ilusionista",
    category: "cat01",
  },
  {
    id: "occ01014",
    name: "Maestro/a de ceremonias",
    category: "cat01",
  },
  {
    id: "occ01015",
    name: "Mago/a",
    category: "cat01",
  },
  {
    id: "occ01016",
    name: "Monologuista",
    category: "cat01",
  },
  {
    id: "occ01017",
    name: "Narrador/a",
    category: "cat01",
  },
  {
    id: "occ01018",
    name: "Narración oral",
    category: "cat01",
  },
  {
    id: "occ01019",
    name: "Percusionista",
    category: "cat01",
  },
  {
    id: "occ01020",
    name: "Performance",
    category: "cat01",
  },
  {
    id: "occ01021",
    name: "Pianista",
    category: "cat01",
  },
  {
    id: "occ01022",
    name: "Teatro gestual",
    category: "cat01",
  },
  {
    id: "occ01023",
    name: "Teatro social",
    category: "cat01",
  },
  {
    id: "occ01024",
    name: "Titiritero/a",
    category: "cat01",
  },
  {
    id: "occ01025",
    name: "Otros",
    category: "cat01",
  },
  {
    id: "occ02001",
    name: "Artista plástico/a",
    category: "cat02",
  },
  {
    id: "occ02002",
    name: "Escultor/a",
    category: "cat02",
  },
  {
    id: "occ02003",
    name: "Escultura electromecánica",
    category: "cat02",
  },
  {
    id: "occ02004",
    name: "Grafista",
    category: "cat02",
  },
  {
    id: "occ02005",
    name: "Ilustración científica",
    category: "cat02",
  },
  {
    id: "occ02006",
    name: "Ilustrador/a",
    category: "cat02",
  },
  {
    id: "occ02007",
    name: "Licenciado/a en bellas artes",
    category: "cat02",
  },
  {
    id: "occ02008",
    name: "Motion graphics",
    category: "cat02",
  },
  {
    id: "occ02009",
    name: "Pintor/a",
    category: "cat02",
  },
  {
    id: "occ02010",
    name: "Otros",
    category: "cat02",
  },
  {
    id: "occ03001",
    name: "Artesano/a",
    category: "cat03",
  },
  {
    id: "occ03002",
    name: "Atelier",
    category: "cat03",
  },
  {
    id: "occ03003",
    name: "Carpintería",
    category: "cat03",
  },
  {
    id: "occ03004",
    name: "Ceramista",
    category: "cat03",
  },
  {
    id: "occ03005",
    name: "Encuadernación",
    category: "cat03",
  },
  {
    id: "occ03006",
    name: "Esmaltador/a",
    category: "cat03",
  },
  {
    id: "occ03007",
    name: "Estampación textil",
    category: "cat03",
  },
  {
    id: "occ03008",
    name: "Orfebre",
    category: "cat03",
  },
  {
    id: "occ03009",
    name: "Restauración",
    category: "cat03",
  },
  {
    id: "occ03010",
    name: "Restauración documentos gráficos",
    category: "cat03",
  },
  {
    id: "occ03011",
    name: "Otros",
    category: "cat03",
  },
  {
    id: "occ04001",
    name: "Animación 2D y/o 3D",
    category: "cat04",
  },
  {
    id: "occ04002",
    name: "Artista audiovisual",
    category: "cat04",
  },
  {
    id: "occ04003",
    name: "Desarrollo software o progr. web",
    category: "cat04",
  },
  {
    id: "occ04004",
    name: "Edición de vídeo",
    category: "cat04",
  },
  {
    id: "occ04005",
    name: "Efectos visuales",
    category: "cat04",
  },
  {
    id: "occ04006",
    name: "Ingeniero/a de imagen",
    category: "cat04",
  },
  {
    id: "occ04007",
    name: "Ingeniero/a de sonido",
    category: "cat04",
  },
  {
    id: "occ04008",
    name: "Instalaciones interactivas",
    category: "cat04",
  },
  {
    id: "occ04009",
    name: "Músico/a electrónica",
    category: "cat04",
  },
  {
    id: "occ04010",
    name: "Operador/a de cámara",
    category: "cat04",
  },
  {
    id: "occ04011",
    name: "Realización de vídeo",
    category: "cat04",
  },
  {
    id: "occ04012",
    name: "Realización audiovisual",
    category: "cat04",
  },
  {
    id: "occ04013",
    name: "Servicios audiovisuales",
    category: "cat04",
  },
  {
    id: "occ04014",
    name: "Sound designer",
    category: "cat04",
  },
  {
    id: "occ04015",
    name: "Técnico/a de iluminación",
    category: "cat04",
  },
  {
    id: "occ04016",
    name: "Técnico/a de sonido",
    category: "cat04",
  },
  {
    id: "occ04017",
    name: "Técnico/a de vídeo",
    category: "cat04",
  },
  {
    id: "occ04018",
    name: "Videografía",
    category: "cat04",
  },
  {
    id: "occ04019",
    name: "Otros",
    category: "cat04",
  },
  {
    id: "occ05001",
    name: "Arquitectura",
    category: "cat05",
  },
  {
    id: "occ05002",
    name: "Diseñador/a",
    category: "cat05",
  },
  {
    id: "occ05003",
    name: "Diseño editorial",
    category: "cat05",
  },
  {
    id: "occ05004",
    name: "Diseño editorial y web",
    category: "cat05",
  },
  {
    id: "occ05005",
    name: "Diseño ilum. y vis. (videomapping)",
    category: "cat05",
  },
  {
    id: "occ05006",
    name: "Diseño de joyas",
    category: "cat05",
  },
  {
    id: "occ05007",
    name: "Diseño de moda y/o confección",
    category: "cat05",
  },
  {
    id: "occ05008",
    name: "Diseño de producto",
    category: "cat05",
  },
  {
    id: "occ05009",
    name: "Diseño de sombrerería",
    category: "cat05",
  },
  {
    id: "occ05010",
    name: "Diseño gráfico",
    category: "cat05",
  },
  {
    id: "occ05011",
    name: "Diseño multimedia",
    category: "cat05",
  },
  {
    id: "occ05012",
    name: "Diseño textil",
    category: "cat05",
  },
  {
    id: "occ05013",
    name: "Diseño web",
    category: "cat05",
  },
  {
    id: "occ05014",
    name: "Maquetación",
    category: "cat05",
  },
  {
    id: "occ05015",
    name: "Permacultura",
    category: "cat05",
  },
  {
    id: "occ05016",
    name: "Otros",
    category: "cat05",
  },
  {
    id: "occ06001",
    name: "Animación turística",
    category: "cat06",
  },
  {
    id: "occ06002",
    name: "Animador/a",
    category: "cat06",
  },
  {
    id: "occ06003",
    name: "Coaching",
    category: "cat06",
  },
  {
    id: "occ06004",
    name: "Educación ambiental",
    category: "cat06",
  },
  {
    id: "occ06005",
    name: "Educación deportiva",
    category: "cat06",
  },
  {
    id: "occ06006",
    name: "Educación infantil",
    category: "cat06",
  },
  {
    id: "occ06007",
    name: "Educador/a",
    category: "cat06",
  },
  {
    id: "occ06008",
    name: "Facilitador/a de grupos",
    category: "cat06",
  },
  {
    id: "occ06009",
    name: "Formación",
    category: "cat06",
  },
  {
    id: "occ06010",
    name: "Formación actoral",
    category: "cat06",
  },
  {
    id: "occ06011",
    name: "Formación de adultos",
    category: "cat06",
  },
  {
    id: "occ06012",
    name: "Formación de circo",
    category: "cat06",
  },
  {
    id: "occ06013",
    name: "Formación de idiomas",
    category: "cat06",
  },
  {
    id: "occ06014",
    name: "Formación e interp. patrimonio",
    category: "cat06",
  },
  {
    id: "occ06015",
    name: "Formador/a de teatro",
    category: "cat06",
  },
  {
    id: "occ06016",
    name: "Formador/a de yoga",
    category: "cat06",
  },
  {
    id: "occ06017",
    name: "Guía turístico",
    category: "cat06",
  },
  {
    id: "occ06018",
    name: "Instructor/a de yoga",
    category: "cat06",
  },
  {
    id: "occ06019",
    name: "Integrador/a social",
    category: "cat06",
  },
  {
    id: "occ06020",
    name: "Mediación de conflictos",
    category: "cat06",
  },
  {
    id: "occ06021",
    name: "Monitor/a",
    category: "cat06",
  },
  {
    id: "occ06022",
    name: "Masajista",
    category: "cat06",
  },
  {
    id: "occ06023",
    name: "Organización de eventos",
    category: "cat06",
  },
  {
    id: "occ06024",
    name: "Outsourcing comercial",
    category: "cat06",
  },
  {
    id: "occ06025",
    name: "Profesor/a de danza",
    category: "cat06",
  },
  {
    id: "occ06026",
    name: "Profesor/a de idiomas",
    category: "cat06",
  },
  {
    id: "occ06027",
    name: "Psicólogo/a",
    category: "cat06",
  },
  {
    id: "occ06028",
    name: "Realización de eventos",
    category: "cat06",
  },
  {
    id: "occ06029",
    name: "Talleres de escritura creativa",
    category: "cat06",
  },
  {
    id: "occ06030",
    name: "Tallerista",
    category: "cat06",
  },
  {
    id: "occ06031",
    name: "Turismo cultural",
    category: "cat06",
  },
  {
    id: "occ06032",
    name: "Otros",
    category: "cat06",
  },
  {
    id: "occ07001",
    name: "Fotografía",
    category: "cat07",
  },
  {
    id: "occ07002",
    name: "Fotografía de bodas",
    category: "cat07",
  },
  {
    id: "occ07003",
    name: "Fotografía de espectáculos",
    category: "cat07",
  },
  {
    id: "occ07004",
    name: "Fotografía infantil",
    category: "cat07",
  },
  {
    id: "occ07005",
    name: "Fotografía moda y/o publicidad",
    category: "cat07",
  },
  {
    id: "occ07006",
    name: "Fotografía del S.XIX",
    category: "cat07",
  },
  {
    id: "occ07007",
    name: "Fotoperiodismo musical",
    category: "cat07",
  },
  {
    id: "occ07008",
    name: "Otros",
    category: "cat07",
  },
  {
    id: "occ08001",
    name: "Asesor/a de proyectos creativos",
    category: "cat08",
  },
  {
    id: "occ08002",
    name: "Ayudante de producción",
    category: "cat08",
  },
  {
    id: "occ08003",
    name: "Community manager",
    category: "cat08",
  },
  {
    id: "occ08004",
    name: "Consultoría",
    category: "cat08",
  },
  {
    id: "occ08005",
    name: "Consultoría proyectos",
    category: "cat08",
  },
  {
    id: "occ08006",
    name: "Creativo/a",
    category: "cat08",
  },
  {
    id: "occ08007",
    name: "Director/a creativo",
    category: "cat08",
  },
  {
    id: "occ08008",
    name: "Director/a de compañía",
    category: "cat08",
  },
  {
    id: "occ08009",
    name: "Director/a de escena",
    category: "cat08",
  },
  {
    id: "occ08010",
    name: "Director/a teatral",
    category: "cat08",
  },
  {
    id: "occ08011",
    name: "Gestión cultural",
    category: "cat08",
  },
  {
    id: "occ08012",
    name: "Gestión de proyectos",
    category: "cat08",
  },
  {
    id: "occ08013",
    name: "Identidad corporativa",
    category: "cat08",
  },
  {
    id: "occ08014",
    name: "Mánager de artistas",
    category: "cat08",
  },
  {
    id: "occ08015",
    name: "Postproducción",
    category: "cat08",
  },
  {
    id: "occ08016",
    name: "Producción",
    category: "cat08",
  },
  {
    id: "occ08017",
    name: "Producción artesanal",
    category: "cat08",
  },
  {
    id: "occ08018",
    name: "Producción cinematográfica",
    category: "cat08",
  },
  {
    id: "occ08019",
    name: "Producción editorial",
    category: "cat08",
  },
  {
    id: "occ08020",
    name: "Producción eventos culturales",
    category: "cat08",
  },
  {
    id: "occ08021",
    name: "Producción musical",
    category: "cat08",
  },
  {
    id: "occ08022",
    name: "Producción objetos",
    category: "cat08",
  },
  {
    id: "occ08023",
    name: "Producción teatral",
    category: "cat08",
  },
  {
    id: "occ08024",
    name: "Producc. y distrib. espectáculos",
    category: "cat08",
  },
  {
    id: "occ08025",
    name: "Proy. artíst. lugares espec.",
    category: "cat08",
  },
  {
    id: "occ08026",
    name: "Regiduría técnica",
    category: "cat08",
  },
  {
    id: "occ08027",
    name: "Servicios culturales",
    category: "cat08",
  },
  {
    id: "occ08028",
    name: "Serv. técnicos artes escénicas",
    category: "cat08",
  },
  {
    id: "occ08029",
    name: "Tour mánager",
    category: "cat08",
  },
  {
    id: "occ08030",
    name: "Otros",
    category: "cat08",
  },
  { id: "occ09001", name: "Copy", category: "cat09" },
  {
    id: "occ09002",
    name: "Corrector",
    category: "cat09",
  },
  {
    id: "occ09003",
    name: "Creación de contenidos",
    category: "cat09",
  },
  {
    id: "occ09004",
    name: "Dramaturgo/a",
    category: "cat09",
  },
  {
    id: "occ09005",
    name: "Escritor/a",
    category: "cat09",
  },
  {
    id: "occ09006",
    name: "Experto/a en comunicación",
    category: "cat09",
  },
  {
    id: "occ09007",
    name: "Guionista",
    category: "cat09",
  },
  {
    id: "occ09008",
    name: "Intérprete",
    category: "cat09",
  },
  {
    id: "occ09009",
    name: "Periodista",
    category: "cat09",
  },
  {
    id: "occ09010",
    name: "Publicista",
    category: "cat09",
  },
  {
    id: "occ09011",
    name: "Redacción de contenidos",
    category: "cat09",
  },
  {
    id: "occ09012",
    name: "Subtitulador/a",
    category: "cat09",
  },
  {
    id: "occ09013",
    name: "Traducción de literatura",
    category: "cat09",
  },
  {
    id: "occ09014",
    name: "Traductor/a",
    category: "cat09",
  },
  {
    id: "occ09015",
    name: "Otros",
    category: "cat09",
  },
  {
    id: "occ10001",
    name: "Artista conceptual",
    category: "cat10",
  },
  {
    id: "occ10002",
    name: "Artista multidisciplinar",
    category: "cat10",
  },
  {
    id: "occ10003",
    name: "Artista urbano",
    category: "cat10",
  },
  {
    id: "occ10004",
    name: "Cultura gastronómica",
    category: "cat10",
  },
  {
    id: "occ10005",
    name: "Estilismo",
    category: "cat10",
  },
  {
    id: "occ10006",
    name: "Historiador/a del arte",
    category: "cat10",
  },
  {
    id: "occ10007",
    name: "Investigador/a",
    category: "cat10",
  },
  {
    id: "occ10008",
    name: "Maquinista y escenógrafo/a",
    category: "cat10",
  },
  {
    id: "occ10009",
    name: "Museógrafo/a",
    category: "cat10",
  },
  {
    id: "occ10010",
    name: "Músico/a",
    category: "cat10",
  },
  {
    id: "occ10011",
    name: "Social media expert",
    category: "cat10",
  },
  {
    id: "occ10012",
    name: "Otros",
    category: "cat10",
  },
];
