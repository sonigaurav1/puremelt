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
    name: "Peanut & Date Butter",
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