export type Projekt = {
  id: string;
  client: string;
  type: string;
  category: string;
  image: string;
  year: string;
  intro: string;
  long: string[];
  sherbime: string[];
  gallery: string[];
};

export const projektet: Projekt[] = [
  {
    id: "korres",
    client: "KORRES",
    type: "Fushatë brandi",
    category: "Fushata",
    image: "/tvradio.jpg",
    year: "2025",
    intro:
      "Fushatë e plotë brandi për hyrjen e KORRES në tregun shqiptar.",
    long: [
      "KORRES kishte nevojë për një hyrje të fortë në tregun shqiptar — një fushatë që prezanton brandin dhe ndërton besim që në ditën e parë.",
      "Ndërtuam konceptin kreativ, prodhuam materialet vizuale dhe e shpërndamë fushatën në kanalet ku audienca e synuar kalon kohën.",
    ],
    sherbime: ["Koncept kreativ", "Prodhim vizual", "Media planning", "Reklamim digjital"],
    gallery: ["/tvradio.jpg", "/tvradio.jpg"],
  },
  {
    id: "vm-resort",
    client: "VM Resort",
    type: "Rrjete sociale",
    category: "Rrjete sociale",
    image: "/tvradio.jpg",
    year: "2025",
    intro:
      "Menaxhim i plotë i rrjeteve sociale për një nga resortet më të njohura.",
    long: [
      "VM Resort donte një prezencë digjitale në nivelin e shërbimit që ofron — vizuale premium dhe komunikim i qëndrueshëm me mysafirët.",
      "Morëm përsipër strategjinë e përmbajtjes, prodhimin foto/video në terren dhe menaxhimin e përditshëm të kanaleve.",
    ],
    sherbime: ["Strategji përmbajtjeje", "Foto & Video", "Menaxhim rrjetesh sociale"],
    gallery: ["/tvradio.jpg", "/tvradio.jpg"],
  },
  {
    id: "italstone",
    client: "ITALSTONE",
    type: "Branding",
    category: "Branding",
    image: "/tvradio.jpg",
    year: "2024",
    intro:
      "Identitet i ri vizual për një lider në industrinë e gurit natyror.",
    long: [
      "ITALSTONE kishte produkt premium por identitet që s'e reflektonte. Rindërtuam gjithçka nga logoja te materialet e shitjes.",
      "Rezultati: një brand koherent që komunikon cilësinë e produktit në çdo pikë kontakti — nga kartëvizita te showroom-i.",
    ],
    sherbime: ["Dizajn logoje", "Brandbook", "Materiale marketingu"],
    gallery: ["/tvradio.jpg", "/tvradio.jpg"],
  },
  {
    id: "global-pharma",
    client: "Global Pharma",
    type: "Fushatë digjitale",
    category: "Fushata",
    image: "/tvradio.jpg",
    year: "2024",
    intro:
      "Fushatë digjitale me rezultate të matshme për sektorin farmaceutik.",
    long: [
      "Global Pharma kërkonte rritje të njohshmërisë për produktet kryesore, me buxhet të kontrolluar dhe raportim të qartë.",
      "Ngritëm fushata Meta dhe Google të segmentuara sipas audiencave, me optimizim javor dhe raporte mujore transparente.",
    ],
    sherbime: ["Meta Ads", "Google Ads", "Dizajn kreativash", "Raportim"],
    gallery: ["/tvradio.jpg", "/tvradio.jpg"],
  },
  {
    id: "oliva-park",
    client: "Oliva Park Residence",
    type: "Web design",
    category: "Web",
    image: "/tvradio.jpg",
    year: "2024",
    intro:
      "Faqe web moderne për një kompleks rezidencial premium.",
    long: [
      "Oliva Park kishte nevojë për një vitrinë digjitale që u përgjigjet blerësve seriozë: apartamentet, planimetritë dhe kontakti — të gjitha dy klikime larg.",
      "Dizajnuam dhe ndërtuam një faqe të shpejtë, mobile-first, me galeri vizuale dhe formë kontakti të lidhur direkt me ekipin e shitjes.",
    ],
    sherbime: ["Web design", "Zhvillim", "Fotografi", "SEO bazë"],
    gallery: ["/tvradio.jpg", "/tvradio.jpg"],
  },
  {
    id: "abi-bank",
    client: "abi bank",
    type: "Branding & Identitet",
    category: "Branding",
    image: "/tvradio.jpg",
    year: "2023",
    intro:
      "Materiale identiteti dhe komunikimi për një bankë në rritje.",
    long: [
      "Bashkëpunim afatgjatë për materialet e komunikimit të brandit — nga fushatat sezonale te materialet e degëve.",
      "Konsistenca vizuale në çdo material ka ndihmuar bankën të ndërtojë njohshmëri dhe besim te klientët e rinj.",
    ],
    sherbime: ["Dizajn fushatash", "Materiale printi", "Adaptime digjitale"],
    gallery: ["/tvradio.jpg", "/tvradio.jpg"],
  },
  {
    id: "daylux",
    client: "daylux",
    type: "Fushatë digjitale",
    category: "Fushata",
    image: "/tvradio.jpg",
    year: "2023",
    intro:
      "Fushatë digjitale për rritjen e shitjeve online.",
    long: [
      "daylux kërkonte të kthente ndjekësit në blerës. Ndërtuam fushata të orientuara nga konvertimi, me kreativa të testuara A/B.",
      "Rezultati: rritje e qëndrueshme e porosive online me kosto për blerje në rënie muaj pas muaji.",
    ],
    sherbime: ["Meta Ads", "Kreativa", "Optimizim konvertimi"],
    gallery: ["/tvradio.jpg", "/tvradio.jpg"],
  },
];

export const kategorite = ["Të gjitha", "Branding", "Fushata", "Rrjete sociale", "Web"];