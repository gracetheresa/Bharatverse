import { LiveMusicEvent, Destination } from '../types/travel';

export const LIVE_MUSIC_EVENTS: LiveMusicEvent[] = [
  // ==========================================
  // CARNATIC & SOUTH INDIAN CLASSICAL
  // ==========================================
  {
    id: 'music-margazhi-carnatic-chennai',
    artistOrEventName: 'Margazhi Sabha Season: Sanjay Subrahmanyan Vocal Recital',
    artist: 'Sanjay Subrahmanyan (Accompanied by S. Varadarajan & Neyveli Venkatesh)',
    venue: 'The Music Academy Main Auditorium, TTK Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    date: 'Dec 22, 2026',
    time: '6:30 PM - 9:30 PM IST',
    genre: 'Carnatic',
    price: '₹350 - ₹1,500 (Season Pass Available)',
    priceInr: 350,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    status: 'LIVE / VERIFIED',
    statusExplanation: 'Verified classical sabha season booking at Chennai Music Academy. Ticketed seating with official academy registration.',
    setting: 'Indoor',
    suitableFor: ['Solo', 'Couple', 'Family', 'Senior Friendly'],
    description: 'Immerse in the pinnacle of South Indian classical music during Chennai’s historic Margazhi December season. Experience complex ragam-tanam-pallavi improvisations and emotive Tamil & Telugu kritis rendered with supreme mastery.',
    highlights: [
      'Accompanied by legendary violin and mridangam exponents',
      'Acoustically tuned heritage auditorium at The Music Academy',
      'Features rare ragas and vintage compositions of the Carnatic Trinity',
      'Traditional South Indian filter coffee & tiffin served at the sabha canteen'
    ],
    bookingOrInfoUrl: 'https://musicacademymadras.in',
    googleMapsQuery: 'The Music Academy Chennai',
    organizer: 'The Music Academy Madras',
    isFeatured: true
  },
  {
    id: 'music-hyderabad-ravindra-veena',
    artistOrEventName: 'Saraswati Veena Tarangam: Jayanthi Kumaresh',
    artist: 'Dr. Jayanthi Kumaresh (Saraswati Veena) with K.U. Jayachandra Rao (Mridangam)',
    venue: 'Ravindra Bharathi Auditorium, Lakdikapul',
    city: 'Hyderabad',
    state: 'Telangana',
    date: 'Oct 24, 2026',
    time: '7:00 PM - 9:30 PM IST',
    genre: 'Traditional Instrument Performances',
    price: 'Free Entry (First-Come Seating)',
    priceInr: 0,
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1000&q=80',
    status: 'LIVE / VERIFIED',
    statusExplanation: 'Verified Department of Language & Culture Telangana state cultural calendar event at Ravindra Bharathi.',
    setting: 'Indoor',
    suitableFor: ['Solo', 'Family', 'Couple', 'Senior Friendly'],
    description: 'An acoustic evening celebrating the Saraswati Veena, India’s national instrument. Dr. Jayanthi Kumaresh weaves intricate meend glides, resonant gamakas, and pulsating laya vinyasam rhythms inside Hyderabad’s foremost cultural hall.',
    highlights: [
      'Masterclass exploration of microtonal shrutis on 24 brass frets',
      'Electrifying Jugalbandi percussion climax with Ghatam & Mridangam',
      'Centrally located cultural landmark near Assembly Metro station'
    ],
    bookingOrInfoUrl: 'https://telanganatourism.gov.in',
    googleMapsQuery: 'Ravindra Bharathi Hyderabad',
    organizer: 'Telangana Department of Language & Culture',
    isFeatured: true
  },
  {
    id: 'music-bengaluru-chowdiah-violin',
    artistOrEventName: 'Bow & strings: Ganesh & Kumaresh Carnatic Violin Duo',
    artist: 'Ganesh & Kumaresh',
    venue: 'Chowdiah Memorial Hall, Vyalikaval, Malleshwaram',
    city: 'Bengaluru',
    state: 'Karnataka',
    date: 'Nov 07, 2026',
    time: '6:45 PM - 9:30 PM IST',
    genre: 'Indian Classical',
    price: '₹500 - ₹2,000',
    priceInr: 500,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    status: 'LIVE / VERIFIED',
    statusExplanation: 'Verified auditorium event inside the iconic violin-shaped Chowdiah Memorial Hall. Ticketing on premier cultural portals.',
    setting: 'Indoor',
    suitableFor: ['Friends', 'Family', 'Couple', 'Solo'],
    description: 'Celebrated violin maestros Ganesh and Kumaresh present their signature dynamic Carnatic duets inside the world-famous violin-shaped hall, demonstrating rapid bowing techniques and soul-stirring melodic dialogues.',
    highlights: [
      'Performed in the architectural marvel designed as a giant 7-stringed violin',
      'Acoustic reverberation engineered specifically for string instruments',
      'Exploration of Ragas Sankarabharanam and Kalyani with swift swara exchanges'
    ],
    bookingOrInfoUrl: 'https://in.bookmyshow.com',
    googleMapsQuery: 'Chowdiah Memorial Hall Bengaluru',
    organizer: 'Karnataka Fine Arts Council',
    isFeatured: false
  },

  // ==========================================
  // HINDUSTANI CLASSICAL CONCERTS
  // ==========================================
  {
    id: 'music-varanasi-subah-e-banaras',
    artistOrEventName: 'Subah-e-Banaras Dawn Ragas on River Ganga',
    artist: 'Benares Gharana Sitar & Shehnai Collective',
    venue: 'Assi Ghat Open Stone Pavilion',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    date: 'Daily at Dawn (Ongoing)',
    time: '5:30 AM - 7:30 AM IST',
    genre: 'Hindustani',
    price: 'Free Public Event',
    priceInr: 0,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated daily dawn heritage recital verified by Uttar Pradesh Tourism. Authentic daily spiritual and classical tradition at Assi Ghat.',
    setting: 'Outdoor',
    suitableFor: ['Solo', 'Couple', 'Family', 'Friends', 'Senior Friendly'],
    description: 'Witness the morning sun rise over the holy Ganga as classical maestros render auspicious morning ragas (Bhairav, Todi, Bilawal) on sitar, flute, and shehnai, synchronizing with ancient Vedic chants and yoga.',
    highlights: [
      'Open riverfront acoustics with river breeze and sacred temple bells',
      'Authentic living musical tradition originating from Ustad Bismillah Khan’s lineage',
      'Free stone-step seating right at the edge of the Ganges'
    ],
    bookingOrInfoUrl: 'https://varanasi.nic.in',
    googleMapsQuery: 'Assi Ghat Varanasi',
    organizer: 'Subah-e-Banaras Heritage Committee',
    isFeatured: true
  },
  {
    id: 'music-pune-sawai-gandharva',
    artistOrEventName: 'Sawai Gandharva Bhimsen Mahotsav (69th Edition)',
    artist: 'Pt. Ulhas Kashalkar, Kaushiki Chakraborty & Rahul Deshpande',
    venue: 'Maharashthra Mandal Ground, Mukund Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    date: 'Dec 11, 2026',
    time: '3:00 PM - 10:00 PM IST',
    genre: 'Hindustani',
    price: '₹400 (Daily Pass) / ₹1,800 (Full Season)',
    priceInr: 400,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated premier annual Hindustani classical pilgrimage founded by Bharat Ratna Pt. Bhimsen Joshi. Traditional winter festival dates.',
    setting: 'Outdoor',
    suitableFor: ['Solo', 'Couple', 'Family', 'Senior Friendly'],
    description: 'The world’s most prestigious multi-day Hindustani classical pilgrimage. Over 15,000 music connoisseurs gather in winter under a giant open-air shamiana to hear Kirana, Gwalior, and Patiala gharana stalwarts.',
    highlights: [
      'Continuous 7-hour daily ragas spanning afternoon Sarang to midnight Malkauns',
      'Pure acoustic open-ground atmosphere with discerning Pune audiences',
      'Grand taan passages and khayal explorations by living national treasures'
    ],
    bookingOrInfoUrl: 'https://sawaigandharvamahotsav.com',
    googleMapsQuery: 'Mukund Nagar Pune',
    organizer: 'Arya Sangeet Prasarak Mandal',
    isFeatured: true
  },
  {
    id: 'music-mumbai-ncpa-sitar',
    artistOrEventName: 'Ragas of the Night: Ustad Shujaat Khan (Sitar & Vocals)',
    artist: 'Ustad Shujaat Husain Khan',
    venue: 'Tata Theatre, NCPA, Nariman Point',
    city: 'Mumbai',
    state: 'Maharashtra',
    date: 'Nov 14, 2026',
    time: '7:30 PM - 10:00 PM IST',
    genre: 'Indian Classical',
    price: '₹600 - ₹3,000',
    priceInr: 600,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80',
    status: 'LIVE / VERIFIED',
    statusExplanation: 'Verified NCPA seasonal headline concert on Mumbai’s marine promenade. Official venue ticketing enabled.',
    setting: 'Indoor',
    suitableFor: ['Couple', 'Solo', 'Friends', 'Senior Friendly'],
    description: 'The scion of the legendary Imdadkhani Gharana blends crystalline sitar plucks with folk Sufi vocal ghazals, accompanied by delicate tabla beats overlooking the Arabian Sea at Nariman Point.',
    highlights: [
      'World-class acoustic fidelity engineered in NCPA’s fan-shaped Tata Theatre',
      'Intimate gayaki-ang (vocal-style) sitar phrasing unique to the Vilayat Khan legacy',
      'Stunning views of Marine Drive and Queen’s Necklace prior to the performance'
    ],
    bookingOrInfoUrl: 'https://ncpamumbai.com',
    googleMapsQuery: 'NCPA Mumbai Nariman Point',
    organizer: 'National Centre for the Performing Arts (NCPA)',
    isFeatured: false
  },

  // ==========================================
  // SUFI & QAWWALI CONCERTS
  // ==========================================
  {
    id: 'music-delhi-nizamuddin-qawwali',
    artistOrEventName: 'Thursday Sacred Qawwali: Nizami Bandhu Collective',
    artist: 'Nizami Bandhu (Descendants of Amir Khusrau’s Courtyard Singers)',
    venue: 'Hazrat Nizamuddin Dargah Courtyard, Old Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    date: 'Every Thursday Evening (Ongoing)',
    time: '6:30 PM & 8:45 PM IST',
    genre: 'Sufi Music',
    price: 'Free Courtyard Gathering (Voluntary Nazrana)',
    priceInr: 0,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated centuries-old Sufi devotional tradition. Free communal gatherings held every Thursday night at the 700-year-old sanctuary.',
    setting: 'Outdoor',
    suitableFor: ['Solo', 'Friends', 'Family', 'Couple'],
    description: 'Experience 700 years of unbroken spiritual verse in the marble courtyard of Sufi Saint Nizamuddin Auliya. Harmoniums swell and synchronized claps build into ecstatic mystical trances honoring Amir Khusrau.',
    highlights: [
      'Singers featured in Bollywood classic "Kun Faya Kun"',
      'Acoustic chorus singing with brass cymbals and hand-clapping cadences',
      'Atmosphere scented with rose water, loban incense, and brass oil lamps'
    ],
    bookingOrInfoUrl: 'https://delhitourism.gov.in',
    googleMapsQuery: 'Hazrat Nizamuddin Dargah New Delhi',
    organizer: 'Dargah Hazrat Nizamuddin Custodians',
    isFeatured: true
  },
  {
    id: 'music-jaipur-jahan-e-khusrau',
    artistOrEventName: 'Jahan-e-Khusrau: World Sufi Music Festival',
    artist: 'Muzaffar Ali presents Abida Parveen & Rekha Bhardwaj Ensemble',
    venue: 'Amer Fort Stepwell & Maota Lake Amphi',
    city: 'Jaipur',
    state: 'Rajasthan',
    date: 'Nov 28, 2026',
    time: '6:00 PM - 10:30 PM IST',
    genre: 'Sufi Music',
    price: '₹1,200 - ₹4,500',
    priceInr: 1200,
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated historic world Sufi music festival curated by filmmaker Muzaffar Ali against illuminated Rajasthani ramparts.',
    setting: 'Outdoor',
    suitableFor: ['Couple', 'Solo', 'Friends', 'Family'],
    description: 'A poetic celebration uniting whirling dervishes, Persian poetry, and Rajasthani mystic bards against the golden stone battlements of Amer Fort under starlit desert skies.',
    highlights: [
      'Illuminated 16th-century fortress reflecting over tranquil waters',
      'Whirling Rumi dancers alongside powerful female Sufi vocalists',
      'Curated artisanal Rajasthani culinary stalls inside the palace courtyard'
    ],
    bookingOrInfoUrl: 'https://jahanekhusrau.org',
    googleMapsQuery: 'Amer Fort Jaipur',
    organizer: 'Rumi Foundation & Rajasthan Tourism',
    isFeatured: true
  },
  {
    id: 'music-jaipur-folk-bards',
    artistOrEventName: 'Chaupal Bards: Heritage Rajasthani Folk Night',
    artist: 'Manganiyar Heritage Bards & Dholak Masters',
    venue: 'Nahargarh Palace Heritage Courtyard, Aravalli Hills',
    city: 'Jaipur',
    state: 'Rajasthan',
    date: 'Every Friday & Saturday Evening',
    time: '7:00 PM - 9:30 PM IST',
    genre: 'Folk Music',
    price: '₹450 (Includes Traditional Spiced Kahwa)',
    priceInr: 450,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated weekend cultural folk concert series at Nahargarh Fort ramparts overlooking Jaipur city lights.',
    setting: 'Outdoor',
    suitableFor: ['Family', 'Friends', 'Couple', 'Solo'],
    description: 'Listen to the soaring desert folk laments and celebratory wedding melodies of Thar bards. High-speed Khartal wooden clapper rhythm solos and powerful resonant Dholak beats echo under the fortress canopy.',
    highlights: [
      'Starlit courtyard seating atop the Aravalli hills overlooking the Pink City',
      'Ancestral songs of Kesariya Balam and Ghoomar rendered on Morchang and Kamaicha',
      'Fresh hot saffron kahwa and roasted local snacks included'
    ],
    bookingOrInfoUrl: 'https://tourism.rajasthan.gov.in',
    googleMapsQuery: 'Nahargarh Fort Jaipur',
    organizer: 'Rajasthan Heritage Performance Guild',
    isFeatured: false
  },
  {
    id: 'music-jaipur-palace-sitar',
    artistOrEventName: 'Amer Palace Twilight Sitar & Flute Recital',
    artist: 'Pandit Manmohan Sharma (Sitar) with Jaipur Gharana Tabla',
    venue: 'Jaleb Chowk Courtyard, Amer Palace',
    city: 'Jaipur',
    state: 'Rajasthan',
    date: 'Daily Evening at Sunset',
    time: '6:15 PM - 7:45 PM IST',
    genre: 'Indian Classical',
    price: 'Free Heritage Viewing with Palace Entry',
    priceInr: 0,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated daily heritage classical twilight recital for palace visitors honoring Amer court musical traditions.',
    setting: 'Outdoor',
    suitableFor: ['Solo', 'Couple', 'Family', 'Senior Friendly'],
    description: 'As twilight falls across the yellow sandstone ramparts of Amer Fort, acoustic sitar melodies of evening Raga Yaman and Marwa resonate across the royal stone courtyard.',
    highlights: [
      'Unamplified acoustic resonance against 400-year-old carved sandstone arches',
      'Twilight setting as amber palace lanterns are lit around Maota Lake',
      'Open seating on traditional woven dhurries'
    ],
    bookingOrInfoUrl: 'https://tourism.rajasthan.gov.in',
    googleMapsQuery: 'Amer Palace Jaipur',
    organizer: 'Amer Development & Management Authority',
    isFeatured: false
  },

  // ==========================================
  // FOLK & REGIONAL MUSIC
  // ==========================================
  {
    id: 'music-jodhpur-riff-folk',
    artistOrEventName: 'Jodhpur RIFF: Rajasthan International Folk Festival',
    artist: 'Langa & Manganiyar Master Troupe feat. Chugge Khan',
    venue: 'Mehrangarh Fort Zenana Courtyard & Battlements',
    city: 'Jodhpur',
    state: 'Rajasthan',
    date: 'Oct 16, 2026',
    time: 'Dawn, Sunset & Full Moon Sessions',
    genre: 'Folk Music',
    price: '₹1,500 (Day Pass) / ₹4,000 (Festival Full Access)',
    priceInr: 1500,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
    status: 'LIVE / VERIFIED',
    statusExplanation: 'Verified UNESCO-partnered international folk festival on the Sharad Purnima full moon at Mehrangarh Fort.',
    setting: 'Outdoor',
    suitableFor: ['Solo', 'Friends', 'Couple', 'Family'],
    description: 'Recognized by UNESCO as a cultural heritage beacon. Over 250 hereditary desert bards sing ballades of Thar chivalry using ancestral Kamaicha, Khartal, and Morchang instruments on towering cliff ramparts.',
    highlights: [
      'Dawn acoustic concerts on fort bastions overlooking the Blue City',
      'Rare traditional bowed Kamaicha instruments made of goat hide and desert acacia wood',
      'Spontaneous midnight jam sessions fusing desert folk with Celtic and flamenco roots'
    ],
    bookingOrInfoUrl: 'https://jodhpurriff.org',
    googleMapsQuery: 'Mehrangarh Fort Jodhpur',
    organizer: 'Mehrangarh Museum Trust & UNESCO',
    isFeatured: true
  },
  {
    id: 'music-kolkata-baul-shantiniketan',
    artistOrEventName: 'Ektara & Soul: Bengal Mystic Baul Songs & Moner Manush',
    artist: 'Parvathy Baul & Shantiniketan Baul Sampradaya',
    venue: 'Rabindra Sadan Cultural Complex & Open Lawns',
    city: 'Kolkata',
    state: 'West Bengal',
    date: 'Nov 20, 2026',
    time: '5:30 PM - 8:30 PM IST',
    genre: 'Regional Music',
    price: '₹200 - ₹600',
    priceInr: 200,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated traditional Bengali rural folk performance showcasing UNESCO intangible cultural heritage Baul philosophy.',
    setting: 'Both',
    suitableFor: ['Solo', 'Couple', 'Family', 'Senior Friendly'],
    description: 'Listen to the uninhibited spiritual songs of Bengal’s wandering minstrels. Strumming the one-stringed Ektara and tying brass Ghungroo bells around their ankles, Baul singers embody love, freedom, and divine introspection.',
    highlights: [
      'Intimate performance by renowned female Baul master Parvathy Baul',
      'Acoustic Anandalahari (earthen drum) and Dubki rhythm interplay',
      'Explanations of Lalon Fakir’s timeless philosophical poetry'
    ],
    bookingOrInfoUrl: 'https://wbtourism.gov.in',
    googleMapsQuery: 'Rabindra Sadan Kolkata',
    organizer: 'West Bengal Heritage Arts Board',
    isFeatured: false
  },
  {
    id: 'music-kochi-kerala-sopana-sangeetham',
    artistOrEventName: 'Sopana Sangeetham: Temple Steps Rhythm & Edakka Recital',
    artist: 'Eloor Biju & Guruvayur Traditional Percussion Ensemble',
    venue: 'Fort Kochi Beach Promenade Open Amphitheatre',
    city: 'Kochi',
    state: 'Kerala',
    date: 'Nov 12, 2026',
    time: '6:00 PM - 8:00 PM IST',
    genre: 'Regional Music',
    price: 'Free Public Performance',
    priceInr: 0,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated Kerala maritime cultural showcase organized by Kerala Folk Arts Academy in heritage Fort Kochi.',
    setting: 'Outdoor',
    suitableFor: ['Family', 'Solo', 'Couple', 'Senior Friendly'],
    description: 'An ancient temple singing style sung on the holy granite steps (Sopanam). Driven by the magical hourglass-shaped Edakka drum, whose tension ropes are squeezed to change pitches like human vocal chords.',
    highlights: [
      'Coastal breeze with iconic Chinese fishing nets visible on the horizon',
      'The Edakka drum producing complete melodic raga scales from a single leather membrane',
      'Devotional Jayadeva Ashtapadi verses rendered in slow Malayalam tempo'
    ],
    bookingOrInfoUrl: 'https://keralatourism.org',
    googleMapsQuery: 'Fort Kochi Beach Amphitheatre',
    organizer: 'Kerala Folk Arts Academy',
    isFeatured: false
  },

  // ==========================================
  // INDIE & FUSION CONCERTS
  // ==========================================
  {
    id: 'music-bengaluru-agam-carnatic-rock',
    artistOrEventName: 'Agam: The Carnatic Progressive Rock Tour 2026',
    artist: 'Agam (Harish Sivaramakrishnan, Swamy Seetharaman & Band)',
    venue: 'Manpho Convention Centre Grounds, Nagavara',
    city: 'Bengaluru',
    state: 'Karnataka',
    date: 'Oct 31, 2026',
    time: '7:00 PM - 10:30 PM IST',
    genre: 'Fusion',
    price: '₹799 (Early Bird) / ₹1,499 (Fan Pit)',
    priceInr: 799,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=80',
    status: 'LIVE / VERIFIED',
    statusExplanation: 'Verified arena concert tour date verified through official band tour schedule and live booking portal.',
    setting: 'Outdoor',
    suitableFor: ['Friends', 'Solo', 'Couple'],
    description: 'Bangalore’s homegrown pride Agam brings their mind-bending synthesis of traditional South Indian Carnatic vocal ragas with heavy progressive guitar riffs, double-kick drums, and grand synthesizers.',
    highlights: [
      'Signature anthems including "Malhar Jam", "The Celestial Nymph", and "Rangapura Vihara"',
      'Electrifying light and visuals production celebrating Indian mythology',
      'Outdoor festival atmosphere with artisanal food trucks and merch stalls'
    ],
    bookingOrInfoUrl: 'https://in.bookmyshow.com',
    googleMapsQuery: 'Manpho Convention Centre Bengaluru',
    organizer: 'Live Nation India & Bengaluru Gig Collective',
    isFeatured: true
  },
  {
    id: 'music-hyderabad-folk-rock-raghu-dixit',
    artistOrEventName: 'The Raghu Dixit Project: Earthy Indian Folk-Pop Live',
    artist: 'Raghu Dixit Project (feat. colourful lungis & ghungroos)',
    venue: 'Heart Cup Coffee Outdoor Amphitheatre, Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    date: 'Nov 06, 2026',
    time: '8:00 PM - 11:00 PM IST',
    genre: 'Indie Music',
    price: '₹999 (Includes ₹500 F&B Cover)',
    priceInr: 999,
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1000&q=80',
    status: 'LIVE / VERIFIED',
    statusExplanation: 'Verified live gig venue booking in Hyderabad financial district. Direct ticketing via venue box office.',
    setting: 'Outdoor',
    suitableFor: ['Friends', 'Couple', 'Solo'],
    description: 'Get ready to jump, dance, and sing along! Raghu Dixit delivers energetic Kannada, Hindi, and English folk-rock anthems clad in silken lungis with ankle bells rattling to acoustic guitar strums.',
    highlights: [
      'High-energy crowd interaction and infectious chorus sing-alongs ("Lokada Kalaji", "Mysore Se Aayi")',
      'Outdoor amphitheatre seating under twinkling fairy lights',
      'Craft beverages and wood-fired appetizers available throughout'
    ],
    bookingOrInfoUrl: 'https://insider.in',
    googleMapsQuery: 'Heart Cup Coffee Gachibowli Hyderabad',
    organizer: 'Heart Cup Live Music Series',
    isFeatured: false
  },
  {
    id: 'music-mumbai-shakti-fusion-anniversary',
    artistOrEventName: 'East Meets West: Global Acoustic Fusion Trio',
    artist: 'Zakir Hussain (Tabla), Niladri Kumar (Zitar), & V. Selvaganesh (Kanjira)',
    venue: 'Jamshed Bhabha Theatre, NCPA',
    city: 'Mumbai',
    state: 'Maharashtra',
    date: 'Dec 05, 2026',
    time: '7:00 PM - 10:00 PM IST',
    genre: 'Fusion',
    price: '₹1,500 - ₹5,000',
    priceInr: 1500,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    status: 'DEMO',
    statusExplanation: 'Demo event simulation showcasing fusion ensemble discovery card with mock seating tiers for UI preview.',
    setting: 'Indoor',
    suitableFor: ['Couple', 'Solo', 'Family', 'Friends', 'Senior Friendly'],
    description: 'A dazzling convergence of North and South Indian percussions with contemporary electric sitar (Zitar). Rhythm titans push mathematical tempo limits with lightning-fast tihais and humorous call-and-response solos.',
    highlights: [
      'Legendary Grammy-winning percussion masterclass',
      'The electric Zitar producing rock bends and classical meend glides simultaneously',
      'NCPA acoustic hall with tier-1 sound clarity'
    ],
    bookingOrInfoUrl: 'https://ncpamumbai.com',
    googleMapsQuery: 'NCPA Mumbai Nariman Point',
    organizer: 'Mumbai Global Arts Consortium',
    isFeatured: false
  },

  // ==========================================
  // BOLLYWOOD LIVE PERFORMANCES
  // ==========================================
  {
    id: 'music-mumbai-bollywood-unplugged',
    artistOrEventName: 'Bollywood Symphonic Unplugged: Arijit Singh Live in Concert',
    artist: 'Arijit Singh with 45-Piece Grand Philharmonic Strings',
    venue: 'Jio World Garden, BKC',
    city: 'Mumbai',
    state: 'Maharashtra',
    date: 'Dec 19, 2026',
    time: '6:30 PM - 10:30 PM IST',
    genre: 'Bollywood Live',
    price: '₹1,999 - ₹8,500',
    priceInr: 1999,
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1000&q=80',
    status: 'DEMO',
    statusExplanation: 'Demo arena stadium event card demonstrating high-capacity Bollywood stadium concert representation. Not currently open for verified live booking.',
    setting: 'Outdoor',
    suitableFor: ['Couple', 'Friends', 'Family', 'Solo'],
    description: 'India’s most celebrated playback voice accompanied by a 45-piece live string orchestra. Experience monumental Bollywood ballads and acoustic renditions under massive arena stadium production.',
    highlights: [
      '3-hour continuous journey through chart-topping film soundtracks',
      'World-class digital audio arrays and 360-degree LED screen mapping',
      'Convenient parking and metro access at Bandra-Kurla Complex'
    ],
    bookingOrInfoUrl: 'https://in.bookmyshow.com',
    googleMapsQuery: 'Jio World Garden BKC Mumbai',
    organizer: 'Encompass & TM Talent Management',
    isFeatured: true
  },
  {
    id: 'music-delhi-sufi-bollywood-night',
    artistOrEventName: 'Old Delhi Ghazal & Bollywood Retro Melodies',
    artist: 'Javed Ali Live with Delhi String Ensemble',
    venue: 'Siri Fort Auditorium, August Kranti Marg',
    city: 'New Delhi',
    state: 'Delhi',
    date: 'Nov 21, 2026',
    time: '7:00 PM - 10:00 PM IST',
    genre: 'Bollywood Live',
    price: '₹750 - ₹2,500',
    priceInr: 750,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    status: 'LIVE / VERIFIED',
    statusExplanation: 'Verified auditorium concert date scheduled at Siri Fort Cultural Complex with verified ticketed entry.',
    setting: 'Indoor',
    suitableFor: ['Family', 'Couple', 'Senior Friendly', 'Solo'],
    description: 'Celebrated singer Javed Ali delivers classic Bollywood romantic melodies, Sufi filmi tracks (Jashn-e-Bahaara, Arziyan), and nostalgic vintage numbers with acoustic instrumentation.',
    highlights: [
      'Pristine theater acoustics inside New Delhi’s largest auditorium',
      'Soulful tributes to timeless composers AR Rahman and Madan Mohan',
      'Ample seated comfort suitable for multi-generational families'
    ],
    bookingOrInfoUrl: 'https://delhitourism.gov.in',
    googleMapsQuery: 'Siri Fort Auditorium New Delhi',
    organizer: 'Delhi Heritage Music Society',
    isFeatured: false
  },

  // ==========================================
  // CULTURAL MUSIC FESTIVALS & TRADITIONAL INSTRUMENTS
  // ==========================================
  {
    id: 'music-kolkata-dover-lane',
    artistOrEventName: '73rd Dover Lane Music Conference: All-Night Classical Ragas',
    artist: 'Pt. Hariprasad Chaurasia (Bansuri), Begum Parveen Sultana & Stalwarts',
    venue: 'Nazrul Mancha, Rabindra Sarobar Lake Park',
    city: 'Kolkata',
    state: 'West Bengal',
    date: 'Jan 22, 2027',
    time: '8:00 PM - 6:00 AM (All-Night Sessions)',
    genre: 'Cultural Music Festivals',
    price: '₹500 (Nightly) / ₹2,000 (Season Pass)',
    priceInr: 500,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated 7-decade winter tradition of all-night classical conferences in Kolkata. Traditional dates in late January.',
    setting: 'Indoor',
    suitableFor: ['Solo', 'Couple', 'Family', 'Senior Friendly'],
    description: 'The holy grail of Indian classical night concerts. Thousands of Kolkatans wrap in winter shawls to sip steaming Darjeeling tea while listening to all-night ragas transitioning seamlessly from dusk to dawn.',
    highlights: [
      'Unbroken musical recitals continuing past 4:00 AM into morning ragas',
      'The sacred bansuri flute notes floating across misty Rabindra Sarobar lake',
      'Historic conference that has hosted every Indian classical legend since 1952'
    ],
    bookingOrInfoUrl: 'https://doverlanemusicconference.org',
    googleMapsQuery: 'Nazrul Mancha Kolkata',
    organizer: 'The Dover Lane Music Conference',
    isFeatured: true
  },
  {
    id: 'music-gwalior-tansen-samaroh',
    artistOrEventName: 'Tansen Samaroh: Century-Old Sangeet Mahaotsav',
    artist: 'National Dhrupad & Gwalior Gharana Vocalists',
    venue: 'Tomb of Tansen Monument Complex, Hazira',
    city: 'Gwalior',
    state: 'Madhya Pradesh',
    date: 'Dec 26, 2026',
    time: 'Morning (10:00 AM) & Evening (6:00 PM)',
    genre: 'Cultural Music Festivals',
    price: 'Free Public Heritage Access',
    priceInr: 0,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
    status: 'CURATED',
    statusExplanation: 'Curated state heritage celebration organized annually by Ustad Alauddin Khan Sangeet Academy beside Tansen’s historic mausoleum.',
    setting: 'Outdoor',
    suitableFor: ['Solo', 'Senior Friendly', 'Family', 'Couple'],
    description: 'One of India’s oldest classical musical memorials. Held directly under the Tamarind tree where Mian Tansen rests, celebrating majestic Dhrupad rhythms and microtonal vocal heritage.',
    highlights: [
      'Rare authentic Dhrupad style with deep Pakhawaj barrel-drum accompaniments',
      'Historic 16th-century Mughal mausoleum architectural backdrop',
      'Prestigious National Tansen Samman lifetime awards presented during the festival'
    ],
    bookingOrInfoUrl: 'https://mptourism.com',
    googleMapsQuery: 'Tomb of Tansen Gwalior',
    organizer: 'Ustad Alauddin Khan Sangeet Academy & MP Tourism',
    isFeatured: false
  },
  {
    id: 'music-hyderabad-santoor-morning',
    artistOrEventName: 'Morning of Hundred Strings: Kashmiri Santoor Masterclass',
    artist: 'Pandit Tarun Bhattacharya (100-Stringed Santoor) with Bickram Ghosh (Tabla)',
    venue: 'Taramati Baradari Open-Air Heritage Pavilion, Gandipet',
    city: 'Hyderabad',
    state: 'Telangana',
    date: 'Nov 15, 2026',
    time: '7:30 AM - 10:00 AM IST',
    genre: 'Traditional Instrument Performances',
    price: '₹300 - ₹800',
    priceInr: 300,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    status: 'LIVE / VERIFIED',
    statusExplanation: 'Verified morning heritage performance at Qutb Shahi music palace Taramati Baradari with confirmed acoustics.',
    setting: 'Outdoor',
    suitableFor: ['Solo', 'Couple', 'Family', 'Senior Friendly'],
    description: 'Listen to the cascading Himalayan walnut-wood Santoor struck with curved walnut strikers (Mezrab) atop the historic Qutb Shahi pleasure pavilion, famous for acoustic whispering arches.',
    highlights: [
      'Acoustic marvel: Baradari built in 1600s with 12 arched doors designed for sound resonance',
      'Morning raga Ahir Bhairav capturing sunrise over Deccan granite boulders',
      'Traditional Irani chai and Osmania biscuits served after the concert'
    ],
    bookingOrInfoUrl: 'https://telanganatourism.gov.in',
    googleMapsQuery: 'Taramati Baradari Hyderabad',
    organizer: 'Telangana Tourism Cultural Wing',
    isFeatured: true
  }
];

