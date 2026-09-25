import { Destination } from '../types/travel';

export const MAJOR_CITIES: Record<string, { lat: number; lng: number }> = {
  'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  'Bengaluru': { lat: 12.9716, lng: 77.5946 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Delhi': { lat: 28.6139, lng: 77.2090 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
  'Pune': { lat: 18.5204, lng: 73.8567 },
  'Kochi': { lat: 9.9312, lng: 76.2673 },
  'Jaipur': { lat: 26.9124, lng: 75.7873 },
  'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
  'Goa': { lat: 15.2993, lng: 74.1240 },
  'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'Guwahati': { lat: 26.1445, lng: 91.7362 },
  'Chandigarh': { lat: 30.7333, lng: 76.7794 },
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'ananthagiri-hills',
    name: 'Ananthagiri Hills',
    tagline: 'Mist-kissed forest ridge and tranquil birthplace of River Musi',
    state: 'Telangana',
    nearestCity: 'Hyderabad',
    distanceFromNearestCityKm: 82,
    coordinates: { lat: 17.3116, lng: 77.8631 },
    categories: ['Nature & Hills', 'Spiritual & Sacred', 'Adventure & Trekking'],
    budgetTier: 'Budget',
    typicalBudgetPerPerson: 4200,
    idealDurationDays: 2,
    recommendedGroups: ['Friends', 'Couple', 'Solo', 'Family'],
    accessibilityFriendly: true,
    bestSeason: 'July to February (Monsoon & Winter)',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    overview: 'Perched in the Vikarabad district of Telangana, Ananthagiri Hills is an enchanting escape cloaked in dense deciduous woods, medicinal herb trails, and aromatic coffee gardens. It houses the ancient Sri Anantha Padmanabha Swamy Temple and is the cradle of the sacred Musi River.',
    highlights: [
      'Centuries-old Sri Anantha Padmanabha Swamy Cave Temple',
      'Musi River origin stream at Bugga Ramalingeswara',
      'Panoramic sunset viewpoint at Kerelli Ridge',
      'Kotepally Reservoir with open-air kayaking & lakeside camping',
      'Lush canopy trekking trails suited for beginners'
    ],
    threeSceneType: 'hills',
    travelTips: [
      'Drive via Shankarpalli-Vikarabad highway (approx 2 hours from Gachibowli, Hyderabad).',
      'Carry light trekking shoes and water bottles; forest paths are gentle but can get misty early morning.',
      'Try fresh organic honeycomb and millet snacks from local tribal cooperatives.'
    ],
    hotspots3D: [
      {
        id: 'temple',
        name: 'Anantha Padmanabha Swamy Temple',
        description: 'Venerable rock-cut shrine dedicated to Lord Vishnu, built centuries ago by the Nizams in mutual reverence.',
        position: [-6, 3.2, -4],
        cameraPosition: [-3, 6, 2],
        cameraTarget: [-6, 3.2, -4],
        category: 'Heritage & Spiritual',
        highlightFact: 'Built around a naturally formed natural limestone cave.'
      },
      {
        id: 'viewpoint',
        name: 'Kerelli Sunset Ridge',
        description: 'The highest elevation ridge offering 360-degree vistas across rolling emerald forest valleys.',
        position: [4, 6.5, -8],
        cameraPosition: [1, 9, -2],
        cameraTarget: [4, 6.5, -8],
        category: 'Scenic Viewpoint',
        highlightFact: 'Ideal spot for catching golden hour mist drifting through teak canopies.'
      },
      {
        id: 'lake',
        name: 'Kotepally Kayak Reservoir',
        description: 'Calm shimmering water body surrounded by rolling knolls, perfect for serene evening boat glides.',
        position: [8, 0.4, 5],
        cameraPosition: [12, 4, 10],
        cameraTarget: [8, 0.4, 5],
        category: 'Water & Leisure',
        highlightFact: 'Popular for quiet sunset kayaking and overnight star-gazing camps.'
      },
      {
        id: 'camp',
        name: 'Wildwood Glamping Glade',
        description: 'Eco-campsite nestled amidst chirping bulbuls, sheltered pines, and campfire clearings.',
        position: [-2, 1.8, 7],
        cameraPosition: [-1, 4, 12],
        cameraTarget: [-2, 1.8, 7],
        category: 'Eco Camping',
        highlightFact: 'Zero light pollution zone allowing unhindered Milky Way views.'
      },
      {
        id: 'trail',
        name: 'Coffee Plantation Walking Trail',
        description: 'Sheltered shaded path weaving through experimental organic coffee plantations and wild medicinal flora.',
        position: [-9, 1.2, 2],
        cameraPosition: [-6, 4, 6],
        cameraTarget: [-9, 1.2, 2],
        category: 'Nature Trail',
        highlightFact: 'Planted with over 40 species of documented indigenous medicinal herbs.'
      }
    ],
    activities: [
      {
        id: 'act-1',
        title: 'Morning Temple Blessing & Bell Walk',
        description: 'Walk through ancient stone colonnades while morning prayers echo over the quiet valley.',
        duration: '1.5 hours',
        timeOfDay: 'Morning',
        cost: 100,
        tag: 'Spiritual'
      },
      {
        id: 'act-2',
        title: 'Kerelli Ridge Forest Trek',
        description: 'Guided gentle hike through sal and teak woodland up to the panoramic lookout terrace.',
        duration: '2.5 hours',
        timeOfDay: 'Morning',
        cost: 350,
        tag: 'Adventure'
      },
      {
        id: 'act-3',
        title: 'Kotepally Kayaking & Shore Relaxation',
        description: 'Glide gently on calm waters in double kayaks with life jackets, followed by roasted corn by the shore.',
        duration: '2 hours',
        timeOfDay: 'Evening',
        cost: 450,
        tag: 'Leisure'
      },
      {
        id: 'act-4',
        title: 'Lakeside Starlit Bonfire Dinner',
        description: 'Enjoy Telangana country-style millet dinner, acoustic melodies, and stargazing around the campfire.',
        duration: '3 hours',
        timeOfDay: 'Night',
        cost: 950,
        tag: 'Dining'
      }
    ]
  },
  {
    id: 'hampi',
    name: 'Hampi',
    tagline: 'Timeless stone empire carved into surreal boulder landscapes',
    state: 'Karnataka',
    nearestCity: 'Bengaluru',
    distanceFromNearestCityKm: 340,
    coordinates: { lat: 15.3350, lng: 76.4600 },
    categories: ['Heritage & History', 'Art & Architecture', 'Adventure & Trekking'],
    budgetTier: 'Moderate',
    typicalBudgetPerPerson: 7500,
    idealDurationDays: 3,
    recommendedGroups: ['Friends', 'Solo', 'Couple', 'Family'],
    accessibilityFriendly: false,
    bestSeason: 'October to March',
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f443b71a?auto=format&fit=crop&w=1200&q=80',
    overview: 'A UNESCO World Heritage marvel, Hampi was the glorious 14th-century capital of the Vijayanagara Empire. Massive granite boulders balance delicately above banana groves, grand stepped tanks, musical pillared halls, and the sacred Tungabhadra River.',
    highlights: [
      'Virupaksha Temple operating continuously since the 7th century',
      'The iconic Stone Chariot and musical pillars of Vittala Temple',
      'Circular coracle boat rides across the Tungabhadra waters',
      'Sunset from Matanga Hill overlooking the entire ruined city',
      'Bicycle tours through Hippie Island and paddy fields'
    ],
    threeSceneType: 'temple_ruins',
    travelTips: [
      'Rent a bicycle or moped to traverse the sprawling 40 sq km open-air archaeological park.',
      'Climb Matanga Hill 45 minutes before dawn for ethereal morning fog rolling over stone ruins.'
    ],
    hotspots3D: [
      {
        id: 'vittala',
        name: 'Vittala Temple & Stone Chariot',
        description: 'The architectural triumph of Vijayanagara, featuring the famous carved chariot shrine.',
        position: [-5, 2.5, -3],
        cameraPosition: [-2, 5, 2],
        cameraTarget: [-5, 2.5, -3],
        category: 'UNESCO Monument',
        highlightFact: 'Pillars emit musical notes when lightly tapped by stone masters.'
      },
      {
        id: 'matanga',
        name: 'Matanga Hill Summit',
        description: 'The geometric center and highest vantage point in Hampi with 360-degree vista.',
        position: [5, 6, -6],
        cameraPosition: [2, 8, -1],
        cameraTarget: [5, 6, -6],
        category: 'Viewpoint',
        highlightFact: 'Mentioned in the Ramayana as the hermitage of Sage Matanga.'
      },
      {
        id: 'river',
        name: 'Tungabhadra Coracle Crossing',
        description: 'Traditional round woven coracles floating between rugged reddish granite boulders.',
        position: [6, 0.5, 4],
        cameraPosition: [10, 3, 8],
        cameraTarget: [6, 0.5, 4],
        category: 'River Crossing',
        highlightFact: 'Made of woven bamboo bark coated in waterproof resin.'
      }
    ],
    activities: [
      {
        id: 'hampi-1',
        title: 'Dawn Matanga Hill Ascent',
        description: 'Short boulder scramble to witness sunrise lighting up the Virupaksha gopuram.',
        duration: '2 hours',
        timeOfDay: 'Morning',
        cost: 0,
        tag: 'Trekking'
      },
      {
        id: 'hampi-2',
        title: 'Tungabhadra Coracle Drift',
        description: 'Spinning boat glide through the sacred river gorge past submerged ancient carvings.',
        duration: '1 hour',
        timeOfDay: 'Afternoon',
        cost: 400,
        tag: 'Adventure'
      },
      {
        id: 'hampi-3',
        title: 'Heritage Bicycle Route',
        description: 'Cycle leisurely past Queens Bath, Elephant Stables, and Lotus Mahal.',
        duration: '3 hours',
        timeOfDay: 'Evening',
        cost: 250,
        tag: 'Heritage'
      }
    ]
  },
  {
    id: 'munnar',
    name: 'Munnar & Tea Valleys',
    tagline: 'Emerald carpeted valleys in the mist of the Western Ghats',
    state: 'Kerala',
    nearestCity: 'Kochi',
    distanceFromNearestCityKm: 125,
    coordinates: { lat: 10.0889, lng: 77.0595 },
    categories: ['Nature & Hills', 'Wildlife & Forests', 'Culinary & Food'],
    budgetTier: 'Moderate',
    typicalBudgetPerPerson: 8500,
    idealDurationDays: 3,
    recommendedGroups: ['Couple', 'Family', 'Friends', 'Senior Friendly'],
    accessibilityFriendly: true,
    bestSeason: 'September to March',
    coverImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    overview: 'Located at the confluence of three mountain streams in God’s Own Country, Munnar rises over 1,600m above sea level with undulating manicured tea gardens, cascading waterfalls, and cool mountain air.',
    highlights: [
      'Endless emerald slopes of century-old tea estates',
      'Spotting the endangered Nilgiri Tahr at Eravikulam National Park',
      'Boating in Mattupetty Dam surrounded by wooded peaks',
      'Artisanal tea tasting workshops and fresh spice garden strolls'
    ],
    threeSceneType: 'hills',
    travelTips: [
      'Stop by Cheeyappara and Valara waterfalls along the Kochi-Munnar ghat road.',
      'Sip fresh cardamom chai and buy vacuum-sealed single-estate tea leaves.'
    ],
    hotspots3D: [
      {
        id: 'teaplant',
        name: 'Kolukkumalai Tea Terrace',
        description: 'The highest organic tea plantation in the world with jaw-dropping precipice drop-offs.',
        position: [-6, 5, -5],
        cameraPosition: [-2, 7, 0],
        cameraTarget: [-6, 5, -5],
        category: 'Tea Heritage',
        highlightFact: 'Elevation exceeding 2,160 meters producing rare orthodox tea leaves.'
      },
      {
        id: 'dam',
        name: 'Mattupetty Lake Reflection',
        description: 'Tranquil emerald reservoir reflecting eucalyptus woods and distant tea crests.',
        position: [6, 0.8, 4],
        cameraPosition: [10, 4, 8],
        cameraTarget: [6, 0.8, 4],
        category: 'Lake',
        highlightFact: 'Frequented by wild elephant herds during quiet late afternoons.'
      }
    ],
    activities: [
      {
        id: 'm-1',
        title: 'Sunrise Walk Through Organic Tea Gardens',
        description: 'Observe skilled tea pluckers in the morning mist and learn two-leaves-and-a-bud picking.',
        duration: '2 hours',
        timeOfDay: 'Morning',
        cost: 300,
        tag: 'Nature'
      },
      {
        id: 'm-2',
        title: 'Eravikulam Safari for Nilgiri Tahr',
        description: 'Guided eco-bus into the protected grassland sanctuary of South India’s rare mountain goat.',
        duration: '3 hours',
        timeOfDay: 'Afternoon',
        cost: 650,
        tag: 'Wildlife'
      }
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi Ghats',
    tagline: 'The eternal soul of India pulsating along the sacred Ganges',
    state: 'Uttar Pradesh',
    nearestCity: 'Kolkata',
    distanceFromNearestCityKm: 650,
    coordinates: { lat: 25.3176, lng: 82.9739 },
    categories: ['Spiritual & Sacred', 'Heritage & History', 'Culinary & Food'],
    budgetTier: 'Budget',
    typicalBudgetPerPerson: 5500,
    idealDurationDays: 3,
    recommendedGroups: ['Solo', 'Couple', 'Family', 'Senior Friendly'],
    accessibilityFriendly: false,
    bestSeason: 'October to March',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    overview: 'One of the oldest continuously inhabited cities on Earth, Kashi (Varanasi) is an overwhelming sensory symphony of brass temple bells, chanting, saffron sadhus, glowing oil lamps, and divine spirituality upon the holy steps of Mother Ganga.',
    highlights: [
      'Mesmerizing evening Maha Aarti ceremony at Dashashwamedh Ghat',
      'Dawn rowboat ride watching pilgrims bathe in the morning solar rays',
      'Exploring the labyrinthine ancient gallis (alleys) for Banarasi paan and malaiyo',
      'Kashi Vishwanath Corridor and Sarnath Buddhist Deer Park'
    ],
    threeSceneType: 'ghats',
    travelTips: [
      'Book an early morning wooden rowboat (not motorized) to soak in peaceful chants from the water.',
      'Savor hot kachori-jalebi for breakfast in Thatheri Bazaar.'
    ],
    hotspots3D: [
      {
        id: 'dasha',
        name: 'Dashashwamedh Ghat Steps',
        description: 'The monumental riverfront steps where seven young priests perform the evening cosmic fire aarti.',
        position: [-4, 2, -2],
        cameraPosition: [0, 5, 4],
        cameraTarget: [-4, 2, -2],
        category: 'Spiritual Center',
        highlightFact: 'Continuously active spiritual gathering site for thousands of years.'
      },
      {
        id: 'boat',
        name: 'Ganga Morning Rowboat Line',
        description: 'Vibrant wooden skiffs floating on the gentle holy river catching first sunrise beams.',
        position: [4, 0.2, 5],
        cameraPosition: [8, 3, 9],
        cameraTarget: [4, 0.2, 5],
        category: 'River Experience',
        highlightFact: 'Reflects the morning golden light off 84 continuous riverside stone ghats.'
      }
    ],
    activities: [
      {
        id: 'v-1',
        title: 'Subah-e-Banaras Dawn Boat Sail',
        description: 'Drift past Manikarnika, Scindia, and Assi Ghat as morning hymns echo through the river mist.',
        duration: '2 hours',
        timeOfDay: 'Morning',
        cost: 500,
        tag: 'Spiritual'
      },
      {
        id: 'v-2',
        title: 'Dashashwamedh Ganga Aarti VIP Viewing',
        description: 'Watch the choreographic spectacle of brass multi-tiered lamps swirling against the night sky.',
        duration: '1.5 hours',
        timeOfDay: 'Evening',
        cost: 300,
        tag: 'Cultural'
      }
    ]
  },
  {
    id: 'gokarna',
    name: 'Gokarna & Om Beach',
    tagline: 'Soulful cliffside trails meeting tranquil Arabian shores',
    state: 'Karnataka',
    nearestCity: 'Bengaluru',
    distanceFromNearestCityKm: 480,
    coordinates: { lat: 14.5479, lng: 74.3188 },
    categories: ['Coastal & Beaches', 'Nature & Hills', 'Spiritual & Sacred'],
    budgetTier: 'Budget',
    typicalBudgetPerPerson: 5200,
    idealDurationDays: 3,
    recommendedGroups: ['Friends', 'Solo', 'Couple'],
    accessibilityFriendly: false,
    bestSeason: 'October to April',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    overview: 'A bohemian coastal sanctuary where the Sahyadri mountains dramatically plunge into the Arabian Sea. Gokarna balances sacred Mahabaleshwar temple traditions with unhurried beach life along Om, Kudle, Half Moon, and Paradise beaches.',
    highlights: [
      'The naturally shaped Om symbol shoreline at Om Beach',
      'Scenic cliff-edge beach trekking route connecting 4 pristine coves',
      'Sunset yoga and fresh coconut water at rustic Kudle beach shacks',
      'Phosphorescent plankton night walks under new moon skies'
    ],
    threeSceneType: 'coastal',
    travelTips: [
      'Do the beach trek from Kudle to Paradise Beach early morning before the coastal sun peaks.',
      'Enjoy fresh wood-fired pizzas and coastal seafood curries at hillside shacks.'
    ],
    hotspots3D: [
      {
        id: 'ombeach',
        name: 'Om Beach Curve',
        description: 'Two naturally curved crescent bays joining into the sacred Devanagari ॐ shape.',
        position: [2, 0.4, -2],
        cameraPosition: [6, 4, 3],
        cameraTarget: [2, 0.4, -2],
        category: 'Coastal Wonder',
        highlightFact: 'One of the few naturally contoured sacred beach shapes in the world.'
      },
      {
        id: 'cliff',
        name: 'Kudle Overlook Cliff',
        description: 'Dramatic laterite cliff dropping sheer into turquoise waves with panoramic horizon views.',
        position: [-6, 4, -5],
        cameraPosition: [-2, 6, 0],
        cameraTarget: [-6, 4, -5],
        category: 'Cliff Trek',
        highlightFact: 'Best sunset vantage point along the Uttara Kannada coastline.'
      }
    ],
    activities: [
      {
        id: 'gk-1',
        title: 'Four-Beach Cliff Scramble',
        description: 'Trek along scenic ridge paths from Kudle over rocks to Half-Moon and Paradise beach.',
        duration: '3 hours',
        timeOfDay: 'Morning',
        cost: 200,
        tag: 'Adventure'
      },
      {
        id: 'gk-2',
        title: 'Sunset Paddleboarding & Dolphin Spotting',
        description: 'Paddle gentle Arabian waters while keeping watch for pods of playful humpback dolphins.',
        duration: '1.5 hours',
        timeOfDay: 'Evening',
        cost: 800,
        tag: 'Watersports'
      }
    ]
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh & Shivpuri',
    tagline: 'The world yoga capital where Himalayan foothills greet emerald rapids',
    state: 'Uttarakhand',
    nearestCity: 'Delhi',
    distanceFromNearestCityKm: 240,
    coordinates: { lat: 30.0869, lng: 78.2676 },
    categories: ['Adventure & Trekking', 'Spiritual & Sacred', 'Nature & Hills'],
    budgetTier: 'Moderate',
    typicalBudgetPerPerson: 7000,
    idealDurationDays: 3,
    recommendedGroups: ['Friends', 'Solo', 'Couple'],
    accessibilityFriendly: false,
    bestSeason: 'September to June',
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    overview: 'Framed by forested Shivalik ranges and the emerald waters of the fledgling Ganga, Rishikesh is the global epicenter for mindfulness, ashram living, and adrenaline-charged white water rafting.',
    highlights: [
      'Grade III and IV white-water river rafting from Shivpuri through the Marine Drive rapids',
      'Evening Aarti at Parmarth Niketan and the suspension bridges of Ram & Lakshman Jhula',
      'The Beatles Ashram (Chaurasi Kutia) covered in vibrant graffiti art',
      'Riverside beach camping under pine-scented starry skies'
    ],
    threeSceneType: 'hills',
    travelTips: [
      'Book rafting early morning to avoid downstream queueing at the cliff jumping points.',
      'Sip organic herbal tea at rooftop cafes overlooking the swirling Ganges river bend.'
    ],
    hotspots3D: [
      {
        id: 'rafting',
        name: 'Shivpuri River Rapids',
        description: 'Roaring white water rapids cutting through steep Himalayan sandstone gorges.',
        position: [-4, 1, 3],
        cameraPosition: [-1, 4, 8],
        cameraTarget: [-4, 1, 3],
        category: 'Adventure',
        highlightFact: 'Ranks among the finest river rafting stretches in all of Asia.'
      },
      {
        id: 'bridge',
        name: 'Himalayan Suspension Footbridge',
        description: 'Graceful cable-stayed pedestrian bridge soaring 70 feet above the turquoise torrent.',
        position: [5, 3.5, -4],
        cameraPosition: [2, 6, 1],
        cameraTarget: [5, 3.5, -4],
        category: 'Engineering Landmark',
        highlightFact: 'Swaying suspension bridge connecting historic ashrams across the holy gorge.'
      }
    ],
    activities: [
      {
        id: 'r-1',
        title: '16km Shivpuri to Rishikesh Rafting Run',
        description: 'Tackle famous rapids like Roller Coaster, Golf Course, and Clubhouse with expert safety kayakers.',
        duration: '3 hours',
        timeOfDay: 'Morning',
        cost: 1200,
        tag: 'Adventure'
      },
      {
        id: 'r-2',
        title: 'Parmarth Niketan Ganga Aarti',
        description: 'Sit cross-legged by the riverbank as students in orange robes chant Vedic hymns.',
        duration: '1.5 hours',
        timeOfDay: 'Evening',
        cost: 0,
        tag: 'Spiritual'
      }
    ]
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer Desert Oasis',
    tagline: 'Golden sandstone fortresses rising out of the Great Thar Desert',
    state: 'Rajasthan',
    nearestCity: 'Jaipur',
    distanceFromNearestCityKm: 560,
    coordinates: { lat: 26.9157, lng: 70.9083 },
    categories: ['Heritage & History', 'Art & Architecture', 'Adventure & Trekking'],
    budgetTier: 'Comfort',
    typicalBudgetPerPerson: 11000,
    idealDurationDays: 3,
    recommendedGroups: ['Couple', 'Family', 'Friends'],
    accessibilityFriendly: true,
    bestSeason: 'October to March',
    coverImage: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80',
    overview: 'The Golden City of Rajasthan sparkles with sonorous yellow sandstone architecture. Inside the living Jaisalmer Fort (Sonar Qila), one-fourth of the old city still resides among intricately carved jharokha balconies and royal havelis.',
    highlights: [
      'Sonar Qila: The world’s only surviving living golden sandstone fort',
      'Sunset camel safaris over the rolling ripples of Sam Sand Dunes',
      'Desert glamping with Kalbelia folk dancers around a desert campfire',
      'Intricate filigree stone-carvings of Patwon Ki Haveli'
    ],
    threeSceneType: 'desert',
    travelTips: [
      'Spend a night under the open desert stars at non-commercial Khuri dunes.',
      'Taste traditional Dal Baati Churma and Ker Sangri cooked in desi ghee.'
    ],
    hotspots3D: [
      {
        id: 'fort',
        name: 'Sonar Qila Bastions',
        description: 'The golden hill fort crowned with 99 bastions rising above the Thar Desert plateau.',
        position: [-5, 4.5, -4],
        cameraPosition: [-1, 7, 1],
        cameraTarget: [-5, 4.5, -4],
        category: 'Living Fort',
        highlightFact: 'Constructed in 1156 AD without cement or mortar, relying on stone interlocking.'
      },
      {
        id: 'dunes',
        name: 'Sam Golden Wind Dunes',
        description: 'Vast shifting sand dunes sculpted into wave patterns by prevailing desert winds.',
        position: [6, 1.2, 5],
        cameraPosition: [10, 4, 10],
        cameraTarget: [6, 1.2, 5],
        category: 'Desert Landscape',
        highlightFact: 'Ripples shift daily forming new crests as dusk turns the sands rose-gold.'
      }
    ],
    activities: [
      {
        id: 'j-1',
        title: 'Sunset Dune Safari on Camels',
        description: 'Ride through undulating sand crests as the sun sinks into the desert horizon.',
        duration: '2 hours',
        timeOfDay: 'Evening',
        cost: 600,
        tag: 'Adventure'
      },
      {
        id: 'j-2',
        title: 'Heritage Walk through Living Fort Alleys',
        description: 'Discover 7 interconnected Jain temples dating from the 12th to 15th centuries.',
        duration: '2.5 hours',
        timeOfDay: 'Morning',
        cost: 400,
        tag: 'Heritage'
      }
    ]
  },
  {
    id: 'araku-valley',
    name: 'Araku Valley & Borra Caves',
    tagline: 'Eastern Ghats coffee paradise and million-year-old subterranean caverns',
    state: 'Andhra Pradesh',
    nearestCity: 'Visakhapatnam',
    distanceFromNearestCityKm: 114,
    coordinates: { lat: 18.3273, lng: 82.8775 },
    categories: ['Nature & Hills', 'Wildlife & Forests', 'Culinary & Food'],
    budgetTier: 'Budget',
    typicalBudgetPerPerson: 4800,
    idealDurationDays: 2,
    recommendedGroups: ['Family', 'Friends', 'Couple', 'Senior Friendly'],
    accessibilityFriendly: true,
    bestSeason: 'September to March',
    coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    overview: 'Cradled in the Eastern Ghats of Andhra Pradesh, Araku Valley is renowned for its organic shade-grown tribal coffee, lush green valleys, and Borra Caves — naturally sculpted limestone stalactites and stalagmites formed over millions of years.',
    highlights: [
      'Scenic Vistadome train ride passing through 58 mountain tunnels',
      'Borra Caves with million-year-old speleothems and neon illumination',
      'Tribal Museum and authentic Dhimsa folk dance performances',
      'World-acclaimed organic Araku Arabica coffee tasting at plantations'
    ],
    threeSceneType: 'valley',
    travelTips: [
      'Book the Vistadome glass-roof coach from Visakhapatnam to Araku well in advance.',
      'Try the mouthwatering Bamboo Chicken prepared by tribal cooks inside fresh bamboo stalks.'
    ],
    hotspots3D: [
      {
        id: 'borra',
        name: 'Borra Caves Cavern Entrance',
        description: 'Deep subterranean limestone cavern cut by the Gosthani River.',
        position: [-5, 1.5, -4],
        cameraPosition: [-1, 4, 1],
        cameraTarget: [-5, 1.5, -4],
        category: 'Geological Wonder',
        highlightFact: 'Stalactites and stalagmites created over 1 million years ago by dripping water.'
      },
      {
        id: 'coffee',
        name: 'Tribal Coffee Estate Terraces',
        description: 'Organic coffee bushes growing peacefully under the high canopy of silver oak trees.',
        position: [5, 3.8, 3],
        cameraPosition: [8, 6, 7],
        cameraTarget: [5, 3.8, 3],
        category: 'Plantation',
        highlightFact: 'Managed exclusively by indigenous Adivasi farmer cooperatives.'
      }
    ],
    activities: [
      {
        id: 'a-1',
        title: 'Borra Caves Deep Cavern Exploration',
        description: 'Descend into illuminated limestone chambers and marvel at dramatic stalagmite shapes.',
        duration: '2 hours',
        timeOfDay: 'Morning',
        cost: 150,
        tag: 'Adventure'
      },
      {
        id: 'a-2',
        title: 'Tribal Coffee Roasting & Bamboo Chicken Tasting',
        description: 'Experience artisanal coffee brewing followed by smokey clay-baked bamboo chicken.',
        duration: '2 hours',
        timeOfDay: 'Afternoon',
        cost: 650,
        tag: 'Culinary'
      }
    ]
  },
  {
    id: 'coorg',
    name: 'Coorg / Kodagu',
    tagline: 'The Scotland of India with mist-veiled plantations and roaring falls',
    state: 'Karnataka',
    nearestCity: 'Bengaluru',
    distanceFromNearestCityKm: 250,
    coordinates: { lat: 12.3375, lng: 75.8069 },
    categories: ['Nature & Hills', 'Wildlife & Forests', 'Culinary & Food'],
    budgetTier: 'Comfort',
    typicalBudgetPerPerson: 9500,
    idealDurationDays: 3,
    recommendedGroups: ['Family', 'Couple', 'Friends'],
    accessibilityFriendly: true,
    bestSeason: 'October to May',
    coverImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    overview: 'An evergreen hill station blanketed in coffee shrubs, pepper vines, and orange groves. Coorg boasts unique Kodava martial culture, Abbey & Iruppu waterfalls, and the golden Tibetan monastery of Bylakuppe.',
    highlights: [
      'Aromatic plantation homestays with home-brewed filter coffee',
      'The majestic Abbey Falls roaring amidst spice-scented thickets',
      'Namdroling Golden Temple with 40-foot gilded Buddha statues',
      'Trek to Tadiandamol, the highest peak in Kodagu'
    ],
    threeSceneType: 'hills',
    travelTips: [
      'Sample authentic Kodava cuisine like Pandi Curry with soft rice Akki Roti.',
      'Visit the Dubare Elephant Camp early morning for ethical elephant river baths.'
    ],
    hotspots3D: [
      {
        id: 'waterfall',
        name: 'Abbey Falls Gorge',
        description: 'Roaring waterfall cascading down stepped basalt into a secluded valley.',
        position: [-4, 2, -5],
        cameraPosition: [-1, 5, 0],
        cameraTarget: [-4, 2, -5],
        category: 'Waterfall',
        highlightFact: 'A hanging pedestrian bridge offers a mist-splashed front-row view.'
      },
      {
        id: 'monastery',
        name: 'Bylakuppe Golden Temple',
        description: 'Tibetan settlement with three towering gold-gilded statues of Padmasambhava.',
        position: [5, 3.5, 4],
        cameraPosition: [8, 6, 8],
        cameraTarget: [5, 3.5, 4],
        category: 'Spiritual Haven',
        highlightFact: 'Home to over 5,000 monks and novices chanting in resonant unison.'
      }
    ],
    activities: [
      {
        id: 'c-1',
        title: 'Tadiandamol Peak Ridge Hike',
        description: 'Trek through Shola forest patches to stand atop the highest crest in Coorg.',
        duration: '5 hours',
        timeOfDay: 'Morning',
        cost: 500,
        tag: 'Adventure'
      },
      {
        id: 'c-2',
        title: 'Estate Coffee Plucking & Cupping Session',
        description: 'Walk with the planter to pick ripe red berries and cup distinct Arabica roasts.',
        duration: '2 hours',
        timeOfDay: 'Afternoon',
        cost: 400,
        tag: 'Nature'
      }
    ]
  },
  {
    id: 'spiti-valley',
    name: 'Spiti Valley',
    tagline: 'The Middle Land: Raw Tibetan high-altitude moonscapes and monastic hermitages',
    state: 'Himachal Pradesh',
    nearestCity: 'Chandigarh',
    distanceFromNearestCityKm: 460,
    coordinates: { lat: 32.2461, lng: 78.0349 },
    categories: ['Adventure & Trekking', 'Nature & Hills', 'Spiritual & Sacred'],
    budgetTier: 'Comfort',
    typicalBudgetPerPerson: 16000,
    idealDurationDays: 6,
    recommendedGroups: ['Friends', 'Solo', 'Couple'],
    accessibilityFriendly: false,
    bestSeason: 'June to October',
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    overview: 'Sandwiched between Tibet and India, Spiti is a cold mountain desert valley of jagged snow-dusted peaks, 1,000-year-old monasteries perched on cliff edges, fossil villages, and the turquoise jewel of Chandratal Lake.',
    highlights: [
      'Key Monastery fortress commanding the Spiti River at 4,166m',
      'Chandratal (Moon Lake) reflecting the high Himalayas like glass',
      'World’s highest post office at Hikkim and highest motorable village at Komic',
      'Unsurpassed astrophotography and Milky Way stargazing'
    ],
    threeSceneType: 'hills',
    travelTips: [
      'Acclimatize in Kaza for at least 24 hours to prevent acute mountain sickness (AMS).',
      'Post a handwritten postcard to loved ones from the world’s highest post office at Hikkim.'
    ],
    hotspots3D: [
      {
        id: 'keymonastery',
        name: 'Key Gompa Fortress',
        description: 'Millennium-old cliff-hugging monastery resembling a fairytale Chinese fortress.',
        position: [-5, 6, -3],
        cameraPosition: [-1, 8, 2],
        cameraTarget: [-5, 6, -3],
        category: 'Ancient Gompa',
        highlightFact: 'Survives multiple Mongol and Dogra sieges over 1,000 years.'
      },
      {
        id: 'chandratal',
        name: 'Chandratal Crescent Basin',
        description: 'Turquoise glacial lake nestled in high alpine meadows.',
        position: [5, 2, 5],
        cameraPosition: [9, 5, 9],
        cameraTarget: [5, 2, 5],
        category: 'Glacial Lake',
        highlightFact: 'Shifts shades from emerald green to deep navy blue throughout the daylight hours.'
      }
    ],
    activities: [
      {
        id: 'sp-1',
        title: 'Key Monastery Dawn Butter Tea & Chanting',
        description: 'Sit in the prayer hall as lamas blow 10-foot alpine horns and serve warm salted butter tea.',
        duration: '2 hours',
        timeOfDay: 'Morning',
        cost: 200,
        tag: 'Spiritual'
      },
      {
        id: 'sp-2',
        title: 'Hikkim High Post Office Expedition',
        description: 'Drive along rugged hairpins to the highest postbox on planet Earth (4,440m).',
        duration: '3 hours',
        timeOfDay: 'Afternoon',
        cost: 800,
        tag: 'Adventure'
      }
    ]
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry / Puducherry',
    tagline: 'French Riviera elegance blending seamlessly with Tamil soul',
    state: 'Puducherry',
    nearestCity: 'Chennai',
    distanceFromNearestCityKm: 150,
    coordinates: { lat: 11.9416, lng: 79.8083 },
    categories: ['Coastal & Beaches', 'Heritage & History', 'Culinary & Food'],
    budgetTier: 'Moderate',
    typicalBudgetPerPerson: 7200,
    idealDurationDays: 3,
    recommendedGroups: ['Couple', 'Solo', 'Friends', 'Family'],
    accessibilityFriendly: true,
    bestSeason: 'October to March',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    overview: 'A seaside enclave where mustard-yellow colonial French villas with bougainvillea curtains contrast with the Tamil quarter. Experience peaceful contemplation at Sri Aurobindo Ashram, the golden sphere of Auroville, and seaside cafes.',
    highlights: [
      'Strolling along the cobblestone avenues of the White Town (French Quarter)',
      'Sunrise cycling on Promenade Beach with spray from the Bay of Bengal',
      'The golden Matrimandir sphere at experimental township Auroville',
      'Artisanal bakeries offering warm croissants and French-Tamil fusion cuisine'
    ],
    threeSceneType: 'coastal',
    travelTips: [
      'Rent a vintage pastel-colored bicycle or scooter to explore the French and Tamil quarters.',
      'Book your Matrimandir inner chamber meditation pass several days in advance.'
    ],
    hotspots3D: [
      {
        id: 'promenade',
        name: 'Goubert Promenade Wall',
        description: '1.5km pedestrianized sea promenade lined with colonial lampposts and rock groynes.',
        position: [-3, 1, 2],
        cameraPosition: [1, 4, 7],
        cameraTarget: [-3, 1, 2],
        category: 'Seaside Promenade',
        highlightFact: 'Completely closed to motorized vehicular traffic every evening for tranquil walking.'
      },
      {
        id: 'matrimandir',
        name: 'Auroville Golden Matrimandir',
        description: 'Futuristic golden geodesic sphere set amidst quiet twelve amphitheater gardens.',
        position: [6, 3, -4],
        cameraPosition: [3, 5, 1],
        cameraTarget: [6, 3, -4],
        category: 'Spiritual Architecture',
        highlightFact: 'Covered with 1,415 gold-leaf plated stainless steel convex discs.'
      }
    ],
    activities: [
      {
        id: 'p-1',
        title: 'Heritage White Town Architectural Walk',
        description: 'Explore preserved 18th-century French consulates, courtyard cafes, and pastel alleys.',
        duration: '2.5 hours',
        timeOfDay: 'Morning',
        cost: 350,
        tag: 'Heritage'
      },
      {
        id: 'p-2',
        title: 'Surfing Lesson at Serenity Beach',
        description: 'Catch gentle Bay of Bengal peelers with certified ISA surf instructors.',
        duration: '2 hours',
        timeOfDay: 'Afternoon',
        cost: 1500,
        tag: 'Watersports'
      }
    ]
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    tagline: 'The romantic City of Lakes and gleaming marble Rajput palaces',
    state: 'Rajasthan',
    nearestCity: 'Ahmedabad',
    distanceFromNearestCityKm: 260,
    coordinates: { lat: 24.5854, lng: 73.7125 },
    categories: ['Heritage & History', 'Art & Architecture', 'Culinary & Food'],
    budgetTier: 'Luxury',
    typicalBudgetPerPerson: 14500,
    idealDurationDays: 3,
    recommendedGroups: ['Couple', 'Family', 'Solo'],
    accessibilityFriendly: true,
    bestSeason: 'September to March',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    overview: 'Surrounded by the ancient Aravalli Hills, Udaipur radiates romance. Lake Pichola reflects the soaring balconies, mirror mosaics, and cupolas of the City Palace complex, alongside the floating white marble Taj Lake Palace.',
    highlights: [
      'Sunset boat ride on Lake Pichola gliding past Jag Mandir Island',
      'The sprawling City Palace complex showcasing 400 years of Mewar royal heritage',
      'Bagore Ki Haveli Dharohar evening folk dance and puppet show',
      'Rooftop candlelit dinners overlooking illuminated palaces and shimmering waters'
    ],
    threeSceneType: 'ghats',
    travelTips: [
      'Take the ropeway up to Karni Mata temple for sunset views over all five Udaipur lakes.',
      'Sip spiced masala chai at Ambrai Ghat while temple bells ring at dusk.'
    ],
    hotspots3D: [
      {
        id: 'citypalace',
        name: 'Mewar City Palace Facade',
        description: 'Granite and marble royal palace stretching 244 meters along Lake Pichola shore.',
        position: [-5, 3.8, -3],
        cameraPosition: [-1, 6, 2],
        cameraTarget: [-5, 3.8, -3],
        category: 'Royal Palace',
        highlightFact: 'Built progressively by 22 generations of Mewar rulers over 400 years.'
      },
      {
        id: 'lakepichola',
        name: 'Jag Mandir Island Haven',
        description: 'Delicate marble pleasure palace floating on the waters of Lake Pichola.',
        position: [4, 0.6, 3],
        cameraPosition: [8, 3, 7],
        cameraTarget: [4, 0.6, 3],
        category: 'Island Palace',
        highlightFact: 'Served as an asylum refuge for Mughal Prince Khurram (later Emperor Shah Jahan).'
      }
    ],
    activities: [
      {
        id: 'u-1',
        title: 'Sunset Lake Pichola Solar Boat Cruise',
        description: 'Glide peacefully as the golden sunset casts a warm reflection over marble ghats.',
        duration: '1.5 hours',
        timeOfDay: 'Evening',
        cost: 850,
        tag: 'Leisure'
      },
      {
        id: 'u-2',
        title: 'Dharohar Traditional Puppet & Dance Gala',
        description: 'Witness Rajasthani women balancing ten brass pots on their heads while dancing on broken glass.',
        duration: '1.5 hours',
        timeOfDay: 'Night',
        cost: 200,
        tag: 'Cultural'
      }
    ]
  },
  {
    id: 'gandikota',
    name: 'Gandikota & Belum Caves',
    tagline: 'The Grand Canyon of India carved into crimson quartzite gorges',
    state: 'Andhra Pradesh',
    nearestCity: 'Bengaluru',
    distanceFromNearestCityKm: 280,
    coordinates: { lat: 14.8152, lng: 78.2863 },
    categories: ['Adventure & Trekking', 'Nature & Hills', 'Heritage & History'],
    budgetTier: 'Budget',
    typicalBudgetPerPerson: 4600,
    idealDurationDays: 2,
    recommendedGroups: ['Friends', 'Solo', 'Couple'],
    accessibilityFriendly: false,
    bestSeason: 'October to February',
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    overview: 'Gandikota is a stunning geological canyon formed by the Pennar River slicing through the Erramala hills. Crowned by a 13th-century red fort, it provides a breathtaking cliffside camping experience paired with the subterranean labyrinths of Belum Caves.',
    highlights: [
      'Gazing into the 300-foot-deep red quartzite gorge of the Pennar River',
      'The massive stone ramparts and granary inside Gandikota Fort',
      'Walking 3.5 km through Belum Caves, India’s second largest cave network',
      'Overnight cliff-edge camping under clear, star-studded Deccan skies'
    ],
    threeSceneType: 'hills',
    travelTips: [
      'Climb the gorge boulders 30 minutes before sunrise to watch shadows retreat from the riverbed.',
      'Carry plenty of drinking water; temperatures rise quickly in the gorge during mid-day.'
    ],
    hotspots3D: [
      {
        id: 'canyon',
        name: 'Pennar River Gorge Edge',
        description: 'Massive stepped red stone cliffs dropping 300 feet vertically into the emerald river below.',
        position: [2, 4.5, -4],
        cameraPosition: [6, 7, 1],
        cameraTarget: [2, 4.5, -4],
        category: 'Geological Wonder',
        highlightFact: 'Naturally eroded over thousands of centuries by the relentless flow of Pennar waters.'
      }
    ],
    activities: [
      {
        id: 'g-1',
        title: 'Dawn Gorge Boulder Scramble',
        description: 'Hike to the canyon lip to watch the first rays of sun ignite the red stone cliffs.',
        duration: '2 hours',
        timeOfDay: 'Morning',
        cost: 0,
        tag: 'Adventure'
      },
      {
        id: 'g-2',
        title: 'Belum Caves Subterranean Trek',
        description: 'Venture 150 feet below ground level through illuminated passages with musical limestone formations.',
        duration: '2.5 hours',
        timeOfDay: 'Afternoon',
        cost: 100,
        tag: 'Exploration'
      }
    ]
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram',
    tagline: 'Seventh-century stone poetry whispering tales by the Coromandel coast',
    state: 'Tamil Nadu',
    nearestCity: 'Chennai',
    distanceFromNearestCityKm: 56,
    coordinates: { lat: 12.6269, lng: 80.1927 },
    categories: ['Heritage & History', 'Art & Architecture', 'Coastal & Beaches'],
    budgetTier: 'Budget',
    typicalBudgetPerPerson: 4200,
    idealDurationDays: 2,
    recommendedGroups: ['Family', 'Couple', 'Solo', 'Senior Friendly'],
    accessibilityFriendly: true,
    bestSeason: 'November to February',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    overview: 'A UNESCO treasure of Pallava dynasty maritime artistry. Monolithic cave temples, monolithic chariots (Rathas), and the wave-lashed Shore Temple tell mythical stories carved directly into coastal granite boulders.',
    highlights: [
      'The iconic 8th-century Shore Temple bathed in ocean spray',
      'Arjuna’s Penance (Descent of the Ganges) — the world’s largest open-air stone bas-relief',
      'The gravity-defying Krishna’s Butter Ball resting on a 45-degree slope',
      'Fresh catch seafood barbecues right on the beach'
    ],
    threeSceneType: 'temple_ruins',
    travelTips: [
      'Rent a bicycle to meander from the cave temples down to the Shore Temple.',
      'Watch stone sculptors at work carving granite statues using traditional chisels.'
    ],
    hotspots3D: [
      {
        id: 'shoretemple',
        name: 'Shore Temple Bastion',
        description: 'Two structural granite spires standing directly on the shore facing Bay of Bengal breakers.',
        position: [-4, 2.5, -2],
        cameraPosition: [-1, 5, 4],
        cameraTarget: [-4, 2.5, -2],
        category: 'UNESCO Monument',
        highlightFact: 'Built in the 8th century AD, enduring 1,300 years of salty ocean winds and waves.'
      }
    ],
    activities: [
      {
        id: 'mb-1',
        title: 'Morning Bas-Relief & Monolithic Rathas Tour',
        description: 'Explore the Five Rathas each carved seamlessly from a single monolithic granite boulder.',
        duration: '2.5 hours',
        timeOfDay: 'Morning',
        cost: 300,
        tag: 'Heritage'
      },
      {
        id: 'mb-2',
        title: 'Catch-of-the-Day Sunset Fish Barbecue',
        description: 'Pick fresh pomfret or prawns seasoned in Chettinad spices cooked over coconut husk coals.',
        duration: '2 hours',
        timeOfDay: 'Evening',
        cost: 750,
        tag: 'Culinary'
      }
    ]
  },
  {
    id: 'wayanad',
    name: 'Wayanad',
    tagline: 'Mist-wreathed mountain passes, bamboo groves, and ancient petroglyphs',
    state: 'Kerala',
    nearestCity: 'Kochi',
    distanceFromNearestCityKm: 260,
    coordinates: { lat: 11.6854, lng: 76.1320 },
    categories: ['Nature & Hills', 'Wildlife & Forests', 'Adventure & Trekking'],
    budgetTier: 'Moderate',
    typicalBudgetPerPerson: 7800,
    idealDurationDays: 3,
    recommendedGroups: ['Friends', 'Couple', 'Family'],
    accessibilityFriendly: false,
    bestSeason: 'September to March',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    overview: 'High in the northern hills of Kerala, Wayanad features misty mountain ridges, tree-houses, prehistoric cave drawings at Edakkal, heart-shaped alpine lakes, and wild elephant spotting in Muthanga Sanctuary.',
    highlights: [
      'Heart-shaped natural lake atop Chembra Peak (highest peak in Wayanad)',
      'Neolithic stone carvings dating to 6000 BCE at Edakkal Caves',
      'Bamboo rafting on the calm waters of Kuruva Island',
      'Spice plantation walks smelling fresh green cardamom, pepper, and cinnamon'
    ],
    threeSceneType: 'hills',
    travelTips: [
      'Hike to Edakkal Caves early in the morning before entry queues form on the stone steps.',
      'Purchase single-origin forest honey and handwoven bamboo crafts.'
    ],
    hotspots3D: [
      {
        id: 'chembra',
        name: 'Chembra Heart Lake Ridge',
        description: 'Emerald heart-shaped natural alpine lake that has never been known to dry up.',
        position: [4, 5, -4],
        cameraPosition: [1, 7, 1],
        cameraTarget: [4, 5, -4],
        category: 'High Altitude Lake',
        highlightFact: 'Perennial natural mountain water basin surrounded by Shola cloud forests.'
      }
    ],
    activities: [
      {
        id: 'w-1',
        title: 'Chembra Peak Heart Lake Trek',
        description: 'Hike through tea plantations and mist forests up to the legendary romantic water pool.',
        duration: '4 hours',
        timeOfDay: 'Morning',
        cost: 750,
        tag: 'Adventure'
      }
    ]
  },
  {
    id: 'shillong',
    name: 'Shillong & Cherrapunji',
    tagline: 'Scotland of the East with living root bridges and cascading rain forests',
    state: 'Meghalaya',
    nearestCity: 'Guwahati',
    distanceFromNearestCityKm: 100,
    coordinates: { lat: 25.5788, lng: 91.8933 },
    categories: ['Nature & Hills', 'Adventure & Trekking', 'Art & Architecture'],
    budgetTier: 'Comfort',
    typicalBudgetPerPerson: 10500,
    idealDurationDays: 4,
    recommendedGroups: ['Friends', 'Solo', 'Couple'],
    accessibilityFriendly: false,
    bestSeason: 'September to May',
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    overview: 'Perched in the Khasi Hills, Shillong vibrates with rock music culture, pine ridges, and crystal clear river canyons like Dawki. In nearby Cherrapunji and Nongriat, living ficus tree roots have been entwined over centuries to create living pedestrian bridges.',
    highlights: [
      'The awe-inspiring Double Decker Living Root Bridge of Nongriat',
      'Nohkalikai Falls: India’s tallest plunge waterfall tumbling 1,115 feet',
      'Gliding over transparent glass-like waters of Umngot River at Dawki',
      'The vibrant indie music cafe culture of Shillong town'
    ],
    threeSceneType: 'hills',
    travelTips: [
      'Train for 3,500 stone steps down to the Double Decker Root Bridge and back up.',
      'Sip local cherry tea and taste smoked pork with bamboo shoots in Khasi dhabas.'
    ],
    hotspots3D: [
      {
        id: 'rootbridge',
        name: 'Double Decker Living Root Span',
        description: 'Bio-engineering wonder grown over 200 years from Ficus elastica aerial roots.',
        position: [-4, 2, -3],
        cameraPosition: [-1, 5, 2],
        cameraTarget: [-4, 2, -3],
        category: 'Bio-Engineering Wonder',
        highlightFact: 'Stronger and more resilient with age as root systems continually grow thicker.'
      }
    ],
    activities: [
      {
        id: 'sh-1',
        title: 'Nongriat Living Root Bridge Expedition',
        description: 'Trek down through dense rain forest gorges to swim in natural emerald pools beside living bridges.',
        duration: '6 hours',
        timeOfDay: 'Morning',
        cost: 600,
        tag: 'Adventure'
      }
    ]
  },
  {
    id: 'chikmagalur',
    name: 'Chikmagalur',
    tagline: 'Cradle of Indian coffee under the shadow of Mullayanagiri peak',
    state: 'Karnataka',
    nearestCity: 'Bengaluru',
    distanceFromNearestCityKm: 245,
    coordinates: { lat: 13.3161, lng: 75.7720 },
    categories: ['Nature & Hills', 'Adventure & Trekking', 'Culinary & Food'],
    budgetTier: 'Moderate',
    typicalBudgetPerPerson: 6500,
    idealDurationDays: 2,
    recommendedGroups: ['Friends', 'Couple', 'Family'],
    accessibilityFriendly: true,
    bestSeason: 'September to March',
    coverImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    overview: 'Where the legendary saint Baba Budan first planted seven coffee beans smuggled from Yemen in the 17th century. Chikmagalur features Karnataka’s highest peak (Mullayanagiri), cascading Hebbe Falls, and peaceful estate homestays.',
    highlights: [
      'Scaling Mullayanagiri Peak (1,930m) into the swirling clouds',
      'The sacred Baba Budan Giri mountain range and cave shrine',
      'Jeep safari into Bhadra Wildlife Sanctuary for leopards and gaurs',
      'Fresh roast coffee cupping right at the plantation drying yards'
    ],
    threeSceneType: 'hills',
    travelTips: [
      'Begin the Mullayanagiri climb by 6:00 AM to see the sunrise ocean of clouds below your feet.',
      'Purchase freshly ground Peaberry and Arabica roast beans.'
    ],
    hotspots3D: [
      {
        id: 'mullayana',
        name: 'Mullayanagiri Summit Steps',
        description: 'Highest peak in Karnataka with a small Shiva shrine sitting right at the apex.',
        position: [-3, 6, -4],
        cameraPosition: [1, 8, 2],
        cameraTarget: [-3, 6, -4],
        category: 'Mountain Apex',
        highlightFact: 'Rises to 1,930 meters, standing tall above the Western Ghats plateau.'
      }
    ],
    activities: [
      {
        id: 'ck-1',
        title: 'Mullayanagiri Sunrise Summit Hike',
        description: 'Ascend stone steps shrouded in cool fog as mountain winds reveal sweeping vistas.',
        duration: '2.5 hours',
        timeOfDay: 'Morning',
        cost: 250,
        tag: 'Adventure'
      }
    ]
  },
  {
    id: 'kaziranga',
    name: 'Kaziranga & Brahmaputra',
    tagline: 'Last stronghold of the great Indian one-horned rhinoceros',
    state: 'Assam',
    nearestCity: 'Guwahati',
    distanceFromNearestCityKm: 190,
    coordinates: { lat: 26.5775, lng: 93.1711 },
    categories: ['Wildlife & Forests', 'Nature & Hills', 'Heritage & History'],
    budgetTier: 'Comfort',
    typicalBudgetPerPerson: 11500,
    idealDurationDays: 3,
    recommendedGroups: ['Family', 'Solo', 'Couple', 'Senior Friendly'],
    accessibilityFriendly: true,
    bestSeason: 'November to April',
    coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    overview: 'A UNESCO World Heritage park flourishing in the fertile floodplains of the mighty Brahmaputra River. Kaziranga shelters two-thirds of the planet’s great Indian one-horned rhinos, wild water buffaloes, swamp deer, and royal Bengal tigers.',
    highlights: [
      'Early morning open jeep safaris in Central Kohora and Western Bagori ranges',
      'Catching glimpses of rhinos grazing peacefully in tall elephant grass',
      'Assamese cultural evenings and traditional Bihu dance performances',
      'Boat cruise on the Brahmaputra looking for freshwater Gangetic river dolphins'
    ],
    threeSceneType: 'valley',
    travelTips: [
      'The Bagori zone offers the highest probability of close-up rhino sightings.',
      'Sip fresh single-estate Assam orthodox black tea with local pitha sweets.'
    ],
    hotspots3D: [
      {
        id: 'rhinoplain',
        name: 'Kohora Elephant Grass Savanna',
        description: 'Lush alluvial grasslands with wetlands teeming with migratory birds and rhinos.',
        position: [3, 1.2, -3],
        cameraPosition: [7, 4, 3],
        cameraTarget: [3, 1.2, -3],
        category: 'Wildlife Sanctuary',
        highlightFact: 'Home to more than 2,400 one-horned rhinoceroses.'
      }
    ],
    activities: [
      {
        id: 'kz-1',
        title: 'Dawn Jeep Safari in Bagori Zone',
        description: 'Explore waterlogged beels and grasslands with licensed forest naturalists.',
        duration: '3 hours',
        timeOfDay: 'Morning',
        cost: 2500,
        tag: 'Wildlife'
      }
    ]
  }
];
