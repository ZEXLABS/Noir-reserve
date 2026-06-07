/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sanctuary, Yacht, Experience, WellnessActivity } from './types';

export const SANCTUARIES: Sanctuary[] = [
  {
    id: 'azure-monolith',
    name: 'The Azure Monolith',
    tagline: 'Volcanic Brutalism on the Aegean Crags',
    description: 'A structural monolith sculpted from black volcanic basalt, cantilevered over the absolute sheer cliffs of Santorini.',
    longDescription: 'Crafted as a seamless continuation of the raw Aegean crags, The Azure Monolith is an architectural triumph of raw concrete, volcanic ash, and pristine infinity-edge waters. The design features subterranean suites carved deep into the living stone, offering absolute thermal stability and sound isolation. Guest pathways wind through raw obsidian rock faces, culminating in a 50-meter cantilevered basalt pool that vanishes into the horizon of the caldera.',
    location: 'Santorini, Greece',
    type: 'clifftop',
    pricePerNight: 8500,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1200',
    specs: [
      { label: 'Acreage', value: '4.5 Hectares of cliff edge' },
      { label: 'Accommodation', value: '4 Master Crypt-Suites' },
      { label: 'Basalt Pool', value: '50m Cantilevered Infinity' },
      { label: 'Security', value: 'Submerged access & Helipad' }
    ],
    features: [
      'Private subterranean helicopter access directly into the caldera rock core',
      'Geothermal climate-regulated sleeping chambers with organic linen linings',
      'Saltwater sound-isolation decompression tank for mental alignment',
      'Exclusive estate chef team sourcing directly from our private organic micro-farm'
    ]
  },
  {
    id: 'obsidian-ridge',
    name: 'The Obsidian Ridge',
    tagline: 'Thermal Solitude on Basalt Slabs',
    description: 'A sanctuary built into the Icelandic basalt columns, wrapped in glacial air and warmed by volcanic veins.',
    longDescription: 'Positioned above the roaring arctic oceans, The Obsidian Ridge is a composition of dark granite masonry and self-healing bio-glass. Surrounded on three sides by thermal hot springs and sharp volcanic pillars, the property features its own geothermal turbine power and structural air purifiers. At night, the retractable monolithic glass domes slide back to present an unpolluted observatory of the Aurora Borealis from the comfort of heated wool-swathed daybeds.',
    location: 'Snaefellsnes, Iceland',
    type: 'clifftop',
    pricePerNight: 9500,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200',
    specs: [
      { label: 'Thermal Loop', value: '100% Geothermal Self-Sustained' },
      { label: 'Domes', value: '3 Retractable Stargazing Pavilions' },
      { label: 'Pools', value: 'Basalt Thermal Steaming Spas' },
      { label: 'Acoustics', value: 'Soundproof volcanic basalt walls' }
    ],
    features: [
      'In-ground thermal steam bath with natural mineral-rich mud flows',
      'Stargazing studio equipped with high-aperture astronomical sensors',
      'Private glacial trekking guide and customized alpine transport vehicles',
      'Arctic culinary chamber serving fermented specialties and estate spirits'
    ]
  },
  {
    id: 'emerald-canopy',
    name: 'The Emerald Canopy',
    tagline: 'Carbon-Negative Suspended Bamboo Purity',
    description: 'A gravity-defying network of structural black bamboo pavilions suspended above a wild Bali jungle gorge.',
    longDescription: 'Created in collaboration with structural bio-architects, The Emerald Canopy uses zero metal fasteners, instead utilizing black petrified bamboo joined by wood-peg tension rods and high-tensile organic polymers. The estate spans over a rapid jungle river gorge. Hammock nets suspend over the 100-meter drop, and living moss walls naturally filter the tropical air, ensuring a high-oxygen microclimate optimized for somatic recovery.',
    location: 'Ubud, Bali',
    type: 'jungle',
    pricePerNight: 6200,
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=1200',
    specs: [
      { label: 'Concept', value: 'Zero-Footprint Circular Architecture' },
      { label: 'Structure', value: 'Tension-hung structural bamboo' },
      { label: 'Elevation', value: '120 meters above the river bed' },
      { label: 'Oxygen level', value: 'Naturally enriched microclimate' }
    ],
    features: [
      'Infinity pool supplied from a pristine subterranean waterfall spring',
      'Yoga shala cantilevered over the roaring Ayung river canyon',
      'Bespoke sleep therapy chamber emitting forest sound wave frequencies',
      'Full Ayurvedic kitchen staffed by master panchakarma nutritionists'
    ]
  },
  {
    id: 'nirvana-dunes',
    name: 'The Nirvana Dunes',
    tagline: 'Retractable Copper Pavilions under Crimson Sands',
    description: 'A modular copper and teak pavilion settled deep within the ancient sand ridges of the Namib Desert.',
    longDescription: 'Nirvana Dunes has been engineered to perfectly exist in isolation. Built using low-impact copper pilotis that allow sand dunes to drift beneath, this pavilion maintains complete climate control through passive wind towers and solar-powered stone heat-exchangers. The master suite features an expansive open ceiling mechanism that fully retracts, allowing guests to drift off directly beneath the highest-density stargazing sky on earth.',
    location: 'Namib-Naukluft, Namibia',
    type: 'desert',
    pricePerNight: 7800,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
    specs: [
      { label: 'Footprint', value: 'Pilotis-levitated foundation' },
      { label: 'Power', value: '100% off-grid bifacial solar arrays' },
      { label: 'Sky Noise', value: 'Zero ambient decibels of light pollution' },
      { label: 'Telescope', value: 'Private high-alt planetary tracker' }
    ],
    features: [
      'Retractable living room pavilion with unobstructed desert views',
      'Personal desert surveyor and tracking fleet of private dune buggies',
      'Infrared wellness panels integrated into copper-sheet wall linings',
      'Exclusive desert dining table set on the peak of a 300-meter red sand dune'
    ]
  },
  {
    id: 'el-dorado-lagoon',
    name: 'El Dorado Lagoon',
    tagline: 'Teak Pavilions Floating over Subaquatic Gardens',
    description: 'An overwater sanctuary of dark-stained teak wood, built directly above a thriving private coral caldera.',
    longDescription: 'Resting on structural composite pillars, El Dorado Lagoon is a floating sanctuary situated within a sealed circular reef caldera. The floors of the primary living space are constructed of impact-resistant optical-grade glass, revealing a private bioluminescent kelp forest and coral reef beneath. A private staircase descends from the master deck directly into the pristine, current-free salt water, complete with custom underwater scooter bays.',
    location: 'Bora Bora Outskirts',
    type: 'water',
    pricePerNight: 9900,
    image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&q=80&w=1200',
    specs: [
      { label: 'Aqueous Bed', value: 'Private 12-acre sealed coral loop' },
      { label: 'Flooring', value: '30mm Optical Structural Glass' },
      { label: 'Sub-bays', value: 'Underwater scooter and dive chambers' },
      { label: 'Charter Access', value: 'Deep-keel yacht mooring jetty' }
    ],
    features: [
      'Private coral restoration platform with marine biology guide',
      'Submerged master sleeping capsule with 360-degree marine windows',
      'In-deck salt-water plunge pool with integrated tidal wave simulators',
      'Bespoke fresh seafood grill powered entirely by marine-algae hydrogen fuel'
    ]
  }
];