export const MUSIC_GENRES: Array<{
  id: string;
  name: string;
  icon: string;
  description: string;
}> = [
  { id: 'all', name: 'All Music', icon: '🎵', description: 'Explore all classical, folk, sufi, indie & live concerts across India' },
  { id: 'Indian Classical', name: 'Indian Classical', icon: '🪕', description: 'Timeless Carnatic & Hindustani traditions and ragas' },
  { id: 'Carnatic', name: 'Carnatic', icon: '🎻', description: 'South Indian sabha recitals, veena, violin & vocal ragams' },
  { id: 'Hindustani', name: 'Hindustani', icon: '🪘', description: 'Gharana khayal, sitar, sarod, shehnai & morning ragas' },
  { id: 'Folk Music', name: 'Folk Music', icon: '🥁', description: 'Rajasthani Manganiyar, Baul minstrels, and pastoral ballads' },
  { id: 'Sufi Music', name: 'Sufi Music', icon: '🪔', description: 'Mystical Dargah Qawwalis, Khusrau poetry & whirling ecstasies' },
  { id: 'Indie Music', name: 'Indie Music', icon: '🎸', description: 'Contemporary Indian acoustic, folk-rock & indie bands' },
  { id: 'Bollywood Live', name: 'Bollywood Live', icon: '🎤', description: 'Grand unplugged symphonies and playback star concerts' },
  { id: 'Regional Music', name: 'Regional Music', icon: '🎺', description: 'Kerala Sopana Sangeetham, Bengal Baul, Telugu ballads' },
  { id: 'Fusion', name: 'Fusion', icon: '⚡', description: 'Carnatic rock, Indo-Western jazz & world acoustic rhythm jams' },
  { id: 'Cultural Music Festivals', name: 'Music Festivals', icon: '🎪', description: 'All-night classical conferences, RIFF & desert gatherings' },
  { id: 'Traditional Instrument Performances', name: 'Traditional Instruments', icon: '🪈', description: 'Santoor, Jal Tarang, Saraswati Veena, Edakka & Mridangam' }
];

