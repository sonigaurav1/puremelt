export const PRODUCT_INGREDIENTS = ["Peanuts", "Almonds", "Cashews", "Walnut", "Pistachios", "Dates", "Honey", "Salt"] as const;
export const PRODUCT_INGREDIENTS_DETAILED = [
  {
    name: 'Peanuts',
    description: 'Roasted for aroma & crunch',
    icon: 'https://images.unsplash.com/photo-1575399872095-9363bf262e64?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVhbnV0fGVufDB8fDB8fHww'
  },
  {
    name: 'Almonds',
    description: 'Smoothness & healthy fats',
    icon: 'https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Cashews',
    description: 'Creamy delight & rich nutrients',
    icon: 'https://images.unsplash.com/photo-1723466998060-533cd1af4e11?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhc2hld3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Pistachios',
    description: 'Luxury & antioxidants',
    icon: 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlzdGFjaGlvc3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Dates',
    description: 'Fiber-rich with caramel twist',
    icon: 'https://plus.unsplash.com/premium_photo-1676208753932-6e8bc83a0b0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0ZXN8ZW58MHx8MHx8fDA%3D'
  },
  {
    name: 'Honey',
    description: 'Natural sweetness',
    icon: 'https://images.unsplash.com/photo-1654515722385-c684c5331c04?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbmV5fGVufDB8fDB8fHww'
  }, {
    name: 'Salt',
    description: 'Enhances flavor',
    icon: 'https://images.unsplash.com/photo-1648595093268-c0fd39b4cc30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHNhbHR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900'
  }
  ,
  {
    name: 'Walnut',
    description:
      'Rich, buttery flavor with a hint of sweetness',
    icon: 'https://images.unsplash.com/photo-1635843108103-9af0ea224a19?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdhbG51dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900',
  }
] as const;

export const PRODUCT_PRICES = {
  "premium-nuts-butter": {
    "250g": { original: 349, discounted: 299 },
    "350g": { original: 449, discounted: 399 },
    "500g": { original: 699, discounted: 599 },
    "750g": { original: 799, discounted: 699 },
    "1kg": { original: 1299, discounted: 1099 },
  },
  "peanut-date-butter": {
    "250g": { original: 349, discounted: 299 },
    "350g": { original: 349, discounted: 299 },
    "500g": { original: 349, discounted: 299 },
    "750g": { original: 799, discounted: 699 },
    "1kg": { original: 1299, discounted: 1099 },
  },
  "almond-walnut-cashew-butter": {
    "250g": { original: 549, discounted: 499 },
    "350g": { original: 549, discounted: 499 },
    "500g": { original: 699, discounted: 599 },
    "750g": { original: 799, discounted: 699 },
    "1kg": { original: 1299, discounted: 1099 },
  },
}

// Default product key used by single-product pages like Buy Now.
export const PRODUCT_DEFAULT_SLUG = "premium-nuts-butter";