export const YACHTS: Yacht[] = [
  {
    id: 'vela-noir',
    name: 'Vela Noir',
    tagline: '65-Meter Carbon Cruiser of Absolute Seclusion',
    description: 'A carbon sailing yacht designed for high-velocity oceanic quietude and zero emissions.',
    longDescription: 'Built entirely from ultra-high-modulus aerospace carbon fiber with sails that weave photovoltaic fibers, Vela Noir combines high-performance marine speed with absolute silence. The yacht does not use fuel for propulsion, utilizing water-regeneration hydro-turbines and sail energy. Inside, the design is a testament to dark minimal luxury, boasting raw concrete panels, black-tinted leather, and brushed charcoal metal.',
    length: '65 Meters',
    crewCount: 12,
    guestCapacity: 8,
    pricePerDay: 18000,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1200',
    specs: [
      { label: 'Hull', value: 'Aerospace Pre-preg Carbon Fiber' },
      { label: 'Propulsion', value: 'Automated Hydro-Turbine Sailing Loop' },
      { label: 'Range', value: 'Infinite (Zero Emissions System)' },
      { label: 'Cruising Draft', value: '4.5m Keel-Retractable system' }
    ],
    amenities: [
      'Cantilevered aft swimming platform with carbon ladder',
      'Submerged ocean-sound wellness library with hydro-acoustic pads',
      'Carbon-fiber RIB tenders and modular sea pool barriers',
      'Dedicated onboard master sushi chef and micro-cellar'
    ]
  },
  {
    id: 'apex-explorer',
    name: 'Apex Explorer',
    tagline: '88-Meter Polar Expedition Superfortress',
    description: 'An ice-breaker hull vessel meticulously designed to master extreme arctic and Antarctic oceans in pristine comfort.',
    longDescription: 'Apex Explorer is a custom-engineered sanctuary built to reach the absolute ends of the earth. Featuring an ice-breaker reinforced steel hull, twin helicopter landing pads, and dual subaquatic docking hangar, this explorer can withstand Arctic winter freezes while cocooning guests in high-luxury insulation. The interior features massive triple-glazed floor-to-ceiling visual apertures, and heated thermal stone flooring throughout.',
    length: '88 Meters',
    crewCount: 22,
    guestCapacity: 12,
    pricePerDay: 32000,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    specs: [
      { label: 'Ice Class', value: 'Polar Class 1 Reinforced Hull' },
      { label: 'Docking Hangar', value: 'Dual Submersible Launch Bays' },
      { label: 'Helipads', value: 'Two fully certified landing pads' },
      { label: 'Autonomy', value: '90-Day Unprovisioned Ocean Autonomy' }
    ],
    amenities: [
      'On-board three-seat research submersible (reach 1000m depths)',
      'Aero-medical center with certified hyperbaric decompression chamber',
      'Heated outdoor volcanic basalt swimming pool',
      'Michelin-level gastronomy room and glass-enclosed panoramic gym'
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'private-chef',
    name: 'Private Alchemist Chefs',
    tagline: 'Gastronomy Tailored to Your Somatic Code',
    description: 'A customized culinary journey, where master chefs construct daily menus based on organic local foraging and individual metabolic scans.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    priceEstimate: '$2,500 / Day',
    options: ['Biodynamic Vegan Protocol', 'Deep Oceanic Foraging', 'Molecular Botanical Cuisine', 'Keto-Alchemist Protocol']
  },
  {
    id: 'subaquatic-expedition',
    name: 'Subaquatic Expeditions',
    tagline: 'Descend to the Undiscovered Depths',
    description: 'A private carbon-fiber submersible with a certified marine biologist to map uncharted thermal vents and observe bioluminescent ocean depths.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
    priceEstimate: '$12,000 / Session',
    options: ['Mid-Water Bioluminescent Dive', 'Abyssal Geothermal Trench Study', 'Sunken Archaeological Survey']
  },
  {
    id: 'starlit-wellness',
    name: 'Starlit Wellness & Soundscapes',
    tagline: 'Aero-Astral Somatic Recalibration',
    description: 'Vibrational frequency tables combined with deep space sound therapy and micro-gravity alignment systems under Certified Dark Skies.',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800',
    priceEstimate: '$1,800 / Ritual',
    options: ['Planetary Frequency Cleansing', 'Infrared Lunar Hammock Breathing', 'Ancestral Plant Sound Inhalation']
  },
  {
    id: 'personal-concierge',
    name: 'Elite Concierge Force',
    tagline: 'Silent Architects of Every Wish',
    description: 'An elite global network of fixers, security escorts, and lifestyle artisans. No request is out of bounds, no border is a constraint.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    priceEstimate: 'Inclusive in Club Membership',
    options: ['Military-Grade Close Escort', 'Private Antiquities Sourcing', 'Exclusive Closed-Museum Curator Accompany']
  }
];

export const WELLNESS_ACTIVITIES: WellnessActivity[] = [
  {
    id: 'basalt-ritual',
    name: 'Deep Tissue Basalt Chamber',
    type: 'ritual',
    description: 'Somatic friction therapy using volcanic basalt rocks heated in thermal mineral waters, designed to dissolve absolute muscular memory structures.',
    duration: '90 Minutes',
    timeSlots: ['08:00', '10:30', '14:00', '16:30', '19:00']
  },
  {
    id: 'silent-cavern',
    name: 'Silent Meditation in Lava Crypt',
    type: 'mindfulness',
    description: 'In-soil volcanic cavern meditation in absolute visual and mental sensory-deprivation chambers, led by silent zen keepers.',
    duration: '60 Minutes',
    timeSlots: ['06:00', '09:00', '11:00', '15:00', '17:30']
  },
  {
    id: 'astral-frequency',
    name: 'Astrological Planetary Frequency Bath',
    type: 'mindfulness',
    description: 'Align organic bodily frequencies to lunar cycles using specialized custom copper singing bowls vibrating at cosmic resonance pitches.',
    duration: '75 Minutes',
    timeSlots: ['07:30', '10:00', '13:00', '16:00', '20:30']
  },
  {
    id: 'kelp-nutrition',
    name: 'Macro-Nutrient Botanical Extraction',
    type: 'nutrition',
    description: 'A customized, fluid-based botanical meal infusion high in marine amino acids, fresh coldwater kelp compounds, and organic local roots.',
    duration: '45 Minutes',
    timeSlots: ['08:00', '12:00', '13:30', '18:30']
  }
];

export const OFFICES = [
  { name: 'London Atelier', area: 'Mayfair', contact: '+44 20 7946 0192', hours: '24/7 Mon-Sun' },
  { name: 'Singapore Atelier', area: 'Marina Bay Skyline', contact: '+65 6789 0111', hours: '24/7 Mon-Sun' },
  { name: 'Malibu Atelier', area: 'Point Dume Escarpment', contact: '+1 310 555 0184', hours: '24/7 Mon-Sun' }
];
