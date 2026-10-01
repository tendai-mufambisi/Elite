// All site copy and business details live here so client updates stay in one place.
// South African English throughout (colour, aluminium). No invented statistics, reviews,
// years in business, service areas or guarantees.

const whatsappNumber = "27842586400";
const quoteText = "Hi Elite Gutters, I'd like a quote.";

export const site = {
  name: "Elite Gutters and Aluminium Products",
  shortName: "Elite Gutters",
  // Wordmark next to the logo icon (set in the brand font, Macondo).
  logo: { name: "Elite Gutters", sub: "and Aluminium Products" },
  tagline: "Build | Protect | Enhance",
  secondary: "Quality Finishes Last Longer",
  description:
    "Seamless gutter specialists: stainless steel and colour-coated seamless gutters and downpipes, formed on site for homes, schools, commercial and industrial buildings in South Africa. Also industrial box gutters, rainwater harvesting, gutter repairs and cleaning, fascia boards and bargeboards, pillar cladding, balustrades, aluminium doors and garage doors.",
  footerBlurb:
    "Seamless gutter specialists. Stainless steel and colour-coated seamless gutters, plus fascia boards and aluminium finishes to match. Built to protect.",
  phone: "+27 84 258 6400",
  phoneHref: "tel:+27842586400",
  whatsappNumber,
  email: "info@eliteguttersandaluminium.co.za",
  facebook: "https://www.facebook.com/share/19c7jqKWq7/",
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteText)}`,
  quoteText,
  domain: "https://eliteguttersandaluminium.co.za",
  // Website credit strip at the very bottom of every page.
  credit: {
    name: "Digits Digital",
    phone: "0776611049",
    phoneHref: "tel:+263776611049",
    website: "www.digitsdigital.co.zw",
    websiteHref: "https://www.digitsdigital.co.zw",
  },
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: "Seamless Gutters", to: "/services/seamless-gutters" },
  { label: "Why Seamless", to: "/why-seamless-gutters" },
  { label: "Commercial & Industrial", to: "/commercial-industrial" },
  { label: "Colour Range", to: "/colour-range" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

type Faq = readonly [question: string, answer: string];

// Seamless gutter project videos, shown as reels on the home page and the seamless gutters page.
export const gutterReels = [
  { slot: "video-commercial-building", label: "Commercial building gutters" },
  { slot: "video-gutters-double-storey", label: "Double-storey seamless gutters" },
  { slot: "video-gutters-single-storey", label: "Charcoal gutters, fitted on site" },
  { slot: "video-gutters-pillars", label: "Charcoal seamless gutters & downpipes" },
  { slot: "video-gutters-fence", label: "Gutters & downpipes, finished home" },
  { slot: "project-video-charcoal", label: "Charcoal seamless gutters & fascia" },
];

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
    // The colour sample board leads, so visitors see the colour choice straight away.
    image: "colour-range-chart",
    banner: "colour-range-chart",
    gallery: [
      "colour-range-chart",
      "charcoal-seamless-gutters-double-storey",
      "seamless-gutter-installation-on-site",
      "charcoal-gutters-downpipes-pillars",
      "gutters-downpipes-home-with-fence",
      "commercial-building-gutters-downpipes",
      "gutters-charcoal-fascia-double-storey",
    ],
    reels: gutterReels,
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
    slug: "box-gutters",
    title: "Industrial Box Gutters",
    metaTitle: "Industrial & Commercial Box Gutters",
    short: "Built for big roofs and heavy rain.",
    intro:
      "Heavy-duty box gutters for factories, warehouses and commercial buildings. Wide, deep profiles carry large volumes of rainwater off big roof areas and into downpipes sized to match, so water leaves the roof instead of backing up.",
    benefits: [
      "Wide, deep profiles for large roof areas",
      "Made to handle heavy downpours",
      "Downpipes and outlets sized to match",
      "Suited to factories, warehouses and commercial buildings",
    ],
    finishes: [],
    image: undefined,
    drawing: "box-gutter",
    gallery: [],
    faqs: [
      [
        "What is a box gutter?",
        "A box gutter is a wide, square-sided gutter, often set between two roof slopes or behind a parapet wall. Its size lets it carry the large volumes of water that run off industrial and commercial roofs.",
      ],
      [
        "Which buildings need box gutters?",
        "Factories, warehouses, workshops, schools and other commercial buildings with large roof areas, where ordinary domestic gutters would overflow.",
      ],
      [
        "Can you replace an old, leaking box gutter?",
        "Yes. Send us photos of the roof and the existing gutter via WhatsApp and we will advise on a replacement.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "fascia-boards",
    title: "Fascia Boards & Bargeboards",
    metaTitle: "Stainless Steel & Colour-Coated Fascia Boards & Bargeboards",
    short: "The finish that frames it all.",
    intro:
      "Stainless steel, bronze and charcoal fascia boards and bargeboards give your roofline a crisp architectural edge while protecting the roof timber behind them. They also give your gutters a solid base, and are rust-free, low maintenance and made to match your gutters for one clean, continuous look.",
    benefits: [
      "Installation and replacement of fascias and bargeboards",
      "Rust-free stainless steel and colour-coated options",
      "Protects roof timbers from the weather",
      "A solid base for your gutters",
      "Made to match your gutters and downpipes",
      "No painting or regular upkeep needed",
    ],
    finishes: ["Stainless steel", "Bronze", "Charcoal", "Colour-coated steel"],
    image: "pillar-stainless-fascia-two-garage-doors",
    gallery: [
      "pillar-stainless-fascia-two-garage-doors",
      "pillar-yellow-house-garage-doors",
      "fascia-bronze-double-storey",
      "balustrade-stainless-balconies",
      "gutters-charcoal-fascia-double-storey",
    ],
    // Finish names shown on each photo as the home page card slides through them.
    photoLabels: {
      "pillar-stainless-fascia-two-garage-doors": "Stainless steel fascia boards",
      "pillar-yellow-house-garage-doors": "Stainless steel fascia boards",
      "fascia-bronze-double-storey": "Bronze fascia boards",
      "balustrade-stainless-balconies": "Bronze fascia boards",
      "gutters-charcoal-fascia-double-storey": "Charcoal fascia boards",
    },
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
        "What is the difference between a fascia and a bargeboard?",
        "A fascia board runs along the bottom edge of the roof, where the gutters are fixed. A bargeboard finishes the sloping edge of a gable end. We fit both in matching finishes.",
      ],
      [
        "Can you replace old timber fascia boards?",
        "Yes. Send us photos of your existing roofline and we will advise on the best replacement.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "water-harvesting",
    title: "Water Harvesting Systems",
    metaTitle: "Rainwater Harvesting Gutters & Downpipes",
    short: "Catch the rain. Use it later.",
    intro:
      "We set up the downpipes and connections that carry rainwater from your gutters into rainwater harvesting tanks. It is an eco-friendly way to save water and reduce your utility bills.",
    benefits: [
      "Downpipes routed to your rainwater tanks",
      "Connections for new or existing tanks",
      "Less reliance on municipal water",
      "Lower water bills",
      "Pairs well with new seamless gutters",
    ],
    finishes: [],
    image: undefined,
    drawing: "water-tank",
    gallery: [],
    faqs: [
      [
        "Can you connect my existing tank?",
        "Yes. Send us photos of the tank and your roofline via WhatsApp and we will advise on the best way to route the downpipes.",
      ],
      [
        "Do I need new gutters for rainwater harvesting?",
        "Not always. If your gutters are in good condition we can connect to them. If they leak or overflow, new seamless gutters will catch more of the rain.",
      ],
      [
        "What can harvested rainwater be used for?",
        "Watering the garden, washing cars and paving, and topping up the pool are common uses.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "gutter-repairs",
    title: "Repairs & Maintenance",
    metaTitle: "Gutter Repairs & Maintenance",
    short: "Fix the leak before it spreads.",
    intro:
      "Repair services for existing gutters. We fix leaks, re-align sagging gutters and replace damaged sections so your gutters work properly again and send water to the downpipes, not down your walls.",
    benefits: [
      "Leaking joints and sections sealed",
      "Sagging gutters re-aligned and re-supported",
      "Damaged sections and downpipes replaced",
      "Water carried away from walls and foundations",
    ],
    finishes: [],
    image: undefined,
    drawing: "repair",
    gallery: [],
    faqs: [
      [
        "Why are my gutters sagging?",
        "Sagging usually comes from loose or missing brackets, or from the weight of water and debris sitting in a blocked gutter. Re-aligning and re-supporting the run lets water flow to the downpipes again.",
      ],
      [
        "Can you repair gutters you did not install?",
        "Yes. Send us photos of the problem via WhatsApp and we will advise whether a repair or a replacement makes more sense.",
      ],
      [
        "When is replacement better than repair?",
        "If an old sectional gutter leaks at many joints, replacing it with a seamless gutter is often the better long-term option.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    metaTitle: "Gutter Cleaning & Blockage Removal",
    short: "Clear gutters. Free-flowing water.",
    intro:
      "Professional gutter cleaning to remove leaves, debris and blockages. Regular cleaning prevents water damage and extends the life of your gutters.",
    benefits: [
      "Leaves, debris and blockages removed",
      "Downpipes cleared so water can drain",
      "Helps prevent overflow and water damage",
      "Extends the life of your gutters",
    ],
    finishes: [],
    image: undefined,
    drawing: "cleaning",
    gallery: [],
    faqs: [
      [
        "How often should gutters be cleaned?",
        "Most homes benefit from a clean at least once a year, and more often if trees overhang the roof. Just before the rainy season is a good time.",
      ],
      [
        "What happens if gutters are not cleaned?",
        "Blocked gutters overflow, which can damage fascia boards, walls and foundations. The extra weight of wet debris can also make gutters sag.",
      ],
      [
        "Do seamless gutters need less cleaning?",
        "Yes. With no joints along the run, debris has fewer places to catch, but they still need an occasional clean.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "waterproofing",
    title: "Torch-on Waterproofing",
    metaTitle: "Torch-on Waterproofing & Rubberiser",
    short: "Keep the rain on the outside.",
    intro:
      "Torch-on waterproofing and rubberiser for flat roofs, parapet walls, balconies and box gutters. A leaking roof rarely stays a small problem: water soaks into ceilings, stains walls, rots roof timbers and brings damp and mould into the home. We seal the surface so rainwater runs off instead of finding its way inside.",
    benefits: [
      "Torch-on membrane for flat concrete roofs and parapets",
      "Rubberiser coating for edges, joints and awkward details",
      "Balconies, box gutters and roof leaks",
      "Surfaces cleaned and prepared before sealing",
      "Stops damp, stains and mould before they spread",
    ],
    finishes: [],
    image: "waterproofing-flat-roof-parapet",
    banner: "waterproofing-banner",
    gallery: [
      "waterproofing-flat-roof-parapet",
      "waterproofing-flat-roof-finished",
      "waterproofing-roof-edges",
      "waterproofing-team-on-roof",
      "waterproofing-membrane-rolls",
    ],
    photoLabels: {
      "waterproofing-flat-roof-parapet": "Torch-on waterproofing, flat roof",
      "waterproofing-flat-roof-finished": "Torch-on waterproofing, flat roof",
      "waterproofing-roof-edges": "Parapets and edges sealed",
      "waterproofing-team-on-roof": "Our team on site",
      "waterproofing-membrane-rolls": "Torch-on membrane rolls",
    },
    methods: {
      eyebrow: "How we waterproof",
      title: "The right seal for each surface.",
      items: [
        {
          title: "Torch-on membrane",
          text: "Rolls of bitumen membrane are heated with a gas torch so they melt onto the roof and bond firmly. Each roll overlaps the last, leaving one continuous waterproof layer.",
        },
        {
          title: "Rubberiser",
          text: "A liquid rubber coating brushed or rolled on in layers. It stays flexible as the roof heats and cools, which makes it ideal for joints, edges and around fittings.",
        },
        {
          title: "Preparation first",
          text: "The surface is cleaned, loose material removed and cracks filled before anything goes down, so the waterproofing bonds to a sound base.",
        },
        {
          title: "Details sealed",
          text: "Parapet walls, upstands, outlets and corners are where leaks usually start. We take the waterproofing up and around them so water has nowhere to get in.",
        },
      ],
    },
    reelsHead: {
      eyebrow: "Project videos",
      title: "Waterproofing on site.",
      text: "Filmed by our team on real jobs.",
    },
    reels: [
      { slot: "video-waterproofing-flat-roof", label: "Torch-on waterproofing, flat roof" },
      { slot: "video-waterproofing-membrane", label: "Torch-on membrane delivered to site" },
    ],
    faqs: [
      [
        "What is torch-on waterproofing?",
        "Torch-on is a bitumen membrane supplied in rolls. It is heated with a gas torch as it is laid, so it melts onto the roof surface and bonds in place. The overlapping rolls form one continuous waterproof layer.",
      ],
      [
        "What is rubberiser?",
        "Rubberiser is a liquid rubber waterproofing coating applied by brush or roller. It stays flexible, so it suits joints, edges, small roofs and areas where a membrane is hard to fit.",
      ],
      [
        "Which surfaces can you waterproof?",
        "Flat concrete roofs, parapet walls, balconies, box gutters and other areas where water sits or runs.",
      ],
      [
        "My roof is leaking. Can you help?",
        "Yes. Send us photos of the roof and the damp patches inside via WhatsApp and we will advise on the best way to seal it.",
      ],
    ] as readonly Faq[],
  },
  {
    slug: "roof-wall-painting",
    title: "Roof & Wall Painting",
    metaTitle: "Roof Painting & Wall Painting",
    short: "A fresh finish from the top down.",
    intro:
      "Roof painting and wall painting that make a tired building look new again. We paint tiled roofs, metal sheet roofs and exterior walls, preparing each surface first so the paint holds. Choose a colour to match your gutters, fascia boards and window frames for one finished look.",
    benefits: [
      "Tiled roofs and metal sheet roofs",
      "Exterior wall painting",
      "Surfaces cleaned and prepared before painting",
      "Colours to match your gutters, fascia and frames",
      "Protects roofs and walls from sun and weather",
    ],
    finishes: [],
    image: "roof-painting-tile-roof",
    banner: "roof-painting-banner",
    gallery: [
      "roof-painting-tile-roof",
      "roof-painting-tiles-close-up",
      "roof-painting-ridge",
      "roof-painting-metal-sheet",
      "roof-painting-metal-roof-house",
    ],
    photoLabels: {
      "roof-painting-tile-roof": "Painted tiled roof",
      "roof-painting-tiles-close-up": "Painted roof tiles",
      "roof-painting-ridge": "Painted tiled roof",
      "roof-painting-metal-sheet": "Painted metal sheet roof",
      "roof-painting-metal-roof-house": "Painted metal sheet roof",
    },
    methods: {
      eyebrow: "What we paint",
      title: "Roofs and walls, done properly.",
      items: [
        {
          title: "Tiled roofs",
          text: "Faded and weathered concrete tiles are cleaned and repainted, ridges included, giving the whole roof an even, fresh colour.",
        },
        {
          title: "Metal sheet roofs",
          text: "Corrugated and IBR sheet roofs are prepared and painted to protect the metal and refresh the colour.",
        },
        {
          title: "Exterior walls",
          text: "Walls, boundary walls and parapets painted in a clean finish that lifts the whole property.",
        },
        {
          title: "Preparation first",
          text: "Dirt, moss and flaking paint are removed and the surface is made ready before painting, so the new coat bonds and lasts.",
        },
      ],
    },
    video: "video-roof-painting",
    faqs: [
      [
        "Which roofs can you paint?",
        "Concrete tiled roofs and metal sheet roofs, such as corrugated and IBR.",
      ],
      ["Do you paint walls as well?", "Yes. We paint exterior walls, boundary walls and parapets."],
      [
        "Can the roof colour match my gutters?",
        "Yes. Choose a roof colour that works with your gutters, fascia boards and window frames for a finished, matching look.",
      ],
      [
        "How do I get a quote?",
        "Send us photos of the roof or walls via WhatsApp and we will get back to you with a quote.",
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
    image: "pillar-stainless-veranda",
    banner: "pillar-stainless-fascia-two-garage-doors",
    video: "video-pillar-cladding-garage-doors",
    gallery: [
      "pillar-stainless-veranda",
      "balustrade-stainless-pillar-covering",
      "pillar-stainless-fascia-two-garage-doors",
      "pillar-yellow-house-garage-doors",
    ],
    photoLabels: {
      "pillar-stainless-veranda": "Stainless steel pillar cladding",
      "balustrade-stainless-pillar-covering": "Stainless steel pillar covering",
      "pillar-stainless-fascia-two-garage-doors": "Stainless steel pillar cladding",
      "pillar-yellow-house-garage-doors": "Stainless steel pillar cladding",
    },
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
    image: "balustrade-glass-staircase",
    banner: "balustrade-tinted-glass-commercial",
    gallery: [
      "balustrade-stainless-pillar-covering",
      "balustrade-glass-staircase",
      "balustrade-tinted-glass-commercial",
    ],
    photoLabels: {
      "balustrade-glass-staircase": "Frameless glass balustrade",
      "balustrade-stainless-pillar-covering": "Stainless steel balustrades",
      "balustrade-tinted-glass-commercial": "Tinted glass balustrades",
    },
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
    image: "aluminium-windows-glass-balustrades",
    gallery: [
      "aluminium-windows-glass-balustrades",
      "aluminium-commercial-complex",
      "aluminium-new-build",
    ],
    photoLabels: {
      "aluminium-windows-glass-balustrades": "Aluminium windows",
      "aluminium-commercial-complex": "Aluminium windows, office complex",
      "aluminium-new-build": "Aluminium windows and doors",
    },
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
    image: "garage-three-charcoal-glass",
    gallery: [
      "garage-three-charcoal-glass",
      "garage-arched-glass-gate",
      "pillar-stainless-fascia-two-garage-doors",
      "pillar-yellow-house-garage-doors",
    ],
    photoLabels: {
      "garage-three-charcoal-glass": "Charcoal aluminium garage doors",
      "garage-arched-glass-gate": "Arched glass garage doors",
      "pillar-stainless-fascia-two-garage-doors": "Aluminium garage doors",
      "pillar-yellow-house-garage-doors": "Aluminium garage doors",
    },
    video: "garage-doors-video",
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
    metaTitle: "Retractable, Glass & Aluminium Burglar Proofing",
    short: "Security without compromise.",
    intro:
      "Retractable, glass and aluminium burglar proofing that keeps your home secure without spoiling the view. Retractable burglar proofing folds away to the side when you want the opening clear, and closes across windows and doors when you need it. Finished to suit your frames.",
    benefits: [
      "Retractable burglar proofing that folds away to the side",
      "Security with a modern look",
      "Glass and aluminium options",
      "Keeps natural light and views",
      "Finished to match your window frames",
    ],
    finishes: ["Clear glass", "Aluminium", "Charcoal", "Bronze"],
    image: "burglar-proofing-folding-doors",
    drawing: "window-guard",
    gallery: ["burglar-proofing-folding-doors", "burglar-proofing-windows", "burglar-proofing-bronze-windows"],
    photoLabels: {
      "burglar-proofing-folding-doors": "Retractable burglar proofing",
      "burglar-proofing-windows": "Retractable burglar proofing",
      "burglar-proofing-bronze-windows": "Retractable burglar proofing",
    },
    faqs: [
      [
        "What materials do you use?",
        "We offer retractable, glass and aluminium burglar proofing, designed to be secure and good-looking.",
      ],
      [
        "Do you do retractable burglar proofing?",
        "Yes. Retractable burglar proofing closes across windows, doors and wide openings, and folds away to the side when you want it open.",
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

// Shown on /services/seamless-gutters (#gutter-profiles). Sizes in millimetres, from the
// client's ogee profile sheet: overall width, bottom width, back height and front height.
export const gutterProfiles = {
  eyebrow: "Gutter profiles",
  title: "Domestic & Industrial Gutter Profiles",
  profiles: [
    {
      kind: "domestic",
      label: "Domestic",
      for: "Homes",
      size: { width: 125, bottom: 85, back: 80, front: 85 },
      downpipe: "75mm x 50mm (2″ x 3″)",
      points: [
        "Standard domestic profile, sized for residential roofs",
        "Ideal for: houses, townhouses, residential estates",
        "Matching downpipes in the same finish",
      ],
    },
    {
      kind: "industrial",
      label: "Industrial",
      for: "Commercial, Schools, Factories",
      size: { width: 155, bottom: 100, back: 100, front: 125 },
      downpipe: "100mm x 75mm (3″ x 4″)",
      points: [
        "Wider industrial profile for large roof areas",
        "Wider opening moves more water, faster - reduces overflow in heavy storms",
        "Larger downpipes to match the higher water volume",
        "Ideal for: schools, warehouses, factories, shopping centres, offices",
      ],
    },
  ],
  note: "Not sure which profile you need? We'll assess your roof and recommend the right size.",
  whatsappText: "Hi Elite Gutters, I'd like advice on which gutter profile I need.",
} as const;

export const home = {
  metaTitle: "Seamless Gutters in South Africa | Stainless Steel & Colour-Coated",
  metaDescription:
    "Seamless gutter specialists. Stainless steel and colour-coated seamless gutters and downpipes, formed on site to fit your roof: no joints, fewer leaks, faster water flow. Free quotes.",
  h1: "Seamless Gutters in South Africa",
  sub: "Stainless steel and colour-coated seamless gutters and downpipes, formed on site to fit your roof. No joints, far fewer leaks and faster water flow in heavy rain.",
  heroNote: "Also fascia boards, pillar cladding, balustrades, aluminium doors and garage doors.",
  trustLabel: "Seamless gutters for every building",
  trust: ["Residential", "Commercial", "Industrial", "Schools"],
  // Muted looping video behind the hero; its poster is the LCP image.
  heroVideo: "hero-video",
  rotatorLead: "Seamless gutters with",
  rotator: [
    "no joints",
    "fewer leaks",
    "faster water flow",
    "rust-free stainless steel",
    "colours to match your home",
    "matching downpipes",
  ],
  spotlight: {
    eyebrow: "Our speciality",
    title: "Seamless gutters, formed on site.",
    text: "Seamless gutters are what we do best. Each run is formed in one continuous length to fit your roofline, so there are no joints to leak, sag or rust.",
    points: [
      "One continuous length per run: no joints, far fewer leaks",
      "Wider profiles move water off the roof faster in heavy storms",
      "Rust-free stainless steel or colour-coated steel",
      "Downpipes and fascia boards finished to match",
    ],
    slot: "gutter-downpipe-example",
  },
  // Bullet summary on the home page, linking to /benefits-of-seamless-gutters.
  benefitBullets: {
    eyebrow: "Benefits of seamless gutters",
    title: "Why seamless beats sectional.",
    bullets: [
      "Fewer leaks: no joints along the run",
      "Low maintenance and less clogging",
      "Faster water flow in heavy storms",
      "Custom fit, formed on site",
      "Protects walls and foundations from water damage",
      "Durable, with a longer lifespan",
      "Clean, continuous roofline",
      "Colours to match your home",
    ],
    link: "Read all the benefits",
  },
  reelsHead: {
    eyebrow: "Seamless gutters in motion",
    title: "Watch our gutters.",
    text: "Real seamless gutter installations filmed on site. Tap a video to watch it with sound controls.",
  },
  reels: gutterReels,
  profilesTeaser: true,
  colourTeaser: {
    eyebrow: "Gutter colours",
    title: "Seamless gutters in your colour.",
    text: "Colour-coated seamless gutters and downpipes in a wide range of colours, from charcoal and black to cream, brick red and forest green. Or choose rust-free stainless steel.",
  },
  benefitsHead: {
    eyebrow: "Why our seamless gutters",
    title: "Built to last. Made to match.",
    text: "Every gutter we install is formed to fit, finished to match and built to keep water away from your walls and foundations.",
  },
  matched: {
    eyebrow: "Our signature",
    title: "Gutters that match.",
    text: "We match your seamless gutters and downpipes to your fascia boards, windows and doors, so your building looks designed, not assembled.",
    examples: [
      "Bronze downpipes + bronze fascia + bronze aluminium windows",
      "Charcoal gutters + charcoal fascia + charcoal folding doors",
      "Stainless steel gutters + stainless steel fascia + stainless pillar cladding",
    ],
    slots: [
      // Shown uncropped across the top, as the client asked.
      {
        slot: "matched-bronze-01",
        label: "Bronze fascia boards and downpipes, galvanised gutters",
        full: true,
      },
      { slot: "matched-charcoal-01", label: "Charcoal" },
      {
        slot: "matched-stainless-01",
        label: "Stainless steel fascia boards and downpipes, galvanised gutters",
      },
    ],
  },
  servicesHead: {
    eyebrow: "More than gutters",
    title: "Everything else your roofline needs.",
    text: "Seamless gutters come first. We also install box gutters and rainwater harvesting systems, repair and clean existing gutters, and supply the products that complete the look.",
  },
  // Waterproofing and roof painting get their own home page section, linking to their pages.
  roofCare: {
    head: {
      eyebrow: "Roof protection",
      title: "Waterproofing and roof painting.",
      text: "Leaking flat roof or faded roof tiles? We seal roofs with torch-on waterproofing and rubberiser, and repaint tiled roofs, metal sheet roofs and walls.",
    },
    items: [
      {
        slug: "waterproofing",
        video: "video-waterproofing-flat-roof",
        label: "Torch-on waterproofing",
        points: [
          "Torch-on membrane for flat roofs",
          "Rubberiser for edges and joints",
          "Parapets, balconies and box gutters",
        ],
      },
      {
        slug: "roof-wall-painting",
        video: "video-roof-painting",
        label: "Roof & wall painting",
        points: ["Tiled roofs", "Metal sheet roofs", "Exterior walls"],
      },
    ],
  },
  mosaicHead: {
    eyebrow: "Recent projects",
    title: "Real homes. Real finishes.",
    text: "Gutters, fascia and downpipes first, plus the balustrades, folding doors and garage doors we fit alongside them.",
  },
  // Order matters: slot 1 is the large tile, 2 and 3 are tall, 4 is wide,
  // 5 and 6 are small. Match each photo's shape to its slot.
  mosaic: [
    "commercial-building-gutters-downpipes",
    "seamless-gutter-installation-on-site",
    "colour-range-chart",
    "garage-three-charcoal-glass",
    "gutters-charcoal-fascia-double-storey",
    "charcoal-seamless-gutters-double-storey",
  ],
  // Full-width photo bands that scroll slower than the page (parallax).
  bands: [
    {
      slot: "colour-range-chart",
      eyebrow: "Seamless gutters",
      title: "No joints. No leaks. Any colour.",
    },
    {
      slot: "fascia-bronze-double-storey",
      eyebrow: "Build | Protect | Enhance",
      title: "Quality gutters last longer.",
    },
  ],
  cta: {
    title: "Ready for seamless gutters?",
    text: "Send us your details and a few photos of your roofline. We will come back to you with a free quote.",
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
    text: "Gutters and downpipes to match your fascia, doors and windows.",
  },
  { icon: "palette", title: "Wide colour range", text: "Colour-coated gutters to suit any home." },
  { icon: "sparkles", title: "Low maintenance", text: "Built to stay looking new." },
  { icon: "wrench", title: "Formed on site", text: "Measured and made to fit your roofline." },
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
    ["Joints along the run", "None", "Along the whole run"],
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

// /benefits-of-seamless-gutters. Written for South Africa: no invented statistics,
// lifespans in years, measurements or products we don't supply.
export const benefitsPage = {
  metaTitle: "Benefits of Seamless Gutters: Fewer Leaks, Low Maintenance, Custom Fit",
  metaDescription:
    "The benefits of seamless gutters: fewer leaks, less maintenance, a custom fit, faster water flow and a cleaner roofline. How they compare with sectional gutters, and how to look after them.",
  intro: {
    eyebrow: "Benefits of seamless gutters",
    title: "Fewer leaks. Less maintenance. A custom fit.",
    text: "Why seamless gutters are the smarter choice for South African homes, schools and commercial buildings.",
  },
  what: {
    eyebrow: "What are seamless gutters?",
    title: "One continuous length, made to fit.",
    paragraphs: [
      "Seamless gutters are rain gutters made from one continuous length of material, cut to fit your building so there are no joints along the gutter run.",
      "Sectional gutters are put together from shorter pieces joined every few lengths. Seamless gutters are formed on site with a gutter-forming machine, which gives a smooth, even finish and better performance.",
      "Removing the joins removes the weak points where leaks, blockages and rust usually start. That's why seamless gutters are the choice for people who want durability, low maintenance and lasting protection against water damage.",
    ],
  },
  benefitsHead: { eyebrow: "The benefits", title: "Why choose seamless gutters." },
  benefits: [
    {
      title: "Fewer leaks",
      text: "Joints are where gutters leak: sealant ages, debris collects and metal expands and contracts. A seamless gutter has no joints along the run, so there are far fewer places for water to escape and heavy rain is carried away from your foundations.",
    },
    {
      title: "Fewer joints, fewer weak points",
      text: "With no joins along the run, there is nothing to reseal, nothing to separate and far less chance of sagging or rust starting at a connection.",
    },
    {
      title: "Low maintenance",
      text: "Leaves, twigs and dirt tend to catch at the joins in sectional gutters. A continuous run gives debris fewer places to settle, so there is less cleaning and less chance of overflow or sagging sections.",
    },
    {
      title: "Reduced clogging",
      text: "Water moves along a smooth, uninterrupted channel and flushes smaller particles through to the downpipes, so blockages and standing water are less likely.",
    },
    {
      title: "Better water flow",
      text: "Joins create turbulence that slows water down. Without them, rainwater runs straight to the downpipes, which matters most in a summer thunderstorm. Our wider profiles move even more water on large roofs.",
    },
    {
      title: "Protection from water damage",
      text: "By carrying rainwater away from the building, seamless gutters help protect foundations, walls, paving, gardens, window frames and doors from damp, staining, erosion and rot.",
    },
    {
      title: "Custom fit",
      text: "We measure your roofline and form each gutter on site to its exact length. The result is a precise fit, correct fall towards the downpipes and a gutter that sits neatly against the fascia.",
    },
    {
      title: "Durable",
      text: "Fewer weak points mean fewer cracks, leaks and rust spots. Seamless gutters stand up better to heavy rain, hail and strong wind.",
    },
    {
      title: "Longer lifespan",
      text: "With less debris, less standing water and no joints to fail, a seamless gutter simply has less to go wrong. Choose stainless steel and there is no rust to worry about either.",
    },
    {
      title: "Cost-effective over time",
      text: "Seamless gutters can cost a little more to install than sectional systems, but fewer repairs, less maintenance and a longer life make them the better long-term investment.",
    },
    {
      title: "Curb appeal",
      text: "A smooth, continuous line along the roofline, with no visible joins or bulky connectors, gives the whole building a cleaner, more finished look.",
    },
    {
      title: "Colours to match your home",
      text: "Choose rust-free stainless steel or colour-coated steel in a wide range of colours, and match your gutters to your fascia boards, downpipes, windows and doors.",
    },
    {
      title: "Adds to property value",
      text: "Buyers notice a neat roofline and good drainage. Seamless gutters signal quality and fewer future maintenance worries, which helps a property stand out.",
    },
  ],
  maintenance: {
    eyebrow: "Looking after your gutters",
    title: "How to maintain seamless gutters.",
    points: [
      "Clear leaves and debris at least once or twice a year, and before the rainy season. Homes under trees may need it more often.",
      "Check that downpipes run freely and discharge water well away from the foundations.",
      "Look along the run for sagging, loose brackets or overflow marks after a big storm.",
      "Pay attention to corners and outlets: these are the only places a seamless gutter has joins.",
      "Call us if you spot a problem. It is easier to fix early.",
    ],
  },
  install: {
    eyebrow: "How we install",
    title: "Measured, formed and fitted on site.",
    steps: [
      { title: "Measure", text: "We measure every run of your roofline." },
      {
        title: "Form on site",
        text: "Each gutter is formed in one continuous length with a gutter-forming machine.",
      },
      {
        title: "Fit",
        text: "Brackets go onto the fascia and the gutter is set with the right fall to the outlets.",
      },
      { title: "Downpipes", text: "Matching downpipes carry the water away from the building." },
    ],
  },
  faqs: [
    [
      "Are seamless gutters worth it?",
      "For most buildings, yes. They leak less, need less maintenance, last longer and look cleaner than sectional gutters, which saves on repairs over time.",
    ],
    [
      "Do seamless gutters have any seams?",
      "There are no seams along the main run. There are joins at corners and where the gutter meets the downpipe outlets.",
    ],
    [
      "Do seamless gutters need cleaning?",
      "Yes, but less often than sectional gutters, because there are no joints along the run for debris to catch on.",
    ],
    [
      "Do seamless gutters come in different colours?",
      "Yes. Choose stainless steel or colour-coated steel in a wide range of colours to match your home.",
    ],
    [
      "What is the difference between seamless and sectional gutters?",
      "Seamless gutters are formed in one continuous length to fit your roof. Sectional (regular) gutters come in pre-cut lengths joined together, and each join is a potential leak point.",
    ],
    [
      "How long do seamless gutters last?",
      "Properly installed and kept clear, seamless gutters last many years longer than sectional gutters. Stainless steel does not rust, and colour-coated steel is finished to stand up to the weather.",
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
  callout: {
    title: "Built for big roofs",
    text: "Our wider industrial gutters carry far more water than standard domestic gutters, keeping schools, warehouses and factories dry in heavy rain.",
    link: "Compare gutter profiles",
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
  gallery: ["aluminium-commercial-complex", "balustrade-tinted-glass-commercial"],
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
  "Burglar Proofing",
  "Waterproofing",
  "Roof & Wall Painting",
] as const;
export type ProjectCategory = Exclude<(typeof projectCategories)[number], "All">;

// Each item points at a media slot in src/data/images.ts. Swap media there, captions here.
export const projects: {
  slot: string;
  category: ProjectCategory;
  caption: string;
  video?: boolean;
}[] = [
  // Gutters
  {
    slot: "video-gutters-double-storey",
    category: "Gutters",
    caption: "Seamless gutters on a double-storey home",
    video: true,
  },
  {
    slot: "charcoal-seamless-gutters-double-storey",
    category: "Gutters",
    caption: "Charcoal seamless gutters, double-storey",
  },
  {
    slot: "video-gutters-single-storey",
    category: "Gutters",
    caption: "Charcoal seamless gutters fitted on site",
    video: true,
  },
  {
    slot: "seamless-gutter-installation-on-site",
    category: "Gutters",
    caption: "Fitting a seamless gutter on site",
  },
  {
    slot: "video-gutters-pillars",
    category: "Gutters",
    caption: "Charcoal seamless gutters and downpipes, finished home",
    video: true,
  },
  {
    slot: "charcoal-gutters-downpipes-pillars",
    category: "Gutters",
    caption: "Charcoal seamless gutter and downpipe beside charcoal pillars",
  },
  {
    slot: "video-commercial-building",
    category: "Gutters",
    caption: "Gutters and downpipes on a commercial building",
    video: true,
  },
  {
    slot: "commercial-building-gutters-downpipes",
    category: "Gutters",
    caption: "Commercial building gutters and downpipes",
  },
  {
    slot: "video-gutters-fence",
    category: "Gutters",
    caption: "Gutters and downpipes on a finished home",
    video: true,
  },
  {
    slot: "gutters-downpipes-home-with-fence",
    category: "Gutters",
    caption: "Gutters and downpipes, finished home",
  },
  {
    slot: "project-video-charcoal",
    category: "Gutters",
    caption: "Charcoal gutters and fascia boards",
    video: true,
  },
  {
    slot: "gutters-charcoal-fascia-double-storey",
    category: "Gutters",
    caption: "Charcoal gutters and fascia with charcoal folding doors",
  },
  // Fascia
  {
    slot: "pillar-stainless-fascia-two-garage-doors",
    category: "Fascia",
    caption:
      "Stainless steel fascia boards and downpipes, galvanised gutters, aluminium garage doors",
  },
  {
    slot: "pillar-yellow-house-garage-doors",
    category: "Fascia",
    caption:
      "Stainless steel fascia boards and downpipes, galvanised gutters, aluminium garage doors",
  },
  {
    slot: "fascia-bronze-double-storey",
    category: "Fascia",
    caption: "Bronze fascia boards and downpipes, galvanised gutters",
  },
  {
    slot: "balustrade-stainless-balconies",
    category: "Fascia",
    caption: "Bronze fascia boards and downpipes, galvanised gutters",
  },
  {
    slot: "project-video-gutters",
    category: "Fascia",
    caption: "Bronze fascia boards and downpipes, galvanised gutters",
    video: true,
  },
  // Pillar Cladding
  {
    slot: "pillar-stainless-veranda",
    category: "Pillar Cladding",
    caption: "Stainless steel pillar cladding on a veranda",
  },
  {
    slot: "balustrade-stainless-pillar-covering",
    category: "Pillar Cladding",
    caption: "Stainless steel pillar covering and balustrades",
  },
  {
    slot: "video-pillar-cladding-garage-doors",
    category: "Pillar Cladding",
    caption: "Stainless steel pillar cladding and aluminium garage doors",
    video: true,
  },
  // Balustrades
  {
    slot: "balustrade-stainless-pillar-covering",
    category: "Balustrades",
    caption: "Stainless steel balustrades and pillar covering",
  },
  {
    slot: "balustrade-glass-staircase",
    category: "Balustrades",
    caption: "Frameless glass staircase balustrade",
  },
  {
    slot: "balustrade-tinted-glass-commercial",
    category: "Balustrades",
    caption: "Tinted glass balcony balustrade, commercial",
  },
  // Aluminium Doors & Windows
  {
    slot: "aluminium-windows-glass-balustrades",
    category: "Aluminium Doors & Windows",
    caption: "Aluminium windows and glass balustrades, double-storey",
  },
  {
    slot: "aluminium-commercial-complex",
    category: "Aluminium Doors & Windows",
    caption: "Aluminium windows on an office complex",
  },
  {
    slot: "aluminium-new-build",
    category: "Aluminium Doors & Windows",
    caption: "Aluminium windows and doors, new build",
  },
  // Garage Doors
  {
    slot: "garage-three-charcoal-glass",
    category: "Garage Doors",
    caption: "Three charcoal aluminium glass garage doors",
  },
  {
    slot: "garage-arched-glass-gate",
    category: "Garage Doors",
    caption: "Arched glass garage doors with matching gate",
  },
  {
    slot: "project-video-garage",
    category: "Garage Doors",
    caption: "Automated garage doors by remote control",
    video: true,
  },
  {
    slot: "video-pillar-cladding-garage-doors",
    category: "Garage Doors",
    caption: "Aluminium glass garage doors and stainless steel pillar cladding",
    video: true,
  },
  // Burglar Proofing
  {
    slot: "burglar-proofing-folding-doors",
    category: "Burglar Proofing",
    caption: "Bronze retractable burglar proofing",
  },
  {
    slot: "burglar-proofing-windows",
    category: "Burglar Proofing",
    caption: "Retractable burglar proofing behind charcoal windows",
  },
  {
    slot: "burglar-proofing-bronze-windows",
    category: "Burglar Proofing",
    caption: "Retractable burglar proofing behind bronze windows",
  },
  // Waterproofing
  {
    slot: "waterproofing-flat-roof-finished",
    category: "Waterproofing",
    caption: "Torch-on waterproofing on a flat roof",
  },
  {
    slot: "video-waterproofing-flat-roof",
    category: "Waterproofing",
    caption: "Flat roof and parapets sealed with torch-on",
    video: true,
  },
  {
    slot: "waterproofing-roof-edges",
    category: "Waterproofing",
    caption: "Torch-on waterproofing over parapet edges",
  },
  {
    slot: "video-waterproofing-membrane",
    category: "Waterproofing",
    caption: "Torch-on membrane rolls delivered to site",
    video: true,
  },
  // Roof & Wall Painting
  {
    slot: "roof-painting-tile-roof",
    category: "Roof & Wall Painting",
    caption: "Tiled roof painted grey",
  },
  {
    slot: "video-roof-painting",
    category: "Roof & Wall Painting",
    caption: "Painted tiled and metal sheet roofs",
    video: true,
  },
  {
    slot: "roof-painting-ridge",
    category: "Roof & Wall Painting",
    caption: "Painted tiled roof along the ridge",
  },
  {
    slot: "roof-painting-metal-roof-house",
    category: "Roof & Wall Painting",
    caption: "Painted metal sheet roof",
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

// CLIENT CONTENT: fill in to show the "Meet the founder" section on Home and About.
// The section stays hidden while `name` is empty. Add the photo to images.ts as slot "founder".
export const founder = {
  name: "Mr Peter",
  role: "Founder",
  // Sample picture until the client sends a real photo (see images.ts slot "founder").
  photoSlot: "founder",
  bio: [
    "Mr Peter is the founder of Elite Gutters and Aluminium Products.",
    "Talk to him about your gutters, fascia, balustrades or aluminium project: call or WhatsApp +27 84 258 6400.",
  ],
};

export const whatsappPopup = {
  greeting: "Hi there! 👋",
  text: "Need seamless gutters? Send us a photo of your roofline on WhatsApp for a free quote.",
  cta: "Chat on WhatsApp",
};

export const notFoundPage = {
  title: "Page not found",
  text: "The page you are looking for has moved or doesn’t exist. Try one of our services instead.",
};