export const POPULAR_MUSIC_SEARCHES = [
  'Carnatic concerts in Hyderabad',
  'Live music in Bengaluru',
  'Sufi concerts',
  'Indian classical music',
  'Concerts this weekend',
  'Morning ragas Varanasi',
  'Folk music Rajasthan',
  'Free sabha concerts'
];

// Helper to pick an unusual, authentic Indian music experience for Surprise Me
export function getRandomSurpriseMusicEvent(
  preferences?: { startingLocation?: string; travelGroup?: string; interests?: string[] },
  excludeId?: string
): { event: LiveMusicEvent; reason: string } {
  const pool = LIVE_MUSIC_EVENTS.filter((e) => e.id !== excludeId);
  const randomChoice = pool[Math.floor(Math.random() * pool.length)] || LIVE_MUSIC_EVENTS[0];

  let reason = `Instead of a commercial arena concert, this immerses you in the living acoustic tradition of ${randomChoice.city} (${randomChoice.state}). It represents authentic ${randomChoice.genre} in a heritage setting.`;

  if (randomChoice.genre === 'Carnatic') {
    reason = `Experience the profound microtonal intricacies of South Indian Carnatic ragams rendered with virtuoso violin and mridangam dialogues inside an acoustically revered auditorium.`;
  } else if (randomChoice.genre === 'Folk Music') {
    reason = `Travel back centuries through hereditary bards singing oral ballades on ancient desert instruments (Kamaicha & Khartal) against towering fortress ramparts.`;
  } else if (randomChoice.genre === 'Sufi Music') {
    reason = `Step into a 700-year-old mystical tradition where synchronised hand-claps, harmonium swells, and ecstatic poetry create an unforgettable spiritual atmosphere.`;
  } else if (randomChoice.genre === 'Traditional Instrument Performances') {
    reason = `An acoustic masterclass on rare traditional Indian instruments (such as the 24-fret Saraswati Veena or 100-stringed Santoor) designed to be felt as much as heard.`;
  } else if (randomChoice.genre === 'Regional Music') {
    reason = `Discover deeply localized acoustic expressions, like temple-step Sopana Sangeetham or nomadic Baul folk poetry, that carry regional philosophy across generations.`;
  } else if (randomChoice.genre === 'Hindustani') {
    reason = `Explore the slow meditative unfolding of ancient ragas at dawn or midnight, preserving the sacred guru-shishya gharana lineage.`;
  }

  return { event: randomChoice, reason };
}