// Central product catalog for product-specific content used across pages
// Keys must match slugs used elsewhere (e.g., in PRODUCT_PRICES)
export const PRODUCTS = {
  "premium-nuts-butter": {
    slug: "premium-nuts-butter",
    name: "Premium All-in-One Nuts Butter",
    ingredient: ["Peanuts", "Almonds", "Cashews", "Walnuts", "Pistachios", "Dates", "Honey", "Salt"],
    description: `Penowa's Premium All-in-One Nuts Butter is a revolutionary blend that brings together five roasted nuts—peanuts, almonds, cashews, walnuts, and pistachios—naturally sweetened with dates and honey. Every jar delivers rich, creamy indulgence packed with protein, healthy fats, and pure flavor.

  Born from a vision to redefine nuts butter in India, Penowa stands for quality without compromise. We craft our signature blend for health-conscious, flavor-seeking consumers who refuse to choose between nutrition and taste.

  What sets us apart is our commitment to clean, honest ingredients. No preservatives. No palm oil. No refined sugar. Just premium nuts and natural sweeteners, carefully roasted and blended to perfection.

  This isn't just a spread—it's a lifestyle choice. Whether you're fueling your morning workout, enhancing your smoothie bowl, or simply enjoying a spoonful straight from the jar, Penowa delivers authentic indulgence that aligns with your values.`,
    shortDescription: "A wholesome blend of five premium nuts, naturally sweetened with dates and honey.",
    protein: 22,
    images: [
      "/product.webp",
      "/product.webp",
      "/product.webp",
    ],
    rating: 4.6,
    reviewCount: 2500,
    // Order matters for UI dropdowns
    availableWeights: ["350g"],
  },
  "peanut-date-butter": {
    slug: "peanut-date-butter",
    name: "Peanut & Dates Butter",
    ingredient: ["Peanuts", "Dates", "Salt"],
    description:
      `Penowa's Peanut & Date Butter strips peanut butter down to its purest essence—premium roasted peanuts naturally sweetened with dates and a hint of salt. Simple, wholesome, and incredibly delicious, this three-ingredient wonder proves that less is truly more.

  For those who crave simplicity without sacrificing flavor, this is your perfect match. We've let the natural richness of roasted peanuts shine through, enhanced by the caramel-like sweetness of dates that replace refined sugar completely.

  True to Penowa's promise of clean, honest ingredients, every jar is free from preservatives, palm oil, and artificial additives. Just real food that tastes like it should—nutty, naturally sweet, and satisfyingly smooth.

  Whether you're spreading it on morning toast, swirling it into oatmeal, or enjoying it straight from the spoon, this minimalist blend delivers maximum flavor and nutrition. It's proof that when you start with quality ingredients, you don't need anything else.`,
    shortDescription: "A simple, wholesome blend of roasted peanuts and natural date sweetness.",
    protein: 24,
    images: [
      "/product.webp",
      "/product.webp",
      "/product.webp"
    ],
    rating: 4.6,
    reviewCount: 1800,
    availableWeights: ["500g"],
  },
  "almond-walnut-cashew-butter": {
    slug: "almond-walnut-cashew-butter",
    name: "Almond • Walnut • Cashew Butter",
    ingredient: ["Almonds", "Walnuts", "Cashews", "Salt"],
    description:
      `Penowa's Almond • Walnut • Cashew Butter is a luxurious trinity of premium nuts, carefully roasted and blended into a silky-smooth spread. This nutrient-dense powerhouse combines the buttery richness of cashews, the heart-healthy goodness of walnuts, and the protein-packed punch of almonds in every spoonful.

  Crafted for those who demand both indulgence and nutrition, this four-ingredient blend delivers omega-3s, plant-based protein, and healthy fats without any fillers or shortcuts. It's Penowa's commitment to premium quality in its purest form.

  True to our brand philosophy, we've kept it clean and simple—just three exceptional nuts and a touch of salt. No preservatives, no palm oil, no refined sugar. Only the finest ingredients that let the natural flavors and nutritional benefits speak for themselves.

  Whether you're elevating your smoothie, energizing your pre-workout snack, or creating gourmet toast, this sophisticated blend transforms everyday moments into nutrient-rich indulgences. Experience the difference when quality nuts take center stage.`,
    shortDescription: "A luxurious blend of almonds, walnuts, and cashews for a nutrient-rich indulgence.",
    protein: 21,
    images: [
      "/product.webp",
      "/product.webp",
      "/product.webp"
    ],
    rating: 4.8,
    reviewCount: 1200,
    availableWeights: ["250g"],
  },
} as const;

export const PHONE_NUMBER = "+91 93183 67696";
export const EMAIL_ADDRESS = `support@${process.env.NEXT_PUBLIC_BRAND_NAME?.toLowerCase()}.in`;


// Checkout Page
// Indian states list
export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

