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
  { id: "cat01", name: "3D product design" },
  { id: "cat02", name: "Arranging / Display" },
  { id: "cat03", name: "Digital / Multi-Media" },
  { id: "cat04", name: "Fashion / Textiles" },
  { id: "cat05", name: "Fine Art" },
  { id: "cat06", name: "Graphic Design" },
  { id: "cat07", name: "Organization / People management" },
  { id: "cat08", name: "Photography" },
  { id: "cat09", name: "Spatial design" },
  { id: "cat10", name: "Writing / Analytical" },
];

//Occupations
export const occupations = [
  {
    id: "occ01001",
    name: "Food product designer",
    category: "cat01",
  },
  {
    id: "occ01002",
    name: "Glass Artist",
    category: "cat01",
  },
  {
    id: "occ01003",
    name: "Industrial designer / Bridge designer",
    category: "cat01",
  },
  {
    id: "occ01004",
    name: "Jeweller",
    category: "cat01",
  },
  {
    id: "occ01005",
    name: "Miniature model maker / Mock-up artist",
    category: "cat01",
  },
  {
    id: "occ01006",
    name: "Mosaic designer",
    category: "cat01",
  },
  {
    id: "occ01007",
    name: "Potter / Ceramic designer",
    category: "cat01",
  },
  {
    id: "occ01008",
    name: "Prop designer",
    category: "cat01",
  },
  {
    id: "occ01009",
    name: "Stained glass window designer",
    category: "cat01",
  },
  {
    id: "occ01010",
    name: "Toy designer / Kite designer / Utensil designer",
    category: "cat01",
  },
  {
    id: "occ01011",
    name: "Weaver",
    category: "cat01",
  },
  {
    id: "occ01012",
    name: "Wood turner / Carver",
    category: "cat01",
  },
  {
    id: "occ01025",
    name: "Other",
    category: "cat01",
  },
  {
    id: "occ02001",
    name: "Art / Design / Color consultant",
    category: "cat02",
  },
  {
    id: "occ02002",
    name: "Display and exhibition planner",
    category: "cat02",
  },
  {
    id: "occ02003",
    name: "Floral arranger",
    category: "cat02",
  },
  {
    id: "occ02004",
    name: "Food stylist",
    category: "cat02",
  },
  {
    id: "occ02005",
    name: "Gallery owner / Assistan",
    category: "cat02",
  },
  {
    id: "occ02006",
    name: "Museum curator",
    category: "cat02",
  },
  {
    id: "occ02007",
    name: "Online curator",
    category: "cat02",
  },
  {
    id: "occ02008",
    name: "Personal stylist",
    category: "cat02",
  },
  {
    id: "occ02009",
    name: "Picture framer",
    category: "cat02",
  },
  {
    id: "occ02010",
    name: "Other",
    category: "cat02",
  },
  {
    id: "occ03001",
    name: "Actor / Actress",
    category: "cat03",
  },
  {
    id: "occ03002",
    name: "Animator",
    category: "cat03",
  },
  {
    id: "occ03003",
    name: "Audio and video equipment technician",
    category: "cat03",
  },
  {
    id: "occ03004",
    name: "Broadcast technician",
    category: "cat03",
  },
  {
    id: "occ03005",
    name: "Camera operator",
    category: "cat03",
  },
  {
    id: "occ03006",
    name: "Choreographer",
    category: "cat03",
  },
  {
    id: "occ03007",
    name: "Clown",
    category: "cat03",
  },
  {
    id: "occ03008",
    name: "Compose",
    category: "cat03",
  },
  {
    id: "occ03009",
    name: "Concept artist",
    category: "cat03",
  },
  {
    id: "occ03010",
    name: "Dancer",
    category: "cat03",
  },
  {
    id: "occ03011",
    name: "Digital 3D modeller",
    category: "cat03",
  },
  {
    id: "occ03012",
    name: "Digital illustrator",
    category: "cat03",
  },
  {
    id: "occ03013",
    name: "Documentary filmmaker",
    category: "cat03",
  },
  {
    id: "occ03014",
    name: "Film editor",
    category: "cat03",
  },
  {
    id: "occ03015",
    name: "Iphone / Android app designer",
    category: "cat03",
  },
  {
    id: "occ03016",
    name: "Music arranger",
    category: "cat03",
  },
  {
    id: "occ03017",
    name: "Music director",
    category: "cat03",
  },
  {
    id: "occ03018",
    name: "Musician / Instrumental",
    category: "cat03",
  },
  {
    id: "occ03019",
    name: "Public address system and other announcer",
    category: "cat03",
  },
  {
    id: "occ03020",
    name: "Radio and Television announcer",
    category: "cat03",
  },
  {
    id: "occ03021",
    name: "Radio operator",
    category: "cat03",
  },
  {
    id: "occ03022",
    name: "Singer",
    category: "cat03",
  },
  {
    id: "occ03023",
    name: "Special effects designer",
    category: "cat03",
  },
  {
    id: "occ03024",
    name: "Sound engineering technician",
    category: "cat03",
  },
  {
    id: "occ03025",
    name: "Television / Film producer",
    category: "cat03",
  },
  {
    id: "occ03026",
    name: "Video editor",
    category: "cat03",
  },
  {
    id: "occ03027",
    name: "Video game design",
    category: "cat03",
  },
  {
    id: "occ03028",
    name: "Web designer",
    category: "cat03",
  },
  {
    id: "occ03029",
    name: "YouTube video creator",
    category: "cat03",
  },
  {
    id: "occ03030",
    name: "Other",
    category: "cat03",
  },
  {
    id: "occ04001",
    name: "Accessory designer (Shoes / Bags / Hats)",
    category: "cat04",
  },
  {
    id: "occ04002",
    name: "Costume designer",
    category: "cat04",
  },
  {
    id: "occ04003",
    name: "Dress maker",
    category: "cat04",
  },
  {
    id: "occ04004",
    name: "Embroiderer",
    category: "cat04",
  },
  {
    id: "occ04005",
    name: "Fabric / Textile designer",
    category: "cat04",
  },
  {
    id: "occ04006",
    name: "Fashion consultant",
    category: "cat04",
  },
  {
    id: "occ04007",
    name: "Fashion designer / Sports apparel designer",
    category: "cat04",
  },
  {
    id: "occ04008",
    name: "Fashion merchandising",
    category: "cat04",
  },
  {
    id: "occ04009",
    name: "Fibre artist",
    category: "cat04",
  },
  {
    id: "occ04010",
    name: "Pattern maker",
    category: "cat04",
  },
  {
    id: "occ04011",
    name: "Quilt / Rug / Linen designer",
    category: "cat04",
  },
  {
    id: "occ04012",
    name: "T-shirt designer",
    category: "cat04",
  },
  {
    id: "occ04013",
    name: "Other",
    category: "cat04",
  },
  {
    id: "occ05001",
    name: "Architectural illustrator",
    category: "cat05",
  },
  {
    id: "occ05002",
    name: "Airbrush artist / Spray painter",
    category: "cat05",
  },
  {
    id: "occ05003",
    name: "Art conservation",
    category: "cat05",
  },
  {
    id: "occ05004",
    name: "Book illustrator",
    category: "cat05",
  },
  {
    id: "occ05005",
    name: "Cartoonist / Caricaturist",
    category: "cat05",
  },
  {
    id: "occ05006",
    name: "Commercial artist",
    category: "cat05",
  },
  {
    id: "occ05007",
    name: "Fine artist (painter)",
    category: "cat05",
  },
  {
    id: "occ05008",
    name: "Graphic illustrator",
    category: "cat05",
  },
  {
    id: "occ05009",
    name: "Mural artist",
    category: "cat05",
  },
  {
    id: "occ05010",
    name: "Printmaker / Screen printer",
    category: "cat05",
  },
  {
    id: "occ05011",
    name: "Special effects makeup",
    category: "cat05",
  },
  {
    id: "occ05012",
    name: "Story board illustrator",
    category: "cat05",
  },
  {
    id: "occ05013",
    name: "Tatoo artist",
    category: "cat05",
  },
  {
    id: "occ05014",
    name: "Technical / Textbook illustrator",
    category: "cat05",
  },
  {
    id: "occ05015",
    name: "Other",
    category: "cat05",
  },
  {
    id: "occ06001",
    name: "Advertisement designer",
    category: "cat06",
  },
  {
    id: "occ06002",
    name: "Advertising director",
    category: "cat06",
  },
  {
    id: "occ06003",
    name: "Book / ebook designer",
    category: "cat06",
  },
  {
    id: "occ06004",
    name: "Calendar / Stationery / Wallpaper designer",
    category: "cat06",
  },
  {
    id: "occ06005",
    name: "Logo / Branding designer",
    category: "cat06",
  },
  {
    id: "occ06006",
    name: "Magazine layout designer",
    category: "cat06",
  },
  {
    id: "occ06007",
    name: "Packaging designer",
    category: "cat06",
  },
  {
    id: "occ06008",
    name: "Sign writer",
    category: "cat06",
  },
  {
    id: "occ06009",
    name: "Typographer",
    category: "cat06",
  },
  {
    id: "occ06010",
    name: "Other",
    category: "cat06",
  },
  {
    id: "occ07001",
    name: "Art dealer",
    category: "cat07",
  },
  {
    id: "occ07002",
    name: "Art school director",
    category: "cat07",
  },
  {
    id: "occ07003",
    name: "Art supplies retailer",
    category: "cat07",
  },
  {
    id: "occ07004",
    name: "Art therapist",
    category: "cat07",
  },
  {
    id: "occ07005",
    name: "Artist agent",
    category: "cat07",
  },
  {
    id: "occ07006",
    name: "Middle / High School art teacher",
    category: "cat07",
  },
  {
    id: "occ07007",
    name: "Primary / Elementary teacher",
    category: "cat07",
  },
  {
    id: "occ07008",
    name: "Private art instructor",
    category: "cat07",
  },
  {
    id: "occ07009",
    name: "University lecturer / Professor",
    category: "cat07",
  },
  {
    id: "occ07010",
    name: "Other",
    category: "cat07",
  },
  {
    id: "occ08001",
    name: "Advertising photographer",
    category: "cat08",
  },
  {
    id: "occ08002",
    name: "Director of photography",
    category: "cat08",
  },
  {
    id: "occ08003",
    name: "Fashion photographer",
    category: "cat08",
  },
  {
    id: "occ08004",
    name: "Food photographer",
    category: "cat08",
  },
  {
    id: "occ08005",
    name: "Photo journalist",
    category: "cat08",
  },
  {
    id: "occ08006",
    name: "Portrait photographer",
    category: "cat08",
  },
  {
    id: "occ08007",
    name: "Stock photo seller",
    category: "cat08",
  },
  {
    id: "occ08008",
    name: "Underwater photographer",
    category: "cat08",
  },
  {
    id: "occ08009",
    name: "Wedding photographer",
    category: "cat08",
  },
  {
    id: "occ08010",
    name: "Other",
    category: "cat08",
  },
  { id: "occ09001", name: "Architect", category: "cat09" },
  {
    id: "occ09002",
    name: "Interior designer / Decorator",
    category: "cat09",
  },
  {
    id: "occ09003",
    name: "Landscape architect",
    category: "cat09",
  },
  {
    id: "occ09004",
    name: "Playground / Theme park / Sports arena / Golf course designer",
    category: "cat09",
  },
  {
    id: "occ09005",
    name: "Set / Stage design",
    category: "cat09",
  },
  {
    id: "occ09006",
    name: "Urban designer / Town planner",
    category: "cat09",
  },
  {
    id: "occ09007",
    name: "Other",
    category: "cat09",
  },
  {
    id: "occ10001",
    name: "Arts administrator",
    category: "cat10",
  },
  {
    id: "occ10002",
    name: "Art critic",
    category: "cat10",
  },
  {
    id: "occ10003",
    name: "Art curriculum writer",
    category: "cat10",
  },
  {
    id: "occ10004",
    name: "Art historian",
    category: "cat10",
  },
  {
    id: "occ10005",
    name: "Arts and cultural planner",
    category: "cat10",
  },
  {
    id: "occ10006",
    name: "Copy writer",
    category: "cat10",
  },
  {
    id: "occ10007",
    name: "Editor",
    category: "cat10",
  },
  {
    id: "occ10008",
    name: "Graphic novel author",
    category: "cat10",
  },
  {
    id: "occ10009",
    name: "Interpreter / Translator",
    category: "cat10",
  },
  {
    id: "occ10010",
    name: "Poet / Lyricist / Creative writer",
    category: "cat10",
  },
  {
    id: "occ10011",
    name: "Technical writer",
    category: "cat10",
  },
  {
    id: "occ10012",
    name: "Website owner / Blogger",
    category: "cat10",
  },
  {
    id: "occ10013",
    name: "Other",
    category: "cat10",
  },
];