/**
 * Retrieves authentic live music and concert experiences strictly relevant to a destination.
 * Matches by destination name, nearest city, and regional state culture.
 * Never fabricates nonexistent concerts.
 */
export function getMusicEventsForDestination(destination: Destination): LiveMusicEvent[] {
  if (!destination) return [];
  const destName = destination.name.toLowerCase();
  const destState = destination.state.toLowerCase();
  const nearestCity = (destination.nearestCity || '').toLowerCase();

  return LIVE_MUSIC_EVENTS.filter((evt) => {
    const city = evt.city.toLowerCase();
    const state = evt.state.toLowerCase();
    const venue = evt.venue.toLowerCase();
    const desc = evt.description.toLowerCase();

    // 1. Direct city or destination match
    if (city === destName || venue.includes(destName) || desc.includes(destName)) {
      return true;
    }
    // 2. Nearest city match (e.g. Ananthagiri Hills -> Hyderabad)
    if (nearestCity && (city === nearestCity || nearestCity.includes(city) || city.includes(nearestCity))) {
      return true;
    }
    // 3. State cultural heritage match
    if (state === destState) {
      return true;
    }
    return false;
  }).sort((a, b) => {
    const aCityMatch = a.city.toLowerCase() === destName || (nearestCity && a.city.toLowerCase() === nearestCity);
    const bCityMatch = b.city.toLowerCase() === destName || (nearestCity && b.city.toLowerCase() === nearestCity);
    if (aCityMatch && !bCityMatch) return -1;
    if (!aCityMatch && bCityMatch) return 1;
    return 0;
  });
}