// Mapping of states to common postal PIN code prefixes (first 2-3 digits).
// NOTE: These prefixes are approximate common starting digits for each state
// and are intended for basic client-side validation. They are not exhaustive.
// Update or refine these entries whenever you have a more complete list.
export const STATE_PINCODE_PREFIXES: Record<string, string[]> =  {
  "Andaman and Nicobar Islands": ["744"],
  "Andhra Pradesh": ["515", "516", "517", "518", "520", "521", "522", "523", "524", "525", "526", "527", "530", "531", "532", "533", "534", "535"],
  "Arunachal Pradesh": ["790", "791", "792"],
  "Assam": ["781", "782", "783", "784", "785", "786", "787", "788"],
  "Bihar": ["800", "801", "802", "803", "804", "805", "811", "812", "813", "814", "815", "816", "821", "822", "823", "824", "825", "831", "841", "842", "843", "844", "845", "846", "847", "848", "849", "851", "852", "853", "854", "855"],
  "Chandigarh": ["160"],
  "Chhattisgarh": ["490", "491", "492", "493", "494", "495", "496", "497"],
  "Dadra and Nagar Haveli and Daman and Diu": ["396"],
  "Delhi": ["110"],
  "Goa": ["403", "404"],
  "Gujarat": ["360", "361", "362", "363", "364", "365", "370", "380", "382", "383", "384", "385", "387", "388", "389", "390", "391", "392", "393", "394", "395", "396"],
  "Haryana": ["121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137"],
  "Himachal Pradesh": ["171", "172", "173", "174", "175", "176", "177"],
  "Jammu and Kashmir": ["180", "181", "182", "183", "184", "185", "186", "190", "191", "192", "193", "194", "195", "196"],
  "Jharkhand": ["813", "814", "815", "822", "825", "826", "827", "828", "829", "831", "832", "833", "834", "835"],
  "Karnataka": ["560", "561", "562", "563", "564", "565", "570", "571", "572", "573", "574", "575", "576", "577", "581", "582", "583", "584", "585", "586", "587", "590", "591"],
  "Kerala": ["670", "671", "672", "673", "674", "675", "676", "678", "679", "680", "681", "682", "683", "684", "685", "686", "688", "689", "690", "691", "695", "696", "697"],
  "Ladakh": ["194"],
  "Lakshadweep": ["682"],
  "Madhya Pradesh": ["450", "451", "452", "453", "454", "455", "456", "457", "458", "460", "461", "462", "463", "464", "465", "466", "467", "470", "471", "472", "473", "474", "480", "481", "482", "483", "484", "485", "486", "487"],
  "Maharashtra": ["400", "401", "402", "403", "404", "405", "410", "411", "412", "413", "414", "415", "416", "417", "421", "422", "423", "424", "425", "431", "440", "441", "442", "443", "444", "445"],
  "Manipur": ["795"],
  "Meghalaya": ["793", "794"],
  "Mizoram": ["796"],
  "Nagaland": ["797", "798"],
  "Odisha": ["750", "751", "752", "753", "754", "755", "756", "757", "758", "759", "760", "761", "762", "763", "764", "765", "766", "767", "768", "769", "770"],
  "Puducherry": ["533", "605", "607", "609", "673"],
  "Punjab": ["140", "141", "142", "143", "144", "145", "146", "147", "148", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160"],
  "Rajasthan": ["301", "302", "303", "304", "305", "306", "307", "311", "312", "313", "321", "322", "323", "324", "325", "326", "327", "328", "331", "332", "333", "334", "335", "341", "342", "344", "345"],
  "Sikkim": ["737"],
  "Tamil Nadu": ["600", "601", "602", "603", "604", "605", "606", "607", "608", "609", "610", "611", "612", "613", "614", "620", "621", "622", "623", "624", "625", "626", "627", "628", "629", "630", "631", "632", "635", "636", "637", "638", "639", "641", "642", "643", "644", "645", "646", "647"],
  "Telangana": ["500", "501", "502", "503", "504", "505", "506", "507", "508", "509"],
  "Tripura": ["799"],
  "Uttar Pradesh": ["201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "261", "262", "263", "271", "272", "273", "274", "275", "276", "277", "281", "282", "283", "284", "285"],
  "Uttarakhand": ["244", "245", "246", "247", "248", "249", "260", "261", "262", "263"],
  "West Bengal": ["700", "701", "711", "712", "713", "721", "722", "723", "731", "732", "733", "734", "735", "736", "741", "742", "743", "744", "751", "752", "753", "754", "755", "756"],
};