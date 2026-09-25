import {
  SoulExperience,
  StateDNA,
  CulturalEvent,
  UserPreferences,
  ExperienceScoreBreakdown
} from '../types/travel';

export const SOUL_EXPERIENCES: SoulExperience[] = [
  // ==========================================
  // TELANGANA - POCHAMPALLY & ANANTHAGIRI
  // ==========================================
  {
    id: 'exp-pochampally-ikat-weaving',
    title: 'Pochampally Ikat Handloom Weaving Masterclass',
    tagline: 'Don’t just buy an Ikat saree. Try weaving one yourself.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'weaving',
    destinationId: 'pochampally',
    destinationName: 'Pochampally',
    state: 'Telangana',
    location: 'Bhoodan Pochampally Weaver Colony, Telangana',
    duration: '3.5 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 1200,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'In the globally celebrated silk city of Pochampally, geometric Ikat patterns are born through complex tie-and-dye arithmetic on pure silk threads before touching the wooden pit-loom.',
    whatYouExperience: [
      'Learn the intricate 8-step yarn tie-and-dye graphing technique',
      'Sit on an ancestral wooden pit-loom and throw the wooden shuttle with a master weaver',
      'Weave your own small authentic Ikat bookmark or table runner to take home',
      'Tour traditional cooperative dye houses using certified eco-friendly dyes'
    ],
    makerInfo: {
      name: 'Chintakindi Mallesham Cooperative Guild',
      roleOrCooperative: 'Master Ikat Artisan & Asu Machine Innovator Guild',
      craft: 'Pochampally Double-Ikat Silk Weaving (GI Tagged)',
      experienceYears: '4th Generation Weaver Collective',
      location: 'Weavers Lane, Bhoodan Pochampally, Telangana',
      story: 'Carrying forward centuries-old geometric tie-dye heritage, this cooperative represents over 80 weaver families preserving hand-drawn Telia Rumal and Ikat weaving techniques.',
      whatVisitorsExperience: 'Visitors are welcomed directly into living-room looms, hearing the rhythm of the wooden reeds and learning the patience required to weave 1 meter of silk per day.',
      isDemoProfile: true,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      workshopAvailability: 'Daily 9:30 AM - 5:00 PM (Walk-ins welcome, pit-loom trial on request)',
      journeyPathway: ['Pochampally', 'Ikat weaving', 'Visit weaving workshop', 'Learn basic weaving', 'Meet the weaver'],
      makerCategory: 'weaver'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'weaving workshop near Pochampally',
    tags: ['Ikat Weaving', 'GI Tag Heritage', 'Hands-on Loom', 'Make Something', 'Artisan Guild']
  },
  {
    id: 'exp-pochampally-telangana-feast',
    title: 'Weaver Family Home Kitchen: Telangana Jonna Rotte Feast',
    tagline: 'Savor earthy millet flatbreads cooked on wood-fired earthen hearths.',
    category: 'Local Food & Flavours',
    makeSomethingType: 'cooking',
    destinationId: 'pochampally',
    destinationName: 'Pochampally',
    state: 'Telangana',
    location: 'Rural Homestead, Pochampally Outer',
    duration: '2 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Budget (₹300 - ₹800)',
    priceInr: 650,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Telangana culinary soul is rooted in scorched dryland millets, fiery green chilies, sour gongura roselle leaves, and hand-ground peanut podis prepared with immense warmth.',
    whatYouExperience: [
      'Learn the traditional hand-slapping technique to bake puffed Jonna Rotte (Sorghum flatbread)',
      'Grind fresh Gongura Pacchadi on an ancient stone mortar (Rolu-Rolu)',
      'Enjoy an unhurried multi-course home lunch served on freshly cut banana leaves',
      'Hear stories of agricultural rhythms and festival foods of Nalgonda district'
    ],
    foodInsights: {
      dishOrTradition: 'Telangana Jonna Rotte & Gongura Mamsam / Dal',
      whatMakesItSpecial: 'Unlike northern leavened breads, Jonna Rotte contains zero wheat or gluten. It requires exceptional palm-technique on open clay griddles to achieve its paper-thin yet puffed texture.',
      keyIngredients: ['Local White Sorghum', 'Wild Roselle Leaves (Gongura)', 'Byadgi & Guntur Chilies', 'Cold-pressed Sesame Oil'],
      culturalOccasion: 'Everyday staple of rural weavers providing sustained stamina throughout long loom hours.',
      cookingMethod: 'Wood-fired open earthen tava with gentle water steaming.'
    },
    makerInfo: {
      name: 'Padmashali Kitchen Collective',
      roleOrCooperative: 'Home Culinary Community of Pochampally',
      craft: 'Traditional Telangana Deccan Home Cookery',
      experienceYears: 'Generational Rural Homemakers',
      location: 'Pochampally Hamlet, Telangana',
      story: 'Led by home cooks preserving recipes passed down through oral tradition without written measure.',
      whatVisitorsExperience: 'Intimate dining inside a shaded courtyard with clay-tiled roofs and fresh buttermilk.',
      isDemoProfile: true,
      workshopAvailability: 'Daily 11:30 AM - 3:30 PM (Courtyard lunch sessions)',
      journeyPathway: ['Pochampally village', 'Visit Padmashali home kitchen', 'Learn hand-slapping Jonna Rotte', 'Pound wild gongura on stone mortar', 'Meet home cooks'],
      makerCategory: 'community'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'traditional food experience near Hyderabad',
    tags: ['Millet Cookery', 'Gongura', 'Home Feast', 'Taste the Region']
  },
  {
    id: 'exp-ananthagiri-herbal-trail',
    title: 'Ananthagiri Medicinal Canopy & Musi Spring Ethnobotany Walk',
    tagline: 'Forage wild healing herbs with local Chenchu forest naturalists.',
    category: 'Nature & Trails',
    destinationId: 'ananthagiri-hills',
    destinationName: 'Ananthagiri Hills',
    state: 'Telangana',
    location: 'Vikarabad Forest Sanctuary, Ananthagiri Hills',
    duration: '2.5 Hours',
    difficulty: 'All Skill Levels',
    priceLevel: 'Budget (₹300 - ₹800)',
    priceInr: 500,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'The Ananthagiri ridge is the sacred birthplace of River Musi and one of the dense medicinal forest pockets in the Deccan plateau, harboring over 200 indigenous Ayurvedic plants.',
    whatYouExperience: [
      'Walk alongside native tribal naturalists identifying wild asparagus, amla, and neem bark',
      'Taste wild forest honey freshly collected by local cooperatives',
      'Follow the freshwater spring trickle where Musi River surfaces beneath ancient banyan roots',
      'Discover traditional seasonal medicine lore used for centuries in rural Telangana'
    ],
    makerInfo: {
      name: 'Chenchu Eco-Forestry Cooperative',
      roleOrCooperative: 'Indigenous Forest Knowledge Guides',
      craft: 'Ethnobotany & Deccan Ridge Conservation',
      experienceYears: 'Indigenous Community Knowledge',
      location: 'Kerelli Forest Base, Vikarabad, Telangana',
      story: 'Chenchu and local woodland families dedicated to preserving biodiversity corridors in the Vikarabad hills.',
      whatVisitorsExperience: 'A gentle, contemplative walk through dense foliage with herbal sensory tea at sunrise.',
      isDemoProfile: true
    },
    isDemoExperience: true,
    googlePlaceQuery: 'nature trail guide Ananthagiri Hills Vikarabad',
    tags: ['Herbal Trail', 'Forest Foraging', 'Musi River Origin', 'Chenchu Wisdom']
  },
  {
    id: 'exp-ananthagiri-pottery-wheel',
    title: 'Red Deccan Terracotta Pottery & Clay Throwing',
    tagline: 'Shape red river silt into water pots on a traditional wheel.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'pottery',
    destinationId: 'ananthagiri-hills',
    destinationName: 'Ananthagiri Hills',
    state: 'Telangana',
    location: 'Kotepally Artisan Hamlet, Vikarabad',
    duration: '2 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Budget (₹300 - ₹800)',
    priceInr: 450,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'The mineral-rich red soil of Vikarabad gives regional earthen pots unmatched porous cooling qualities, famously keeping water chill through scorching Deccan summers.',
    whatYouExperience: [
      'Knead natural terracotta clay harvested from reservoir silt beds',
      'Try balancing clay on a heavy rotating stone flywheel',
      'Hand-shape your own earthen diya or drinking kulhad with master potters',
      'Engrave geometric floral patterns using wooden styluses'
    ],
    makerInfo: {
      name: 'Kummari Ramulu & Artisans',
      roleOrCooperative: 'Village Potter Guild of Vikarabad',
      craft: 'Deccan Red Terracotta Pottery',
      experienceYears: '35 Years on the Wheel',
      location: 'Kotepally Road, Vikarabad, Telangana',
      story: 'Preserving traditional pottery without electricity, relying on hand-pushed stone flywheels and slow hay firings.',
      whatVisitorsExperience: 'Hands covered in rich fragrant clay while mastering the pressure needed to raise a pot.',
      isDemoProfile: true,
      workshopAvailability: 'Monday to Saturday 10:00 AM - 4:30 PM (Stone flywheel sessions on demand)',
      journeyPathway: ['Vikarabad', 'Red clay harvesting', 'Visit village potter guild', 'Throw clay on rotating stone flywheel', 'Meet master potter'],
      makerCategory: 'potter'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'pottery workshop near Vikarabad',
    tags: ['Terracotta Pottery', 'Red Clay Wheel', 'Make Something', 'Artisan Guild']
  },

  // ==========================================
  // RAJASTHAN - JAIPUR & JAISALMER
  // ==========================================
  {
    id: 'exp-jaipur-bagru-block-printing',
    title: 'Bagru Mud-Resist (Dabu) Natural Dye Block Printing',
    tagline: 'Learn hand-carved teakwood stamping and indigo vat dipping.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'block_printing',
    destinationId: 'jaisalmer',
    destinationName: 'Jaipur & Thar Region',
    state: 'Rajasthan',
    location: 'Chhipa Mohalla, Bagru / Jaipur Craft Hub, Rajasthan',
    duration: '3 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 1500,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Bagru printing uses Dabu—a paste of mud, gum, and lime—stamped with teak wood blocks before dipping into subterranean 200-year-old indigo vats.',
    whatYouExperience: [
      'Mix authentic Dabu mud paste and understand natural resist chemistry',
      'Stamp a 2-meter pure cotton scarf with centuries-old geometric and floral teak blocks',
      'Dip your fabric into deep indigo fermented vats and watch the green turn royal blue as it oxidizes in air',
      'Wash your print under open-air drying fields alongside master Chhipa printers'
    ],
    makerInfo: {
      name: 'Chhipa Artisan Collective',
      roleOrCooperative: 'Bagru Natural Dye Printers Guild',
      craft: 'Dabu Block Printing & Indigo Vat Dyeing (GI Tagged)',
      experienceYears: '5th Generation Family Printers',
      location: 'Bagru Artisan Quarter, Rajasthan',
      story: 'The Chhipa community has passed down block carving and natural plant extraction knowledge along the Sanjariya river basin for over 400 years.',
      whatVisitorsExperience: 'Working side-by-side in long sunlit print tables, smelling fermented indigo and warm woodblock wax.',
      isDemoProfile: true,
      workshopAvailability: 'Monday to Saturday 9:00 AM - 4:00 PM (Direct courtyard sessions)',
      journeyPathway: ['Bagru village', 'Dabu mud preparation', 'Teakwood block carving table', 'Indigo vat dipping', 'Meet 5th generation Chhipa printers'],
      makerCategory: 'artisan'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'block printing workshop near Jaipur',
    tags: ['Block Printing', 'Dabu Resist', 'Indigo Vat', 'Make Something', 'Textile Heritage']
  },
  {
    id: 'exp-jaipur-blue-pottery',
    title: 'Jaipur Turquoise Blue Pottery Glaze & Kiln Art',
    tagline: 'Craft Egyptian-origin quartz pottery without using any clay.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'pottery',
    destinationId: 'jaisalmer',
    destinationName: 'Jaipur Heritage Zone',
    state: 'Rajasthan',
    location: 'Kot Jewar Blue Pottery Enclave, Jaipur',
    duration: '2.5 Hours',
    difficulty: 'Intermediate',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 1100,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Jaipur Blue Pottery is one of the only ceramic traditions on earth that uses no clay whatsoever—crafted entirely from ground quartz stone, Fuller’s earth, and natural gum.',
    whatYouExperience: [
      'Grind and shape quartz paste into delicate tile molds',
      'Paint turquoise and cobalt oxide Persian arabesque motifs using squirrel-hair brushes',
      'Apply glass glaze and observe low-fire wood kiln preparations',
      'Receive your fired hand-painted ceramic tile shipped to your address'
    ],
    makerInfo: {
      name: 'Kripal Kumbh Legacy Studio',
      roleOrCooperative: 'Jaipur Blue Pottery Revival Guild',
      craft: 'Traditional Quartz Blue Pottery (GI Tag)',
      experienceYears: '3 Decades of Master Artisan Work',
      location: 'Bani Park / Sanganer, Jaipur, Rajasthan',
      story: 'Pioneered by revivalist masters who saved this royal craft from extinction by standardizing natural oxide colors.',
      whatVisitorsExperience: 'Intricate brush control on powdery white tiles and learning the story of Turko-Persian craft migration.',
      isDemoProfile: true,
      workshopAvailability: 'Tuesday to Sunday 10:00 AM - 5:30 PM (Pre-booking recommended)',
      journeyPathway: ['Jaipur Sanganer', 'Quartz stone grinding', 'Tile molding studio', 'Cobalt blue motif brushwork', 'Meet legacy revivalist'],
      makerCategory: 'potter'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'pottery workshop near Jaipur',
    tags: ['Blue Pottery', 'Quartz Ceramic', 'Cobalt Paint', 'Make Something']
  },
  {
    id: 'exp-rajasthan-dal-baati-cooking',
    title: 'Dal Baati Churma: Royal Desert Hearth Cooking Masterclass',
    tagline: 'Bake ghee-soaked baatis directly on slow cow-dung coals.',
    category: 'Local Food & Flavours',
    makeSomethingType: 'cooking',
    destinationId: 'jaisalmer',
    destinationName: 'Jaisalmer & Marwar',
    state: 'Rajasthan',
    location: 'Heritage Haveli Courtyard, Jaisalmer / Jaipur',
    duration: '3 Hours',
    difficulty: 'All Skill Levels',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 1400,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Conceived for desert warriors who buried dough balls in desert sand before battle, Baati is an engineering marvel of drought-resistant grain culinary preservation.',
    whatYouExperience: [
      'Roll whole-wheat and ajwain dough balls and bake them over gentle aromatic charcoal coals',
      'Crack open hot baatis and submerge them in pure desi cow ghee until golden',
      'Simmer 5-lentil Panchmel Dal with smoky heeng and Mathania red chili tadka',
      'Crush sweetened warm baatis into cardamom-infused Churma with pistachios'
    ],
    foodInsights: {
      dishOrTradition: 'Traditional Rajasthani Dal Baati Churma & Gatte ki Sabzi',
      whatMakesItSpecial: 'Water scarcity in Marwar led to cooking techniques that use clarified butter (ghee) and buttermilk instead of fresh water, allowing foods to remain unspoiled for days.',
      keyIngredients: ['Gram Flour (Besan)', 'Mathania Sun-dried Chilies', 'Desi A2 Cow Ghee', 'Panchmel 5 Dal Blend'],
      culturalOccasion: 'Celebrated across desert weddings, royal feasts, and festive desert gatherings.',
      cookingMethod: 'Slow charcoal pit baking and hot ghee dunking.'
    },
    makerInfo: {
      name: 'Haveli Rasoi Guild',
      roleOrCooperative: 'Marwari Heritage Kitchens',
      craft: 'Royal & Pastoral Rajasthani Cookery',
      experienceYears: '3 Generations of Haveli Khansamas',
      location: 'Fort Environs, Jaisalmer, Rajasthan',
      story: 'Hereditary cooks preserving the recipes favored by Rajput caravaneers and royal court dining.',
      whatVisitorsExperience: 'Dining on brass thalis by candlelit sandstone arches with folk sarangi music playing in the courtyard.',
      isDemoProfile: true,
      workshopAvailability: 'Daily 12:00 PM - 3:00 PM & 6:30 PM - 9:30 PM (Courtyard hearth masterclass)',
      journeyPathway: ['Jaisalmer Fort Haveli', 'Desert hearth introduction', 'Roll whole-wheat baati dough', 'Charcoal pit baking & ghee dunking', 'Meet Haveli Rasoi elders'],
      makerCategory: 'small_business'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'traditional food experience near Rajasthan',
    tags: ['Dal Baati', 'Ghee Cooking', 'Desert Food', 'Taste the Region']
  },
  {
    id: 'exp-manganiyar-folk-music',
    title: 'Manganiyar Thar Desert Music & Kamaicha Story Session',
    tagline: 'Listen to ancestral genealogical poetry under desert starlight.',
    category: 'Performing Arts & Folk',
    makeSomethingType: 'dance_music',
    destinationId: 'jaisalmer',
    destinationName: 'Jaisalmer Desert',
    state: 'Rajasthan',
    location: 'Barna Artisan Village, Thar Desert, Jaisalmer',
    duration: '2.5 Hours',
    difficulty: 'All Skill Levels',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 950,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'The Manganiyars are hereditary Muslim musicians whose patrons were Rajput rulers. They play the bowed Kamaicha (crafted from mango wood and goat skin) with hypnotic vocal polyrhythms.',
    whatYouExperience: [
      'Learn the rhythmic clacking technique of wooden Khartal castanets',
      'Hear stories of Alexander’s caravans, Sufi saints, and desert romance sung in Marwari dialects',
      'Intimate acoustic performance around a desert tamarisk campfire without electronic amplification',
      'Discuss how oral songs carry unwritten 800-year histories of desert lineages'
    ],
    makerInfo: {
      name: 'Ustad Gazi Khan Heritage Enclave',
      roleOrCooperative: 'Manganiyar Folk Music Custodians',
      craft: 'Kamaicha, Khartal & Dholak Oral Traditions',
      experienceYears: 'Generational Hereditary Troupe',
      location: 'Barna Village, Jaisalmer, Rajasthan',
      story: 'Dedicated to teaching youth the 17-string Kamaicha instrument to keep oral desert epics alive.',
      whatVisitorsExperience: 'Pure desert acoustics under open constellation skies with piping hot chai.',
      isDemoProfile: true,
      workshopAvailability: 'Sunset to Night (7:00 PM - 10:00 PM Campfire sessions)',
      journeyPathway: ['Barna Village Thar', 'Campfire gathering', 'Kamaicha bowing demonstration', 'Learn Khartal castanet rhythms', 'Meet Ustad Gazi Khan & troupe'],
      makerCategory: 'community'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'folk dance experience near Rajasthan',
    tags: ['Manganiyar Music', 'Kamaicha', 'Folk Ballad', 'Desert Night', 'Dance & Music']
  },

  // ==========================================
  // KARNATAKA - HAMPI & COORG
  // ==========================================
  {
    id: 'exp-hampi-stone-chiseling',
    title: 'Vijayanagara Granite Relief Chiseling with Hereditary Sculptors',
    tagline: 'Chisel sacred lotus medallions on hard Deccan granite.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'crafts',
    destinationId: 'hampi',
    destinationName: 'Hampi',
    state: 'Karnataka',
    location: 'Kamalapur Sculptor Guild / Anegundi Arts, Karnataka',
    duration: '3 Hours',
    difficulty: 'Intermediate',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 1100,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Hampi’s magnificent temples were carved from unforgiving grey granite without mortar. Artisans today still use carbon-steel hand chisels and wooden mallets.',
    whatYouExperience: [
      'Identify granite grain lines and understand ancient splitting techniques using wooden pegs and water',
      'Carve a bas-relief lotus (Padma) medallion or Vijayanagara crest on an authentic granite block',
      'Explore the architectural acoustics of Vitthala Musical Pillars with stone experts',
      'Take home your hand-carved stone keepsake'
    ],
    makerInfo: {
      name: 'Shilpa Shastra Guild Kamalapur',
      roleOrCooperative: 'Hereditary Temple Stone Carvers',
      craft: 'Dravidian Granite Sculpture & Iconography',
      experienceYears: 'Master Carvers with 40+ Years',
      location: 'Near Archaeological Museum, Kamalapur, Hampi',
      story: 'Maintaining Shilpa Shastra stone proportion texts passed down from the empire’s master architects.',
      whatVisitorsExperience: 'The tactile thrill of striking steel against stone and feeling millennia of temple sculpture lineage.',
      isDemoProfile: true,
      workshopAvailability: 'Daily 8:30 AM - 4:00 PM (Morning sessions best for temple light)',
      journeyPathway: ['Kamalapur Hampi', 'Granite grain identification', 'Visit Shilpa Shastra carving yard', 'Chisel sacred lotus bas-relief', 'Meet hereditary temple sculptors'],
      makerCategory: 'sculptor'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'local craft workshop near Hampi',
    tags: ['Stone Carving', 'Granite Chiseling', 'Make Something', 'Temple Architecture']
  },
  {
    id: 'exp-hampi-coracle-weaving',
    title: 'Tungabhadra Bamboo Coracle Weaving & River Crossing',
    tagline: 'Weave water-tight round boats and row through boulder rapids.',
    category: 'Village & Community',
    makeSomethingType: 'crafts',
    destinationId: 'hampi',
    destinationName: 'Hampi',
    state: 'Karnataka',
    location: 'Anegundi Riverside Hamlet, Across Tungabhadra, Hampi',
    duration: '2.5 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Budget (₹300 - ₹800)',
    priceInr: 600,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Round bamboo boats called Coracles (Kutta Vanchi) have navigated the swirling eddies of River Tungabhadra since the 14th century reign of King Deva Raya.',
    whatYouExperience: [
      'Weave split green bamboo strips into an interlocking circular skeletal frame',
      'Apply waterproofing resin and understand river-flow physics',
      'Learn the single-paddle rotary steering motion in calm river lagoons',
      'Glide beneath the towering basalt boulder canyons of Kishkindha'
    ],
    makerInfo: {
      name: 'Anegundi Ferrymen Community',
      roleOrCooperative: 'River Boatman Collective of Kishkindha',
      craft: 'Bamboo Coracle Construction & River Navigation',
      location: 'Virupapur Gaddi / Anegundi Ghats, Karnataka',
      story: 'Families who have held hereditary ferry rights across the Tungabhadra rapids for centuries.',
      whatVisitorsExperience: 'Whirling peacefully down the river while egrets soar above monumental boulder stacks.',
      isDemoProfile: true
    },
    isDemoExperience: true,
    googlePlaceQuery: 'coracle boat experience Tungabhadra Hampi',
    tags: ['Coracle Weaving', 'Bamboo Craft', 'River Rapids', 'Anegundi Village']
  },
  {
    id: 'exp-karnataka-jolada-rotti',
    title: 'North Karnataka Jolada Rotti & Badanekai Yennegai Feast',
    tagline: 'Feast on thin sorghum roti with spiced stuffed baby brinjals.',
    category: 'Local Food & Flavours',
    makeSomethingType: 'cooking',
    destinationId: 'hampi',
    destinationName: 'Hampi & Badami',
    state: 'Karnataka',
    location: 'Khanavali Kitchen, Kamalapur, Karnataka',
    duration: '2 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Budget (₹300 - ₹800)',
    priceInr: 550,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'The Lingayat Khanavali culinary tradition of North Karnataka is entirely vegetarian, deeply nutritious, and anchored in dry sorghum rotis and nutty peanut-flaxseed podis.',
    whatYouExperience: [
      'Watch master kitchen cooks slap 5 rotis per minute on clay plates without a rolling pin',
      'Grind roasted Shenga (peanut) Chutney Pudi and spicy Garlic Agasi powder',
      'Stuff local purple brinjals with sesame and coconut paste for Yennegai',
      'Eat alongside local farmers and college students in an authentic, unpretentious Khanavali'
    ],
    foodInsights: {
      dishOrTradition: 'North Karnataka Jolada Rotti Oota (Meal)',
      whatMakesItSpecial: 'Baked in seconds over raging iron hotplates, the rotis puff with dry steam and remain soft without any oil or butter in the dough.',
      keyIngredients: ['Milled White Sorghum', 'Green Brinjals', 'Roasted Peanuts', 'Flaxseed & Curry Leaves'],
      culturalOccasion: 'Daily sustenance across the arid Deccan plains of Karnataka.',
      cookingMethod: 'Dry clay plate slapping and quick iron griddle blistering.'
    },
    makerInfo: {
      name: 'Basaveshwara Khanavali Heritage',
      roleOrCooperative: 'Traditional Lingayat Kitchen',
      craft: 'North Karnataka Oota Cookery',
      experienceYears: '50-Year Family Kitchen',
      location: 'Hampi-Kamalapur Road, Karnataka',
      story: 'A 50-year-old family establishment serving generous home-style thalis to travellers and pilgrims alike.',
      whatVisitorsExperience: 'Infinite servings of fresh warm rotis, fragrant vegetable gravies, and tangy curd.',
      isDemoProfile: true,
      workshopAvailability: 'Daily 11:30 AM - 4:00 PM & 7:00 PM - 10:00 PM',
      journeyPathway: ['Kamalapur Hampi', 'Enter traditional Khanavali', 'Observe 5-rotis-per-minute slapping', 'Taste Yennegai & Shenga Pudi', 'Meet Khanavali cooks'],
      makerCategory: 'small_business'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'local restaurants near Hampi',
    tags: ['Jolada Rotti', 'Khanavali', 'Taste the Region', 'Karnataka Oota']
  },

  // ==========================================
  // KERALA - MUNNAR
  // ==========================================
  {
    id: 'exp-munnar-orthodox-tea',
    title: 'Kolukkumalai High-Altitude Orthodox Tea Plucking & Tasting',
    tagline: 'Pluck two leaves and a bud at the world’s highest organic tea estate.',
    category: 'Workshops & Crafts',
    destinationId: 'munnar',
    destinationName: 'Munnar',
    state: 'Kerala',
    location: 'Kolukkumalai Highland Estate (7,900 ft), Munnar Environs',
    duration: '4 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 1600,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Perched nearly 8,000 feet above the clouds, Kolukkumalai still uses 1930s British miniature roller machines and hand-withering rather than modern crushing techniques.',
    whatYouExperience: [
      'Learn the precise pinch-and-snap technique for plucking tender top flush shoots with estate pluckers',
      'Step inside a functioning 90-year-old wooden factory driven by mechanical pulleys',
      'Experience a sommelier-style cupping session: Green, Oolong, Broken Orange Pekoe, and White Tea',
      'Stand over the sheer precipice gazing into the mist-draped Tamil Nadu plains below'
    ],
    makerInfo: {
      name: 'Kolukkumalai Planters Guild',
      roleOrCooperative: 'Organic Orthodox High-Altitude Tea Makers',
      craft: 'Single-Estate Hand-Crafted Orthodox Tea Processing',
      experienceYears: 'Continuous Operations Since 1935',
      location: 'Kolukkumalai, Kerala / Tamil Nadu Border',
      story: 'One of the rare estates in Asia maintaining orthodox processing without automated CTC cutters, preserving pure floral aromas.',
      whatVisitorsExperience: 'Crisp mountain breeze, aromatic tea rolling scents, and tea served straight from the copper kettle.',
      isDemoProfile: true
    },
    isDemoExperience: true,
    googlePlaceQuery: 'tea tasting tour Munnar Kerala',
    tags: ['Orthodox Tea', 'High Altitude Estate', 'Tea Plucking', 'Kolukkumalai']
  },
  {
    id: 'exp-kerala-sadhya-cooking',
    title: 'Authentic 24-Dish Kerala Sadhya: Coconut & Curry Leaf Secrets',
    tagline: 'Learn the sacred placement and flavours of a festival feast.',
    category: 'Local Food & Flavours',
    makeSomethingType: 'cooking',
    destinationId: 'munnar',
    destinationName: 'Munnar',
    state: 'Kerala',
    location: 'Spice Plantation Homestead, Old Munnar, Kerala',
    duration: '3.5 Hours',
    difficulty: 'All Skill Levels',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 1350,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'The Kerala Sadhya is an architectural culinary experience of 24 distinct preparations served on an asymmetric banana leaf, balancing all six tastes (Shadrasa).',
    whatYouExperience: [
      'Forage fresh curry leaves, green peppercorns, and turmeric from plantation garden beds',
      'Grate and press fresh coconut milk in three distinct consistencies (Thalappal)',
      'Cook Avial with local mountain tubers and simmer fragrant Pineapple Pachadi',
      'Master the etiquette of folding the banana leaf inward to honor the cook'
    ],
    foodInsights: {
      dishOrTradition: 'Traditional Kerala Sadhya & Payasam',
      whatMakesItSpecial: 'Zero artificial preservatives or onions/garlic in sacred temple versions; relies purely on fresh pressed coconut, shallots, cumin, yogurt, and coconut oil for depth.',
      keyIngredients: ['Cold-pressed Coconut Oil', 'Small Shallots (Cheriya Ulli)', 'Green Cardamom', 'Curry Leaves', 'Matta Red Rice'],
      culturalOccasion: 'Celebrated for Onam, Vishu, temple harvests, and auspicious milestones.',
      cookingMethod: 'Gentle clay Uruli simmering over low wood fire.'
    },
    makerInfo: {
      name: 'Amma’s Plantation Kitchen',
      roleOrCooperative: 'Spice Farm Culinary Homestead',
      craft: 'Traditional Travancore & High-Range Cookery',
      experienceYears: 'Heritage Family Homestead',
      location: 'Munnar Valley, Kerala',
      story: 'Homestead cooking where 90% of ingredients are harvested within 200 meters of the kitchen door.',
      whatVisitorsExperience: 'Cracking fresh coconuts, grinding stone pestles, and eating with bare fingers off leaf platters.',
      isDemoProfile: true,
      workshopAvailability: 'Daily 10:30 AM - 2:00 PM (Morning plantation cooking batch)',
      journeyPathway: ['Munnar Spice Farm', 'Forage fresh curry leaves & spices', 'Press coconut milk in Uruli pot', 'Cook 5 sadhya delicacies', 'Meet Amma & family cooks'],
      makerCategory: 'community'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'traditional cooking class near Munnar',
    tags: ['Kerala Sadhya', 'Coconut Oil', 'Avial', 'Taste the Region']
  },
  {
    id: 'exp-kerala-kathakali-mudra',
    title: 'Kathakali Mudras, Facial Expressions & Chutti Art Workshop',
    tagline: 'Learn ancient Sanskrit hand mudras and natural mineral green makeup.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'dance_music',
    destinationId: 'munnar',
    destinationName: 'Munnar & Kochi Environs',
    state: 'Kerala',
    location: 'Kalari Heritage Hall, Munnar / Kochi, Kerala',
    duration: '2.5 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 850,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Kathakali is Kerala’s 17th-century classical dance-drama where actors speak purely through 24 root hand gestures (Hastas) and Navarasa (9 primary emotional facial movements).',
    whatYouExperience: [
      'Learn the 9 canonical Navarasa facial expressions (Wonder, Courage, Peace, Love) with veteran masters',
      'Practice 12 fundamental hand mudras used to depict deer, lotus, battle, and river currents',
      'Watch master makeup artists apply 3D Chutti white rice paste borders and paccha (green) mineral pigment',
      'Try on the lightweight Kireetam (gilded wooden head crown) for a commemorative photo'
    ],
    makerInfo: {
      name: 'Kerala Kathakali Kalari Gurukulam',
      roleOrCooperative: 'Classical Sanskrit Performing Guild',
      craft: 'Kathakali Abhinaya, Mudras & Chutti Makeup',
      experienceYears: '45 Years of Kalari Preservation',
      location: 'Heritage Theatre Hall, Munnar Environs, Kerala',
      story: 'Dedicated to deconstructing the 500-year-old dance drama code for global audiences without losing traditional rigor.',
      whatVisitorsExperience: 'The transformative feeling of learning to communicate complex stories using only eye movements and palm geometry.',
      isDemoProfile: true,
      workshopAvailability: 'Daily 4:00 PM - 6:30 PM (Pre-show masterclass)',
      journeyPathway: ['Kathakali Kalari', 'Learn Navarasa eye movements', 'Practice 24 root hand mudras', 'Observe Chutti natural makeup application', 'Meet Kathakali Asan'],
      makerCategory: 'artisan'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'Kathakali cultural centre Kerala',
    tags: ['Kathakali', 'Hand Mudras', 'Navarasa', 'Dance & Music', 'Make Something']
  },

  // ==========================================
  // UTTAR PRADESH - VARANASI
  // ==========================================
  {
    id: 'exp-varanasi-banarasi-weaving',
    title: 'Banarasi Brocade & Zari Weaving in the Ancient Silk Mohallas',
    tagline: 'Witness real silver zari woven into pure mulberry silk.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'weaving',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    state: 'Uttar Pradesh',
    location: 'Madanpura / Peelee Kothi Weavers Mohalla, Varanasi',
    duration: '3 Hours',
    difficulty: 'Intermediate',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 1250,
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Mentioned in the Buddhist Jatakas and Mahabharata, Varanasi’s Kadhwa brocades feature raised metallic motifs that appear almost hand-embroidered on fine silk.',
    whatYouExperience: [
      'Walk narrow, rhythmic alleys where handlooms click in nearly every ancient courtyard',
      'Understand how Jacquard punch-cards translate hand-drawn floral jaal patterns into warp movements',
      'Sit on a pit-loom and try inserting metallic zari thread into a fine silk border',
      'Learn how to distinguish real pure silver zari from synthetic electroplated threads'
    ],
    makerInfo: {
      name: 'Bunkar Sahakari Samiti Madanpura',
      roleOrCooperative: 'Varanasi Heritage Handloom Cooperative',
      craft: 'Kadhwa & Tanchoi Banarasi Silk Weaving (GI Tagged)',
      experienceYears: '6th Generation Master Weavers',
      location: 'Madanpura Mohalla, Varanasi, Uttar Pradesh',
      story: 'Families who have sustained India’s most prized bridal textile heritage through centuries of political and industrial shifts.',
      whatVisitorsExperience: 'Intimate conversation with master weavers who demonstrate the mathematical genius of miniature punch-cards.',
      isDemoProfile: true,
      workshopAvailability: 'Monday to Saturday 10:00 AM - 6:00 PM (Direct courtyard loom visits)',
      journeyPathway: ['Varanasi Peelee Kothi', 'Jacquard punch card translation', 'Visit silk pit-loom mohalla', 'Insert pure silver zari thread', 'Meet Bunkar elders'],
      makerCategory: 'weaver'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'handloom weavers near Varanasi',
    tags: ['Banarasi Silk', 'Zari Brocade', 'Handloom Weaving', 'Make Something', 'GI Tag']
  },
  {
    id: 'exp-varanasi-subah-e-banaras',
    title: 'Subah-e-Banaras Morning Raga Awakening & Classical Sitar Jam',
    tagline: 'Experience dawn ragas echoing across the misty Ganga ghats.',
    category: 'Performing Arts & Folk',
    makeSomethingType: 'dance_music',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    state: 'Uttar Pradesh',
    location: 'Assi Ghat & Tulsi Ghat Steps, Varanasi',
    duration: '2.5 Hours',
    difficulty: 'All Skill Levels',
    priceLevel: 'Budget (₹300 - ₹800)',
    priceInr: 450,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'The Benares Gharana is one of India’s most celebrated classical music lineages, famed for the thumri, shehnai of Ustad Bismillah Khan, and deep meditative morning ragas.',
    whatYouExperience: [
      'Gather at Assi Ghat before sunrise as twilight breaks over the eastern riverbank',
      'Listen to live morning ragas (Bhairav & Todi) performed on sitar, flute, and tabla',
      'Try holding a sitar and plucking your first basic scale note with a master teacher',
      'Sip hot clay-cup Malai Chai as temple conch shells announce the sunrise'
    ],
    makerInfo: {
      name: 'Pandit Mishra Gurukul Lineage',
      roleOrCooperative: 'Benares Sangeet Parampara Gurukul',
      craft: 'Benares Gharana Classical Sitar, Flute & Vocal Arts',
      experienceYears: '5th Generation Classical Ustads',
      location: 'Near Tulsi Ghat, Varanasi, Uttar Pradesh',
      story: 'A living lineage where music is taught by ear and devotion through ancient guru-shishya parampara.',
      whatVisitorsExperience: 'Sitting cross-legged on riverfront rugs feeling the sonic vibrations over the flowing Ganga.',
      isDemoProfile: true,
      workshopAvailability: 'Daily at Dawn (5:30 AM - 8:00 AM Ghat sessions)',
      journeyPathway: ['Assi Ghat Steps', 'Dawn Ganga silence', 'Sit with Gurukul classical musicians', 'Pluck sitar morning raga scale', 'Meet Pandit Mishra & shishyas'],
      makerCategory: 'community'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'classical music experience Varanasi ghats',
    tags: ['Classical Sitar', 'Morning Ragas', 'Ganga Ghats', 'Subah-e-Banaras', 'Dance & Music']
  },
  {
    id: 'exp-telangana-cheriyal-painting',
    title: 'Cheriyal Narrative Scroll Painting with Natural Mineral Colors',
    tagline: 'Paint traditional story characters using handmade tamarind seed khadi.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'painting',
    destinationId: 'pochampally',
    destinationName: 'Pochampally & Cheriyal',
    state: 'Telangana',
    location: 'Cheriyal Artisan Mohalla, Telangana',
    duration: '3 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 950,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Cheriyal scroll painting is a stylized version of Nakashi art, depicting narrative folklore on long rolls of khadi treated with tamarind seed paste and white clay.',
    whatYouExperience: [
      'Prepare traditional natural pigments from powdered sea shells, lampblack, and turmeric',
      'Learn the distinctive bold red background priming technique',
      'Outline iconic Cheriyal expressional eyes and mythological characters with squirrel-hair brushes',
      'Paint your own miniature Cheriyal wooden mask or scroll canvas to take home'
    ],
    makerInfo: {
      name: 'D. Vaikuntam Nakash Guild',
      roleOrCooperative: 'Master Cheriyal Scroll Painters',
      craft: 'Cheriyal Scroll Painting & Mask Art (GI Tagged)',
      experienceYears: 'National Award-Winning Heritage Family',
      location: 'Cheriyal / Hyderabad Artisan Enclave, Telangana',
      story: 'One of the few remaining hereditary families carrying forward the Telangana scroll storytelling art form.',
      whatVisitorsExperience: 'Working in a courtyard surrounded by drying miniature masks and vibrant mineral color pots.',
      isDemoProfile: true,
      workshopAvailability: 'Wednesday to Monday 11:00 AM - 4:00 PM (Mask painting slots daily)',
      journeyPathway: ['Cheriyal Mohalla', 'Tamarind seed khadi priming', 'Grind sea shell & turmeric pigments', 'Expressional eye brushwork', 'Meet Nakash family'],
      makerCategory: 'artisan'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'Cheriyal painting workshop Telangana',
    tags: ['Cheriyal Painting', 'Mineral Pigments', 'GI Tag', 'Make Something', 'Painting']
  },
  {
    id: 'exp-spiti-thangka-painting',
    title: 'Himalayan Buddhist Thangka Silk Painting & Meditation Art',
    tagline: 'Draw sacred geometric mandalas with ground lapis lazuli and gold leaf.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'painting',
    destinationId: 'spiti',
    destinationName: 'Spiti Valley',
    state: 'Himachal Pradesh',
    location: 'Key Monastery Arts Guild, Spiti Valley',
    duration: '3.5 Hours',
    difficulty: 'All Skill Levels',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 1200,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Thangka paintings are visual representations of Buddhist philosophy, measuring cosmological proportions with exacting mathematical grid geometry dating back over a thousand years.',
    whatYouExperience: [
      'Learn the ancient canonical geometric grid lines (Thigse) for painting the Buddha’s face',
      'Grind mineral colors from crushed Himalayan lapis lazuli, malachite, and cinnabar',
      'Apply micro-fine detail strokes with yak-hair precision brushes',
      'Paint your own peaceful lotus mandala on primed cotton canvas with gold accents'
    ],
    makerInfo: {
      name: 'Lama Tenzin Norbu Studio',
      roleOrCooperative: 'Spiti Monastic Art Guild',
      craft: 'Traditional Tibetan Thangka & Mineral Pigment Painting',
      experienceYears: '30 Years of Monastic Practice',
      location: 'Kaza / Key Gompa Environs, Spiti Valley',
      story: 'Trained in Dharamshala and Spiti monasteries, preserving meditative sacred art techniques for the next generation.',
      whatVisitorsExperience: 'Deep stillness, the scent of juniper incense, and gentle guidance on sacred geometry.',
      isDemoProfile: true,
      workshopAvailability: 'May to October 10:00 AM - 3:00 PM (Summer season monastic studio)',
      journeyPathway: ['Spiti Valley Key Monastery', 'Canonical Thigse grid study', 'Lapis lazuli stone grinding', 'Fine gold leaf brushwork', 'Meet monk painter'],
      makerCategory: 'artisan'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'thangka painting workshop Spiti',
    tags: ['Thangka Painting', 'Sacred Mandala', 'Spiti Monastery', 'Make Something', 'Painting']
  },

  // ==========================================
  // TAMIL NADU - MAHABALIPURAM & COONOOR
  // ==========================================
  {
    id: 'exp-mahabalipuram-granite-sculptor',
    title: 'Pallava Monolithic Stone Sculpting Masterclass',
    tagline: 'Master the chisel stroke used on 7th-century shore temples.',
    category: 'Workshops & Crafts',
    makeSomethingType: 'crafts',
    destinationId: 'mahabalipuram',
    destinationName: 'Mahabalipuram',
    state: 'Tamil Nadu',
    location: 'Sculptors Street, Mamallapuram, Tamil Nadu',
    duration: '2.5 Hours',
    difficulty: 'Beginner Friendly',
    priceLevel: 'Budget (₹300 - ₹800)',
    priceInr: 750,
    image: 'https://images.unsplash.com/photo-1599831104328-b141f6aae7d2?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Mamallapuram has been a UNESCO hub of living stone sculpture since the Pallava emperors carved open rock faces in the 600s AD. Thousands of sculptors work along one bustling street.',
    whatYouExperience: [
      'Learn classical iconographic measurements (Talamana) described in ancient temple carving canons',
      'Pick up a flat-edged hardened steel chisel and sculpt soft soapstone or granite',
      'Carve your own small Ganesha, Nandi, or lotus relief to keep forever',
      'Walk through open yards stacked with 15-foot monolithic granite temple pillars'
    ],
    makerInfo: {
      name: 'Mamallapuram Sthapathi Guild',
      roleOrCooperative: 'Government College of Architecture & Sculpture Guild',
      craft: 'Pallava Stone Carving & Monumental Sculpture (GI Tagged)',
      experienceYears: 'Generations of Certified Sthapathis',
      location: 'East Coast Road, Mamallapuram, Tamil Nadu',
      story: 'Custodians of canonical sculpture techniques whose work graces temples across India, Singapore, and Europe.',
      whatVisitorsExperience: 'The musical ringing sound of steel on granite echoing across the coastal artisan quarter.',
      isDemoProfile: true,
      workshopAvailability: 'Daily 8:00 AM - 6:00 PM (Open-air yard walk-ins welcome)',
      journeyPathway: ['Mahabalipuram', 'Sculptors Street', 'Visit Sthapathi open yard', 'Talamana proportion sketching', 'Meet master temple sculptors'],
      makerCategory: 'sculptor'
    },
    isDemoExperience: true,
    googlePlaceQuery: 'stone carving workshop near Mahabalipuram',
    tags: ['Stone Carving', 'Pallava Heritage', 'Sthapathi Art', 'Make Something']
  },
  {
    id: 'exp-coonoor-nilgiri-tea-botany',
    title: 'Nilgiri High-Range Tea Cupping & Botanical Hill Walk',
    tagline: 'Taste winter-frost Nilgiri teas with notes of passionfruit and cedar.',
    category: 'Local Food & Flavours',
    destinationId: 'coonoor',
    destinationName: 'Coonoor',
    state: 'Tamil Nadu',
    location: 'Sim’s Park Environs & Tea Slopes, Coonoor, Nilgiris',
    duration: '2.5 Hours',
    difficulty: 'All Skill Levels',
    priceLevel: 'Moderate (₹800 - ₹2000)',
    priceInr: 950,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'Unlike Assam or Darjeeling, Nilgiri teas grow in an exotic biosphere of eucalyptus, silver oak, and shola woods, producing a golden-amber cup famously smooth with natural fruitiness.',
    whatYouExperience: [
      'Stroll alongside aromatic tea terraces lined with wild eucalyptus and tree ferns',
      'Understand the rare "Frost Tea" phenomenon harvested on chilly January mornings',
      'Sample 5 artisanal small-batch teas: Nilgiri White, Golden Needle, and Green Infusions',
      'Pair tea tasting with traditional Toda tribal hand embroidery showcases'
    ],
    makerInfo: {
      name: 'Nilgiri Small Growers Craft Cooperative',
      roleOrCooperative: 'Blue Mountain Specialty Tea Artisans',
      craft: 'Small-Batch High Altitude Tea Making',
      location: 'Upper Coonoor, Tamil Nadu',
      story: 'Independent tea growers creating sustainable single-origin orthodox teas that celebrate the unique mountain micro-climates.',
      whatVisitorsExperience: 'Sipping delicate, golden liquor overlooking the dramatic Nilgiri Mountain Railway gorge.',
      isDemoProfile: true
    },
    isDemoExperience: true,
    googlePlaceQuery: 'tea tasting experience Coonoor Nilgiris',
    tags: ['Nilgiri Tea', 'Tea Cupping', 'Frost Tea', 'Blue Mountains']
  }
];

// ==========================================
// STATE DNA REPOSITORY
// ==========================================

export const STATE_DNA_DATA: Record<string, StateDNA> = {
  'Telangana': {
    state: 'Telangana',
    tagline: 'Deccan Granites, Geometric Ikats & Fiery Millet Flavours',
    heroImage: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=80',
    signatureCrafts: [
      { name: 'Pochampally Ikat', description: 'Double-Ikat geometric tie-and-dye on silk and cotton', GIStatus: true },
      { name: 'Gadwal Saree', description: 'Silk body with contrasting heavy zari border woven seamlessly', GIStatus: true },
      { name: 'Cheriyal Scroll Painting', description: 'Narrative storytelling painted on handmade khadi rolls with natural stone pigments', GIStatus: true },
      { name: 'Dhokra Bell Metal', description: 'Lost-wax brass and bronze tribal figurine casting without welding joints', GIStatus: true },
      { name: 'Nirmal Woodcraft & Paintings', description: 'Lacquered soft wood toys and canvas paintings based on classical murals', GIStatus: true }
    ],
    signatureFood: [
      { name: 'Jonna Rotte & Gongura Mamsam / Dal', description: 'Gluten-free sorghum flatbread paired with tangy roselle leaf gravies', mustTryAt: 'Rural Nalgonda & Warangal' },
      { name: 'Hyderabadi Dum Biryani', description: 'Fragrant aged basmati and marinated meat slow-cooked on dum over charcoal', mustTryAt: 'Old City, Hyderabad' },
      { name: 'Sarva Pindi', description: 'Crispy pan-fried savory rice-flour pancake embedded with chana dal, peanuts, and curry leaves', mustTryAt: 'Traditional village kitchens' },
      { name: 'Sakinalu', description: 'Spiral fried sesame-rice festive snack without dal or onion', mustTryAt: 'Sankranti harvest feasts' }
    ],
    performingArts: [
      { name: 'Perini Sivatandavam', description: 'Vigorous ancient warrior dance revived from Ramappa temple stone sculptures' },
      { name: 'Oggu Katha', description: 'Folk musical narrative recounting epics of pastoral deities using drums and brass cymbals' },
      { name: 'Chindu Yakshaganam', description: 'Colorful street theatre with vibrant makeup and dramatic vocal dialogues' }
    ],
    festivals: [
      { name: 'Bathukamma', month: 'Sept - Oct', significance: 'Floral celebration honoring the feminine spirit with seven concentric seasonal flower arrangements' },
      { name: 'Bonalu', month: 'July - August', significance: 'Thanksgiving to Goddess Mahakali with earthen pots carried by women adorned with neem leaves' },
      { name: 'Sammakka Sarakka Jatara', month: 'February (Biennial)', significance: 'Asia’s largest tribal gathering commemorating valor against unjust taxes' }
    ],
    culturalStories: [
      {
        title: 'The Telia Rumal Secret',
        story: 'Telia Rumal originated when weavers dipped yarn in castor oil and wild sheep dung to make fabric water-repellent for fishermen and Arab traders, evolving into the royal double-Ikat of Pochampally.'
      },
      {
        title: 'Ramappa: The Floating Bricks',
        story: 'The Kakatiya dynasty engineers at Ramappa Temple in Palampet used bricks so lightweight and porous they actually float on water, protecting the monument through devastating earthquakes.'
      }
    ],
    famousArtisanProducts: ['Pochampally Sarees', 'Pembarthi Brassware', 'Cheriyal Masks', 'Nirmal Wooden Toys', 'Silver Filigree Karimnagar'],
    localExperiences: [
      'Try handloom weaving at Pochampally pit-looms',
      'Forage medicinal forest shrubs at Ananthagiri hills',
      'Experience Sarva Pindi preparation in a village mud kitchen',
      'Listen to Perini dancer temple rhythms at Ramappa'
    ],
    workshops: [
      {
        title: 'Pochampally Double-Ikat Pit-Loom Weaving',
        type: 'Handloom & Weaving',
        location: 'Bhoodan Pochampally, Telangana',
        description: 'Throw the shuttle on wooden pit-looms and learn the 8-step yarn tie-and-dye graphing technique with master weavers.',
        duration: '3.5 Hours'
      },
      {
        title: 'Red Deccan Terracotta Pottery & Wheel Throwing',
        type: 'Pottery',
        location: 'Kotepally / Vikarabad, Telangana',
        description: 'Harvest red river silt and shape porous clay drinking kulhads on a non-electric rotating stone flywheel.',
        duration: '2 Hours'
      },
      {
        title: 'Cheriyal Narrative Scroll Painting with Mineral Dyes',
        type: 'Painting',
        location: 'Cheriyal Artisan Quarter, Telangana',
        description: 'Prime handmade tamarind seed khadi rolls and paint expressive folklore characters using natural stone pigments.',
        duration: '3 Hours'
      },
      {
        title: 'Deccan Millet Kitchen: Jonna Rotte & Gongura Pounding',
        type: 'Cooking Class',
        location: 'Pochampally Rural Homestead, Telangana',
        description: 'Master hand-slapping sorghum rotis on open clay griddles and pound wild roselle leaves on an ancient stone mortar.',
        duration: '2 Hours'
      }
    ],
    artisanCommunities: [
      {
        name: 'Padmashali & Mallesham Weavers Guild',
        craft: 'Pochampally Double-Ikat Silk Weaving (GI Tag)',
        location: 'Bhoodan Pochampally, Yadadri Bhuvanagiri',
        heritageStory: 'Centuries-old community of over 80 weaver families preserving hand-drawn Telia Rumal and geometric double-Ikat techniques.',
        visitingGuidance: 'Open living-room looms where visitors are welcomed to observe warp tying and try the pit-loom.'
      },
      {
        name: 'Kummari Ramulu Village Potters Guild',
        craft: 'Deccan Terracotta Earthenware & Diyas',
        location: 'Kotepally Artisan Hamlet, Vikarabad',
        heritageStory: 'Generations of potters shaping mineral-rich red soil into naturally cooling water vessels using heavy stone flywheels.',
        visitingGuidance: 'Hands-on courtyard pottery trials available daily during daylight hours.'
      },
      {
        name: 'D. Vaikuntam Nakash Scroll Painters',
        craft: 'Cheriyal Narrative Scroll Painting & Masks (GI Tag)',
        location: 'Cheriyal / Hyderabad Artisan Enclave',
        heritageStory: 'National Award-winning heritage family carrying forward the 400-year-old Telangana storytelling scroll tradition.',
        visitingGuidance: 'Studio visits demonstrate natural mineral color grinding and mask sculpting.'
      }
    ]
  },

  'Rajasthan': {
    state: 'Rajasthan',
    tagline: 'Colors of the Desert, Royal Forts & Timeless Chhippa Block Art',
    heroImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    signatureCrafts: [
      { name: 'Bagru & Sanganeri Block Print', description: 'Hand-stamped natural vegetable and indigo dye textiles', GIStatus: true },
      { name: 'Jaipur Blue Pottery', description: 'Clay-free quartz ceramic glazed with Persian cobalt oxide', GIStatus: true },
      { name: 'Mojari Leather Footwear', description: 'Embroidered camel and buffalo leather shoes crafted by master cobblers', GIStatus: true },
      { name: 'Kundan & Meenakari Jewelry', description: 'Gold foil setting with enameled reverse side perfected in Jaipur royal ateliers', GIStatus: true },
      { name: 'Kota Doria Fabric', description: 'Translucent checkered weave of silk and cotton called Khat', GIStatus: true }
    ],
    signatureFood: [
      { name: 'Dal Baati Churma', description: 'Charcoal-baked whole-wheat balls cracked into rich ghee, served with 5-lentil dal and sweet crumbled churma', mustTryAt: 'Jaipur & Marwar' },
      { name: 'Ker Sangri', description: 'Wild desert capers and dried bean pods sautéed in mustard oil and raw mango powder', mustTryAt: 'Jaisalmer & Bikaner' },
      { name: 'Laal Maas', description: 'Smoky mutton curry fiery with indigenous Mathania red chilies and yogurt', mustTryAt: 'Royal Rajput kitchens' },
      { name: 'Ghewar', description: 'Honeycomb disc sweet drenched in saffron syrup and fresh rabdi', mustTryAt: 'Teej festival bazaars' }
    ],
    performingArts: [
      { name: 'Ghoomar', description: 'Graceful pirouetting dance performed by women in swirling colorful ghagras' },
      { name: 'Kalbelia Dance', description: 'Sensuous, serpentine movements mimicking snakes, recognized by UNESCO' },
      { name: 'Manganiyar & Langa Music', description: 'Hypnotic desert folk epics accompanied by Kamaicha and Khartal' }
    ],
    festivals: [
      { name: 'Pushkar Camel Fair', month: 'October - November', significance: 'Massive cultural livestock fair and holy lake pilgrimage in the Thar desert' },
      { name: 'Jaisalmer Desert Festival', month: 'February', significance: 'Three-day extravaganza of folk dances, turban tying, and camel polo amid golden dunes' },
      { name: 'Teej & Gangaur', month: 'July - August & March', significance: 'Celebrations welcoming monsoon and matrimonial devotion through grand royal processions' }
    ],
    culturalStories: [
      {
        title: 'The Mathania Chili Legend',
        story: 'The legendary red hue of Rajasthani cuisine comes exclusively from the soil around Mathania village, where seeds dried on open desert sands gain intense color without harsh stomach burning.'
      },
      {
        title: 'The Blue City Ochre Defense',
        story: 'Jodhpur’s signature blue wash originally came from copper sulfate and limestone applied to Brahmin residences to repel desert termites and reflect fierce solar radiation.'
      }
    ],
    famousArtisanProducts: ['Bagru Block Print Quilts', 'Blue Pottery Vases', 'Bandhani Silk Dupattas', 'Jodhpuri Mojaris', 'Marble Inlay Artifacts'],
    localExperiences: [
      'Stamp your own Dabu mud print scarf in Bagru',
      'Bake Baatis over cow-dung embers with a local family',
      'Sit with Manganiyar balladeers on the Sam dunes under the Milky Way',
      'Learn block-chisel carving at an artisan workshop'
    ],
    workshops: [
      {
        title: 'Bagru Mud-Resist (Dabu) Indigo Block Printing',
        type: 'Block Printing',
        location: 'Chhipa Mohalla, Bagru, Rajasthan',
        description: 'Stamp hand-carved teakwood blocks and submerge cloth into 200-year-old subterranean fermented indigo vats.',
        duration: '3 Hours'
      },
      {
        title: 'Jaipur Turquoise Blue Quartz Pottery & Glaze Art',
        type: 'Pottery',
        location: 'Kot Jewar / Bani Park, Jaipur, Rajasthan',
        description: 'Craft Egyptian-origin ceramic without clay using ground quartz stone, Fuller’s earth, and cobalt oxide arabesque painting.',
        duration: '2.5 Hours'
      },
      {
        title: 'Desert Hearth: Dal Baati Churma Masterclass',
        type: 'Cooking Class',
        location: 'Heritage Haveli Courtyard, Jaisalmer / Jaipur',
        description: 'Bake whole-wheat dough balls over gentle cow-dung coals and submerge them in pure desi ghee.',
        duration: '3 Hours'
      },
      {
        title: 'Manganiyar Thar Desert Kamaicha & Khartal Session',
        type: 'Dance & Music',
        location: 'Barna Village, Thar Desert, Jaisalmer',
        description: 'Learn the rhythmic castanet clack of wooden Khartal and hear 800-year-old unwritten Marwari desert ballads.',
        duration: '2.5 Hours'
      }
    ],
    artisanCommunities: [
      {
        name: 'Chhipa Dabu Block Printers Guild',
        craft: 'Natural Vegetable Dye Block Printing (GI Tag)',
        location: 'Bagru Artisan Quarter, Rajasthan',
        heritageStory: 'Passing down block carving and mud-resist chemistry along the Sanjariya river basin for over 400 years.',
        visitingGuidance: 'Open daylight courtyard workshops where visitors can print alongside 5th generation families.'
      },
      {
        name: 'Kripal Kumbh Blue Pottery Legacy Studio',
        craft: 'Traditional Quartz Blue Pottery (GI Tag)',
        location: 'Bani Park / Sanganer, Jaipur',
        heritageStory: 'Revivalist master studio credited with rescuing clay-free Persian-origin ceramic arts from extinction.',
        visitingGuidance: 'Tile molding and cobalt painting sessions open by pre-booking.'
      },
      {
        name: 'Ustad Gazi Khan Manganiyar Enclave',
        craft: 'Hereditary Kamaicha & Khartal Oral Epics',
        location: 'Barna Village, Jaisalmer Desert',
        heritageStory: 'Generations of hereditary desert troubadours who preserved ancestral genealogies without written text.',
        visitingGuidance: 'Intimate evening acoustic sessions around tamarisk wood campfires.'
      }
    ]
  },

  'Karnataka': {
    state: 'Karnataka',
    tagline: 'Empire Boulders, Mysore Silks & Malnad Coffee Rainfalls',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    signatureCrafts: [
      { name: 'Mysore Silk Sarees', description: 'High-density pure mulberry silk with real gold zari borders', GIStatus: true },
      { name: 'Channapatna Wooden Toys', description: 'Natural vegetable-lacquered non-toxic wooden toys turned on lathes', GIStatus: true },
      { name: 'Bidriware Metal Inlay', description: 'Pure silver inlaid onto blackened zinc and copper alloys using Bidar fort soil', GIStatus: true },
      { name: 'Ilkal Sarees', description: 'Distinct red and white Kasuti embroidered pallu woven with heritage loops', GIStatus: true }
    ],
    signatureFood: [
      { name: 'Bisi Bele Bath', description: 'Comforting slow-cooked rice, lentils, seasonal vegetables, and freshly ground spice blend with ghee', mustTryAt: 'Bangalore heritage darshinis' },
      { name: 'Mysore Pak', description: 'Gram flour, sugar syrup, and bubbling hot ghee whipped into melt-in-mouth richness', mustTryAt: 'Guru Sweet Mart, Mysore' },
      { name: 'Mangalore Neer Dosa & Ghee Roast', description: 'Delicate water-thin rice crêpes paired with fiery Kundapur ghee roast', mustTryAt: 'Coastal Udupi & Mangalore' },
      { name: 'Jolada Rotti Oota', description: 'North Karnataka crisp sorghum rotis with brinjal curry and peanut podis', mustTryAt: 'Khanavalis of Hubli-Dharwad' }
    ],
    performingArts: [
      { name: 'Yakshagana', description: 'Monumental mythological dance-drama featuring elaborate headgear and fiery extempore dialogue' },
      { name: 'Dollu Kunitha', description: 'A dynamic, high-energy drum dance accompanied by acrobatic leaps and devotional singing' },
      { name: 'Kamsale', description: 'Rhythmic brass cymbal dance performed by Kuruba devotees of Lord Mahadeshwara' }
    ],
    festivals: [
      { name: 'Mysore Dasara', month: 'September - October', significance: 'Grand ten-day royal festival culminating in the Jamboo Savari elephant procession carrying the golden Chamundeshwari idol' },
      { name: 'Hampi Utsav', month: 'November', significance: 'Spectacular lighting and music festival celebrating the ruins and glory of the Vijayanagara Empire' },
      { name: 'Kambala Buffalo Race', month: 'November - March', significance: 'Adrenaline-packed coastal muddy paddy field sprint with trained paired water buffaloes' }
    ],
    culturalStories: [
      {
        title: 'The Soil of Bidar Fort',
        story: 'The rich jet-black finish of Bidriware metalwork can only be produced using soil collected from centuries-old, sun-deprived cellars inside Bidar Fort, containing unique natural nitrates.'
      }
    ],
    famousArtisanProducts: ['Mysore Sandalwood Oil & Soap', 'Channapatna Toys', 'Bidriware Hookahs & Plates', 'Coorg Honey & Coffee Beans'],
    localExperiences: [
      'Chisel Dravidian relief sculptures with stone carvers near Hampi',
      'Row a woven bamboo coracle through Tungabhadra rapids',
      'Walk shaded Arabica coffee plantations in Coorg during blossom season',
      'Watch night-long Yakshagana performances in a coastal village temple'
    ],
    workshops: [
      {
        title: 'Vijayanagara Granite Relief Chiseling Masterclass',
        type: 'Traditional Crafts',
        location: 'Kamalapur Sculptor Guild / Anegundi, Hampi',
        description: 'Strike carbon-steel hand chisels and wooden mallets against Deccan granite to carve sacred lotus bas-reliefs.',
        duration: '3 Hours'
      },
      {
        title: 'Tungabhadra Bamboo Coracle Weaving',
        type: 'Traditional Crafts',
        location: 'Anegundi Riverside Hamlet, Across Tungabhadra, Hampi',
        description: 'Weave green bamboo strips into circular skeletal boat frames and row across boulder rapids.',
        duration: '2.5 Hours'
      },
      {
        title: 'North Karnataka Jolada Rotti & Yennegai Cooking',
        type: 'Cooking Class',
        location: 'Khanavali Kitchen, Kamalapur, Karnataka',
        description: 'Slap thin sorghum flatbreads on raging iron griddles and grind roasted Shenga chutney powders.',
        duration: '2 Hours'
      }
    ],
    artisanCommunities: [
      {
        name: 'Shilpa Shastra Guild Kamalapur',
        craft: 'Dravidian Granite Sculpture & Iconography',
        location: 'Archaeological Museum Lane, Kamalapur, Hampi',
        heritageStory: 'Hereditary stone sculptors preserving temple proportion texts handed down from Vijayanagara imperial architects.',
        visitingGuidance: 'Open-air stone yard welcoming visitors to observe chiseling and explore acoustic musical stones.'
      },
      {
        name: 'Anegundi Ferrymen Boatmen Collective',
        craft: 'Bamboo Coracle Weaving & River Navigation',
        location: 'Virupapur Gaddi / Anegundi Ghats, Karnataka',
        heritageStory: 'River families holding hereditary ferry rights across the Tungabhadra rapids for over 600 years.',
        visitingGuidance: 'Boat building yards along the river bank offer coracle-weaving demonstrations.'
      },
      {
        name: 'Basaveshwara Khanavali Heritage Kitchens',
        craft: 'Traditional North Karnataka Lingayat Oota',
        location: 'Hampi-Kamalapur Road, Karnataka',
        heritageStory: 'A 50-year-old family institution dedicated to whole-grain millet culinary traditions of the Deccan plain.',
        visitingGuidance: 'Open kitchen where travelers can watch five rotis per minute slapped by master cooks.'
      }
    ]
  },

  'Kerala': {
    state: 'Kerala',
    tagline: 'Spice Canopies, Backwater Stillness & Ancient Kathakali Mudras',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    signatureCrafts: [
      { name: 'Aranmula Kannadi', description: 'Front-surface metal alloy mirrors cast using secret metallurgical formulas without glass', GIStatus: true },
      { name: 'Balaramapuram Handlooms', description: 'Pure unbleached fine cotton Kasavu sarees with gold zari border', GIStatus: true },
      { name: 'Coir & Coconut Shell Art', description: 'Biodegradable woven floor mats, ropes, and polished shell tableware' }
    ],
    signatureFood: [
      { name: 'Kerala Sadhya', description: 'Over 20 distinct plant-based dishes served on banana leaf for Onam and festive milestones', mustTryAt: 'Across Travancore and Palakkad' },
      { name: 'Appam with Vegetable Ishtu', description: 'Fermented rice and coconut hoppers with soft spongy centers and delicate coconut-milk stew', mustTryAt: 'Kottayam & Kochi' },
      { name: 'Malabar Parotta & Beef/Mushroom Roast', description: 'Flaky layered spiral flatbread served with caramelised shallot and curry leaf gravy', mustTryAt: 'Calicut & Malabar Coast' }
    ],
    performingArts: [
      { name: 'Kathakali', description: 'World-renowned classical dance-drama famous for intricate facial mudras and 4-hour makeup rituals' },
      { name: 'Kalaripayattu', description: 'One of the oldest martial arts on earth involving animal forms, flexibility, and wooden weaponry' },
      { name: 'Theyyam', description: 'Trance-like ritual temple performance where dancers embody living ancestral deities in northern Malabar' }
    ],
    festivals: [
      { name: 'Onam & Snake Boat Races', month: 'August - September', significance: 'State harvest festival with floral carpets (Pookalam) and 100-oarsmen Chundan Vallam regattas' },
      { name: 'Thrissur Pooram', month: 'April - May', significance: 'The festival of festivals featuring competing caparisoned elephants, umbrella displays, and Ilanjithara Melam percussion' }
    ],
    culturalStories: [
      {
        title: 'The Secret of the Aranmula Mirror',
        story: 'Unlike modern mirrors where light reflects from behind glass causing distortion, the Aranmula Kannadi reflects light directly from its hand-polished metal alloy surface, giving a true, distortion-free optical reflection.'
      }
    ],
    famousArtisanProducts: ['Aranmula Metal Mirrors', 'Nilgiri Orthodox Tea', 'Spices of Wayanad', 'Kasavu Dhotis & Sarees'],
    localExperiences: [
      'Pluck tea at Kolukkumalai 8,000 feet above the clouds',
      'Cook a 24-dish Sadhya using fresh coconut milk on a homestead',
      'Watch Kathakali performers apply green Chutti facial makeup backstage',
      'Learn Kalaripayattu animal breathing postures in a traditional clay pit'
    ],
    workshops: [
      {
        title: 'Kathakali Mudras, Facial Expressions & Chutti Art',
        type: 'Dance & Music',
        location: 'Kalari Heritage Hall, Munnar / Kochi, Kerala',
        description: 'Learn the 9 canonical Navarasa facial expressions and practice 12 fundamental hand mudras with veteran Kathakali masters.',
        duration: '2.5 Hours'
      },
      {
        title: 'Authentic 24-Dish Kerala Sadhya Cooking Masterclass',
        type: 'Cooking Class',
        location: 'Spice Plantation Homestead, Old Munnar, Kerala',
        description: 'Forage fresh spices, press fresh coconut milk in three consistencies, and simmer Avial in heavy clay Uruli pots.',
        duration: '3.5 Hours'
      },
      {
        title: 'Kolukkumalai High-Altitude Orthodox Tea Plucking',
        type: 'Traditional Crafts',
        location: 'Kolukkumalai Highland Estate (7,900 ft), Munnar Environs',
        description: 'Pluck tender top flush shoots and step inside a functioning 90-year-old wooden factory driven by mechanical pulleys.',
        duration: '4 Hours'
      }
    ],
    artisanCommunities: [
      {
        name: 'Kerala Kathakali Kalari Gurukulam',
        craft: 'Classical Sanskrit Performing Guild & Chutti Makeup',
        location: 'Munnar & Central Kerala Environs',
        heritageStory: 'Living lineage of Kathakali actors and makeup artists dedicated to deconstructing the 500-year-old dance drama code.',
        visitingGuidance: 'Pre-show greenroom access to observe the 4-hour rice-paste 3D Chutti facial makeup application.'
      },
      {
        name: 'Aranmula Metallurgical Artisan Guild',
        craft: 'Front-Surface Metal Alloy Mirror Casting (GI Tag)',
        location: 'Aranmula, Pathanamthitta District',
        heritageStory: 'A small group of hereditary craftsmen casting distortion-free optical alloy mirrors without glass using secret copper-tin proportions.',
        visitingGuidance: 'Visits allow observation of clay mold making and manual polishing with velvet cloth.'
      },
      {
        name: 'Amma’s Plantation Kitchen Culinary Collective',
        craft: 'Traditional Travancore & High-Range Cookery',
        location: 'Munnar Valley Homesteads, Kerala',
        heritageStory: 'Homestead kitchen where 90% of ingredients are harvested within 200 meters of the kitchen door.',
        visitingGuidance: 'Homestead cooking workshops open daily for lunch preparations by reservation.'
      }
    ]
  },

  'Tamil Nadu': {
    state: 'Tamil Nadu',
    tagline: 'Living Chola Temples, Kanchipuram Silks & Chettinad Spices',
    heroImage: 'https://images.unsplash.com/photo-1599831104328-b141f6aae7d2?auto=format&fit=crop&w=1200&q=80',
    signatureCrafts: [
      { name: 'Kanchipuram Silk Sarees', description: 'Woven with heavy three-ply twisted silk and pure gold zari with Korvai borders', GIStatus: true },
      { name: 'Thanjavur Paintings', description: 'Sacred depictions embellished with 22-carat gold foil and semi-precious stones', GIStatus: true },
      { name: 'Swamimalai Bronze Idols', description: 'Lost-wax bronze idols crafted strictly following Shilpa Shastra canons', GIStatus: true }
    ],
    signatureFood: [
      { name: 'Chettinad Pepper Chicken & Kozhambu', description: 'Layered spice pastes made from stone-ground black pepper, star anise, and kalpasi stone flower', mustTryAt: 'Karaikudi, Chettinad' },
      { name: 'Madurai Jigarthanda', description: 'Cooling drink of almond gum (badam pisin), nannari syrup, basundi, and condensed milk', mustTryAt: 'Madurai East Gate' },
      { name: 'Filter Coffee & Medu Vada', description: 'Chicory-blended coffee poured back and forth from dabarah and tumbler to build rich foam', mustTryAt: 'Kumbakonam & Chennai' }
    ],
    performingArts: [
      { name: 'Bharatanatyam', description: 'The ancient temple dance form synthesizing Bhava (expression), Raga (melody), and Tala (rhythm)' },
      { name: 'Carnatic Music', description: 'One of the world’s most intricate classical vocal and instrumental music systems' },
      { name: 'Karagattam', description: 'Folk acrobatic balance dance with decorated brass pots on dancers’ heads' }
    ],
    festivals: [
      { name: 'Pongal', month: 'January', significance: 'Four-day harvest thanksgiving to the Sun God with boiling milk-and-rice pots (Pongalo Pongal!)' },
      { name: 'Margazhi Music Festival', month: 'December - January', significance: 'The largest classical musical festival in the world spanning over 1,500 concerts across Chennai sabhas' }
    ],
    culturalStories: [
      {
        title: 'The Shadowless Tanjore Vimana',
        story: 'The 80-tonne granite dome of the Brihadisvara Temple in Thanjavur was hauled up a 6-kilometer earthen ramp by elephants in 1010 AD, designed with astronomical perfection.'
      }
    ],
    famousArtisanProducts: ['Kanchipuram Silks', 'Thanjavur Art Plates', 'Chettinad Athangudi Tiles', 'Swamimalai Bronzes'],
    localExperiences: [
      'Chisel granite stone reliefs alongside hereditary sculptors in Mahabalipuram',
      'Grind fresh black pepper spice pastes on ancient stone slabs in Chettinad',
      'Sip degree filter coffee served in traditional brass dabarahs',
      'Watch gold foil application on traditional Thanjavur paintings'
    ],
    workshops: [
      {
        title: 'Pallava Monolithic Stone Sculpting Masterclass',
        type: 'Traditional Crafts',
        location: 'Sculptors Street, Mamallapuram, Tamil Nadu',
        description: 'Learn canonical iconographic Talamana measurements and chisel soft soapstone or granite with master temple sthapathis.',
        duration: '2.5 Hours'
      },
      {
        title: 'Nilgiri High-Range Tea Cupping & Botanical Walk',
        type: 'Local Food & Flavours',
        location: 'Sim’s Park Environs, Coonoor, Nilgiris',
        description: 'Stroll aromatic tea terraces and sample 5 artisanal small-batch high-altitude teas with local growers.',
        duration: '2.5 Hours'
      }
    ],
    artisanCommunities: [
      {
        name: 'Mamallapuram Sthapathi Sculptor Guild',
        craft: 'Pallava Monolithic Stone Carving (GI Tagged)',
        location: 'East Coast Road, Mamallapuram, Tamil Nadu',
        heritageStory: 'Custodians of canonical sculpture techniques since the Pallava emperors carved open rock cliffs in 600 AD.',
        visitingGuidance: 'Open sculptor workshops along Sculptors Street welcoming observation and stone trial chisel strokes.'
      },
      {
        name: 'Nilgiri Small Growers Craft Cooperative',
        craft: 'Single-Origin Orthodox Tea Making',
        location: 'Upper Coonoor, Nilgiris',
        heritageStory: 'Independent mountain tea farmers producing sustainable single-origin orthodox teas celebrating high-range micro-climates.',
        visitingGuidance: 'Tea cupping and plantation walks led directly by cooperative growers.'
      }
    ]
  },

  'Uttar Pradesh': {
    state: 'Uttar Pradesh',
    tagline: 'River of Antiquity, Banarasi Zari Silk & Awadhi Gastronomy',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    signatureCrafts: [
      { name: 'Banarasi Brocade & Silk', description: 'Intricate silver and gold zari brocades on mulberry silk woven on pit-looms', GIStatus: true },
      { name: 'Lucknowi Chikankari', description: 'Delicate hand embroidery using white-on-white cotton shadow work', GIStatus: true },
      { name: 'Kannauj Attar', description: 'Natural deg-bhapka distilled perfumes capturing the scent of petrichor on clay', GIStatus: true },
      { name: 'Bhadohi Hand-Knotted Carpets', description: 'World-renowned wool and silk carpets with up to 400 knots per square inch', GIStatus: true }
    ],
    signatureFood: [
      { name: 'Banarasi Kachori Jalebi & Tamatar Chaat', description: 'Crisp dal-stuffed kachoris with hing aloo, followed by piping hot saffron jalebis', mustTryAt: 'Old Varanasi Ghats' },
      { name: 'Awadhi Dum Biryani & Galouti Kebab', description: 'Melt-in-mouth spiced patties created for the toothless Nawab of Lucknow', mustTryAt: 'Aminabad & Chowk, Lucknow' },
      { name: 'Malaiyyo (Makhan Malai)', description: 'Foamy, saffron-infused dew-kissed milk foam served exclusively on winter mornings in Varanasi', mustTryAt: 'Chaukhamba, Varanasi' }
    ],
    performingArts: [
      { name: 'Kathak (Lucknow & Benares Gharanas)', description: 'Classical storytelling dance celebrated for dazzling pirouettes and expressive abhinaya' },
      { name: 'Benares Sangeet Parampara', description: 'Soulful classical vocal and shehnai traditions rooted along the sacred riverbanks' },
      { name: 'Raslila of Braj', description: 'Devotional theatre reenacting the pastoral romance of Radha and Krishna' }
    ],
    festivals: [
      { name: 'Dev Deepawali', month: 'November (Kartik Purnima)', significance: 'A million clay lamps lit across every riverfront step in Varanasi as gods descend to bathe' },
      { name: 'Lathmar Holi', month: 'March', significance: 'Legendary playful Holi celebration in Barsana and Nandgaon with colored powders and shields' }
    ],
    culturalStories: [
      {
        title: 'Mitti Attar: Perfume of Rain',
        story: 'In Kannauj, master perfumers bake dried baked clay cakes in copper stills and condense the vapors into sandalwood base oil, creating Mitti Attar—the world-famous perfume of monsoon rain hitting parched soil.'
      }
    ],
    famousArtisanProducts: ['Banarasi Silk Sarees', 'Kannauj Mitti Attar', 'Chikankari Kurtas', 'Brass Idols of Moradabad'],
    localExperiences: [
      'Sit on an ancient pit-loom in Madanpura weaving silver zari silk',
      'Wake before dawn for Subah-e-Banaras morning sitar ragas at Assi Ghat',
      'Taste winter-morning Malaiyyo foam in the labyrinths of Varanasi',
      'Smell sandalwood attar being distilled in centuries-old copper cauldrons'
    ],
    workshops: [
      {
        title: 'Banarasi Brocade & Zari Pit-Loom Weaving',
        type: 'Handloom & Weaving',
        location: 'Madanpura & Peeli Kothi Artisan Mohalla, Varanasi',
        description: 'Sit beside 4th-generation Ansari master weavers on a subterranean pit-loom, learning how jacquard punch cards guide pure silver zari warp threads.',
        duration: '3 Hours'
      },
      {
        title: 'Morning Ragas & Sitar Heritage Masterclass',
        type: 'Dance & Music',
        location: 'Kabir Chaura Music Enclave / Assi Ghat, Varanasi',
        description: 'Explore the 500-year-old Benares Gharana musical tradition, learning basic sitar fingering and the vocal philosophy of morning ragas.',
        duration: '2 Hours'
      }
    ],
    artisanCommunities: [
      {
        name: 'Ansari & Madanpura Master Weavers Guild',
        craft: 'Pure Silk Banarasi Brocade & Kadhwa Weaving (GI Tag)',
        location: 'Madanpura, Old Varanasi',
        heritageStory: 'Generations of master silk weavers preserving the intricate Kadhwa needle-embroidery weaving technique where motifs are hand-inlaid without loose threads on the back.',
        visitingGuidance: 'Respectful visits to courtyard pit-looms welcomed during daytime hours (10:00 AM - 5:00 PM).'
      },
      {
        name: 'Benares Sangeet Parampara & Kabir Chaura Gurukulam',
        craft: 'Benares Gharana Classical Music & Instrument Making',
        location: 'Kabir Chaura, Varanasi',
        heritageStory: 'The legendary epicenter of Hindustani classical music that produced Ustad Bismillah Khan, Pt. Kishan Maharaj, and Girija Devi.',
        visitingGuidance: 'Open evening riyaz sessions and sitar workshops available by prior coordination with local teachers.'
      }
    ]
  }
};

// ==========================================
// CULTURAL CALENDAR EVENTS (RELIABLE & CURATED)
// ==========================================

export const CULTURAL_CALENDAR_EVENTS: CulturalEvent[] = [
  {
    id: 'evt-bathukamma',
    title: 'Bathukamma Flower Festival',
    state: 'Telangana',
    location: 'Across Telangana (Hyderabad, Warangal, Nalgonda tanks)',
    timePeriod: 'September - October (Navratri Season / Mahalaya Amavasya)',
    seasonOrFrequency: 'Annual Autumn Floral Celebration (9 Days)',
    category: 'Festival',
    status: 'Curated Event',
    statusExplanation: 'Curated traditional festival. Dates follow the regional Telugu lunar calendar (starts Mahalaya Amavasya).',
    description: 'A 9-day celebration where women build magnificent concentric conical towers of indigenous wild flowers (Gunugu, Tangedu, Katla) and sing traditional folk songs around twilight village tanks.',
    highlight: 'Community circle singing and offering floating floral Bathukammas to sacred water bodies at dusk',
    culturalSignificance: 'Worship of nature, agrarian renewal, ecological herbal healing, and honoring Mother Goddess Gauri.',
    traditionalVenue: 'Village tanks, temple precincts, and Hussain Sagar / Tank Bund in Hyderabad',
    accessInfo: 'Open Public Participation · Free Community Festival',
    bestViewingTip: 'Visit on Saddula Bathukamma (the final 9th evening) around 5:30 PM to watch thousands of women release illuminated flower mounds onto water bodies.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-pushkar',
    title: 'Pushkar Camel & Craft Fair',
    state: 'Rajasthan',
    location: 'Pushkar Desert Dunes & Lake Mela Grounds, Ajmer District, Rajasthan',
    timePeriod: 'October - November (Kartik Ekadashi to Kartik Purnima)',
    seasonOrFrequency: 'Annual Desert Pastoral Fair (8 Days)',
    category: 'Fair',
    status: 'Curated Event',
    statusExplanation: 'Curated traditional fair. Historic desert gathering timed with the full moon of the Hindu month of Kartik.',
    description: 'Over 50,000 camels, horses, and livestock gather in the golden Thar sands alongside Rajasthani block printers, silversmiths, leather cobblers, and desert musicians.',
    highlight: 'Camel grooming competitions, sunset sand dune bazaars, and spontaneous Manganiyar acoustic folk jams around desert bonfires',
    culturalSignificance: 'One of the world’s oldest living desert livestock and handicraft trade gatherings around the sacred holy lake.',
    traditionalVenue: 'Pushkar Mela Ground & Sand Dunes',
    accessInfo: 'Public Fairgrounds · Free Entry (Camel rides & camps booked locally)',
    bestViewingTip: 'Arrive 2-3 days before the full moon (Kartik Purnima) when livestock trading is at its most active and photogenic on the open dunes.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-hampi-utsav',
    title: 'Hampi Utsav (Vijaya Utsava)',
    state: 'Karnataka',
    location: 'Vijayanagara Citadel & Virupaksha Complex, Hampi, Bellary District',
    timePeriod: 'November (Post-Monsoon Winter / Seasonal 3 Days)',
    seasonOrFrequency: 'Annual Cultural Extravaganza',
    category: 'Cultural Performance',
    status: 'Curated Event',
    statusExplanation: 'Curated state cultural festival organized annually by Karnataka Tourism and Archeological Survey of India.',
    description: 'Brings the UNESCO World Heritage ruins of Vijayanagara to life with illuminated laser shows over 14th-century boulder temples, classical Carnatic and Hindustani concerts, and traditional Janapada folk arts.',
    highlight: 'Illuminated monolithic stone monuments serving as live open-air backdrops for world-class classical recitals',
    culturalSignificance: 'Commemorates the golden era, architectural genius, and artistic zenith of the Vijayanagara Empire.',
    traditionalVenue: 'Virupaksha Temple Precinct, Sasivekalu Ganesha, and Eduru Basavanna Stage',
    accessInfo: 'Public Heritage Festival · Open Seating',
    bestViewingTip: 'Secure open seating at the primary Sasivekalu Ganesha stage by 6:00 PM for the sunset temple monument illumination.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-dev-deepawali',
    title: 'Dev Deepawali at Varanasi (Festival of the Gods)',
    state: 'Uttar Pradesh',
    location: '84 Riverfront Ghats (Assi to Rajghat), Varanasi, Uttar Pradesh',
    timePeriod: 'November (Kartik Purnima Full Moon, 15 nights after Diwali)',
    seasonOrFrequency: 'Annual Sacred Riverfront Illumination',
    category: 'Traditional Celebration',
    status: 'Verified Event',
    statusExplanation: 'Verified annual heritage tradition celebrated exactly fifteen nights after Diwali on the full moon of Kartik.',
    description: 'All 84 stepped stone ghats along River Ganga are covered with over one million lit terracotta oil lamps (diyas) as thousands of floating leaf lamps drift downstream under fireworks.',
    highlight: 'Panoramic boat cruise viewing four kilometers of continuous flickering amber oil flames reflecting on sacred waters',
    culturalSignificance: 'Ancient belief that celestial devas descend from the heavens to bathe in the holy Ganga on this auspicious night.',
    traditionalVenue: 'Dashashwamedh Ghat, Chet Singh Fort Ghat, and Assi Ghat',
    accessInfo: 'Public Riverfront · Free Ghat Access (Rowboats & bajras hired at ghats)',
    bestViewingTip: 'Book a traditional wooden rowboat 1-2 months in advance or secure an elevated perch on the steps of Chet Singh Ghat before 5:00 PM.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-onam-boat-race',
    title: 'Aranmula Snake Boat Regatta (Uthrattathi Vallamkali)',
    state: 'Kerala',
    location: 'Pamba Riverfront, Parthasarathy Temple, Aranmula, Pathanamthitta',
    timePeriod: 'August - September (Onam Season / Uthrattathi Asterism)',
    seasonOrFrequency: 'Annual Sacred Water Pageant',
    category: 'Folk Arts',
    status: 'Curated Event',
    statusExplanation: 'Curated temple water pageant. Scheduled annually four days after Thiruvonam according to the traditional Malayalam calendar.',
    description: 'Over 50 majestic snake boats (Chundan Vallams) carrying 100 oarsmen and singers each glide rhythmically to the rapid cadence of ancestral Vanchipattu boat ballads.',
    highlight: 'Historic water pageant focused on traditional rhythmic rowing, spiritual communion, and temple feast offerings',
    culturalSignificance: 'Commemorates the legendary river crossing carrying the holy Thiruvona Sadya feast to the presiding deity of Aranmula.',
    traditionalVenue: 'Pamba River banks directly facing the Sri Parthasarathy Temple',
    accessInfo: 'Public Riverbank Spectating · Free Community Access',
    bestViewingTip: 'Watch from the temple steps or northern riverbank early morning to see crews in white mundus perform the opening Vanchipattu rituals.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-margazhi-season',
    title: 'Margazhi Carnatic Music & Dance Season',
    state: 'Tamil Nadu',
    location: 'Mylapore, T. Nagar & Adyar Sabhas, Chennai, Tamil Nadu',
    timePeriod: 'December - January (Tamil Month of Margazhi)',
    seasonOrFrequency: 'World’s Largest Classical Arts Festival (6 Weeks)',
    category: 'Cultural Performance',
    status: 'Verified Event',
    statusExplanation: 'Verified classical festival spanning over 1,500 ticketed and free recitals across registered heritage sabhas.',
    description: 'A six-week festival featuring thousands of senior and prodigy vocalists, mridangam players, and Bharatanatyam dancers performing continuously from morning till night.',
    highlight: 'Dawn temple street singing followed by afternoon sabha kutcheris and piping hot degree filter coffee with ghee roast dosas at sabha canteens',
    culturalSignificance: 'Nearly a century of living classical South Indian musical preservation and community patronage rooted in sacred devotion.',
    traditionalVenue: 'The Music Academy, Narada Gana Sabha, Mylapore Fine Arts, and Sri Krishna Gana Sabha',
    accessInfo: 'Morning recitals often Free; Evening headliners Ticketed at venue counters',
    bestViewingTip: 'Do not miss the sabha canteens (like Mountbatten Mani Iyer at Mylapore Fine Arts) for traditional filter coffee and hot vazhaipoo vada between concerts.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1599831104328-b141f6aae7d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-theyyam-malabar',
    title: 'Theyyam Ritual Dance-Drama of North Malabar',
    state: 'Kerala',
    location: 'Kavu (Sacred Groves) & Ancestral Shrines of Kannur and Kasaragod',
    timePeriod: 'October - May (Winter to Pre-Monsoon Season)',
    seasonOrFrequency: 'Seasonal Temple Shrines & Sacred Groves Cycle',
    category: 'Folk Arts',
    status: 'Curated Event',
    statusExplanation: 'Curated sacred ritual tradition. Hundreds of kavus host all-night Theyyam cycles according to specific temple Malayalam almanac dates.',
    description: 'Performers spend hours in elaborate natural red face painting and colossal palm-leaf headgear before entering a transcendent state to embody living deities, dancing through burning coal embers.',
    highlight: 'Witnessing the fiery leap of ‘Thee Chamundi’ Theyyam into a massive bonfire of glowing coals at 3:00 AM',
    culturalSignificance: 'An ancient pre-Vedic egalitarian ritual breaking social barriers where agrarian communities bless village folk directly.',
    traditionalVenue: 'Parassini Madappura, Muthappan Temples, and rural village Kavus',
    accessInfo: 'Open Sacred Shrines · Free Observation (Modest dress code required)',
    bestViewingTip: 'Attend night performances (starts around 11:00 PM and runs till sunrise); bring a light jacket and always ask before photographing face-painting sessions.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-bonalu-telangana',
    title: 'Bonalu Festival & Ghatam Processions',
    state: 'Telangana',
    location: 'Golconda Fort, Ujjaini Mahakali Temple (Secunderabad), and Old City Hyderabad',
    timePeriod: 'July - August (Telugu Month of Ashada)',
    seasonOrFrequency: 'Annual Monsoon Thanksgiving (Every Sunday of Ashada)',
    category: 'Traditional Celebration',
    status: 'Curated Event',
    statusExplanation: 'Curated state festival. Celebrated on consecutive Sundays of Ashada month across Golconda, Secunderabad, and Old City Hyderabad.',
    description: 'Women balance painted brass and earthen pots (Bonam) decorated with neem leaves and burning lamps on their heads, escorted by roaring Pothuraju whip-dancers in red dhotis.',
    highlight: 'The frenetic Pothuraju rhythmic drum dances and the Rangam oracle prophecy ceremony at Secunderabad temple',
    culturalSignificance: 'Monsoon thanksgiving offering to Goddess Mahakali to ward off seasonal epidemics and bless agrarian crops.',
    traditionalVenue: 'Golconda Jagadambika Temple, Secunderabad Ujjaini Mahakali Temple, Lal Darwaza',
    accessInfo: 'Open City Gathering · Free Public Spectating',
    bestViewingTip: 'Watch the first Sunday at Golconda Fort or the grand Secunderabad procession on the second Sunday morning.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-desert-jaisalmer',
    title: 'Jaisalmer Desert Festival (Maru Mahotsav)',
    state: 'Rajasthan',
    location: 'Sam Sand Dunes & Shahid Poonam Singh Stadium, Jaisalmer',
    timePeriod: 'February (Magh Shukla Trayodashi to Purnima, 3 Days)',
    seasonOrFrequency: 'Annual Winter Desert Cultural Gathering',
    category: 'Seasonal Event',
    status: 'Curated Event',
    statusExplanation: 'Curated cultural festival organized by Rajasthan Tourism over three days preceding the February full moon.',
    description: 'A vibrant spectacle amid the Thar desert sands featuring Gair and Fire dancers, traditional turban tying competitions, camel polo, and full-moon desert acoustic concerts.',
    highlight: 'The breathtaking Kalbelia and Ghoomar dances performed on natural wind-rippled sand dunes at sunset',
    culturalSignificance: 'Preservation of the oral songs, heroic folklore, and living traditions of the Thar nomadic communities.',
    traditionalVenue: 'Shahid Poonam Singh Stadium & Sam Sand Dunes',
    accessInfo: 'Free Public Bleachers & Sand Dune Gatherings',
    bestViewingTip: 'Head to Sam Sand Dunes on the final evening where performances take place under the full moonlight on the sand.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-kambala-coastal',
    title: 'Coastal Kambala Buffalo Race & Folk Gathering',
    state: 'Karnataka',
    location: 'Paddy Fields of Dakshina Kannada & Udupi District (Moodabidri, Puttur)',
    timePeriod: 'November - March (Winter Weekend Circuit)',
    seasonOrFrequency: 'Seasonal Agrarian Winter Circuit',
    category: 'Seasonal Event',
    status: 'Curated Event',
    statusExplanation: 'Curated agrarian festival. Weekend schedules announced by district Kambala committees during winter season.',
    description: 'A traditional coastal sport where pairs of muscular water buffaloes are driven by sprint jockeys through muddy 140-meter slush tracks, surrounded by thousands of cheering rural villagers.',
    highlight: 'High-speed water-spray sprints across parallel mud tracks judged by modern laser finish sensors',
    culturalSignificance: 'Ancient Tulu Nadu harvest thanksgiving honoring agricultural deities for protecting crops.',
    traditionalVenue: 'Kadjabettu, Moodabidri, and Aladangadi slush tracks',
    accessInfo: 'Open Paddy Field Embankments · Free Viewing',
    bestViewingTip: 'Watch during the afternoon qualifiers to get close to the tracks without the immense crowds of the midnight finals.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-pongal-tamilnadu',
    title: 'Pongal Harvest & Jallikattu Celebration',
    state: 'Tamil Nadu',
    location: 'Rural Madurai (Alanganallur, Palamedu), Thanjavur & Coimbatore Villages',
    timePeriod: 'January (Tamil Month of Thai / Makar Sankranti Season, 4 Days)',
    seasonOrFrequency: 'Annual Four-Day Agrarian Harvest Festival',
    category: 'Seasonal Event',
    status: 'Curated Event',
    statusExplanation: 'Curated agrarian harvest celebration. Dates fixed according to the Tamil solar calendar on the 1st of Thai.',
    description: 'Celebrates harvest abundance with boiling pots of sweet jaggery-rice (Pongal), colorfully painted cattle horns (Mattu Pongal), and traditional bull-embracing events in Madurai villages.',
    highlight: 'Villages boiling freshly harvested rice in earthen pots outdoors with family shouts of "Pongalo Pongal!" as milk foams over',
    culturalSignificance: 'Profuse thanksgiving to the Sun God, rain clouds, and farm animals that enable life-sustaining agriculture.',
    traditionalVenue: 'Village courtyards in Thanjavur and Alanganallur arena in Madurai',
    accessInfo: 'Public Village Festivities; Jallikattu spectator stands regulated locally',
    bestViewingTip: 'Spend Mattu Pongal in a rural village around Thanjavur or Madurai to experience family cattle decoration and sweet Pongal offerings.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1599831104328-b141f6aae7d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-thrissur-pooram',
    title: 'Thrissur Pooram Percussion Spectacle',
    state: 'Kerala',
    location: 'Vadakkunnathan Temple Thekkinkadu Maidan, Thrissur, Kerala',
    timePeriod: 'April - May (Malayalam Month of Medam / Pooram Asterism)',
    seasonOrFrequency: 'Annual Grand Temple Gathering (36 Hours)',
    category: 'Festival',
    status: 'Curated Event',
    statusExplanation: 'Curated traditional temple festival. Dates follow the lunar asterism of Pooram in Medam month.',
    description: 'The mother of all Kerala poorams, pitting participating temples in friendly rivalry with Ilanjithara Melam percussion orchestras (chenda, elathalam) and Kudamattam sequential umbrella switching.',
    highlight: 'The sonic power of 250 synchronized master percussionists echoing through the historic temple grounds',
    culturalSignificance: 'Centuries-old festival founded by Raja Rama Varma to unify local temple communities in joyful artistic expression.',
    traditionalVenue: 'Thekkinkadu Maidan & Vadakkunnathan Temple compound',
    accessInfo: 'Open Public Grounds · Free Entry (Expect very dense crowds)',
    bestViewingTip: 'Position yourself near the Ilanji tree inside the temple courtyard around 2:00 PM to experience the world-famous Ilanjithara Melam percussion.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-subah-e-banaras',
    title: 'Subah-e-Banaras Morning Ragas & Ganga Aarti',
    state: 'Uttar Pradesh',
    location: 'Assi Ghat Riverfront, Varanasi, Uttar Pradesh',
    timePeriod: 'Daily at Dawn (5:00 AM - 7:00 AM Year-Round)',
    seasonOrFrequency: 'Daily Dawn Classical Performance & Aarti',
    category: 'Cultural Performance',
    status: 'Verified Event',
    statusExplanation: 'Verified daily cultural presentation organized on Assi Ghat stage featuring classical vocal, shehnai, sitar, and yoga.',
    description: 'Every morning before sunrise, travelers and locals gather at Assi Ghat for Vedic hymn chanting, a five-priest morning Aarti, followed by live Hindustani classical raga recitals by master artists as the sun crests the holy river.',
    highlight: 'Hearing morning ragas (Bhairav, Todi) resonating over the misty waters of River Ganga as dawn breaks',
    culturalSignificance: 'Revival of Varanasi’s ancient tradition of greeting the dawn with music, spirituality, and artistic discipline.',
    traditionalVenue: 'Assi Ghat Open-Air Cultural Stage',
    accessInfo: 'Free Public Gathering · Open Ghat Seating Daily',
    bestViewingTip: 'Arrive by 5:15 AM to catch the serene oil-lamp lighting followed by the 45-minute classical recital on the steps.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-medaram-jatara',
    title: 'Sammakka Sarakka Medaram Jatara',
    state: 'Telangana',
    location: 'Medaram Forest, Tadvai Mandal, Mulugu District, Telangana',
    timePeriod: 'February (Magha Purnima, Biennial / Every 2 Years)',
    seasonOrFrequency: 'Biennial Tribal Gathering (Asia’s Largest)',
    category: 'Fair',
    status: 'Curated Event',
    statusExplanation: 'Curated tribal fair celebrated biennially on the full moon of Magha month in the Medaram forest reserve.',
    description: 'Over 10 million tribal and non-tribal pilgrims journey deep into the dense Dandakaranya forest to offer jaggery (Bangaram) equal to their body weight to indigenous mother-daughter warrior deities.',
    highlight: 'Offering gold (pure jaggery blocks) at the sacred bamboo poles (Gaddelu) amidst mass folk drumming',
    culturalSignificance: 'Honors the historic 13th-century revolt of Koya tribal women against the oppressive Kakatiya imperial taxes during a severe drought.',
    traditionalVenue: 'Medaram Gaddelu Sacred Shrines & Jampanna Vagu stream',
    accessInfo: 'Free Sacred Forest Pilgrimage · Massive Scale',
    bestViewingTip: 'Check the biennial schedule (held on even years: 2024, 2026); take holy dip at Jampanna Vagu during morning hours.',
    isDemoEvent: false,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'
  }
];

// ==========================================
// EXPERIENCE MATCH SCORE CALCULATOR
// ==========================================

export function calculateExperienceScore(
  experience: SoulExperience,
  preferences?: UserPreferences
): ExperienceScoreBreakdown {
  if (!preferences) {
    return {
      interestMatch: 28,
      destinationRelevance: 18,
      culturalRelevance: 14,
      groupSuitability: 14,
      durationFit: 9,
      budgetFit: 9,
      totalScore: 92
    };
  }

  // 1. Interest Match (30%)
  let interestMatch = 15;
  const userInterests = preferences.interests || [];
  if (experience.category === 'Workshops & Crafts' && userInterests.some(i => i.includes('Heritage') || i.includes('Art'))) {
    interestMatch += 14;
  } else if (experience.category === 'Local Food & Flavours' && userInterests.some(i => i.includes('Culinary') || i.includes('Food'))) {
    interestMatch += 14;
  } else if (experience.category === 'Nature & Trails' && userInterests.some(i => i.includes('Nature') || i.includes('Adventure'))) {
    interestMatch += 14;
  } else if (experience.category === 'Performing Arts & Folk' && userInterests.some(i => i.includes('Spiritual') || i.includes('Art'))) {
    interestMatch += 13;
  } else {
    interestMatch += 10;
  }
  interestMatch = Math.min(30, interestMatch);

  // 2. Destination Relevance (20%)
  let destinationRelevance = 18;
  if (preferences.startingLocation === 'Hyderabad' && experience.state === 'Telangana') {
    destinationRelevance = 20;
  } else if (preferences.startingLocation === 'Bengaluru' && experience.state === 'Karnataka') {
    destinationRelevance = 20;
  }

  // 3. Cultural Relevance (15%)
  const culturalRelevance = 14 + (experience.tags.length > 3 ? 1 : 0);

  // 4. Group Suitability (15%)
  let groupSuitability = 13;
  if (preferences.travelGroup === 'Solo' || preferences.travelGroup === 'Friends') {
    groupSuitability = 15;
  } else if (preferences.travelGroup === 'Family') {
    groupSuitability = experience.difficulty.includes('Beginner') ? 15 : 12;
  }

  // 5. Duration Fit (10%)
  const durationFit = experience.duration.includes('Hour') ? 9 : 8;

  // 6. Budget Fit (10%)
  let budgetFit = 9;
  if (preferences.maxBudget && experience.priceInr <= preferences.maxBudget * 0.4) {
    budgetFit = 10;
  }

  const totalScore = Math.min(
    99,
    interestMatch + destinationRelevance + culturalRelevance + groupSuitability + durationFit + budgetFit
  );

  return {
    interestMatch,
    destinationRelevance,
    culturalRelevance,
    groupSuitability,
    durationFit,
    budgetFit,
    totalScore
  };
}

// Helper to filter experiences for a specific destination or state
export function getExperiencesForDestination(destId: string, stateName?: string): SoulExperience[] {
  const directMatches = SOUL_EXPERIENCES.filter(e => e.destinationId === destId);
  if (directMatches.length >= 2) return directMatches;

  // If few direct matches, include other experiences from the same state
  const stateMatches = stateName ? SOUL_EXPERIENCES.filter(e => e.state.toLowerCase() === stateName.toLowerCase()) : [];
  const combined = [...directMatches, ...stateMatches];
  
  // Deduplicate
  const seen = new Set<string>();
  return combined.filter(e => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}

// Surprise Me Algorithm
export function getRandomSurpriseExperience(
  preferences?: UserPreferences,
  excludeId?: string
): { experience: SoulExperience; reason: string } {
  const pool = SOUL_EXPERIENCES.filter(e => e.id !== excludeId);
  const randomChoice = pool[Math.floor(Math.random() * pool.length)] || SOUL_EXPERIENCES[0];

  const interestName = preferences?.interests?.[0] || 'local culture';
  const group = preferences?.travelGroup || 'travelers';

  let reason = `You are exploring ${randomChoice.state} with an affinity for ${interestName}. This experience connects you directly with a centuries-old handmade tradition and its makers, taking you far beyond standard tourist crowds.`;

  if (randomChoice.makeSomethingType === 'weaving') {
    reason = `You appreciate tangible crafts. This hands-on pit-loom experience lets you weave your own textile alongside traditional masters instead of just purchasing an off-the-shelf souvenir.`;
  } else if (randomChoice.category === 'Local Food & Flavours') {
    reason = `Food reveals the true geography of a region. This experience takes you into an authentic local hearth to understand the heritage grains, stone-ground podis, and firewood cooking techniques.`;
  } else if (randomChoice.category === 'Performing Arts & Folk') {
    reason = `Acoustic oral traditions carry the living memory of India. We selected this so you can experience pure unamplified sound and poetry in its natural cultural setting.`;
  }

  return { experience: randomChoice, reason };
}
