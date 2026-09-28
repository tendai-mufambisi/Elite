// All site copy and business details live here so client updates stay in one place.
// South African English throughout (colour, aluminium). No invented statistics, reviews,
// years in business, service areas or guarantees.

const whatsappNumber = "27842586400";
const quoteText = "Hi Elite Gutters, I'd like a quote.";

export const site = {
  name: "Elite Gutters and Aluminium Products",
  shortName: "Elite Gutters",
  tagline: "Build | Protect | Enhance",
  secondary: "Quality Finishes Last Longer",
  description:
    "Seamless stainless steel and colour-coated gutters, fascia boards, pillar cladding, balustrades, aluminium doors and windows, and garage doors for residential, commercial and industrial buildings in South Africa.",
  footerBlurb:
    "Seamless gutters, fascia boards and premium aluminium finishes for homes, schools and commercial buildings. Built to protect. Designed to match.",
  phone: "+27 84 258 6400",
  phoneHref: "tel:+27842586400",
  whatsappNumber,
  email: "info@eliteguttersandaluminium.co.za",
  facebook: "https://www.facebook.com/share/19c7jqKWq7/",
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteText)}`,
  quoteText,
  domain: "https://eliteguttersandaluminium.co.za",
  credit: "Website by Digits Digital",
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: "Why Seamless Gutters", to: "/why-seamless-gutters" },
  { label: "Commercial & Industrial", to: "/commercial-industrial" },
  { label: "Colour Range", to: "/colour-range" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

type Faq = readonly [question: string, answer: string];

export const services = [
  {
    slug: "seamless-gutters",
    title: "Seamless Gutters",
    metaTitle: "Seamless Gutters & Stainless Steel Gutters",
    short: "Clean lines. Confident protection.",
    intro:
      "Stainless steel and colour-coated seamless gutters and downpipes, formed to fit your roofline. Fewer joints mean a cleaner finish and far fewer places for water to escape. Choose rust-free stainless steel or a colour-coated finish such as charcoal or bronze to match your fascia, windows and doors.",
    benefits: [
      "Continuous lengths for a neat, uninterrupted roofline",
      "Wider profiles move rainwater away faster in heavy rain",
      "Rust-free stainless steel and colour-coated steel options",
      "Downpipes finished to match your gutters",
      "Low maintenance, with fewer joints to check",
    ],
    finishes: ["Stainless steel", "Charcoal", "Bronze", "Black", "Colour-coated steel"],
    image: "gutters-charcoal-01",
    gallery: [
      "gutters-charcoal-01",
      "gutters-stainless-01",
      "gutters-bronze-01",
      "gutters-downpipe-01",
      "gutters-roofline-01",
    ],
    video: "gutters-charcoal-video",
    faqs: [
      [
        "What makes a gutter seamless?",
        "Seamless gutters are formed in continuous lengths to fit the roofline, so there are no joints along each run. That means a cleaner look and far fewer places for leaks to start.",
      ],
      [
        "Are stainless steel gutters rust-free?",
        "Yes. Stainless steel does not rust like ordinary steel, which makes it a durable, long-lasting choice for gutters and downpipes.",
      ],
      [
        "Can the downpipes match the gutters?",
        "Yes. Downpipes are supplied in the same finish as your gutters, and we can match them to your fascia boards, windows and doors too.",
      ],
      [
        "Do you install gutters on commercial buildings?",
        "Yes. Our wider gutter profiles suit large roofs on warehouses, factories, schools and commercial buildings.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "fascia-boards",
    title: "Fascia Boards",
    metaTitle: "Stainless Steel & Colour-Coated Fascia Boards",
    short: "The finish that frames it all.",
    intro:
      "Stainless steel, bronze and charcoal fascia boards give your roofline a crisp architectural edge while protecting the timber behind it. They are rust-free, low maintenance and made to match your gutters for one clean, continuous look.",
    benefits: [
      "Rust-free stainless steel and colour-coated options",
      "Protects roof timbers from the weather",
      "Made to match your gutters and downpipes",
      "No painting or regular upkeep needed",
    ],
    finishes: ["Stainless steel", "Bronze", "Charcoal", "Colour-coated steel"],
    image: "fascia-bronze-01",
    gallery: [
      "fascia-bronze-01",
      "fascia-stainless-01",
      "fascia-charcoal-01",
      "fascia-matched-01",
      "fascia-detail-01",
    ],
    faqs: [
      [
        "Can fascia boards match my gutters?",
        "Yes. Matching fascia boards and gutters is our signature. We supply both in the same finish for a seamless roofline.",
      ],
      [
        "What finishes are available?",
        "Stainless steel, bronze and charcoal are popular choices, alongside our full range of colour-coated steel.",
      ],
      [
        "Do metal fascia boards rust?",
        "Stainless steel fascia boards are rust-free, and colour-coated steel is finished to stand up to the weather.",
      ],
      [
        "Can you replace old timber fascia boards?",
        "Yes. Send us photos of your existing roofline and we will advise on the best replacement.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "pillar-cladding",
    title: "Pillar Cladding",
    metaTitle: "Stainless Steel Pillar Cladding",
    short: "Give structure a sharper edge.",
    intro:
      "Stainless steel pillar cladding covers existing pillars in a sleek, modern finish. It protects the pillar from knocks and weather, and ties in with your gutters, fascia and balustrades.",
    benefits: [
      "Modern, architectural appearance",
      "Protects pillars from weather and everyday knocks",
      "Rust-free stainless steel construction",
      "Complements matched gutters, fascia and balustrades",
    ],
    finishes: ["Brushed stainless steel", "Polished stainless steel"],
    image: "pillar-stainless-01",
    gallery: [
      "pillar-stainless-01",
      "pillar-entrance-01",
      "pillar-patio-01",
      "pillar-commercial-01",
    ],
    faqs: [
      [
        "What is pillar cladding?",
        "Pillar cladding is a fitted stainless steel covering that gives an existing pillar a clean, modern finish and protects it.",
      ],
      [
        "Can it be fitted to existing pillars?",
        "Yes. We measure each pillar and fit cladding to suit it.",
      ],
      [
        "Where is pillar cladding used?",
        "It works well on entrances, patios, carports, balconies and commercial frontages.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "balustrades",
    title: "Balustrades",
    metaTitle: "Glass & Stainless Steel Balustrades",
    short: "Open views. Beautiful boundaries.",
    intro:
      "Glass balustrades and stainless steel balustrades for balconies, staircases and handrails. They keep spaces safe without closing off the view, and finish your home with clean, modern lines.",
    benefits: [
      "Glass balustrades that keep views open",
      "Stainless steel balustrades and handrails",
      "Staircase, balcony and patio applications",
      "Rust-free, low-maintenance materials",
    ],
    finishes: ["Clear glass", "Stainless steel", "Glass with stainless steel"],
    image: "balustrade-glass-01",
    gallery: [
      "balustrade-glass-01",
      "balustrade-steel-01",
      "balustrade-staircase-01",
      "balustrade-balcony-01",
      "balustrade-handrail-01",
    ],
    faqs: [
      [
        "Where can balustrades be installed?",
        "Balconies, staircases, patios, mezzanines and any raised area that needs a safe, good-looking edge.",
      ],
      [
        "Do you offer glass balustrades?",
        "Yes. We install glass balustrades on their own or combined with stainless steel posts and handrails.",
      ],
      [
        "Do you do staircase balustrades and handrails?",
        "Yes. Staircase balustrades and handrails are part of our range, inside and outside.",
      ],
      [
        "Can I get a quote for an existing staircase?",
        "Yes. Send photos and rough measurements via WhatsApp and we will take it from there.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "aluminium-doors-windows",
    title: "Aluminium Doors & Windows",
    metaTitle: "Aluminium Doors, Windows & Folding Doors",
    short: "Frame every view beautifully.",
    intro:
      "Aluminium windows, doors, folding doors and shopfronts in bronze, charcoal and more. Aluminium folding doors open up patios, gazebos and living areas, and every frame can be matched to your gutters and fascia boards.",
    benefits: [
      "Slim, strong aluminium frames",
      "Aluminium folding doors for patios and gazebos",
      "Shopfronts for commercial premises",
      "Frames matched to your fascia and gutters",
    ],
    finishes: ["Bronze", "Charcoal", "Black", "Silver"],
    image: "aluminium-folding-bronze-01",
    gallery: [
      "aluminium-folding-bronze-01",
      "aluminium-windows-charcoal-01",
      "aluminium-patio-folding-01",
      "aluminium-shopfront-01",
      "aluminium-sliding-01",
    ],
    faqs: [
      [
        "Do you install aluminium folding doors?",
        "Yes. Aluminium folding doors are ideal for patios, gazebos and entertainment areas, opening the space up completely.",
      ],
      [
        "Can window frames match my fascia boards?",
        "Yes. Bronze fascia with bronze aluminium folding doors is one of our favourite combinations.",
      ],
      [
        "Do you do shopfronts?",
        "Yes. We supply and install aluminium shopfronts for commercial premises.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "garage-doors",
    title: "Garage Doors",
    metaTitle: "Automated Aluminium Garage Doors",
    short: "A strong first impression.",
    intro:
      "Single and double aluminium garage doors, fully automated with remote control. Clean, modern and matched to your roofline, so your home looks complete from the street.",
    benefits: [
      "Single and double garage doors",
      "Fully automated with remote control",
      "Durable, low-maintenance aluminium",
      "Finished to match gutters and fascia",
    ],
    finishes: ["Charcoal", "Bronze", "Black", "Wood-look"],
    image: "garage-double-01",
    gallery: ["garage-double-01", "garage-single-01", "garage-charcoal-01", "garage-matched-01"],
    faqs: [
      [
        "Are your garage doors automated?",
        "Yes. Our automated garage doors open and close by remote control.",
      ],
      [
        "Do you offer single and double doors?",
        "Yes. Both single and double aluminium garage doors are available.",
      ],
      [
        "Can the garage door match my gutters?",
        "Yes. Charcoal gutters, charcoal fascia and a charcoal garage door is a popular matched look.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "burglar-proofing",
    title: "Burglar Proofing",
    metaTitle: "Glass & Aluminium Burglar Proofing",
    short: "Security without compromise.",
    intro:
      "Glass and aluminium burglar proofing that keeps your home secure without spoiling the view. A modern alternative to traditional bars, finished to suit your windows and doors.",
    benefits: [
      "Security with a modern look",
      "Glass and aluminium options",
      "Keeps natural light and views",
      "Finished to match your window frames",
    ],
    finishes: ["Clear glass", "Aluminium", "Charcoal", "Bronze"],
    image: "burglar-aluminium-01",
    gallery: ["burglar-aluminium-01", "burglar-glass-01", "burglar-window-01", "burglar-door-01"],
    faqs: [
      [
        "What materials do you use?",
        "We offer glass and aluminium burglar proofing, designed to be secure and good-looking.",
      ],
      [
        "Will it suit a modern home?",
        "Yes. It is designed as a clean, modern alternative to traditional burglar bars.",
      ],
      [
        "Can I send a photo for a quote?",
        "Yes. Send photos of your windows or doors via WhatsApp and we will get back to you.",
      ],
    ] as readonly Faq[],
  },
] as const;

export type Service = (typeof services)[number];

export const home = {
  metaTitle: "Seamless Gutters & Premium Aluminium Finishes in South Africa",
  metaDescription:
    "Stainless steel and colour-coated seamless gutters, fascia boards, pillar cladding, glass balustrades, aluminium folding doors and automated garage doors. Get a free quote.",
  h1: "Seamless Gutters & Premium Aluminium Finishes in South Africa",
  sub: "Stainless steel and colour-coated gutters, fascia boards, balustrades, aluminium doors and garage doors - built to last and designed to match.",
  trustLabel: "Trusted on every kind of building",
  trust: ["Residential", "Commercial", "Industrial", "Schools"],
  servicesHead: {
    eyebrow: "What we do",
    title: "Every detail. One vision.",
    text: "From the roofline to the front door, seven product ranges that work together.",
  },
  matched: {
    eyebrow: "Our signature",
    title: "Matched finishes.",
    text: "We match gutters, fascia boards, downpipes, windows and folding doors in the same finish, so your building looks designed, not assembled.",
    examples: [
      "Bronze fascia boards + bronze aluminium folding doors",
      "Charcoal gutters + charcoal fascia + charcoal garage doors",
      "Stainless steel gutters + stainless steel pillar cladding + glass balustrades",
    ],
    slots: [
      { slot: "matched-bronze-01", label: "Bronze" },
      { slot: "matched-charcoal-01", label: "Charcoal" },
      { slot: "matched-stainless-01", label: "Stainless steel" },
    ],
  },
  benefitsHead: {
    eyebrow: "Benefits of our products",
    title: "Built to last. Made to match.",
    text: "Every product we install is chosen to protect your building and keep it looking new.",
  },
  projectsHead: {
    eyebrow: "Featured projects",
    title: "Details worth noticing.",
    text: "A look at the finishes and combinations we install.",
  },
  colourTeaser: {
    eyebrow: "Colour range",
    title: "Find your finish.",
    text: "Colour-coated steel gutters and fascia boards in a wide range of colours, from charcoal and black to cream, brick red and forest green.",
  },
  videoHead: { eyebrow: "In motion", title: "See the finish." },
  cta: {
    title: "Ready to upgrade your roofline?",
    text: "Send us your details and a few photos. We will come back to you with a free quote.",
  },
};

// `icon` keys map to Lucide icons in src/routes/index.tsx.
export const benefits = [
  {
    icon: "shield",
    title: "Rust-free stainless steel",
    text: "No corrosion, and a much longer lifespan.",
  },
  {
    icon: "waves",
    title: "Seamless construction",
    text: "No joints along the run, so far fewer leaks.",
  },
  {
    icon: "cloud-rain",
    title: "Wider gutter profiles",
    text: "Water flows away faster in heavy rain.",
  },
  {
    icon: "layers",
    title: "Matched finishes",
    text: "Gutters, fascia, doors and windows in one look.",
  },
  { icon: "palette", title: "Wide colour range", text: "Colour-coated steel to suit any home." },
  { icon: "sparkles", title: "Low maintenance", text: "Built to stay looking new." },
  { icon: "wrench", title: "Expert installation", text: "Done right the first time." },
  {
    icon: "building",
    title: "Residential to industrial",
    text: "Homes, schools, warehouses and commercial buildings.",
  },
] as const;

export const colours = [
  ["Black", "#202326"],
  ["Dark grey", "#454b50"],
  ["Cream", "#e9dfc8"],
  ["Brick red", "#994537"],
  ["Maroon", "#682d37"],
  ["Navy", "#263952"],
  ["Dark green", "#2e4a3d"],
  ["Sage green", "#809286"],
  ["Tan", "#b18d69"],
  ["Burgundy", "#6e3038"],
  ["Forest green", "#254238"],
  ["Wood brown", "#745343"],
  ["Silver", "#adb3b5"],
  ["Stone grey", "#939a9a"],
] as const;

export const colourPage = {
  metaDescription:
    "Colour-coated steel colours for seamless gutters and fascia boards: black, charcoal grey, cream, brick red, navy, forest green, silver and more.",
  intro: {
    eyebrow: "Colour range",
    title: "Find your colour.",
    text: "Colour-coated steel for gutters and fascia boards, in a range made to suit any building.",
  },
  swatchHead: {
    eyebrow: "Colour-coated steel",
    title: "A shade for every building.",
    text: "Swatches are a guide only. Colours look different on screen, so ask us for a physical sample before you decide.",
  },
  explain: {
    eyebrow: "Gutters & fascia boards",
    title: "One colour. One complete look.",
    paragraphs: [
      "Every colour in our range is available for seamless gutters, downpipes and fascia boards. Choose one colour for the whole roofline, or pick a contrast that picks out your windows and doors.",
      "Prefer metal? Stainless steel, bronze and charcoal finishes are also available, and can be matched across aluminium windows, folding doors and garage doors.",
    ],
  },
};

export const whyPage = {
  metaTitle: "Why Seamless Gutters? Seamless vs Sectional Gutters",
  metaDescription:
    "What are seamless gutters, how do they compare with sectional gutters, and why doesn’t stainless steel rust? Everything you need to know before you choose.",
  intro: {
    eyebrow: "The know-how",
    title: "Why seamless gutters?",
    text: "A better roofline starts with understanding what goes into it.",
  },
  what: {
    eyebrow: "What are seamless gutters?",
    title: "One length. No joins.",
    paragraphs: [
      "Seamless gutters are formed on site in one continuous length to fit each section of your roofline. Sectional gutters are made from shorter pieces joined together along the run.",
      "Every joint in a sectional gutter is a place where leaks, rust and debris can start. Seamless gutters remove those joints, giving you a cleaner line and fewer problems over time.",
    ],
  },
  comparison: [
    ["Construction", "One continuous length per run", "Short sections joined together"],
    ["Joints along the run", "None", "Every few metres"],
    ["Leak risk", "Far lower", "Joints can leak as sealant ages"],
    ["Appearance", "Clean, uninterrupted line", "Visible joins along the roofline"],
    ["Maintenance", "Low", "Joints need checking and resealing"],
    ["Fit", "Made to measure for your roof", "Cut from standard lengths"],
  ] as const,
  // CLIENT CONTENT: this is the "Advantages" list to fill in from client material.
  // Edit, reorder or add entries here; the page numbers them automatically.
  advantages: [
    {
      title: "Fewer leaks",
      text: "Without joints along the run, there are far fewer places for water to escape and damage walls, fascia boards and foundations.",
    },
    {
      title: "Faster water flow",
      text: "Our wider gutter profiles carry more water, so heavy rain is moved off the roof quickly instead of overflowing.",
    },
    {
      title: "Rust-free stainless steel",
      text: "Stainless steel gutters resist corrosion, so they keep working and looking good for years.",
    },
    {
      title: "A cleaner roofline",
      text: "One continuous line looks sharper than a gutter broken up by joins and brackets.",
    },
    {
      title: "Matched to your home",
      text: "Choose stainless steel or colour-coated steel to match your fascia boards, downpipes, windows and doors.",
    },
    {
      title: "Low maintenance",
      text: "No joints to reseal. Just keep the gutters clear of leaves and debris.",
    },
  ],
  stainless: {
    eyebrow: "Built not to rust",
    title: "Why stainless steel doesn’t rust.",
    paragraphs: [
      "Ordinary steel rusts when iron reacts with water and oxygen. Stainless steel contains chromium, which forms an invisible protective layer on the surface.",
      "That layer stops water and oxygen reaching the steel underneath. If the surface is scratched, the layer re-forms on its own, so the protection keeps working.",
      "The result is a gutter, fascia board or pillar cladding that stays clean and strong without painting or rust treatment.",
    ],
  },
  faqs: [
    [
      "What are seamless gutters?",
      "Seamless gutters are formed in one continuous length to fit each run of your roofline, with no joints along the way.",
    ],
    [
      "Are seamless gutters better than sectional gutters?",
      "For most buildings, yes. No joints along the run means fewer leaks, less maintenance and a cleaner look.",
    ],
    [
      "Why choose stainless steel gutters?",
      "Stainless steel does not rust like ordinary steel, so it lasts longer and needs very little maintenance.",
    ],
    [
      "Can seamless gutters handle heavy rain?",
      "Yes. Our wider gutter profiles move large volumes of water off the roof quickly, which is why they suit large commercial roofs too.",
    ],
    [
      "Can the gutters match my fascia boards?",
      "Yes. Gutters, fascia boards and downpipes can all be supplied in the same stainless steel or colour-coated finish.",
    ],
    [
      "Do seamless gutters need maintenance?",
      "Very little. Keep them clear of leaves and debris. With no joints along the run, there is nothing to reseal.",
    ],
  ] as readonly Faq[],
};

export const commercialPage = {
  metaTitle: "Commercial & Industrial Gutters",
  metaDescription:
    "Wide-opening seamless gutters for factories, warehouses, schools, shopping centres and offices. Move large volumes of water faster and protect large roofs.",
  intro: {
    eyebrow: "Commercial & industrial",
    title: "Big roofs. Better protection.",
    text: "Seamless gutters and aluminium finishes for factories, warehouses, schools, shopping centres and offices.",
  },
  key: {
    eyebrow: "Built for large buildings",
    title: "Wider gutters move more water.",
    text: "Large roofs collect huge volumes of rainwater. Our wider-opening gutters carry that water away faster, so it doesn’t overflow onto walls, entrances and stock.",
    points: [
      "Wider-opening profiles for high-volume rainwater",
      "Seamless runs with no joints to leak",
      "Rust-free stainless steel and colour-coated options",
      "Matched fascia boards, downpipes and shopfronts",
    ],
  },
  sectorsHead: { eyebrow: "Sectors we serve", title: "Made for your building." },
  sectors: [
    {
      title: "Industrial",
      text: "Factories and warehouses with broad roof spans and heavy water run-off.",
    },
    {
      title: "Commercial",
      text: "Offices, shopping centres and retail frontages that need to look sharp.",
    },
    {
      title: "Schools",
      text: "Durable, low-maintenance rooflines for classrooms, halls and sports facilities.",
    },
    {
      title: "Residential estates",
      text: "Consistent, matched finishes across multiple homes and buildings.",
    },
  ],
  benefitsHead: { eyebrow: "Benefits for large buildings", title: "Protection that scales." },
  benefits: [
    {
      title: "Faster drainage",
      text: "Wider gutters clear water from large roofs before it can overflow.",
    },
    {
      title: "Fewer leaks",
      text: "Seamless runs remove the joints where leaks start on long gutter lines.",
    },
    {
      title: "Less maintenance",
      text: "Rust-free stainless steel keeps upkeep and repair costs down.",
    },
    {
      title: "A professional finish",
      text: "Clean, matched rooflines that suit a modern business or school.",
    },
  ],
  galleryHead: { eyebrow: "Project gallery", title: "Built at scale." },
  gallery: [
    "commercial-warehouse-01",
    "commercial-school-01",
    "commercial-office-01",
    "commercial-shopfront-01",
    "commercial-factory-01",
  ],
  cta: {
    title: "Planning a larger project?",
    text: "Tell us about the building and we will help you choose the right gutter profile and finish.",
  },
};

export const projectCategories = [
  "All",
  "Gutters",
  "Fascia",
  "Pillar Cladding",
  "Balustrades",
  "Aluminium Doors & Windows",
  "Garage Doors",
] as const;
export type ProjectCategory = Exclude<(typeof projectCategories)[number], "All">;

// Each item points at a media slot in src/data/images.ts. Swap media there, captions here.
export const projects: {
  slot: string;
  category: ProjectCategory;
  caption: string;
  video?: boolean;
}[] = [
  { slot: "project-01", category: "Gutters", caption: "Charcoal seamless gutters and downpipes" },
  {
    slot: "project-02",
    category: "Gutters",
    caption: "Stainless steel gutters on a modern roofline",
  },
  { slot: "project-03", category: "Gutters", caption: "Wide-profile gutters on a large roof" },
  { slot: "project-04", category: "Gutters", caption: "Bronze gutters with matching downpipes" },
  { slot: "project-05", category: "Fascia", caption: "Bronze fascia boards with matched gutters" },
  { slot: "project-06", category: "Fascia", caption: "Charcoal fascia on a contemporary home" },
  { slot: "project-07", category: "Fascia", caption: "Stainless steel fascia boards" },
  { slot: "project-08", category: "Fascia", caption: "Fascia and gutters in one finish" },
  {
    slot: "project-09",
    category: "Pillar Cladding",
    caption: "Stainless steel pillar cladding at an entrance",
  },
  { slot: "project-10", category: "Pillar Cladding", caption: "Clad patio pillars" },
  {
    slot: "project-11",
    category: "Pillar Cladding",
    caption: "Pillar cladding on a commercial frontage",
  },
  { slot: "project-12", category: "Balustrades", caption: "Glass balustrade on a balcony" },
  { slot: "project-13", category: "Balustrades", caption: "Stainless steel staircase balustrade" },
  { slot: "project-14", category: "Balustrades", caption: "Glass and stainless steel handrail" },
  {
    slot: "project-15",
    category: "Aluminium Doors & Windows",
    caption: "Bronze aluminium folding doors",
  },
  {
    slot: "project-16",
    category: "Aluminium Doors & Windows",
    caption: "Charcoal aluminium windows",
  },
  { slot: "project-17", category: "Aluminium Doors & Windows", caption: "Patio folding doors" },
  { slot: "project-18", category: "Garage Doors", caption: "Automated double garage door" },
  {
    slot: "project-19",
    category: "Garage Doors",
    caption: "Charcoal garage door matched to the roofline",
  },
  { slot: "project-20", category: "Garage Doors", caption: "Single aluminium garage door" },
  {
    slot: "project-video-01",
    category: "Gutters",
    caption: "Seamless gutter installation",
    video: true,
  },
  {
    slot: "project-video-02",
    category: "Aluminium Doors & Windows",
    caption: "Folding doors in action",
    video: true,
  },
  {
    slot: "project-video-03",
    category: "Balustrades",
    caption: "Glass balustrade walkthrough",
    video: true,
  },
];

export const projectsPage = {
  metaTitle: "Projects: Gutters, Fascia, Balustrades & Aluminium",
  metaDescription:
    "Browse seamless gutters, fascia boards, pillar cladding, glass balustrades, aluminium folding doors and garage doors.",
  intro: {
    eyebrow: "Projects",
    title: "The details tell the story.",
    text: "Gutters, fascia, balustrades, aluminium doors and more. Filter by product to see the finish.",
  },
  head: { eyebrow: "Gallery", title: "Explore by product." },
};

export const aboutPage = {
  metaDescription:
    "Elite Gutters and Aluminium Products: quality finishes, lasting results and honest service on gutters, fascia boards, balustrades and aluminium.",
  intro: {
    eyebrow: "About us",
    title: "Pride in every line.",
    text: "Good work shows in the details: the fit, the finish and the feeling that everything belongs.",
  },
  story: {
    eyebrow: "Our story",
    title: "Quality finishes last longer.",
    // CLIENT CONTENT: replace with the company's own story.
    paragraphs: [
      "Elite Gutters and Aluminium Products supplies and installs seamless gutters, fascia boards, pillar cladding, balustrades, aluminium doors and windows, and garage doors.",
      "We work on homes, schools, commercial buildings and industrial sites. On every job, our focus is the same: materials that last, finishes that match and installation done properly.",
    ],
  },
  values: [
    {
      title: "Quality finishes",
      text: "Stainless steel, colour-coated steel and aluminium chosen to look good and last.",
    },
    { title: "Lasting results", text: "Work that protects your building long after we leave." },
    { title: "Honest service", text: "Clear quotes, straight answers and no surprises." },
  ],
  process: [
    { title: "Consultation", text: "Tell us about your building and what you want to achieve." },
    { title: "Measure & Quote", text: "We measure up and send a clear, itemised quote." },
    { title: "Fabrication", text: "Gutters and finishes are made to your exact measurements." },
    { title: "Installation", text: "Our team installs neatly and leaves the site clean." },
    { title: "Aftercare", text: "Questions after the job? We are a call or WhatsApp away." },
  ],
};

export const contactPage = {
  metaTitle: "Contact Us & Get a Free Quote",
  metaDescription:
    "Get a free quote for seamless gutters, fascia boards, balustrades, aluminium doors and garage doors. Call or WhatsApp +27 84 258 6400.",
  intro: {
    eyebrow: "Contact",
    title: "Get a free quote.",
    text: "Tell us about your project. We will come back to you with advice and a price.",
  },
  aside: {
    eyebrow: "Get in touch",
    title: "Let’s talk.",
    text: "Call, WhatsApp or email us, or fill in the form and it will open in WhatsApp, ready to send.",
  },
  propertyTypes: ["Residential", "Commercial", "Industrial", "School"],
  formNote:
    "Submitting opens WhatsApp with your details filled in. If you added a photo, attach it in the chat before sending.",
};

export const notFoundPage = {
  title: "Page not found",
  text: "The page you are looking for has moved or doesn’t exist. Try one of our services instead.",
};
